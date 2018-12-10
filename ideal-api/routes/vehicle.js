const express = require('express');

const Vehicle = require('../models/vehicle');

const router = express.Router();

router.post('', (req, res, next) => {
    console.log(req.body);
    const vehicle = new Vehicle({
        vinId: req.body.vinId,
        price: req.body.price,
        year: req.body.year,
        make: req.body.make,
        vehicleModel: req.body.vehicleModel,
        tcarColor: req.body.carColor,
        optionsDescription: req.body.optionsDescription
    });
    vehicle.save().then(newVehicle => {
        res.status(201).json({
            message: 'Vehicle created successfully',
            vehicle: {
                ...newVehicle,
                id: newVehicle._id,
            }
        });
    });
});

router.get('', (req, res, next) => {
    const vehicleQuery = Vehicle.find();
    vehicleQuery.then(documents => {
        res.status(200).json({
            message: 'Vehicles fetched successfully',
            vehicles: documents,
        });
    });
});

module.exports = router;