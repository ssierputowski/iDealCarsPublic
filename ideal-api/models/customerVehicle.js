const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const customerVehicleSchema = mongoose.Schema({
    customerId: { type: String, required: true },
    vehicleId: { type: String, required: true },
    vehicleYear: { type: String, required: true },
    vehicleMake: { type: String, required: true },
    vehicleModel: { type: String, required: true },
    vehicleColor: { type: String, required: true },
    vehicleDetails: { type: String, required: true },
    vehiclePriceSold: { type: String, required: true },
    vehicleImage: { type: String, required: true }
});
customerVehicleSchema.plugin(uniqueValidator);
module.exports = mongoose.model('CustomerVehicle', customerVehicleSchema);