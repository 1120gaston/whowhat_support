const Blog = require('../models/blogModel')
const User = require('../models/userInfoModel')
const DeleteBlog = require("../models/deleteBlogModel")
const errorHandler = require('../helpers/dbErrorHandler')
const formidable = require('formidable')
const fs = require('fs')

const create = async (req, res, next) => {
  const file = req.file.filename
  const postedBy = req.profile
  const { title, description, type } = req.body;
  const blog = await Blog.create({ title, description, type, file, postedBy });
  if (blog) {
    const user = await User.findOne(postedBy._id);
    user.blogNum = user.blogNum + 1;
    await user.save();
    res.json(blog)
  }

}

const postByID = async (req, res, next, id) => {
  try {
    let blog = await Blog.findById(id).populate('postedBy', '_id userName').exec()
    if (!blog)
      return res.status('400').json({
        error: "blog not found"
      })
    req.post = blog
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve use post"
    })
  }
}

const list = async (req, res) => {
  const path = req.path.slice(1)
  try {
    let blogData = await Blog.find().populate('agree', 'path')
    res.json(blogData)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const deleteblog = async (req, res) => {
  try {
    let deletedblogData = await DeleteBlog.find()
    res.json(deletedblogData)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const agreedelte = async (req, res) => {
  const { deleteId } = req.params;
  try {
    let deletedblogData = await DeleteBlog.deleteOne({ _id: deleteId })
    if (deletedblogData.deletedCount === 1) {
      // Fetch all remaining blog posts
      const allBlogs = await DeleteBlog.find();
      res.status(200).json({ message: 'Blog post deleted successfully', blogs: allBlogs });
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
const blogOne = async (req, res) => {
  try {
    res.json(req.post)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const listByUser = async (req, res) => {
  try {
    let blogs = await Blog.find({ postedBy: req.profile._id })
      .populate('energys.postedBy', '_id userName')
      .populate('postedBy', '_id userName')
      .sort('-created')
      .exec()
    res.json(blogs)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove = async (req, res) => {
  let blog = req.post
  try {
    const findblog = await Blog.findOne({ _id: blog._id });
    const deletedblog = await Blog.deleteOne({ _id: blog._id });
    const deletedBy = await User.findOne({ _id: req.body.userId })
    if (deletedBy) {
      deletedBy.price = deletedBy.price + 1;
      await deletedBy.save();
    }
    const UserData = await User.findOne({ _id: findblog.postedBy.toString() })
    if (deletedblog) {
      const comment = req.body.comment
      const deletedUser = deletedBy.fullName
      const price = req.body.price
      const postedUser = UserData.fullName
      const blogId = blog._id
      const { title, description, file, type, agree, viewed, like, postedBy } = findblog;
      await DeleteBlog.create({ blogId, title, description, type, file, agree, viewed, like, postedBy, deletedBy, comment, price, deletedUser, postedUser });
      const user = await User.findOne(deletedblog.postedBy);
      user.blogNum = user.blogNum - 1;
      await user.save();
    }
    if (deletedblog.deletedCount === 1) {
      // Fetch all remaining blog posts
      const allBlogs = await Blog.find();
      res.status(200).json({ message: 'Blog post deleted successfully', blogs: allBlogs });
    } else {
      res.status(404).json({ message: 'Blog post not found' });
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const remove1 = async (req, res) => {
  try {
    let blog = req.post
    let deletedBlog = await Blog.deleteOne({ _id: blog._id });
    if (deletedBlog.deletedCount === 1) {
      const allBlogs = await Blog.find({ agree: false });
      res.status(200).json({ message: 'Blog deleted successfully', blogs: allBlogs });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }

  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const photo = (req, res, next) => {
  res.set("Content-Type", req.post.photo.contentType)
  return res.send(req.post.photo.data)
}

const blogUpdate = async (req, res) => {
  try {
    let blog = await Blog.findByIdAndUpdate(req.body.blogId, { agree: true }, { new: true })
    res.json(blog)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


const isPoster = (req, res, next) => {
  let isPoster = req.post && req.auth && req.post.postedBy._id === req.auth._id
  if (!isPoster) {
    return res.status('403').json({
      error: "User is not authorized"
    })
  }
  next()
}

const like = async (req, res) => {
  const like = await Blog.findById(req.params.id);
  if (like) {
    like.like = like.like + 1;
    const updateLike = await like.save();
    res.status(200).json({
      like: updateLike.like
    })
  } else {
    res.status(400).json({ error: "like not found" });
  }

}

const popBlogs = async (req, res) => {
  try {
    let like = await Blog.find({ agree: true }).sort({ like: -1 }).limit(6)
    res.json(like)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const unlike = async (req, res) => {
  const unlike = await Blog.findById(req.params.id);
  if (unlike) {
    unlike.like = unlike.like - 1;
    const updateunLike = await unlike.save();
    res.status(200).json({
      unlike: updateunLike.like
    })
  } else {
    res.status(400);
    throw new Error("unlike not found");
  }

}
const comment = async (req, res) => {
  let comment = req.body.comment
  comment.postedBy = req.body.userId
  try {
    let result = await Blog.findByIdAndUpdate(req.body.blogId, { $push: { comments: comment } }, { new: true })
      .exec()
    if (result) {
      let blog = await Blog.findById(req.body.blogId)
      res.json(blog)
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const recentDelete = async (req, res) => {
  try {
    let result = await DeleteBlog.find({ agree: true }).sort({ created: -1 }).limit(6)
    res.json(result)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


module.exports = {
  listByUser,
  blogOne,
  list,
  create,
  postByID,
  remove,
  remove1,
  photo,
  blogUpdate,
  isPoster,
  like,
  unlike,
  popBlogs,
  deleteblog,
  agreedelte,
  comment,
  recentDelete
}
