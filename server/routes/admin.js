const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const formidable = require('formidable');
const csv = require('csvtojson');


const { sendUser, replaceKeys } = require('../utils/helpers');
const { ensureAuth, ensureGuast } = require('../config/auth');

const Admin = require('../models/Admin');
const Event = require('../models/Event');
const Participant = require('../models/Participant');









/* ⛏️⛏️ ALL ROUTES WILL BE PROTECTED EXCEPT LOGIN ROUTE ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.post('/register', ensureAuth,
    check('username', "Must input a name").notEmpty(),
    // username must be an email
    check('email', "Email must not empty and a valid email").notEmpty().isEmail(),
    // password must be at least 5 chars long
    check('password', "Password should be more than 5 character long").isLength({ min: 5 }),
    // check('role', "You must select a role").notEmpty(),
    (req, res, next) => {
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
                        const newAdmin = new Admin({ name: username, email, role, password: hash });
                        newAdmin.save();
                        return res.status(201).json({ admin: newAdmin });
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
router.get('/logout', (req, res) => {
    req.session.destroy(null);
    req.logout();
    console.log(req.user);
    res.status(200).json({ user: null });
});






/* ⛏️⛏️ LIST ALL ADMINS, EVENTS, PARTICIPANTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.get('/dashboard', ensureAuth, (req, res, next) => {
    res.status(200).json({ user: sendUser(req.user) });
});



/* ⛏️⛏️ CREATE AN EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.post('/dashboard/event', ensureAuth,
    check('title', "Title must not empty and a valid email").notEmpty(),
    (req, res, next) => {
        const valErrs = validationResult(req);
        if (!valErrs.isEmpty()) {
            return res.status(400).json({ errors: valErrs.errors });
        } else {
            // console.log(req.body);
            Event.create({
                title: req.body.title,
                date: req.body.date,
            }, (err, docs) => {
                res.status(200).json({ request: 'Success', event: docs });
                // console.log(docs);
            });
        }
    });


/* ⛏️⛏️ DELETE AN EVENT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.delete('/dashboard/event/:id', ensureAuth, async (req, res, next) => {
    const event = await Event.findByIdAndDelete({ _id: req.params.id });
    const participant = await Participant.deleteMany({ _id: { $in: event.participants } });
    res.status(200).json({ msg: 'Event deleted', event, participant });
});








// firstname,lastname,email,cell,birthdate,city
/* ⛏️⛏️ CREATE PARTICIPANT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.post('/dashboard/participant', ensureAuth, check('eventID', "Need to select an Event").notEmpty(), check('firstname', "Firstname must not empty").notEmpty(), async (req, res, next) => {
    const valErrs = validationResult(req);
    const { firstname, lastname, email, cell, birthdate, city, eventID } = req.body;
    if (!valErrs.isEmpty()) {
        return res.status(400).json({ errors: valErrs.errors });
    } else {
        try {
            const newParticipant = new Participant({
                firstname,
                lastname,
                email,
                cell,
                birthdate,
                city,
                event: eventID
            });
            const participant = await newParticipant.save();
            const event = await Event.findByIdAndUpdate({ _id: eventID }, { $push: { participants: participant._id } }, { new: true });
            res.status(200).json({ msg: 'Create partipipant and referancing to event', participant, event });
        } catch (error) {
            res.json(error);
        }
    }
});



/* ⛏️⛏️ CREATE MULTIPLE PARTICIPANT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.post('/dashboard/many-participant', (req, res, next) => {


    const form = formidable({ multiples: false });

    form.parse(req, (err, fields, files) => {
        if (err) {
            next(err);
            return;
        }

        csv()
            .fromFile(files.file.path)
            .then((jsonObj) => {
                /**
                 * [
                 * 	{a:"1", b:"2", c:"3"},
                 * 	{a:"4", b:"5". c:"6"}
                 * ]
                 */
                const newParticipant = [];
                for (let obj of jsonObj) {
                    newParticipant.push(replaceKeys(obj, fields.eventID));
                }

                // Function call
                Participant.insertMany(newParticipant).then(function (participant) {
                    // console.log("Data inserted", participant)  // Success
                    participant.forEach((p, i) => {
                        Event.findByIdAndUpdate({ _id: fields.eventID }, { $push: { participants: p._id } }, { new: true }).then((data) => {
                            // console.log(data);
                        }).catch(eventErr => {
                            console.log(eventErr);
                        });
                    })
                    res.json({ eventID: fields.eventID , files: participant });
                }).catch(function (error) {
                    console.log(error)      // Failure
                });
            });

    });

    // const newParticipant = new Participant({
    //     name: name,
    //     address: address
    // });
    // const participant = await newParticipant.save();
    // const event = await Event.findByIdAndUpdate({ _id: eventID }, { $push: { participants: participant._id } }, { new: true });
    // res.status(200).json({ msg: 'Create partipipant and referancing to event', participant, event });
});




// doc.subdocs.push({ _id: 4815162342 })
// doc.subdocs.pull({ _id: 4815162342 }) // removed
/* ⛏️⛏️ DELETE PARTICIPANT ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.delete('/dashboard/participant/:id', async (req, res, next) => {
    try {
        const participant = await Participant.findByIdAndDelete({ _id: req.params.id });
        // { $pull: { templates: { _id: templateid } } },
        const event = await Event.findOneAndUpdate({ participants: participant._id }, { $pull: { participants: participant._id } }, { new: true });
        res.status(200).json({ request: 'Deleted', participant, event });
    } catch (error) {
        res.json(error)
    }
});


/* ⛏️⛏️ UPDATE EVENTS OR ADD PARTICIPANTS TO AN EVENTS ➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖  */
router.get('/dashboard/participant', async (req, res, next) => {
    try {
        const participant = await Participant.find();
        res.status(200).json({ participant });
    } catch (error) {
        res.json(error);
    }
});









module.exports = router;