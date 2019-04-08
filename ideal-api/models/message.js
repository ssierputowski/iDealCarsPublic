const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    creator: { type: String, required: true },
    date: { type: String, required: true },
    content: { type: String, required: true },
});

module.exports = mongoose.model('Message', messageSchema);