const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const router = express.Router();

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
            return req.body.password == user.password;
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
                { expiresIn: '2h' }
            );
            res.status(200).json({
                token: token
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Auth failed!'
            });
        });
});

module.exports = router;