const ContentModel = require("../models/contentModel.js");
const CategoryModel = require("../models/categoryModel.js");
const ReviewModel = require("../models/reviewModel.js");

const getContentViaCommentId = async (req, res) => {
  try {
    const comId = req.params.comId;

    const contentId = await ReviewModel.findOne(
      { "comments._id": comId },
      { "ref.content": 1 }
    );

    const content = await ContentModel.findOne(
      { _id: contentId.ref.content },
      { _id: 1, name: 1, subCatName: 1 }
    );

    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something went wrong, try sending form again",
    });
  }
};

const getContentViaReviewId = async (req, res) => {
  try {
    const revId = req.params.revId;

    const contentId = await ReviewModel.findOne(
      { _id: revId },
      { "ref.content": 1 }
    );

    const content = await ContentModel.findOne(
      { _id: contentId.ref.content },
      { _id: 1, name: 1, subCatName: 1 }
    );

    res.status(200).json({ content });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

const getDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const content = await ContentModel.findById(id);

    const reviews = await ReviewModel.find({ "ref.content": content._id });

    res.status(200).json({ content, reviews });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

const getContentsByCat = async (req, res) => {
  try {
    const { group } = req.query;
    const { cat } = req.params;

    const category = await CategoryModel.findOne({ catName: cat });

    const contents = await ContentModel.find(
      { catName: cat },
      {
        catName: 1,
        subCatName: 1,
        name: 1,
        thumbnail: 1,
        description: 1,
        screenshots: 1,
        filename: 1,
        filesize: 1,
      }
    );

    if (group !== undefined) {
      if (group === "sub") {
        let data = {};

        category.subCategories.forEach((subcat) => {
          const filteredContents = contents.filter(
            (content) => content.subCatName === subcat.subCatName
          );

          data = { ...data, [subcat.subCatName]: filteredContents };
        });

        res.status(200).json({ data });
        return;
      }

      if (group === "main") {
        res.status(200).json({ data: contents });
        return;
      }
    }

    res.status(200).json({ data: contents });

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
  getDetails,
  getContentViaReviewId,
  getContentViaCommentId,
};
