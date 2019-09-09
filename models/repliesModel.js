const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
	date: { type: Date, required: true },
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users'
	},
	recipient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users'
	},
	message: { type: String, required: true }
});

const Reply = mongoose.model('Replies', replySchema);

module.exports = Reply;
