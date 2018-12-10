const mongoose = require('mongoose');

const vehicleSchema = mongoose.Schema({
    vinId: { type: String },
    price: { type: String },
    year: { type: String },
    make: { type: String },
    vehicleModel: { type: String },
    carColor: { type: String },
    optionsDescription: { type: String },
});

module.exports = mongoose.model('Vehicle', vehicleSchema);