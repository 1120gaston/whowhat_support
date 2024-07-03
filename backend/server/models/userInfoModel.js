const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')

const userInfoSchema = new mongoose.Schema({
    provider: {
        type: String,
    },
    name: String,
    fullName: String,
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    mobile: String,
    file: {
        type: String,
    },
    birthday: {
        type: String,
    },
    gender: {
        type: String,
        default: 'male'
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    zipcode: {
        type: String,
    },
    country: {
        type: String,
    },
    address: {
        type: String,
    },
    link: {
        type: String
    },
    description: {
        type: String
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    // fb
    facebookId: {
        type: String,
        unique: true,
        sparse: true,
    },
    viewed: {
        type: Boolean,
        default: false
    },
    blogNum: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        default: 0
    },
    updated: Date,

    created: {
        type: Date,
        default: Date.now
    },
    isVerified: { type: Boolean, default: false },
    verificationCode: {
        type: String,
        require: true
    },
},
);

userInfoSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
};

// Password hashing before saving into database
//  it's a pre-save hook, which means it will run before saving a document to the database.
// Likewise pre, we can use post for some operations which we want to run after the database operation we perform inside the controller
userInfoSchema.pre('save', async function (next) {
    if (!this.isModified('password')) { //if we are modifying the data without modifying the password then it will do nothing, goes to next middleware or else it will hash the password which is given outside the if block.
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userInfoSchema.methods.generateJWT = function () {
    const token = jwt.sign(
        {
            expiresIn: '12h',
            id: this._id,
            provider: this.provider,
            email: this.email,
        },
        process.env.JWT_SECRET,
    );
    return token;
};


const UserInfo = mongoose.model("UserInfo", userInfoSchema);

module.exports = UserInfo;