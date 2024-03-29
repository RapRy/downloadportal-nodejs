const ContentModel = require("../models/contentModel.js");
const UserModel = require("../models/userModel.js");
const ReviewModel = require("../models/reviewModel.js");

// const postComment = async (req, res) => {
//   try {
//     const { comment, contentId, reviewId } = req.body;
//     const userId = req.userId;

//     const dateNow = new Date();

//     const user = await UserModel.findById(userId);
//     const review = await ReviewModel.findById(reviewId);
//     const updatedReview = await ReviewModel.findByIdAndUpdate(
//       reviewId,
//       {
//         comments: [
//           ...review.comments,
//           {
//             type: "comment",
//             creator: `${user.name.firstName} ${user.name.lastName}`,
//             description: comment,
//             createdAt: dateNow,
//             ref: { content: contentId, user: userId, review: reviewId },
//           },
//         ],
//       },
//       { useFindAndModify: false, new: true }
//     );

//     const latestComment =
//       updatedReview.comments[updatedReview.comments.length - 1];

//     if (updatedReview) {
//       const Content = await ContentModel.findById(contentId);

//       await ContentModel.findByIdAndUpdate(
//         contentId,
//         {
//           "meta.comments": [...Content.meta.comments, latestComment._id],
//         },
//         { useFindAndModify: false, new: true }
//       );

//       const User = await UserModel.findById(userId);

//       await UserModel.findByIdAndUpdate(
//         userId,
//         {
//           "meta.activities": [
//             ...User.meta.activities,
//             {
//               userId,
//               type: "wroteReview",
//               activityRef: "comment",
//               activityDesc: latestComment._id,
//               createdAt: dateNow,
//             },
//           ],
//           "meta.comments": [...User.meta.comments, latestComment._id],
//           "date.lastActivity": dateNow,
//         },
//         { useFindAndModify: false, new: true }
//       );
//     }

//     res.status(200).json({ latestComment });
//   } catch (error) {
//     res.status(500).json({
//       message:
//         "Application rejected: Something ent wrong, try sending form again",
//     });
//   }
// };

const postReview = async (req, res) => {
  try {
    const { review, contentId } = req.body;
    const userId = req.userId;

    const dateNow = new Date();

    const user = await UserModel.findById(userId);

    const Review = await ReviewModel.create({
      type: "review",
      description: review,
      creator: `${user.name.firstName} ${user.name.lastName}`,
      // comments: [],
      ref: {
        user: userId,
        content: contentId,
      },
    });

    if (Review) {
      const Content = await ContentModel.findById(contentId);

      await ContentModel.findByIdAndUpdate(
        contentId,
        { "meta.reviews": [...Content.meta.reviews, Review._id] },
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
              activityRef: "review",
              activityDesc: Review._id,
              createdAt: dateNow,
            },
          ],
          "meta.reviews": [...User.meta.reviews, Review._id],
          "date.lastActivity": dateNow,
        },
        { useFindAndModify: false, new: true }
      );
    }

    res.status(200).json({ review: Review });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

module.exports = {
  postReview,
  // postComment,
};
