const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    fname: { type: String },
    lname: { type: String },
    carYear: { type: String },
    carMake: { type: String },
    carModel: { type: String },
    telephone: { type: String },
    email: { type: String },
});

module.exports = mongoose.model('Customer', customerSchema);