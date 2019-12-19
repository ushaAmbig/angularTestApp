var testApp = angular.module('testApp');

testApp.service('databaseService', function($http, $q, appConfig) {
	//This function calls saveData API to save data to the DB
    this.saveData = function(payload) {
        let url = appConfig.BASE_URL + appConfig.SAVE_DATA; 
        var def = $q.defer();  // $q is the built in library provided by angular for handling promise
        $http.post(url, payload)
        .then(function(res){
            def.resolve(res.data); // on success, return data
        }, function(err){
            def.reject(err); // on error, return error
        })
        return def.promise; //returns the promise handler for the invoker
    };

	//This function calls the getData API to get all the data from the DB
    this.getData = function() {
        let url = appConfig.BASE_URL + appConfig.GET_DATA;
        var def = $q.defer();
        $http.get(url)
        .then(function(res){
            def.resolve(res.data);
        }, function(err){
            def.reject(err);
        })
        return def.promise;
    };
});