const ContentModel = require("../models/contentModel.js");

const getFeatureds = async (req, res) => {
  try {
    const contents = await ContentModel.find();
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
};
