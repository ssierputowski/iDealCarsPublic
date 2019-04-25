const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const vehicleSchema = mongoose.Schema({
    vehVin: { type: String, required: true },
    vehYear: { type: String, required: true },
    vehMake: { type: String, required: true },
    vehModel: { type: String, required: true },
    vehColor: { type: String, required: true },
    vehCondition: { type: String, required: true },
    vehDetail: { type: String, required: false },
    vehMiles: { type: String, require: true},
    vehPrice: { type: String, required: true },
    vehImage: { type: String, required: true }
});

vehicleSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Vehicle', vehicleSchema);
