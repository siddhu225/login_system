const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        required: true,
    },
    designation: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    reportsto: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
    },
    tokens: {
        type: Array
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    const user = this;

    if (user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
});

userSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = await jwt.sign({_id: user._id.toString()}, 'siddhulawyer');

    await user.tokens.push(token);
    await user.save();

    return token;
};

userSchema.statics.findByCredentials = async (email, password) => {
    console.log('coimg here')
    const user = await User.findOne({ email })

    console.log('user', user);
    if (user === null) {
        return null
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

const User = mongoose.model('user', userSchema)

module.exports = User

