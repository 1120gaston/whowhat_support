const User = require('../models/userInfoModel')
const Blog = require('../models/blogModel')
const DeletedBlog = require('../models/deleteBlogModel')
const { config } = require('../config/db')

const list = async (req, res) => {

  try {
    let allUsers = await (await User.find()).length
    let allBlogs = (await Blog.find()).length
    let newBlogs = (await User.find({ agree: false })).length
    let allPrice = await DeletedBlog.find()
    const totalCost = allPrice.reduce((acc, blog) => acc + blog.price, 0);

    res.json({ allUsers, allBlogs, newBlogs, totalCost })
  } catch (err) {
    return res.status(400).json({
      error: err
    })
  }
}

module.exports = { list }