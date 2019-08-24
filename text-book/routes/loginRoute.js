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

	const admin = await Admin.findOne({ name: req.body.name });
	if (!admin) return res.status(400).send('Incorrect Username or Password');

	const validPassword = await bcrypt.compare(req.body.password, admin.password);
	if (!validPassword) return res.status(400).send('Incorrect Username or Password');

	const token = admin.generateToken();
	const response = _.pick(admin, [ '_id', 'name', 'email' ]);

	res.header('x-auth-token', token).send(response);
});

module.exports = router;
