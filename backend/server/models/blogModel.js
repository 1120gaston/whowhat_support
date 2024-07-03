const mongoose = require('mongoose');

const prayerSchema = new mongoose.Schema({
    title: {
        type: String,
        require: 'Title is required'
    },
    description: {
        type: String,
        require: 'Description is required'
    },
    file: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: 'Type is required'
    },
    agree: {
        type: Boolean,
        default: false,
    },
    viewed: {
        type: Boolean,
        default: false
    },
    like: {
        type: Number,
        default: 0
    },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'UserInfo' },
    created: {
        type: Date,
        default: Date.now
    },
    comments: [{
        feed: String,
        userName: String,
        subject: String,
        file: String,
        created: { type: Date, default: Date.now },
        postedBy: { type: mongoose.Schema.ObjectId, ref: 'UserInfo' },
    }],
},
);

const article = mongoose.model("Article", prayerSchema);

module.exports = article;