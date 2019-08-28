const express = require('express');
const router = express.Router();
const { addUser, addPic, addCoverPic } = require('../db');
const validate = require('../validate/validateNew');
const User = require('../models/userModel');
const hash = require('../hash');
const authorize = require('../authorize');
const upload = require('../services/fileUpload');

const _ = require('lodash');

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

router.get('/:id', async (req, res, next) => {
	try {
		let user = await User.findById(req.params.id);
		if (!user) return res.status(404).send('User not found');
		console.log('this is the user found', user);
		user = _.pick(user, [ '_id', 'firstName', 'lastName', 'email', 'profileUrl', 'coverUrl' ]);
		res.status(200).send(user);
	} catch (e) {
		res.status(500).send('Unable to retrieve user.Try again later');
		console.log('Unable to retrieve user', e);
	}
});

router.put('/:id/avatar', (req, res, next) => {
	const image_upload = upload.single('image');
	image_upload(req, res, (error) => {
		if (error) {
			res.status(422).json({ Error: error.message });
		}
		// Save new url
		console.log('saved image blob', req.file);
		addPic(req.file.location, req.params.id);
		res.status(200).send({ imageUrl: req.file.location });
	});
});

router.put('/:id/cover', (req, res, next) => {
	const image_upload = upload.single('image');
	image_upload(req, res, (error) => {
		if (error) {
			res.status(422).json({ Error: error.message });
		}
		// Save new url
		console.log('saved image blob', req.file);
		addCoverPic(req.file.location, req.params.id);
		res.status(200).send({ imageUrl: req.file.location });
	});
});

module.exports = router;
