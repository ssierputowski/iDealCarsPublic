const express = require('express');

const Part = require('../models/part');

const router = express.Router();

router.post('', (req, res, next) => {
    console.log(req.body);
    const part = new Part({
        partId: req.body.partId,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
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