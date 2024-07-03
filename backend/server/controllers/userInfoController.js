const User = require('../models/userInfoModel')
const Temp = require('../models/tempInfo')
const Blog = require('../models/blogModel')
const extend = require('lodash/extend')
const errorHandler = require('../helpers/dbErrorHandler')
const generateToken = require('../utils/generateTokens')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')
const expressJwt = require('express-jwt')
const { config } = require('../config/db')


const create = async (req, res) => {
  try {
    const user = new User(req.body)
    user.provider = 'email'
    const { email } = req.body
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(200).json({ error: "User already exists" });
    } else {
      await user.save()
      return res.status(200).json({
        message: "Successfully signed up!"
      })
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
const createTemp = async (req, res) => {
  try {
    const user = new Temp(req.body)
    user.provider = 'email'
    await user.save()
    return res.status(200).json({
      message: "Successfully signed up!"
    })
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}
const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    // Generate JWT tokens
    let token = generateToken(res, user._id);
    res.status(200).json({
      token,
      message: "Logged in successfully",
      id: user._id
    });
  } else {
    return res.status(200).json({
      error: "Invalid email or password"
    })
  }
};

const signGoogle = async (req, res) => {
  try {
    const user = new User(req.body)
    let token = generateToken(res, user._id);
    const { email } = req.body
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(200).json({ error: "User already exists", token, id: userExists._id });
    } else {
      await user.save()
      return res.status(200).json({
        message: "Successfully signed up!",
        token,
        id: user._id
      })
    }
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
};

const signout = async (req, res) => {
  // Destroying jwt token from te cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
};

const requireSignin = expressJwt({
  secret: config.jwtSecret,
  userProperty: 'auth'
})

// defining admin middleware
const hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id.toString() === req.auth._id.toString()
  if (authorized) {
    next();
  } else {
    return res.status(401).json({
      error: "Not authorized as admin"
    })
  }
};

const userByID = async (req, res, next, id) => {
  try {
    let user = await User.findById(id)
    if (!user)
      return res.status('400').json({
        error: "User not foud"
      })
    req.profile = user
    next()
  } catch (err) {
    return res.status('400').json({
      error: "Could not retrieve user"
    })
  }
}

const read = async (req, res) => {
  return res.json(req.profile)
}

const view = async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(req.profile._id, { 'viewed': true })
    if (user) {
      return res.json(req.profile)
    }
  } catch (err) {
    res.status(401).json({
      error: err
    })
  }
}
const list = async (req, res) => {
  try {
    let users = await User.find()
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const popUsers = async (req, res) => {
  try {
    let users = await User.find().sort({ blogNum: -1 }).limit(6)
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const update = async (req, res) => {
  // let form = new formidable.IncomingForm()
  // form.keepExtensions = true
  // form.parse(req, async (err, fields, files) => {
  //   if (err) {
  //     return res.status(400).json({
  //       error: "Photo could not be uploaded"
  //     })
  //   }
  //   const ensureSingleValueFields = (fields) => {
  //     for (const key in fields) {
  //       if (Array.isArray(fields[key])) {
  //         fields[key] = fields[key][0];
  //       }
  //     }
  //   };
  //   ensureSingleValueFields(fields);
  //   let user = req.profile
  //   user = extend(user, fields)
  //   user.updated = Date.now()
  //   if (files.photo) {
  //     user.photo.data = fs.readFileSync(files.photo[0].filepath)
  //     user.photo.contentType = files.photo[0].mimetype
  //   }
  //   try {
  //     await user.save()
  //     res.json(user)
  //   } catch (err) {
  //     return res.status(400).json({
  //       error: errorHandler.getErrorMessage(err)
  //     })
  //   }
  // })
  const userInfo = await User.findById(req.profile._id);
  if (userInfo) {
    userInfo.fullName = req.body.fullName || userInfo.fullName;
    userInfo.file = req.file && req.file.filename || userInfo.file;
    userInfo.provider = req.body.provider || userInfo.provider;
    userInfo.birthday = req.body.birthday || userInfo.birthday;
    userInfo.city = req.body.city || userInfo.city;
    userInfo.email = req.body.email || userInfo.email;
    userInfo.state = req.body.state || userInfo.state;
    userInfo.zipcode = req.body.zipcode || userInfo.zipcode;
    userInfo.country = req.body.country || userInfo.country;
    userInfo.address = req.body.address || userInfo.address;
    userInfo.gender = req.body.gender || userInfo.gender;
    userInfo.link = req.body.link;
    userInfo.description = req.body.description;

    const updatedUserInfo = await userInfo.save();
    res.status(200).json({
      message: "successfully updated"
    });
  } else {
    res.status(404).json({ error: "update error" });
  }
}

const remove = async (req, res) => {
  try {
    let user = req.profile
    let deletedUser = await User.deleteOne({ _id: user._id });
    await Blog.deleteMany({ postedBy: user._id });
    if (deletedUser.deletedCount === 1) {
      const allUsers = await User.find();
      res.status(200).json({ message: 'User deleted successfully', users: allUsers });
    } else {
      res.status(404).json({ message: 'User not found' });
    }

  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}

const photo = (req, res, next) => {
  if (req.profile.photo.data) {
    res.set("Content-Type", req.profile.photo.contentType)
    return res.send(req.profile.photo.data)
  }
  next()
}

const defaultPhoto = (req, res) => {
  const imagePath = path.join(__dirname, 'avatar.png');
  fs.readFile(imagePath, (err, data) => {
    if (err) {
      res.status(500).send('Error retrieving image');
      return;
    }

    res.set('Content-Type', 'image/png');
    return res.send(data);
  });
}

const findPeople = async (req, res) => {
  let following = req.profile.following
  following.push(req.profile._id)
  try {
    let users = await User.find({ _id: { $nin: following } }).select('name')
    res.json(users)
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    })
  }
}


module.exports = {
  create,
  createTemp,
  userByID,
  read,
  list,
  remove,
  update,
  photo,
  defaultPhoto,
  signin,
  signout,
  requireSignin,
  hasAuthorization,
  findPeople,
  view,
  popUsers,
  signGoogle
}
