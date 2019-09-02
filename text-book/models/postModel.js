const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	post: { type: String, required: true },
	userLikeMap: { type: Map, of: Boolean },
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comments'
		}
	]
});

const Post = mongoose.model('Posts', postSchema);

module.exports = Post;
