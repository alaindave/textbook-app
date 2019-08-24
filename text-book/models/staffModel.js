const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
	matricule: { type: Number, required: true },
	department: { type: String, required: true },
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	telephone: { type: Number, required: true },
	address: { type: String, required: true },
	imageUrl: { type: String },
	daysOff: { type: Number },
	approvedBreaks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'DaysOff'
		}
	]
});

const Staff = mongoose.model('Staff', staffSchema);

module.exports = Staff;
