const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Users'
	},
	comment: { type: String, required: true },
	date: { type: String, required: true }
});

const Comments = mongoose.model('Comments', commentSchema);

module.exports = Comments;
