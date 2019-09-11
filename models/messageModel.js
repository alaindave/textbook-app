const mongoose = require("mongoose");
const replies = require("./commentModel");

const messageSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users"
  },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: replies
    }
  ]
});

const Message = mongoose.model("Messages", messageSchema);

module.exports = Message;
