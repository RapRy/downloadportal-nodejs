const UserModel = require("../models/userModel.js");
const ReviewModel = require("../models/reviewModel.js");
const CommentModel = require("../models/commentModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const moment = require("moment");

const getUserData = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findById(id, { name: 1, _id: 1, proPic: 1 });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try sending form again.",
    });
  }
};

const getActivities = async (req, res) => {
  const id = req.params.id;
  const accountType = req.accountType;

  const user = await UserModel.findById(id);

  let activities = [];
  let refDates = [];

  user.meta.activities.forEach((act) => {
    const refDate = moment(act.createdAt).format("MMMM Do YYYY");
    const refTime = moment(act.createdAt).format("h:mm a");
    const { _id, userId, type, activityRef, activityDesc, createdAt } = act;
    const updatedAct = {
      _id,
      userId,
      type,
      activityRef,
      activityDesc,
      createdAt,
      refDate,
      refTime,
    };
    if (accountType === "user" && type !== "deactivate")
      activities.push(updatedAct);

    if (accountType === "admin") activities.push(updatedAct);

    if (!refDates.includes(refDate)) {
      refDates.push(refDate);
    }
  });

  let finalGroupingAct = [];

  refDates.forEach((date) => {
    let groubByRefDate = { refDate: date, activities: [] };

    let filteredActivities = activities.filter((act) => date === act.refDate);

    groubByRefDate.activities = filteredActivities.reverse();

    finalGroupingAct.push(groubByRefDate);
  });

  res.status(200).json({ activities: finalGroupingAct.reverse() });
};

const deactivateAccount = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await UserModel.findById(id);

    const dateNow = new Date();

    await UserModel.findByIdAndUpdate(
      id,
      {
        "status.subscriptionStatus": 0,
        "status.accountStatus": 2,
        "meta.activities": [
          ...user.meta.activities,
          {
            userId: id,
            type: "deactivate",
            activityRef: "account",
            activityDesc: "subscription=0:account=2",
            createdAt: dateNow,
          },
        ],
        "date.lastActivity": dateNow,
        "date.unsubscribe": dateNow,
      },
      { useFindAndModify: false }
    );

    res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try sending form again.",
    });
  }
};

const updateSettings = async (req, res) => {
  try {
    const { id, updated, sms, email } = req.body;

    const user = await UserModel.findById(id);
    const dateNow = new Date();

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        "receiveUpdate.sms": sms,
        "receiveUpdate.email": email,
        "meta.activities": [
          ...user.meta.activities,
          {
            userId: id,
            type: "updateSettings",
            activityRef: updated,
            activityDesc: String(req.body[updated]),
            createdAt: dateNow,
          },
        ],
        "date.lastActivity": dateNow,
      },
      { useFindAndModify: false, new: true }
    );

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try sending form again.",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const { id, confirmPassword } = req.body;

    const hashedPassword = await bcrypt.hash(confirmPassword, 12);

    const user = await UserModel.findById(id);
    const dateNow = new Date();

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        password: hashedPassword,
        "meta.activities": [
          ...user.meta.activities,
          {
            userId: id,
            type: "changePassword",
            activityRef: "password",
            activityDesc: hashedPassword,
            createdAt: dateNow,
          },
        ],
        "date.lastActivity": dateNow,
      },
      { useFindAndModify: false, new: true }
    );

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try sending form again.",
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { id, proPic, firstName, lastName } = req.body;

    const user = await UserModel.findById(id);

    const dateNow = new Date();

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        proPic,
        "name.firstName": firstName,
        "name.lastName": lastName,
        "meta.activities": [
          ...user.meta.activities,
          {
            userId: id,
            type: "updateProfile",
            activityRef: "name",
            activityDesc: `${firstName} ${lastName}`,
            createdAt: dateNow,
          },
        ],
        "date.lastActivity": dateNow,
      },
      { useFindAndModify: false, new: true }
    );

    if (user.name.firstName !== firstName || user.name.lastName !== lastName) {
      await ReviewModel.updateMany(
        { "ref.user": id },
        { $set: { creator: `${firstName} ${lastName}` } }
      );
      await CommentModel.updateMany(
        { "ref.user": id },
        { $set: { creator: `${firstName} ${lastName}` } }
      );
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong, try sending form again.",
    });
  }
};

