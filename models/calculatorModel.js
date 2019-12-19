
//Setting up schema with field definitions
var mongoose = require('mongoose');
var calculatorSchema = mongoose.Schema({
    value1: {
        type: Number,
        required: true
    },
    value2: {
        type: Number,
        required: true
    },
	result: {
        type: Number,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

// Exporting Calculator model
var Calculator = module.exports = mongoose.model('calculator', calculatorSchema);

// Create a wrapper for getting all records
module.exports.get = function (callback, limit) {
    Calculator.find(callback).sort([['create_date', -1]]).limit(limit);
}