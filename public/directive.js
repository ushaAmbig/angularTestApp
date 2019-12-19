/*---- This file contains results directive which calculates the multiplication result of 2 numbers -----*/

var testApp = angular.module('testApp');

testApp.directive('resultSpace', function () {
    return {
        scope: false, //using the parent scope
        template: '<div>Result is <span ng-bind="getResult()"></span></div>',
		//controller is used instead of link function here, as the link function gets called only once
        controller: function($scope) {
            $scope.getResult = function() {
                $scope.result = $scope.firstValue * $scope.secondValue;
                return $scope.result;
            };
        }
    }
});