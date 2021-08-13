const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const Admin = require('../models/Admins');



router.post('/add',
    check('username', "Must input a name").notEmpty(),
    // username must be an email
    check('email', "Email must not empty and a valid email").notEmpty().isEmail(),
    // password must be at least 5 chars long
    check('password', "Password should be more than 5 character long").isLength({ min: 5 }),
    check('role', "You must select a role").notEmpty(),
    (req, res, next) => {
        const allErr = new Array();
        const { email, username, role, password } = req.body;
        const valErrs = validationResult(req);
        if (!valErrs.isEmpty()) {
            const errArr = allErr.concat(valErrs.errors);
            return res.status(400).json({ errors: errArr });
        }
        Admin.findOne({ email }, (err, emailResult) => {
            if (err) throw err;
            if (emailResult) {
                allErr.push("Email already exist")
                return res.status(400).json({ errors: allErr });
            } else {
                // SAVE EMAIL 
                bcrypt.genSalt(10, (saltErr, salt) => {
                    bcrypt.hash(password, salt, (hashErr, hash) => {
                        const newAdmin = new Admin({ name: username, email, role, password: hash });
                        newAdmin.save();
                        return res.status(201).json({ admin: newAdmin });
                    });
                });
            }
        });
    });



module.exports = router;