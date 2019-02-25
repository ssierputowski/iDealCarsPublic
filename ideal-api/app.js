const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const customerRoutes = require('./routes/customer');
const vehicleRoutes = require('./routes/vehicle')

const app = express();
//'mongodb+srv://jmathis:' + process.env.MONGO_ATLAS_PW + '@ideal-cars-szrks.mongodb.net/test'
//'mongodb+srv://EWD:zipGEoVPTIRJvIEh@cluster0-tcbpt.mongodb.net/node-angular?retryWrites=true'
mongoose.connect('mongodb+srv://EWD:zipGEoVPTIRJvIEh@cluster0-tcbpt.mongodb.net/node-angular?retryWrites=true')
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
app.use('/api/customers', customerRoutes);
app.use( '/api/vehicles', vehicleRoutes);

module.exports = app;

