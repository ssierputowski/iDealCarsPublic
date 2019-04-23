const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const webpush = require('web-push');

const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const vehicleRoutes = require('./routes/vehicle')
const customerRoutes = require('./routes/customer');
const customerVehicleRoutes = require('./routes/customerVehicle')
const customerServiceRecordRoutes = require('./routes/customerServiceRecord');
const partRoutes = require('./routes/part');
const path = require('path');
const app = express();
//'mongodb+srv://jmathis:' + process.env.MONGO_ATLAS_PW + '@ideal-cars-szrks.mongodb.net/test'
//'mongodb+srv://EWD:zipGEoVPTIRJvIEh@cluster0-tcbpt.mongodb.net/node-angular?retryWrites=true'
mongoose.connect(
    'mongodb+srv://jmathis:' + process.env.MONGO_ATLAS_PW + '@ideal-cars-szrks.mongodb.net/test2',
    { useNewUrlParser: true }
    )
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch(() => {
        console.log('Connection failed!');
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/vehicleImages', express.static(path.join('/vehicleImages')));
app.use('/customerVehicleImages', express.static(path.join('/customerVehicleImages')));

webpush.setVapidDetails(
    'mailto:you@domain.com',
    process.env.PUBLIC_VAPID,
    process.env.PRIVATE_VAPID
);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

// Serve the static files from the ideal-api directory
app.use(express.static('./'));
// routes here should have a path or will cause issues and above
app.use('/api/user', userRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/customerVehicles', customerVehicleRoutes);
app.use('/api/customerServiceRecords', customerServiceRecordRoutes);
app.use('/api/parts', partRoutes);

module.exports = app;


