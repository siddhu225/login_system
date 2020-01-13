const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    number: {
        type: Number,
        required: true,
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
    tokens: {
        type: Array
    }
}, {
    timestamps: true
});

adminSchema.statics.findByCredentials = async (email, password) => {
    const admin = await Admin.findOne({ email })
    console.log('admin', admin);
    if ( admin === null) {
        return null
    }

    const isMatch = await bcrypt.compare(password, admin.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return admin
};

adminSchema.pre('save', async function (next) {
    const admin = this;

    if (admin.isModified('password')) {
        console.log('password hash', bcrypt.hash(admin.password, 8))
        admin.password = await bcrypt.hash(admin.password, 8)
    }

    next()
});

adminSchema.methods.generateAuthToken = async function() {
    const admin = this;

    const token = await jwt.sign({_id: admin._id.toString()}, 'siddhulawyer');

    await admin.tokens.push(token);
    await admin.save();

    return token;
};

const Admin = mongoose.model('admin', adminSchema)

module.exports = Admin