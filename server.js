const express = require('express'),
    app = express(),
    port = 3000,
    path = require('path');

// Import Mongoose
let mongoose = require('mongoose');

//All API calls will be routed to services router
var serviceRouter = require('./routers/services');

//added cors to allow request from different domain
var cors = require('cors');
app.use(cors());

//to parse json and urlencodes
app.use(express.json());

//Page load - public/index.html will be served
app.use('/', express.static(path.join(__dirname, 'public')));

//all api calls routed to services
app.use('/api', serviceRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    res.status(404).send('404 - Not Found');
});

// Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/calculator', { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;

// Added check for DB connection
if(!db) {
    console.log("Error connecting db");
}
else {
    console.log("Db connected successfully");
}

app.listen(port, () => console.log(`Server running in port ${port}`));