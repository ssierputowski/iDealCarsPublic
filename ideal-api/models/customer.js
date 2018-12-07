const mongoose = require('mongoose');

const customerSchema = mongoose.Schema({
    fname:  { type: String, required: true},
    lname: { type: String, required: true},
    carYear: { type: String, required: true},
    carMake: { type: String, require: true},
    carModel: { type: String, required: true},
    telephone: { type: String, required: true},
    email: { type: String, required: true},
});

module.exports = mongoose.model('Customer', customerSchema);