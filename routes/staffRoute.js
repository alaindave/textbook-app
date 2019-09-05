const express = require('express');
const router = express.Router();
const validate = require('../validate/validateStaff');
const Staff = require('../models/staffModel');

const { addStaff, addPic, getStaff, saveLetter, addDaysOff } = require('../db');
const upload = require('../services/fileUpload');
const sendEmail = require('../services/sendEmail');

router.post('/', async (req, res, next) => {
	try {
		console.log('this is the request body:', req.body);
		const { lastName, firstName, telephone, address, department, daysOff } = req.body;

		//get number of staff
		const matricule = Math.floor(Math.random() * 1000);

		const error = validate({
			lastName,
			firstName,
			telephone,
			address,
			department,
			daysOff,
			matricule
		});

		if (error) {
			console.log(error.details[0].message);
			res.status(400).send(error.details[0].message);
			console.log('staff number', matricule);
			return;
		}

		//create new admin object
		let staff = new Staff({
			department,
			lastName,
			firstName,
			telephone,
			matricule,
			address,
			daysOff
		});

		//save staff into database
		const staffSaved = await addStaff(staff);

		console.log('this is the saved staff', staffSaved);

		if (typeof staffSaved.firstName !== 'undefined') {
			res.status(200).send(staffSaved);
			console.log('staff registered successfully', staffSaved);
		} else {
			res.status(500).send('Unable to add staff');
		}
	} catch (e) {
		console.log(e);
	}
});

router.post(
	'/:staffID/daysOff/:requestID',
	async (req, res, next) => {
		try {
			console.log('request body:', req.body);

			const { startDate, endDate, numberDays, id } = req.body;

			//save days off request
			const result = await addDaysOff(req.params.requestID, startDate, endDate, numberDays);

			console.log('days off request', result);

			const staff = await Staff.findById(req.params.staffID);
			if (!staff) return res.status(404).send('Staff with given ID was not found');

			const updatedDaysOff = staff.daysOff - numberDays;
			staff.daysOff = updatedDaysOff;

			staff.approvedBreaks.push(result._id);
			//save staff into database
			staff.save();
			//send email
			next();
		} catch (e) {
			console.log(e);
		}
	},
	sendEmail
);

router.put('/:id', async (req, res, next) => {
	//validate input
	const error = validate(req.body);

	if (error) {
		console.log(error.details[0].message);
		res.status(400).send(error.details[0].message);
		return;
	}

	//fetch user from database and update info
	try {
		const staff = await Staff.findById(req.params.id);
		if (!staff) return res.status(404).send('Staff with given ID was not found');
		const { lastName, firstName, telephone, address, matricule, department, daysOff } = req.body;

		//update staff
		staff.set({
			department,
			matricule,
			lastName,
			firstName,
			telephone,
			address
		});
		//save staff into database
		staff.save();
		res.status(200).send(staff);
	} catch (e) {
		console.log(e);
	}
});

router.post('/:staffID/daysOff', (req, res, next) => {
	const letter_upload = upload.single('letter');
	letter_upload(req, res, (error) => {
		if (error) {
			res.status(422).json({ Error: error.message });
		}
		// Save new url
		console.log('saved file', req.file);
		saveLetter(req.file.location)
			.then((savedRequest) => {
				console.log('Break request object', savedRequest);
				res.status(200).send(savedRequest);
			})
			.catch((e) => console.log(e));
	});
});

router.get('/', async (req, res, next) => {
	try {
		const staff = await getStaff();
		res.status(200).send(staff);
	} catch (e) {
		console.log(e);
	}
});

router.get('/:staffID', async (req, res, next) => {
	//save user into database
	try {
		const staff = await Staff.findById(req.params.staffID);
		console.log('staff info to send', staff);
		res.status(200).send(staff);
	} catch (e) {
		console.log(e);
	}
});

router.get('/:staffID/daysOff/list', async (req, res, next) => {
	//save user into database
	try {
		const staff = await Staff.findById(req.params.staffID).populate('approvedBreaks');
		console.log('staff break info to send', staff);
		res.status(200).send(staff.approvedBreaks);
	} catch (e) {
		console.log(e);
	}
});

router.put('/:staffID/avatar', (req, res, next) => {
	const image_upload = upload.single('image');
	image_upload(req, res, (error) => {
		if (error) {
			res.status(422).json({ Error: error.message });
		}
		// Save new url
		console.log('saved image blob', req.file);
		addPic(req.file.location, req.params.staffID);
		res.status(200).send({ imageUrl: req.file.location });
	});
});

router.delete('/:staffID', async (req, res, next) => {
	const staff = await Staff.findByIdAndRemove(req.params.staffID);
	if (!staff) return res.status(404).send('Staff with given ID was not found');
	res.status(200).send(staff);
});

module.exports = router;
