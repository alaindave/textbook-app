const mongoose = require('mongoose');

const daysOffSchema = new mongoose.Schema({
	startDate: { type: String },
	endDate: { type: String },
	numberDays: { type: Number },
	letter: { type: String }
});

const DaysOff = mongoose.model('DaysOff', daysOffSchema);

module.exports = DaysOff;
