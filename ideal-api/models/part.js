const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const partSchema = mongoose.Schema({
    partID: { type: String, required: true },
    partName: { type: String, required: true },
    partPrice: { type: String, required: true },
    partQuantity: { type: String, required: true },
    partCompatibility: { type: String, required: true },
    partDescription: { type: String, required: false },
    partImage: { type: String, required: false }
});

partSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Part', partSchema);
