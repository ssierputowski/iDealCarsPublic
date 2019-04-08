const express = require('express');
const multer = require('multer');

const Part = require('../models/part');

const router = express.Router();
const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};
// Disk-file storage code for storing on the app partImages file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if (isValid) {
            error = null;
        }
        cb(error, 'partImages');
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
});
// For SAVE part for part dialog-add-part
router.post('', multer({ storage: storage }).single('partImage'),
(req, res, next) => {
    const url = req.protocol + '://' + req.get('host');
    const part = new Part({
        id: req.body.id,
        partID: req.body.partID,
        partName: req.body.partName,
        partPrice: req.body.partPrice,
        partQuantity: req.body.partQuantity,
        partCompatibility: req.body.partCompatibility,
        partDescription: req.body.partDescription,
        partImage: url + '/partImages/' + req.file.filename
    });
    part.save().then(newPart => {
        res.status(201).json({
            message: 'Part created successfully',
            part: {
                ...newPart,
                id: newPart._id,
            }
        });
    });
});

//DELETE method for Part Inventory, node.js code-->may not need this OPTIONS above
router.delete('/:id', function(req, res, next) {
    console.log('Deleting a part');
    Part.findByIdAndRemove(req.params.id, req.body, function(err, deletedPart){
        if(err){
            res.send("Error deleting part");
        } else{
            res.json(deletedPart);
        }
    });
});

// EDIT function on dialogVin
router.put('/:id', multer({ storage: storage }).single('partImage'),
(req,res,next) => {
    let partImage = req.body.partImage;
    if (req.file) {
        const url = req.protocol + '://' + req.get('host');
        partImage = url + '/partImages/' + req.file.filename;
    }
    const part = new Part({
        _id: req.body.id,
        partID: req.body.partID,
        partName: req.body.partName,
        partPrice: req.body.partPrice,
        partQuantity: req.body.partQuantity,
        partCompatibility: req.body.partCompatibility,
        partDescription: req.body.partDescription,
        partImage: partImage
    });
    Part.updateOne({_id: req.params.id}, part).then(result => {
        res.status(200).json({message: 'Update success!'})
    });

})
//For EDIT helper function
router.get('/:id', (req, res, next) => {
    Part.findById(req.params).then(part => {
        if(part) {
            res.status(200).json(part);
        } else {
            res.status(404).json({message: 'Part not found!'});
        }
    });
});


router.get('', (req, res, next) => {
    const partQuery = Part.find();
    partQuery.then(documents => {
        res.status(200).json({
            message: 'Parts fetched successfully',
            parts: documents,
        });
    });
});

module.exports = router;