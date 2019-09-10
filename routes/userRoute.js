const express = require("express");
const router = express.Router();
const {
  addUser,
  addProfilePic,
  addPhoto,
  addCoverPic,
  savePost,
  addPost,
  likeUnlikePost,
  saveComment,
  addComment,
  createMessage,
  addReceived
} = require("../db");
const validate = require("../validate/validateNew");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const hash = require("../hash");
const authorize = require("../authorize");
const upload = require("../services/fileUpload");

const _ = require("lodash");

//register new user
router.post("/", async (req, res, next) => {
  //validate input
  const error = validate(req.body);

  if (error) {
    console.log(error.details[0].message);
    res.status(400).send(error.details[0].message);
    return;
  }

  let user = await User.findOne({ email: req.body.email });
  if (user)
    return res.status(400).send("This email is registered to another user. ");

  //save user into database
  try {
    const { firstName, lastName, email } = req.body;

    //hash password
    const password = await hash(req.body.password);

    //create new admin object
    user = new User({
      firstName,
      lastName,
      email,
      password
    });

    //save user into database
    const userSaved = await addUser(user);

    if (typeof userSaved.email !== "undefined") {
      const response = _.pick(userSaved, [
        "_id",
        "firstName",
        "lastName",
        "email"
      ]);
      const token = user.generateToken();
      res
        .header("x-auth-token", token)
        .status(200)
        .send(response);
      console.log("User registered successfully", userSaved);
    } else {
      res.status(500).send("Unable to register user");
    }
  } catch (e) {
    console.log(e);
  }
});

//get user
router.get("/:userID", async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userID)
      .populate({
        path: "posts",
        populate: {
          path: "comments",
          populate: {
            path: "author",
            select: { firstName: "1", lastName: "1", profileUrl: "1" }
          }
        }
      })
      .populate({
        path: "receivedMessages",
        populate: {
          path: "author",
          select: { firstName: "1", lastName: "1", profileUrl: "1" },
          populate: {
            path: "replies"
          }
        }
      });
    if (!user) return res.status(404).send("User not found");
    console.log("this is the user found", user);
    user = _.pick(user, [
      "_id",
      "firstName",
      "lastName",
      "email",
      "city",
      "hometown",
      "profileUrl",
      "coverUrl",
      "posts",
      "photos",
      "receivedMessages"
    ]);
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send("Unable to retrieve user.Try again later");
    console.log("Unable to retrieve user", e);
  }
});

//update user
router.put("/:userID/edit", async (req, res, next) => {
  try {
    let user = await User.findById(req.params.userID);
    if (!user) return res.status(404).send("User not found");
    console.log("user to update", user);
    console.log("req body", req.body);
    const { _firstName, _lastName, _email, _city, _hometown } = req.body;
    user.firstName = _firstName;
    user.lastName = _lastName;
    user.email = _email;
    user.city = _city;
    user.hometown = _hometown;
    user.save();
    console.log("user updated", user);
    res.status(200).send({ "Updated user": user });
  } catch (e) {
    res.status(500).send("Unable to retrieve user.Try again later");
    console.log("Unable to retrieve user", e);
  }
});

//get all users
router.get("/:userID/friends", async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.userID } });
    if (!users) return res.status(404).send("no users found");
    console.log("list of users found", users);
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send("Unable to retrieve users.Try again later");
    console.log("Unable to retrieve users", e);
  }
});

//save avatar
router.put("/:userID/avatar", (req, res, next) => {
  const image_upload = upload.single("image");
  image_upload(req, res, error => {
    if (error) {
      res.status(422).json({ Error: error.message });
    }
    // Save new url
    console.log("saved image blob", req.file);
    addProfilePic(req.file.location, req.params.userID);
    res.status(200).send({ profileUrl: req.file.location });
  });
});

//save cover picture
router.put("/:userID/cover", (req, res, next) => {
  const image_upload = upload.single("image");
  image_upload(req, res, error => {
    if (error) {
      res.status(422).json({ Error: error.message });
    }
    // Save new url
    console.log("saved image blob", req.file);
    addCoverPic(req.file.location, req.params.userID);
    res.status(200).send({ imageUrl: req.file.location });
  });
});

//save photos
router.post("/:userID/photos", (req, res, next) => {
  const image_upload = upload.single("image");
  image_upload(req, res, error => {
    if (error) {
      res.status(422).json({ Error: error.message });
    }
    // Save new url
    console.log("saved photo", req.file);
    addPhoto(req.file.location, req.params.userID);
    res.status(200).send({ photoUrl: req.file.location });
  });
});
//save posts
router.post("/:userID/posts", async (req, res, next) => {
  //save post in posts collection
  try {
    const post = await savePost(req.body.post);
    console.log("saved post:", post);
    addPost(req.params.userID, post._id);
    res.status(200).send(post);
  } catch (e) {
    console.log("an error occured", e);
  }
});

//get single post
router.get("/posts/:postID", async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postID).populate({
      path: "comments",
      // populate author of comments
      populate: {
        path: "author",
        select: { firstName: "1", lastName: "1", profileUrl: "1" }
      }
    });
    if (!post) return res.status(404).send("Post not found");
    res.status(200).send(post);
  } catch (e) {
    res.status(500).send("Unable to retrieve post.Try again later");
    console.log("Unable to retrieve post. Error message:", e);
  }
});

// like or unlike a post
router.put("/posts/:postID/like", (req, res, next) => {
  likeUnlikePost(req.body.userID, req.params.postID)
    .then(result => res.status(200).send(result))
    .catch(e => res.status(500).send("Unable to like/unlike!"));
});

//comment on post
router.post("/posts/:postID/comments", async (req, res, next) => {
  try {
    const comment = await saveComment(
      req.body.userID,
      req.body.comment,
      req.body.date
    );
    console.log("comment saved", comment);
    const addedComment = await addComment(req.params.postID, comment._id);
    console.log("comment added", addedComment);
    res.status(200).send(addedComment);
  } catch (e) {
    console.log("an error occured", e);
    res.status(500).send("an error occured. Try again later...");
  }
});

//send messages
router.post("/:userID/messages/:recipientID", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userID);
    if (!user) return res.status(404).send("User not found");

    const recipient = await User.findById(req.params.recipientID);
    if (!recipient) return res.status(404).send("Recipient not found");

    const { userID, recipientID } = req.params;
    const { subject, message } = req.body;
    //create message
    const sentMessage = await createMessage(
      userID,
      recipientID,
      subject,
      message
    );

    addReceived(recipientID, sentMessage._id);
    res.status(200).send(sentMessage);
  } catch (e) {
    console.log("an error occured", e);
  }
});

module.exports = router;
