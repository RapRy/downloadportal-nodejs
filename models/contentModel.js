const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const contentSchema = new Schema({
  name: String,
  catName: String,
  subCatName: String,
  description: String,
  thumbnail: String,
  screenshots: [String],
  filename: String,
  banner: String,
  snippet: String,
  featured: Boolean,
});

const Content = model("content", contentSchema);

module.exports = Content;
