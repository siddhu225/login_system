const express = require('express')
const User = require('../models/user')
const Admin = require('../models/admin')
const auth = require('../middleware/auth')
const Router = express.Router();



Router.get('/users', async(req,res,next) => {
    try{
        User.find({}, (err, users) => {
            if(err){
                res.status(400).send(err);
            }
            res.status(200).send({ users });
        })
    } catch(e) {
        res.status(400).send() 
    }
});

Router.delete('/delete/user/:id', async(req,res,next) => {
    try {
        const user = await User.findByIdAndDelete({_id: req.params.id});
        res.status(201).send({msg: 'success'});
    } catch(e) {
        res.status(400).send(e)
    }
});

Router.post('/login', async(req,res,next) => {
    
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const admin = await Admin.findByCredentials(req.body.email, req.body.password);
        
        if (user !== null) {
            let token = await user.generateAuthToken()
            res.status(200).send({ user, token, msg:'user' })
        } else if (admin !== null) {
            let token = await admin.generateAuthToken()
            res.status(200).send({ admin, token, msg:'admin' })
        } else {
            res.status(400).send({error: 'no user exist', msg: 'not_user'})
        }
    } catch(e) {
        res.status(400).send(e)
    }
})

Router.post('/signup', async(req,res,next) => {
    const admin = new Admin(req.body);
    try {
        await admin.save();
        const token = await admin.generateAuthToken();
        res.status(201).send({ admin,token });
    } catch(e) {
        res.status(400).send(e)
    }
});

Router.post('/user_signup', async(req,res,next) => {
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user,token });
    } catch(e) {
        res.status(400).send(e);
    }
})

module.exports = Router