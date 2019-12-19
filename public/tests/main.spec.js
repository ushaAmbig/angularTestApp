/*---- This file contains the unit test cases for the controllers, services and directive -----*/
/*---- API call validation is tested in NodeJS because we don't have delete services to remove test or junk data ----*/
describe('testApp', function () {
	var scope,
		element;
	beforeEach(module('testApp'));
	beforeEach(inject(function (_$rootScope_, _$controller_, _$compile_, databaseService, _$q_, _$httpBackend_) {
		scope = _$rootScope_.$new();
		rootScope = _$rootScope_;
		compile = _$compile_; // This is for compiling the directive
		service = databaseService;
		q = _$q_; //library used for handling promises 
		$httpBackend = _$httpBackend_; //This provider is for mocking http services from backend
		_$controller_('mainController', {
			$scope: scope
		});
	}));

	describe('main controller', function () {
		//Test case: when controller loads, getData should be invoked by the controller
		it('should call getData function on controller load', function(){
			//Mocking the call to the URL to return fake response
			$httpBackend.whenGET('http://localhost:3000/api/getData').respond({
				status: 200
			});
			var mockGetDataFunc = spyOn(scope, 'getData');
			scope.init();
			expect(mockGetDataFunc).toHaveBeenCalled();
			$httpBackend.flush();
		})
		
		//Test Case: Calculate result should invoke toggle result after the calculation
		it('should call toggleResult when calculateResult is called', function () {
			var mockToggleFunc = spyOn(scope, 'toggleResult');
			scope.calculateResult();
			expect(mockToggleFunc).toHaveBeenCalled();
		});
		
		//Test Case: toggleResult function should display result directive in the UI
		it('should toggle result space when toggleResult is called', function () {
			var toggleVal = true;
			scope.toggleResult(toggleVal);
			expect(scope.displayResult).toBe(true);
			toggleVal = false;
			scope.toggleResult(toggleVal);
			expect(scope.displayResult).toBe(false);
		});
	});

	describe('resultSpace directive', function () {
		beforeEach(function () {
			$httpBackend.whenGET('http://localhost:3000/api/getData').respond({
				status: 200
			});
			
			element = angular.element('<result-space></result-space>');
			compile(element)(scope);
			var resultController = element.controller('result-space');
			resultController.getResult = function () {};
			spyOn(resultController, 'getResult');
		})
		afterEach(function(){
			$httpBackend.flush();
		})
		
		//Test Case: Validating the output with input in the UI
		it('should display the correct output for valid input', function () {
			scope.firstValue = 1;
			scope.secondValue = 2;
			//Calling directive function to get the result
			scope.getResult();
			scope.$apply();
			expect(element.text()).toEqual('Result is 2');
		})
		//Test Case: Validating the output with incorrect input in the UI
		it('should display the incorrect output for wrong input', function () {
			scope.firstValue = 3;
			scope.secondValue = 2;
			scope.getResult();
			scope.$apply();
			expect(element.text()).not.toEqual('Result is 2');
		})
	})
	describe('databaseService', function () {
		//Test Case: Validating the savedate function
		it('save data function should return a promise', function () {
			var payload = {value1:1, value2:2, result:3};
			var deferred = q.defer();
			spyOn(service, "saveData").and.returnValue(deferred.promise);
			scope.saveData(payload);
			deferred.resolve();
			expect(service.saveData).toHaveBeenCalled();
		})
		//Test Case: Validating the getdata function
		it('get data function should return a promise', function () {
			var deferred = q.defer();
			spyOn(service, "getData").and.returnValue(deferred.promise);
			scope.getData();
			deferred.resolve();
			expect(service.getData).toHaveBeenCalled();
		})
	})
});