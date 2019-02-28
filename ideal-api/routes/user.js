const express = require('express');
const multer = require('multer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

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

module.exports = router;