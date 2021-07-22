const mongoose = require("mongoose");
const { Schema, model } = mongoose;
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
    comments: [String],
    activities: [String],
  },
  date: {
    subscribe: Date,
    unsubscribe: Date,
    activation: Date,
    signUp: Date,
    lastActivity: Date,
    lastSignIn: Date,
    lastSignOut: Date,
  },
});

const User = model("user", userSchema);

module.exports = User;
