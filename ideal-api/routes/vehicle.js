const express = require('express');

const Vehicle = require('../models/vehicle');

const router = express.Router();

router.post('', (req, res, next) => {
    console.log(req.body);
    const vehicle = new Vehicle({
        vehVin: req.body.vehVin,
        vehYear: req.body.vehYear,
        vehMake: req.body.vehMake,
        vehModel: req.body.vehModel,
        vehColor: req.body.vehColor,
        vehCondition: req.body.vehCondition,
        vehDetail: req.body.vehDetail,
        vehPrice: req.body.vehPrice,
        vehImage: req.body.vehImage
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