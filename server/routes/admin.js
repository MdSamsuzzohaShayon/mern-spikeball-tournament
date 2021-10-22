const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');



const { sendUser, replaceKeys } = require('../utils/helpers');
const { ensureAuth, ensureGuast } = require('../config/auth');

const Admin = require('../models/Admin');
const Event = require('../models/Event');












/* ⛏️⛏️ ALL ROUTES WILL BE PROTECTED EXCEPT LOGIN ROUTE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.post('/register', 
    check('username', "Must input a name").notEmpty(),
    // username must be an email
    check('email', "Email must not empty and a valid email").notEmpty().isEmail(),
    // password must be at least 5 chars long
    check('password', "Password should be more than 5 character long").isLength({ min: 5 }),
    // check('role', "You must select a role").notEmpty(),
    (req, res, next) => {
        console.log("Hit");
        const allErr = new Array();
        const { email, username, password } = req.body;
        const role = "general";
        const valErrs = validationResult(req);
        if (!valErrs.isEmpty()) {
            const errArr = allErr.concat(valErrs.errors);
            return res.status(400).json({ errors: errArr });
        }
        Admin.findOne({ email }, (err, emailResult) => {
            if (err) throw err;
            if (emailResult) {
                allErr.push({ msg: "Email already exist" })
                return res.status(400).json({ errors: allErr });
            } else {
                // SAVE ADMIN 
                bcrypt.genSalt(10, (saltErr, salt) => {
                    bcrypt.hash(password, salt, (hashErr, hash) => {
                        // const newAdmin = new Admin({ name: username, email, role, password: hash });
                        // newAdmin.save();
                        console.log(username, email, role, password, hash);
                        Admin.create({name: username, email, role, password: hash},(err, docs)=>{
                            if(err) throw err;
                            return res.status(201).json({ admin: docs });
                        })
                    });
                });
            }
        });
    });







/* ⛏️⛏️ LOGIN USERS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.post('/login',
    passport.authenticate('local'),
    function (req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        // console.log("User - ", req.user);
        res.status(200).json({ user: sendUser(req.user) });
    });


/* ⛏️⛏️ LOGOUT USERS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.get('/logout', ensureAuth, (req, res) => {
    req.session.destroy(null);
    req.logout();
    // console.log(req.user);
    res.status(200).json({ user: null });
});






/* ⛏️⛏️ LIST ALL ADMINS, EVENTS, PARTICIPANTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.get('/dashboard', ensureAuth, (req, res, next) => {
    res.status(200).json({ user: sendUser(req.user) });
});









module.exports = router;