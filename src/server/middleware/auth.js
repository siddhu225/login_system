const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Admin = require('../models/admin');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'siddhulawyer')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        const admin = await Admin.findOne({ _id: decoded._id, 'tokens.token': token});

        if (!user) {
            throw new Error()
        }

        req.token = token
        if (user) {
            req.user = user;
        } 
        if(admin) {
            req.admin = admin;
        }
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth