const express = require('express');

const Vehicle = require('../models/vehicle');

const router = express.Router();

router.post('', (req, res, next) => {
    console.log(req.body);
    const vehicle = new Vehicle({
        id: req.body.id,
        vehVin: req.body.vehVin,
        vehYear: req.body.vehYear,
        vehMake: req.body.vehMake,
        vehModel: req.body.vehModel,
        vehColor: req.body.vehColor,
        vehCondition: req.body.vehCondition,
        vehDetail: req.body.vehDetail,
        vehPrice: req.body.vehPrice,
        vehImage: url + '/userImages/' + req.file.filename
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

//Delete method for Vehicle Inventory, node.js code-->may not need this OPTIONS above
router.delete('/api/vehicle/:id', (req, res, next) => {
    Vehicle.deleteOne({_id: req.params.id}).then(result => {//Vehicle should be of the model here
        console.log(result);
        res.status(200).json({ message: "Vehicle Deleted!"});
    });
});
router.put("api/vehicle/:id", (req,res,next) => {
    const vehicle = new Vehicle({
        id: req.body.id,
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
    Vehicle.updateOne({_id: req.params.id}, vehicle).then(result => {
        console.log(result);
        res.status(200).json({message: 'Update success!'})
    });
})
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