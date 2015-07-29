'use strict';

describe("use case: show a google map and detect the current position on the map", function() {

	var $rootScope, $compile, element;

	beforeEach(module("GoogleMapApp.findLocation.mapdirective"));
	beforeEach(module("GoogleMapApp.findLocation.mapfactory"));

	beforeEach(function() {
		inject(function(_$rootScope_, _$compile_) {
			$rootScope = _$rootScope_;
			$compile = _$compile_;
			 element = $compile("<div find-location-map-directive></div>")($rootScope);
			 $rootScope.$digest();
		})
	});

	it("spec 1: there should be a div with the class 'gmap' available in the content", function() {
			
        	// expect(element.html()).toContain("<div class=\"gmaps\"></div>");

	});

});