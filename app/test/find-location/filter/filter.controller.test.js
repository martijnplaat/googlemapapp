'use strict';

describe("use case: filtering on destination type when searching for a destination address", function() {

	var filterController;
	var rootScope; 

	// Step 1 load the dependent modules into our test case
	beforeEach(module("GoogleMapApp.config"));
	beforeEach(module("GoogleMapApp.findLocation.filter"));

	// Step 2 inject the neccessary modules into our test case
	beforeEach(function() {
		inject(function($controller, config, $rootScope) {

			rootScope = $rootScope;
			filterController = $controller("findLocationFilterController", {
					$rootScope: $rootScope,
					config: config
				});
			
		});
	});

	it("spec 1: there should be a dropdown list of filtertypes", function() {

		filterController.loadFilters();
		
		expect(filterController.filters[0]).toEqual(jasmine.objectContaining({ id: 1, name: 'streets' }));
		expect(filterController.filters[1]).toEqual(jasmine.objectContaining({ id: 2, name: 'stations' })); 

	});

	it("spec 2: you should be able to select filtertype 'streets' ", function() {

		var filterType = "streets";
		expect(filterController.checkValue(filterType)).toEqual(rootScope.selectedFilterType);
			
	});
		

	it("spec 3: you should be able to select filtertype 'stations' ", function() {

		var filterType = "stations";
		expect(filterController.checkValue(filterType)).toEqual(rootScope.selectedFilterType);
			
	});


})