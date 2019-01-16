const express = require('express');
const router = express.Router();
const User = require('../models/user');
const loginMiddleware =  require('../middlewares/loginMiddleware');

router.get('/game', loginMiddleware, (req, res, next) => {
    return res.sendFile('game.html', { root: "./client/"});
});

router.post('/signUp',  (req, res, next) => {

    if (req.body.email &&
        req.body.username &&
        req.body.password ) {

        let userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        }

        User.create(userData, (error, user) => {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/game');
            }
        });
    } else {
        let err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

router.post('/signIn', (req, res, next) => {
    if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, (error, user) => {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {

                req.session.userId = user._id;
                return res.redirect('/game');
            }
        });
    }
    else {
        let err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
});

router.get('/logOut', (req, res, next) => {
    if (req.session) {
        req.session.destroy((err) => {
            if(err) {
                return next(err);
            } else {
                console.log("redireccionate",res);
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;
