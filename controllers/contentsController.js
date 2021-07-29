const ContentModel = require("../models/contentModel.js");

const getContentsBySub = async (req, res) => {
  try {
    const { cat, sub } = req.params;
    const contents = await ContentModel.find({ catName: cat, subCatName: sub });

    console.log(contents);

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
  getContentsBySub,
};
