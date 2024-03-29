const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const reviewSchema = new Schema(
  {
    type: String,
    description: String,
    creator: String,
    ref: {
      user: String,
      content: String,
    },
  },
  { timestamps: true }
);
const Review = model("review", reviewSchema);

module.exports = Review;
