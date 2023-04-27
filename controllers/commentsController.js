const ContentModel = require("../models/contentModel.js");
const UserModel = require("../models/userModel.js");
const ReviewModel = require("../models/reviewModel.js");
const CommentModel = require("../models/commentModel.js");

const postComment = async (req, res) => {
  try {
    const { comment, contentId, reviewId } = req.body;
    const userId = req.userId;
    const dateNow = new Date();

    const user = await UserModel.findById(userId);

    const Comment = await CommentModel.create({
      type: "comment",
      description: comment,
      creator: `${user.name.firstName} ${user.name.lastName}`,
      ref: {
        content: contentId,
        user: userId,
        review: reviewId,
      },
    });

    if (Comment) {
      const Content = await ContentModel.findById(contentId);

      await ContentModel.findByIdAndUpdate(
        contentId,
        {
          "meta.comments": [...Content.meta.comments, Comment._id],
        },
        { useFindAndModify: false, new: true }
      );

      const User = await UserModel.findById(userId);

      await UserModel.findByIdAndUpdate(
        userId,
        {
          "meta.activities": [
            ...User.meta.activities,
            {
              userId,
              type: "wroteReview",
              activityRef: "comment",
              activityDesc: Comment._id,
              createdAt: dateNow,
            },
          ],
          "meta.comments": [...User.meta.comments, Comment._id],
          "date.lastActivity": dateNow,
        },
        { useFindAndModify: false, new: true }
      );

      res.status(200).json({ comment: Comment });
    }
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

module.exports = {
  postComment,
};
