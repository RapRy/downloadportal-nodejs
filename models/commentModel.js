const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const commentSchema = new Schema(
  {
    type: String,
    description: String,
    creator: String,
    ref: {
      content: String,
      user: String,
      review: String,
    },
  },
  { timestamps: true }
);

const Comment = model("comment", commentSchema);

module.exports = Comment;
