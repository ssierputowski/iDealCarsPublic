const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const vehicleSchema = mongoose.Schema({
    vehVin: { type: String, required: true, unique: true },
    vehYear: { type: Number, required: true },
    vehMake: { type: String, required: true },
    vehModel: { type: String, required: true },
    vehColor: { type: String, required: true },
    vehCondition: { type: String, required: true },
    vehDetail: { type: String, required: false },
    vehPrice: { type: Number, required: true },
    vehImage: { type: String, required: false }
});

vehicleSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Vehicle', vehicleSchema);
