const express = require('express');
const router = express.Router();
const passport = require('../passport.config');
const User = require('../models/user');

router.post('/login', function(req, res, next) {
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: (!req.query.redirect || req.query.redirect == "undefined") ? '/' : req.query.redirect
    })(req, res, next);
});

router.post('/register', async (req, res) => {
    try{
        await User.register({username: req.body.username, password: req.body.password});
        mailer.notifyRegistration(req.body.username);
        res.redirect('/');
    }
    catch(e){
        res.status(400);
        res.json({ status: e.toString() });
    }
});

module.exports = router;
