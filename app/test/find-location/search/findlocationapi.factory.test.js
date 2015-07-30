'use strict';

describe("use case: get list of addresses based on the given query and filtertype", function() {

	let httpBackend, config, findLocationAPIFactory, responseAPI;

	beforeEach(module("GoogleMapApp.config"));
	beforeEach(module("GoogleMapApp.findLocation.API"));

	beforeEach(inject(function(_$httpBackend_, _config_, _findLocationAPIFactory_) {
		httpBackend = _$httpBackend_;
		config = _config_;
		findLocationAPIFactory = _findLocationAPIFactory_;

		let filtertype = "streets";
		let query ="Aarlanderveenstraat";
		let postURL = config.locationsapihost+filtertype+'?q='+query+'&max='+config.maxnumberresults;

		httpBackend.when('GET', postURL).respond({ "locations":  [{ "name" : "Aarlanderveenstraat", "type" : "street", "typeNumber" : 50, "lat" : "52.0580980", "lng" : "4.4790263"}] });
		responseAPI = findLocationAPIFactory.getlocations("streets", "Aarlanderveenstraat");
		httpBackend.flush();

	}));

	it("get the correct address based on a particular query and filtertype", function() {
		expect(responseAPI.$$state.value.data.locations).toEqual([{"name":"Aarlanderveenstraat","type":"street","typeNumber":50,"lat":"52.0580980","lng":"4.4790263"}]);
	});

});