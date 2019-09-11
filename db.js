const mongoose = require("mongoose");
const User = require("./models/userModel");
const Post = require("./models/postModel.js");
const Comment = require("./models/commentModel.js");
const Message = require("./models/messageModel.js");

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/textbookdb", {
    useNewUrlParser: true
  })
  .then(() => console.log("Connected to MongoDb..."))
  .catch(err => console.error("Could not connect to MongoDB", err));

const addUser = async _user => {
  const user = new User({
    firstName: _user.firstName,
    lastName: _user.lastName,
    email: _user.email,
    password: _user.password
  });

  try {
    const result = await user.save();
    return result;
  } catch (e) {
    console.log("unable to register user");
    return e.message;
  }
};

const addProfilePic = async (url, userID) => {
  try {
    // Fetch user with the given id
    const user = await User.findById(userID);

    //add url to staff document
    user.profileUrl = url;
    user.save();
    console.log("updated user", user);
  } catch (e) {
    console.log("Unable to save image.Error message:", e.message);
  }
};

const addCoverPic = async (url, id) => {
  try {
    // Fetch user with the given id
    const user = await User.findById(id);

    //add url to staff document
    user.coverUrl = url;
    user.save();
    console.log("updated user", user);
  } catch (e) {
    console.log("Unable to save image.Error message:", e.message);
  }
};

const savePost = async post => {
  const date = new Date();
  const userLikeMap = new Map();
  const _post = new Post({
    date,
    post,
    userLikeMap
  });

  try {
    const result = await _post.save();
    return result;
  } catch (e) {
    console.log("unable to save post", e);
    return e.message;
  }
};

const addPost = async (userID, postID) => {
  try {
    // Fetch user with the given id
    const user = await User.findById(userID);
    user.posts.push(postID);
    const result = await user.save();
    return result;
  } catch (e) {
    console.log("Unable to add post to user document.Error message:", e);
  }
};

const addPhoto = async (url, userID) => {
  try {
    // Fetch user with the given id
    const user = await User.findById(userID);
    user.photos.push(url);
    user.save();
    console.log("updated user document", user);
  } catch (e) {
    console.log("Unable to save photo.Error message:", e.message);
  }
};

const addVideo = async (url, id) => {
  try {
    // Fetch user with the given id
    const user = await User.findById(id);
    //add url to staff document
    user.videos.push(url);
    user.save();
    console.log("updated user document", user);
  } catch (e) {
    console.log("Unable to save video.Error message:", e.message);
  }
};

const likeUnlikePost = async (userID, postID) => {
  try {
    // Fetch post
    const post = await Post.findById(postID);

    console.log("this is the userID ", userID);
    console.log("this is the postID ", postID);
    console.log("this is the post found ", post);

    // if user has alredy liked post then unlike it
    if (post.userLikeMap.get(userID)) {
      post.userLikeMap.delete(userID);
    } else {
      // like convo
      post.userLikeMap.set(userID, true);
    }
    const result = await post.save();
    return result;
  } catch (e) {
    console.log("Unable to like/unlike the post.Error message:", e);
    return e.message;
  }
};

const saveComment = async (author, comment, date) => {
  const _comment = new Comment({
    author,
    comment,
    date
  });

  try {
    const result = await _comment.save();
    return result;
  } catch (e) {
    console.log("unable to save comment", e);
    return e.message;
  }
};

const addComment = async (postID, commentID) => {
  try {
    // Fetch post
    const post = await Post.findById(postID);
    post.comments.push(commentID);
    post.save();
    return post;
  } catch (e) {
    console.log("unable to add comment", e);
    return e.message;
  }
};

const createMessage = async (author, recipient, subject, message) => {
  const date = new Date();
  const _message = new Message({
    date,
    author,
    recipient,
    subject,
    message
  });

  try {
    const result = await _message.save();
    return result;
  } catch (e) {
    console.log("unable to save message", e);
    return e.message;
  }
};

const addReceived = async (recipientID, message) => {
  try {
    // Fetch user with the given id
    const user = await User.findById(recipientID);
    user.receivedMessages.push(message);
    user.save();
    console.log("updated recipient document", user);
  } catch (e) {
    console.log("Unable to save message.Error message:", e.message);
  }
};

const addSent = async (userID, message) => {
  try {
    // Fetch user with the given id
    const user = await User.findById(userID);
    user.sentMessages.push(message);
    user.save();
    console.log("updated recipient document", user);
  } catch (e) {
    console.log("Unable to save message.Error message:", e.message);
  }
};

module.exports = {
  addUser,
  addProfilePic,
  addCoverPic,
  addPhoto,
  addVideo,
  savePost,
  addPost,
  likeUnlikePost,
  saveComment,
  addComment,
  createMessage,
  addReceived,
  addSent
};