const signIn = async (req, res) => {
  try {
    const { mobile, password } = req.body;
    // console.log(req.body);
    const convertedMobile = parseInt(mobile);

    const userExist = await UserModel.findOne({ mobile: convertedMobile });

    if (!userExist)
      return res
        .status(404)
        .json({ message: "Please subscribe to our service." });

    if (
      userExist.status.subscriptionStatus === 0 &&
      userExist.status.accountStatus === 0
    )
      return res
        .status(400)
        .json({ message: "Please subscribe to our service." });

    if (
      userExist.status.subscriptionStatus === 0 &&
      userExist.status.accountStatus === 2
    )
      return res
        .status(400)
        .json({ message: "Please subscribe to our service." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials." });

    const userUpdatedSignIn = await UserModel.findByIdAndUpdate(
      userExist._id,
      { "date.lastSignIn": new Date() },
      { useFindAndModify: false, new: true }
    );
    const token = jwt.sign(
      {
        mobile: userUpdatedSignIn.mobile,
        id: userUpdatedSignIn._id,
        accountType: userUpdatedSignIn.accountType,
        lastSignIn: userUpdatedSignIn.date.lastSignIn,
      },
      process.env.SECRET
    );

    res.status(200).json({ user: userUpdatedSignIn, token });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

const signUp = async (req, res) => {
  try {
    const { mobile, firstName, lastName, email, confirmPassword } = req.body;
    const convertedMobile = parseInt(mobile);

    // not registered
    const mobileExistNotSub = await UserModel.findOne({
      mobile: convertedMobile,
    });

    if (!mobileExistNotSub)
      return res.status(400).json({
        key: "mobile",
        message: "Please subscribe to our service.",
      });

    // registered and have signed up but is unsubscribed
    const mobileExistPrevUserNotSub = await UserModel.findOne({
      mobile: convertedMobile,
      "status.subscriptionStatus": 0,
      "status.accountStatus": 2,
    });

    if (mobileExistPrevUserNotSub)
      return res.status(400).json({
        key: "mobile",
        message: "Mobile number is not subscribe to our service.",
      });
    // active user
    const mobileExistHaveSub = await UserModel.findOne({
      mobile: convertedMobile,
      "status.subscriptionStatus": 1,
      "status.accountStatus": 1,
    });

    if (mobileExistHaveSub)
      return res
        .status(400)
        .json({ key: "mobile", message: "Mobile number already in use." });

    const emailExist = await UserModel.findOne({
      email: email,
    });

    if (emailExist)
      return res
        .status(400)
        .json({ key: "email", message: "Email already in use." });

    const hashedPassword = await bcrypt.hash(confirmPassword, 12);

    const accountId = Math.floor(
      Math.random() * (10000000 - 99999999 + 1) + 99999999
    );

    const updatedAccount = await UserModel.findOneAndUpdate(
      { mobile: convertedMobile },
      {
        "name.firstName": firstName,
        "name.lastName": lastName,
        email: email,
        password: hashedPassword,
        accountId: accountId,
        "status.accountStatus": 1,
        "date.signUp": new Date(),
      },
      { useFindAndModify: false, new: true }
    );

    if (updatedAccount) res.status(200).json({ message: "success" });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something ent wrong, try sending form again",
    });
  }
};

const register = async (req, res) => {
  try {
    const { mobile } = req.body;
    const convertedMobile = parseInt(mobile);

    const numberExistHaveSubs = await UserModel.findOne({
      mobile: convertedMobile,
      "status.subscriptionStatus": 1,
    });

    if (numberExistHaveSubs)
      return res.status(400).json({
        message:
          "You are already subscribe to our service. Please proceed in creating your account or Sign in to your account.",
      });

    // users who are previously subscribe to the service but not signed up
    const numberExistNotSubs = await UserModel.findOne({
      mobile: convertedMobile,
      "status.subscriptionStatus": 0,
      "status.accountStatus": 0,
    });
    // send message welcome back and later on when we have the function to unsubscribe, we need to update the subscription date in database
    if (numberExistNotSubs) {
      await UserModel.findOneAndUpdate(
        { mobile: convertedMobile },
        { "status.subscriptionStatus": 1 },
        { useFindAndModify: false }
      );
      return res.status(200).json({
        message:
          "Welcome back to our service! You may proceed in creating your account.",
      });
    }
    // users who are previously subscribe to the service and signed up
    const numberExistPrevUserNotSub = await UserModel.findOne({
      mobile: convertedMobile,
      "status.subscriptionStatus": 0,
      "status.accountStatus": 2,
    });

    if (numberExistPrevUserNotSub) {
      // send message welcome back and later on when we have the function to unsubscribe, we need to update the subscription date in database
      await UserModel.findOneAndUpdate(
        { mobile: convertedMobile },
        {
          "status.subscriptionStatus": 1,
          "status.accountStatus": 1,
          "date.subscribe": new Date(),
        },
        { useFindAndModify: false }
      );

      return res.status(200).json({
        message: "success",
      });
    }

    await UserModel.create({
      name: {
        firstName: "",
        lastName: "",
      },
      proPic: "",
      mobile: convertedMobile,
      password: "",
      email: "",
      status: {
        subscriptionStatus: 1,
        accountStatus: 0,
      },
      accountType: "user",
      receiveUpdate: {
        sms: false,
        email: false,
      },
      meta: {
        downloads: [],
        comments: [],
        activities: [],
      },
      date: {
        subscribe: new Date(),
        unsubscribe: undefined,
        activation: undefined,
        signUp: undefined,
        lastActivity: undefined,
        lastSignIn: undefined,
        lastSignOut: undefined,
      },
    });

    res.status(200).json({
      message:
        "You will receive a confirmation message via SMS. After that you can proceed in creating your account.",
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Application rejected: Something went wrong, try sending form again",
    });
  }
};

module.exports = {
  signIn,
  signUp,
  register,
  updateProfile,
  changePassword,
  updateSettings,
  deactivateAccount,
  getActivities,
  getUserData,
};
