const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    email: { type: String },
    name: { type: String },
    number: { type: String},
    comment: { type: String},
    car: { type: String },
    employee: { type: String }
});

module.exports = mongoose.model('Lead', customerSchema);