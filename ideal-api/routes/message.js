const express = require('express');

const Message = require('../models/message');

const router = express.Router();

router.post('', (req, res, next) => {
    const message = new Message({
        creator: req.body.creator,
        date: req.body.date,
        content: req.body.content
    });
    message.save().then(newMessage => {
        res.status(201).json({
            response: 'Message posted successfully',
            message: {
                ...newMessage,
                id: newMessage._id,
            }
        });
    });
});

router.get('', (req, res, next) => {
    const messageQuery = Message.find();
    messageQuery.then(messages => {
        res.status(200).send(messages);
    });
});

module.exports = router;