const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const tempInfoSchema = new mongoose.Schema({
    provider: {
        type: String,
    },
    fullName: String,
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobile: String,
    file: {
        type: String,
    },
    birthday: {
        type: String,
    },
    gender: {
        type: String,
        default: 'male'
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipcode: {
        type: String,
    },
    country: {
        type: String,
    },
    address: {
        type: String,
    },
    link: {
        type: String
    },
    description: {
        type: String
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    // fb
    facebookId: {
        type: String,
        unique: true,
        sparse: true,
    },
    viewed: {
        type: Boolean,
        default: false
    },
    blogNum: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    updated: Date,

    created: {
        type: Date,
        default: Date.now
    },
    isVerified: { type: Boolean, default: false },
    verificationCode: {
        type: String,
        require: true
    },
},
);


const TempInfo = mongoose.model("TempInfo", tempInfoSchema);

module.exports = TempInfo;