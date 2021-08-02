const ContentModel = require("../models/contentModel.js");
const CategoryModel = require("../models/categoryModel.js");

const getContentsByCat = async (req, res) => {
  try {
    const { cat } = req.params;

    const category = await CategoryModel.findOne({ catName: cat });

    const contents = await ContentModel.find({ catName: cat });

    let data = {};

    category.subCategories.forEach((subcat) => {
      const filteredContents = contents.filter(
        (content) => content.subCatName === subcat.subCatName
      );

      data = { ...data, [subcat.subCatName]: filteredContents };
    });

    console.log(data);

    res.status(200).json({ data });
    // const contents = await ContentModel.find({ catName: cat, subCatName: sub });

    // console.log(contents);

    // res.status(200).json({ contents });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

const getFeatureds = async (req, res) => {
  try {
    const contents = await ContentModel.find({ featured: true });
    res.status(200).json({ contents });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

module.exports = {
  getFeatureds,
  getContentsByCat,
};
