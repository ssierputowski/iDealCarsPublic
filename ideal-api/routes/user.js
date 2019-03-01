const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Schedule = require('../models/schedule');

const router = express.Router();

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, 'userImages');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});

router.post(
    '/register',
    multer({ storage: storage }).single('image'),
    (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const url = req.protocol + '://' + req.get('host');
            const user = new User({
                username: req.body.username,
                password: hash,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailAddress: req.body.email,
                phoneNumber: req.body.phoneNumber,
                jobRole: req.body.jobRole,
                image: url + '/userImages/' + req.file.filename
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'Employee added!',
                        result: result
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
        });
});

router.post('/login', (req, res, next) => {
    let user;
    User.findOne({ username: req.body.username })
        .then(data => {
            if (!data) {
                return res.status(401).json({
                    message: 'Auth failed!'
                });
            }
            user = data;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Auth failed!'
                });
            } 
            const token = jwt.sign(
                { username: user.username, userId: user._id },
                process.env.JWT_KEY,
                { expiresIn: '1h' }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: user._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Auth failed!'
            });
        });
});

router.get('', (req, res, next) => {
    const userQuery = User.find();
    userQuery.then(users => {
        res.status(200).json({
            message: 'Users fetched successfully',
            users: users,
        });
    });
});

router.get('/:id', (req, res, next) => {
    User.findOne({ _id: req.params.id })
        .then(user => {
            if (user) {
                return res.status(200).json(user);
            } else {
                return res.status(404).json({
                    message: 'User not found'
                });
            }
        });
});

router.get('/schedule/:id', (req, res, next) => {
    Schedule.findOne({ employeeId: req.params.id })
        .then(schedule => {
            if (schedule) {
                return res.status(200).json(schedule);
            } else {
                return res.status(404).json({
                    message: 'Schedule not found'
                });
            }
        });
});

router.post('/schedule', (req, res, next) => {
    const schedule = new Schedule({
        employeeId: req.body.employeeId,
        schedule: {
            weekOf: req.body.weekOf,
            sunday: {
                timeIn: req.body.sunIn,
                timeOut: req.body.sunOut
            },
            monday: {
                timeIn: req.body.monIn,
                timeOut: req.body.monOut
            },
            tuesday: {
                timeIn: req.body.tueIn,
                timeOut: req.body.tueOut
            },
            wednesday: {
                timeIn: req.body.wedIn,
                timeOut: req.body.wedOut
            },
            thursday: {
                timeIn: req.body.thuIn,
                timeOut: req.body.thuOut
            },
            friday: {
                timeIn: req.body.friIn,
                timeOut: req.body.friOut
            },
            saturday: {
                timeIn: req.body.satIn,
                timeOut: req.body.satOut
            },
        }
    });
    schedule.save().then(newSchedule => {
        res.status(201).json({
            message: 'Schedule created!',
            schedule: {
                ...newSchedule,
                id: newSchedule._id,
            }
        });
    });
});

module.exports = router;