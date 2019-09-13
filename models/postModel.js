const mongoose = require("mongoose");
const comments = require("./commentModel");

const postSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  post: { type: String, required: true },
  userLikeMap: { type: Map, of: Boolean },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: comments
    }
  ]
});

const Post = mongoose.model("Posts", postSchema);

module.exports = Post;
