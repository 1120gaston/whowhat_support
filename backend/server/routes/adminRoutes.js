const express = require('express')
const adminCtrl = require('../controllers/adminController')

const router = express.Router()

router.route('/')
  .get(adminCtrl.list)

module.exports = router
