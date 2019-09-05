const express = require('express');
const router = express.Router();
const { addUser, addPic, addCoverPic, savePost, addPost, likeUnlikePost, saveComment, addComment } = require('../db');
const validate = require('../validate/validateNew');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const hash = require('../hash');
const authorize = require('../authorize');
const upload = require('../services/fileUpload');

const _ = require('lodash');

//register new user
router.post('/', async (req, res, next) => {
	//validate input
	const error = validate(req.body);

	if (error) {
		console.log(error.details[0].message);
		res.status(400).send(error.details[0].message);
		return;
	}

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('This email is registered to another user. ');

	//save user into database
	try {
		const { firstName, lastName, email } = req.body;

		//hash password
		const password = await hash(req.body.password);

		//create new admin object
		user = new User({
			firstName,
			lastName,
			email,
			password
		});

		//save user into database
		const userSaved = await addUser(user);

		if (typeof userSaved.email !== 'undefined') {
			const response = _.pick(userSaved, [ '_id', 'firstName', 'lastName', 'email' ]);
			const token = user.generateToken();
			res.header('x-auth-token', token).status(200).send(response);
			console.log('User registered successfully', userSaved);
		} else {
			res.status(500).send('Unable to register user');
		}
	} catch (e) {
		console.log(e);
	}
});

//get user
router.get('/:userID', async (req, res, next) => {
	try {
		let user = await User.findById(req.params.userID).populate('posts');
		if (!user) return res.status(404).send('User not found');
		console.log('this is the user found', user);
		user = _.pick(user, [
			'_id',
			'firstName',
			'lastName',
			'email',
			'profileUrl',
			'coverUrl',
			'posts',
			'photos',
			'videos'
		]);
		res.status(200).send(user);
	} catch (e) {
		res.status(500).send('Unable to retrieve user.Try again later');
		console.log('Unable to retrieve user', e);
	}
});

//save avatar
router.put('/:userID/avatar', (req, res, next) => {
	const image_upload = upload.single('image');
	image_upload(req, res, (error) => {
		if (error) {
			res.status(422).json({ Error: error.message });
		}
		// Save new url
		console.log('saved image blob', req.file);
		addPic(req.file.location, req.params.userID);
		res.status(200).send({ imageUrl: req.file.location });
	});
});

//save cover picture
router.put('/:userID/cover', (req, res, next) => {
	const image_upload = upload.single('image');
	image_upload(req, res, (error) => {
		if (error) {
			res.status(422).json({ Error: error.message });
		}
		// Save new url
		console.log('saved image blob', req.file);
		addCoverPic(req.file.location, req.params.userID);
		res.status(200).send({ imageUrl: req.file.location });
	});
});

//save posts
router.post('/:userID/posts', async (req, res, next) => {
	//save post in posts collection
	try {
		const post = await savePost(req.body.post);
		console.log('saved post:', post);
		addPost(req.params.userID, post._id);
		res.status(200).send(post);
	} catch (e) {
		console.log('an error occured', e);
	}
});

//get single post
router.get('/posts/:postID', async (req, res, next) => {
	try {
		const post = await Post.findById(req.params.postID).
		populate({
		  path: 'comments',
		  // populate author of comments
		  populate: {
			path: 'author',
			select: { firstName: '1', lastName: '1', profileUrl: '1' }
		  }
		})
		if (!post) return res.status(404).send('Post not found');
		res.status(200).send(post);
	} catch (e) {
		res.status(500).send('Unable to retrieve post.Try again later');
		console.log('Unable to retrieve post. Error message:', e);
	}
});

// like or unlike a post
router.put('/posts/:postID/like', (req, res, next) => {
	likeUnlikePost(req.body.userID, req.params.postID)
		.then((result) => res.status(200).send(result))
		.catch((e) => res.status(500).send('Unable to like/unlike!'));
});

//comment on post
router.post('/posts/:postID/comments', async (req, res, next) => {
	try {
		const comment = await saveComment(req.body.userID, req.body.comment, req.body.date);
		console.log('comment saved', comment);
		const addedComment = await addComment(req.params.postID, comment._id);
		console.log('comment added', addedComment);
		res.status(200).send(addedComment);
	} catch (e) {
		console.log('an error occured', e);
		res.status(500).send('an error occured. Try again later...');
	}
});

module.exports = router;