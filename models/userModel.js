const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const userActivities = new Schema({
  userId: String,
  type: String,
  activityRef: String,
  activityDesc: String,
  createdAt: Date,
});
const userSchema = new Schema({
  name: {
    firstName: String,
    lastName: String,
  },
  proPic: String,
  mobile: Number,
  password: String,
  email: String,
  status: {
    subscriptionStatus: Number,
    // 2 levels of subscription status, 0: not subscribe, 1: subscribed
    accountStatus: Number,
    // 3 levels of account status, 0: not active, 1: active, 2: user data stored in database but it is not subscribe
  },
  accountId: Number,
  accountType: String,
  receiveUpdate: {
    sms: Boolean,
    email: Boolean,
  },
  meta: {
    downloads: [String],
    reviews: [String],
    comments: [String],
    activities: [userActivities],
  },
  date: {
    subscribe: Date,
    unsubscribe: Date,
    activation: Date,
    signUp: Date,
    lastActivity: Date,
    lastSignIn: Date,
  },
});

const User = model("user", userSchema);

module.exports = User;
