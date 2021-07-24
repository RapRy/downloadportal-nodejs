const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const subCatSchema = new Schema({
  parent_id: String,
  subCatName: String,
  catName: String,
  active: Number,
});
const categorySchema = new Schema({
  catName: String,
  catIcon: String,
  catExt: String,
  subCategories: [subCatSchema],
  active: Number,
});

const Category = model("category", categorySchema);

module.exports = Category;
