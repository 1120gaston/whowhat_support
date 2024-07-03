const express = require('express')
const userCtrl = require('../controllers/userInfoController')
const blogCtrl = require('../controllers/blogController')

const router = express.Router()

var upload = require('./uploadRoutes.js')

router.route('/new/:userId')
    .post(userCtrl.requireSignin, upload.single('file'), blogCtrl.create)

router.route('/popBlogs')
    .get(blogCtrl.popBlogs)

router.route('/:agree')
    .post(blogCtrl.list)
router.route('/deletedblog')
    .get(blogCtrl.deleteblog)
router.route('/photo/:postId')
    .get(blogCtrl.photo)


router.route('/agree/:userId')
    .get(blogCtrl.listByUser)

router.route('/deletedBlog/:deleteId')
    .delete(blogCtrl.agreedelte)

router.route('/deletedBlog/recent')
    .get(blogCtrl.recentDelete)

router.route('/blogUpdate')
    .put(blogCtrl.blogUpdate)

router.route('/:id/like').put(blogCtrl.like);
router.route('/:id/unlike').put(blogCtrl.unlike);

router.route('/:postId')
    .delete(blogCtrl.remove)
    .get(blogCtrl.blogOne)

router.route('/admin/:postId')
    .delete(blogCtrl.remove1)

router.route('/comment')
    .put(blogCtrl.comment)

router.param('userId', userCtrl.userByID)
router.param('postId', blogCtrl.postByID)



module.exports = router
