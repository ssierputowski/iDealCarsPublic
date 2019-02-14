const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const vehicleSchema = mongoose.Schema({
    vehicleId: { type: String, required: true, unique: true },
    vehicleYear: { type: Number, required: true },
    vehicleMake: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleColor: { type: String, required: true },
    vehicleCondition: { type: String, required: true },
    vehicleDetails: { type: String, required: false },
    vehiclePrice: { type: Number, required: true },
    vehicleImage: { type: String, required: false }
});

vehicleSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Vehicle', vehicleSchema);