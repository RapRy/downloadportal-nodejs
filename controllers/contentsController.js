const ContentModel = require("../models/contentModel.js");
const CategoryModel = require("../models/categoryModel.js");
const ReviewModel = require("../models/reviewModel.js");
const CommentModel = require("../models/commentModel.js");

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
    const comments = await CommentModel.find({ "ref.content": content._id });

    const finalReviews = reviews.map((rev) => ({
      ...rev._doc,
      comments: comments.filter(
        (com) => com._doc.ref.review === rev._doc._id.toString()
      ),
    }));

    console.log(finalReviews);

    res.status(200).json({ content, reviews: finalReviews });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

const getContents = async (req, res) => {
  try {
    const contents = await ContentModel.find().select({
      catName: 1,
      subCatName: 1,
      name: 1,
      thumbnail: 1,
      description: 1,
      screenshots: 1,
      filename: 1,
      filesize: 1,
    });

    res.status(200).json({ data: contents });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

const getContentsByCat = async (req, res) => {
  try {
    const { group, limit } = req.query;
    const { cat } = req.params;

    const validateLimit = limit !== undefined ? parseInt(limit) : 100;

    if (group !== undefined) {
      if (group === "sub") {
        const contents = await ContentModel.aggregate([
          { $match: { catName: cat } },
          {
            $group: {
              _id: "$subCatName",
              contents: {
                $push: {
                  _id: "$_id",
                  catName: "$catName",
                  subCatName: "$subCatName",
                  name: "$name",
                  thumbnail: "$thumbnail",
                  description: "$description",
                  screenshots: "$screenshots",
                  filename: "$filename",
                  filesize: "$filesize",
                },
              },
            },
          },
          {
            $project: {
              _id: 1,
              contents: { $slice: ["$contents", validateLimit] },
            },
          },
          { $sort: { _id: 1 } },
          {
            $group: {
              _id: null,
              result: {
                $push: {
                  k: "$_id",
                  v: "$contents",
                },
              },
            },
          },
          {
            $replaceRoot: {
              newRoot: {
                $arrayToObject: "$result",
              },
            },
          },
        ]);

        res.status(200).json({ data: { ...contents[0] } });
        return;
      }

      if (group === "main") {
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
        ).limit(validateLimit);

        res.status(200).json({ data: contents });
        return;
      }
    }

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
    ).limit(validateLimit);

    res.status(200).json({ data: contents });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

const getContentsBySubcat = async (req, res) => {
  try {
    const { cat, sub } = req.params;

    const contents = await ContentModel.find({ catName: cat, subCatName: sub });

    res.status(200).json({ data: contents });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

const getContentsViaSearch = async (req, res) => {
  try {
    const { keyword, key } = req.query;

    if (key !== undefined) {
      const contents = await ContentModel.find({
        [`${key}`]: { $regex: keyword, $options: "i" },
      });

      res.status(200).json({ contents });
      return;
    }

    const contents = await ContentModel.find({
      name: { $regex: keyword, $options: "i" },
    });
    res.status(200).json({ contents });
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
  getContents,
  getContentsByCat,
  getDetails,
  getContentViaReviewId,
  getContentViaCommentId,
  getContentsBySubcat,
  getContentsViaSearch,
};
