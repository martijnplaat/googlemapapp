'use strict';

describe("use case: initialise the Google map, detect current position and set markers on the map", function() {


	beforeEach(module("GoogleMapApp.findLocation.mapfactory"));
	beforeEach(inject(function(findLocationMapFactory) {

		this.mapFactory = findLocationMapFactory;
		let dummyElement = angular.element('<div></div>');

		this.mapFactory.initMap(dummyElement);
		this.mapFactory.currentPosition({ coords: { latitude : 51.507351, longitude: -0.127758 } });

	}));

	it("spec 1: check if map instance is created by checking maptype", function() {

		expect(this.mapFactory.map.getMapTypeId()).toEqual("roadmap");

	});

	it("spec 2: check if the current position is defined by inferring that the MyLocation marker is set", function() {

		expect(this.mapFactory.markers).toMatch(/MyLocation/);

	});


})