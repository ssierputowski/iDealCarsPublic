const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    message: { type: String, required: true },
    // timeStamp: { type: Number, required: true },
    // user: { type: String, required: true },
});

module.exports = mongoose.model('Message', messageSchema);