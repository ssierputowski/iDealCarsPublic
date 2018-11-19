const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb://jmathis:ePA0FmXpjtnlzcji@ideal-cars-shard-00-00-szrks.mongodb.net:27017,ideal-cars-shard-00-01-szrks.mongodb.net:27017,ideal-cars-shard-00-02-szrks.mongodb.net:27017/test?ssl=true&replicaSet=ideal-cars-shard-0&authSource=admin&retryWrites=true', { useMongoClient: true })
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.use('/api/user', userRoutes);

module.exports = app;