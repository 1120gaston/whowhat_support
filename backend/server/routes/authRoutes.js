const express = require('express');
const userCtrl = require('../controllers/userInfoController');
const passport = require('passport');

const router = express.Router();

router.route('/signin').post(userCtrl.signin);
router.route('/signin/google').post(userCtrl.signGoogle);
router.route('/signout').post(userCtrl.signout);

// Google OAuth routes
// router.route('/google')
//   .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

// router.route('/google/callback')
//   .get(
//     passport.authenticate('google', {
//       failureRedirect: 'http://localhost:3000/login',
//       session: false,  // Set to true if using session-based authentication
//     }),
//     (req, res) => {
//       console.log("Google Authentication Successful");
//       const token = req.user.generateJWT();
//       res.cookie('x-auth-cookie', token);
//       res.redirect('/');  // Redirect to the dashboard or another secure route
//     }
//   );

// Facebook OAuth routes
router.route('/facebook')
  .get(passport.authenticate('facebook', { scope: ['public_profile', 'email'] }));

router.route('/facebook/callback')
  .get(
    passport.authenticate('facebook', {
      failureRedirect: '/',
      session: false,  // Set to true if using session-based authentication
    }),
    (req, res) => {
      console.log("Facebook Authentication Successful");
      const token = req.user.generateJWT();
      res.cookie('x-auth-cookie', token);
      res.redirect('/');  // Redirect to the dashboard or another secure route
    }
  );

module.exports = router;
