const express = require('express')
const userCtrl = require('../controllers/userInfoController')

const router = express.Router()

var upload = require('./uploadRoutes.js')

router.route('/')
    .get(userCtrl.list)
    .post(userCtrl.create)

router.route('/tempInfo')
    .post(userCtrl.createTemp)

router.route('/popUsers')
    .get(userCtrl.popUsers)

router.route('/deleteUser/:userId')
    .delete(userCtrl.remove)

router.route('/photo/:userId')
    .get(userCtrl.photo, userCtrl.defaultPhoto)

router.route('/defaultphoto')
    .get(userCtrl.defaultPhoto)

router.route('/findpeople/:userId')
    .get(userCtrl.requireSignin, userCtrl.findPeople)

router.route('/view/:userId')
    .get(userCtrl.requireSignin, userCtrl.view)
router.route('/:userId')
    .get(userCtrl.requireSignin, userCtrl.read)
    .put(userCtrl.requireSignin, upload.single('file'), userCtrl.update)
    .delete(userCtrl.requireSignin, userCtrl.hasAuthorization, userCtrl.remove)

router.param('userId', userCtrl.userByID)

module.exports = router
