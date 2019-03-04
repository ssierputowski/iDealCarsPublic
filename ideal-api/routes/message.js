const express = require('express');
const webpush = require('web-push');

const Message = require('../models/message');

const router = express.Router();

const fakeDatabase = [];

router.post('', (req, res, next) => {
    const message = new Message({
        message: req.body.message,
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

router.post('/subscription', (req, res, next) => {
    const subscription = req.body;
    fakeDatabase.push(subscription);
});

router.post('/sendNotification', (req, res, next) => {
    const notificationPayload = {
        notification: {
            title: 'New notification',
            body: 'This is the body of the notification',
            icon: '../userImages/testimage.jpg-1551372297569.jpg'
        }
    };

    const promises = [];
    fakeDatabase.forEach(subscription => {
        promises.push(webpush.sendNotification(
            subscription,
            JSON.stringify(notificationPayload)
        ));
    });
    Promise.all(promises).then(() => res.sendStatus(200));
});

router.get('', (req, res, next) => {
    const messageQuery = Message.find();
    messageQuery.then(messages => {
        res.status(200).json({
            response: 'Messages fetched successfully',
            messages: messages,
        });
    });
});

module.exports = router;