const CategoryModel = require("../models/categoryModel.js");

const getCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({ active: 1 });

    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

module.exports = {
  getCategories,
};
