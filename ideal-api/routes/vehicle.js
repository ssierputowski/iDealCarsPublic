const express = require('express');
const multer = require('multer');

const Vehicle = require('../models/vehicle');

const router = express.Router();
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
// Disk-file storage code for storing on the app vehicleImages file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, 'vehicleImages');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});
// For SAVE vehicle for vehicle dialog-entry
router.post('', multer({ storage: storage }).single('vehImage'),
(req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
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
        vehImage: url + '/vehicleImages/' + req.file.filename
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

//DELETE method for Vehicle Inventory, node.js code-->may not need this OPTIONS above
router.delete('/:id', function(req, res, next) {
    console.log('Deleting a vehicle');
    Vehicle.findByIdAndRemove(req.params.id, req.body, function(err, deletedVehicle){
        if(err){
            res.send("Error deleting vehicle");
        } else{
            res.json(deletedVehicle);
        }
    });
});

// EDIT function on dialogVin
router.put('/:id', multer({ storage: storage }).single('vehImage'),
(req,res,next) => {
    let vehImage = req.body.vehImage;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        vehImage = url + '/vehicleImages/' + req.file.filename;
    }
    const vehicle = new Vehicle({
        _id: req.body.id,
        vehVin: req.body.vehVin,
        vehYear: req.body.vehYear,
        vehMake: req.body.vehMake,
        vehModel: req.body.vehModel,
        vehColor: req.body.vehColor,
        vehCondition: req.body.vehCondition,
        vehDetail: req.body.vehDetail,
        vehPrice: req.body.vehPrice,
        vehImage: vehImage
    });
    Vehicle.updateOne({_id: req.params.id}, vehicle).then(result => {
        res.status(200).json({message: 'Update success!'})
    });

})
//For EDIT helper function
router.get('/:id', (req, res, next) => {
    Vehicle.findById(req.params).then(vehicle => {
        if(vehicle) {
            res.status(200).json(vehicle);
        } else {
            res.status(404).json({message: 'Vehicle not found!'});
        }
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