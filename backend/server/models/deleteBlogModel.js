const mongoose = require('mongoose');

const DeleteBlogSchema = new mongoose.Schema({
  blogId: {
    type: String,
    require: "blogId is required"
  },
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
  comment: {
    type: String,
    require: "comment is required"
  },
  postedUser: {
    type: String,
    require: "postedUsername is required"
  },
  price: {
    type: Number,
  },
  postedBy: { type: mongoose.Schema.ObjectId, ref: 'UserInfo' },
  deletedUser: {
    type: String,
    require: "deletedUsername is required"
  },
  deletedBy: { type: mongoose.Schema.ObjectId, ref: 'UserInfo' },
  created: {
    type: Date,
    default: Date.now
  }
},
);

const article = mongoose.model("DeleteBlog", DeleteBlogSchema);

module.exports = article;