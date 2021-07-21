const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const userSchema = new Schema({
    name: {
        firstName: String,
        lastName: String
    },
    proPic: String,
    mobile: Number,
    password: String,
    email: String,
    status: {
        subscriptionStatus: Number,
        accountStatus: Number,
    },
    accountType: String,
    receiveUpdate: {
        sms: Boolean,
        email: Boolean      
    },
    meta: {
        downloads: [String],
        comments: [String],
        activities: [String]
    },
    date: {
        subscribe: Date,
        unsubscribe: Date,
        activation: Date,
        signUp: Date,
        lastActivity: Date,
        lastSignIn: Date,
        lastSignOut: Date
    }
});

const User = model('user', userSchema);

module.exports = User;