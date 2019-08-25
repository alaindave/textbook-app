const express = require('express');
const router = express.Router();
const validate = require('../validate/validateExisting');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const _ = require('lodash');

router.post('/', async (req, res, next) => {
	//validate input
	const error = validate(req.body);

	if (error) {
		console.log(error.details[0].message);
		res.status(400).send(error.details[0].message);
		return;
	}

	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Incorrect email or Password');

	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) return res.status(400).send('Incorrect email or Password');

	const token = user.generateToken();
	const response = _.pick(user, [ '_id', 'firstName', 'lastName', 'email' ]);

	res.header('x-auth-token', token).send(response);
});

module.exports = router;
