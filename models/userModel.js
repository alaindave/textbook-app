const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileUrl: { type: String },
  coverUrl: { type: String },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts"
    }
  ],
  photos: [{ type: String }],
  videos: [{ type: String }],
  city: { type: String },
  hometown: { type: String }
});

userSchema.methods.generateToken = function() {
  return jwt.sign(
    { lastName: this.lastName, email: this.email },
    process.env.jwtKey
  );
};

const Users = mongoose.model("Users", userSchema);

module.exports = Users;
