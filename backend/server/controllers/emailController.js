const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const TempUser = require('../models/tempInfo');
const User = require('../models/userInfoModel');

const sendEmail = async (req, res) => {
    const data = req.body;
    let user = await User.findOne({ email: data.email });
    let verificationCode = Math.floor(1000 + Math.random() * 9000);
    if (user) {
        return res.status(200).json({ error: 'User already exists' });
    } else {

        let transporter = nodemailer.createTransport({
            service: 'Outlook',
            auth: {
                user: 'test.senior.dev@outlook.com',
                pass: 'qqq123www123'
            }
        });

        let mailOptions = {
            from: 'test.senior.dev@outlook.com',
            to: data.email,
            subject: 'Email Verification',
            text: `Your verification code is: ${verificationCode}`
        };
        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                res.json("err")
            } else {
                try {
                    let user = await TempUser.findOne({ email: data.email });
                    if (user) {
                        user.verificationCode = verificationCode
                        await user.save()
                        return res.status(200).json({ message: 'Please email verify', email: data.email });
                    } else {
                        const user = new TempUser(data)
                        user.provider = 'email'
                        user.verificationCode = verificationCode
                        await user.save()
                        return res.status(200).json({
                            message: "Please email verify!",
                            email: data.email
                        })
                    }
                } catch (err) {
                    return res.status(200).json({
                        err: err
                    })
                }
            }
        });
    }
};


const verifyEmail = async (req, res) => {
    const { email, code } = req.body;

    try {
        // Find user by email and verification code
        const tempInfo = await TempUser.findOne({ email, verificationCode: code });

        if (!tempInfo) {
            return res.status(400).json({ error: 'Invalid verification code' });
        }

        // Update user as verified
        const user = new User();
        user.email = tempInfo.email;
        user.gender = tempInfo.gender;
        user.provider = tempInfo.provider;
        user.password = tempInfo.password;
        user.fullName = tempInfo.fullName;
        user.mobile = tempInfo.mobile;
        user.city = tempInfo.city;
        user.state = tempInfo.state;
        user.zipcode = tempInfo.zipcode;
        user.country = tempInfo.country;
        user.address = tempInfo.address;
        user.isVerified = true;
        user.link = tempInfo.link;
        user.verificationCode = undefined; // Optional: Clear the code after verification
        await user.save();
        await TempUser.deleteMany({})

        res.status(200).send('Email verified successfully');
    } catch (err) {
        res.status(500).send('Server Error');
    }
};


module.exports = { sendEmail, verifyEmail };