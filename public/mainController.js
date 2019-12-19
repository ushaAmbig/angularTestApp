/*---- This file contains code for bootstrapping the testApp module 
		and the controller logic for the application
-----*/

var testApp = angular.module('testApp', []); //bootstrapping the testApp module

testApp.controller('mainController', function ($scope, databaseService) {
	//this function is called when the caculate button is clicked on the UI
    $scope.calculateResult = function () {
        $scope.toggleResult(true); 
        $scope.saveData();
    };
	/* ---- this function is called for toggling the result directive,
		the directive will be shown once the calculate button is clicked and hidden
		once user starts typing in the input box ----*/
    $scope.toggleResult = function (val) {
        $scope.displayResult = val;
    };
	//This function makes a call to getData service and stores data to the scope variable
	//Using this function we will display the last calculated values on UI
    $scope.getData = function() {
        databaseService.getData().then(function(res) {
            if(res && res.results){
                $scope.previousResults = res.results;
            }
        }, function(err){
            console.log(err);
        })
    };
	//This function calls saveData service to save the values to the DB
    $scope.saveData = function() {
        var payload = {
            value1: parseInt($scope.firstValue), //parseInt here because, the input text stores values as string
            value2: parseInt($scope.secondValue),
            result: $scope.result
        }
        databaseService.saveData(payload).then(function(res){
            console.log('new data added to the database');
        }, function(err) {
            console.log(err);
        })
    };
	//This function can be used for any initial setup
    $scope.init = function() {
        $scope.getData();
    };
    $scope.init();
})