const express = require('express');
const router = express.Router();
const { addUser } = require('../db');
const validate = require('../validate/validateNew');
const User = require('../models/userModel');
const hash = require('../hash');
const authorize = require('../authorize');

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

router.get('/:id', authorize, async (req, res, next) => {
	try {
		const admin = await Admin.findById(req.params.id);
		if (!admin) return res.status(404).send('Admin not found');
		res.status(200).send(admin);
	} catch (e) {
		res.status(500).send('Unable to retrieve admin.Try again later');
		console.log('Unable to retrieve admin');
	}
});

module.exports = router;
