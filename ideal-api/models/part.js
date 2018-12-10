const mongoose = require('mongoose');

const partSchema = mongoose.Schema({
    partId: { type: String },
    name: { type: String },
    description: { type: String },
    price: { type: String }
});

module.exports = mongoose.model('Part', partSchema);