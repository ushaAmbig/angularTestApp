// Initialize express router
let router = require('express').Router();
//importing schema
Calculator = require('../models/calculatorModel');

/*---- Get Data call returns all values from DB -----*/
router.get('/getData', function (req, res) {
	Calculator.get(function (err, results) {
		if (err) {
			//-- Unknown or system error occured
			res.status(500).json({
				message: err.message || err,
			});
		}
		res.status(200).json({
			results: results
		});
	});
});

/*---- Create / Save a record with given data -----*/
router.post('/saveData', function (req, res) {
	var calculator = new Calculator();
	calculator.value1 = req.body.value1;
	calculator.value2 = req.body.value2;
	calculator.result = req.body.result;
	// save the result and check for errors
	calculator.save(function (err) {
		if (err) {
			//--- Data type validation and require field validation is handled by mongoose
			if(err.name && err.name === "ValidationError") {
				res.status(400).json({message: err.message || err});
			} else {
				//-- Unknown or system error occured
				res.status(500).json({message: err.message || err});
			}
		} else {
			res.json({
				result: calculator
			});
		}
	});
});





// Export API routes
module.exports = router;