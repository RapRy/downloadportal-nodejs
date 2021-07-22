const UserModel = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    const updatedAccount = await UserModel.findOneAndUpdate(
      { mobile: convertedMobile },
      {
        "name.firstName": firstName,
        "name.lastName": lastName,
        email: email,
        password: hashedPassword,
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
        { "status.subscriptionStatus": 1, "status.accountStatus": 1 },
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
  signUp,
  register,
};
