/*---- This file contains properties/config details for the application -----*/

var testApp = angular.module('testApp');

testApp.constant('appConfig', {
	BASE_URL:'http://localhost:3000',
    SAVE_DATA: '/api/saveData',
    GET_DATA: '/api/getData'
});