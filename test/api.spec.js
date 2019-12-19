var expect  = require('chai').expect;
var request = require('request');
let mongoose = require('mongoose');
let Calculator = require('../models/calculatorModel');

let getURL 	= "http://localhost:3000/api/getData",
	postURL = "http://localhost:3000/api/saveData";


/*------- Connect to DB to delete junk or test data later -------*/
mongoose.connect('mongodb://localhost/calculator', { useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully");
/*---------------------------*/



//Test case: Validate get data returns 200
it('Get results API call', function(done) {
    request(getURL , function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
    });
});

//Test Case: Validate post data with invalid returns 400
it('should POST results API call with invalid data #1', function(done) {
	let body = {
		value1: "abc",
		value2: 3,
		result: 20
	}
	request.post({url:  postURL, json: body}, function(error, response, body){
        expect(response.statusCode).to.equal(400);
        done();
	});
});

//Test case: Validate post data with invalid returns 400
it('should POST results API call with invalid data #2', function(done) {
	let body = {
		value1: 2,
		result: 20
	}
	request.post({url:  postURL, json: body}, function(error, response, body){
        expect(response.statusCode).to.equal(400);
        done();
	});
});

//Test Case:  Validate post data with invalid returns 200
it('should POST results API call with valid data and delete the record', function(done) {
	let body = {
		value1: 2,
		value2: 10,
		result: 20
	}
	request.post({url:  postURL, json: body}, function(error, response, body){
		console.log("new recored created:", response.body.result._id);
        expect(response.statusCode).to.equal(200);
		
		/*------- Since new record is created as part of testing, we are deleting the same ------*/
		let data = response.body.result;
		let res  = Calculator.deleteOne({ _id:data._id }).then(function(res){
			console.log("new recored deleted:", res);
			expect(res.ok).to.equal(1);
			expect(res.deletedCount).to.equal(1);
			done();
			db.close();
		});
	});
});