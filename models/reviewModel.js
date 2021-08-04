const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const commentSchema = new Schema(
  {
    type: String,
    description: String,
    ref: {
      content: String,
      user: String,
      review: String,
    },
  },
  { timestamps: true }
);
const reviewSchema = new Schema(
  {
    type: String,
    description: String,
    comments: [commentSchema],
    ref: {
      user: String,
      content: String,
    },
  },
  { timestamps: true }
);
const Review = model("review", reviewSchema);

module.exports = Review;
