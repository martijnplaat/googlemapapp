(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var moduleName = 'GoogleMapApp.findLocation.filter';

var FindLocationFilterController = (function () {
    function FindLocationFilterController($scope, $stateParams, $state) {
        _classCallCheck(this, FindLocationFilterController);
    }

    _createClass(FindLocationFilterController, [{
        key: 'loadFilters',
        value: function loadFilters() {

            this.filters = [{ id: 1, name: 'Cities' }, { id: 2, name: 'Streets' }, { id: 3, name: 'Stations' }, { id: 4, name: 'Places' }];
        }
    }]);

    return FindLocationFilterController;
})();

FindLocationFilterController.$inject = ['$scope', '$stateParams', '$state'];

angular.module(moduleName, []).controller('findLocationFilterController', FindLocationFilterController);

exports['default'] = moduleName;
module.exports = exports['default'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _filterFilterController = require('./filter/filter.controller');

var _filterFilterController2 = _interopRequireDefault(_filterFilterController);

var _searchSearchController = require('./search/search.controller');

var _searchSearchController2 = _interopRequireDefault(_searchSearchController);

var _mapMapController = require('./map/map.controller');

var _mapMapController2 = _interopRequireDefault(_mapMapController);

var moduleName = 'GoogleMapApp.findLocation';

angular.module(moduleName, [_filterFilterController2['default'], _searchSearchController2['default'], _mapMapController2['default']]).config(['$stateProvider', function ($stateProvider) {

	$stateProvider.state('root.findlocation', {
		url: '/',

		views: {

			'index@': {
				templateUrl: '../../views/find-location/find-location.html'
			},
			'filter@root.findlocation': {
				templateUrl: '../../views/find-location/filter/filter.html',
				controller: 'findLocationFilterController',
				controllerAs: 'ns'
			},
			'search@root.findlocation': {
				templateUrl: '../../views/find-location/search/search.html',
				controller: 'findLocationSearchController',
				controllerAs: 'ns'
			},
			'map@root.findlocation': {
				templateUrl: '../../views/find-location/map/map.html',
				controller: 'findLocationMapController',
				controllerAs: 'ns'
			}

		}
	});
}]);

exports['default'] = moduleName;
module.exports = exports['default'];

},{"./filter/filter.controller":1,"./map/map.controller":3,"./search/search.controller":5}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
				value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _mapDirective = require('./map.directive');

var _mapDirective2 = _interopRequireDefault(_mapDirective);

var moduleName = 'GoogleMapApp.findLocation.mapctrl';

var FindLocationMapController = function FindLocationMapController($scope, $stateParams, $state) {
				_classCallCheck(this, FindLocationMapController);

				console.log('running map ctrl..');
};

FindLocationMapController.$inject = ['$scope', '$stateParams', '$state'];

angular.module(moduleName, [_mapDirective2['default']]).controller('findLocationMapController', FindLocationMapController).directive('myMap1', function () {
				// directive link function
				var link = function link(scope, element, attrs) {
								var map, infoWindow;
								var markers = [];

								// map config
								var mapOptions = {
												center: new google.maps.LatLng(50, 2),
												zoom: 4,
												mapTypeId: google.maps.MapTypeId.ROADMAP,
												scrollwheel: false
								};

								// init the map
								function initMap() {
												if (map === void 0) {
																map = new google.maps.Map(element[0], mapOptions);
												}
								}

								// place a marker
								function setMarker(map, position, title, content) {
												var marker;
												var markerOptions = {
																position: position,
																map: map,
																title: title,
																icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
												};

												marker = new google.maps.Marker(markerOptions);
												markers.push(marker); // add marker to array

												google.maps.event.addListener(marker, 'click', function () {
																// close window if not undefined
																if (infoWindow !== void 0) {
																				infoWindow.close();
																}
																// create new window
																var infoWindowOptions = {
																				content: content
																};
																infoWindow = new google.maps.InfoWindow(infoWindowOptions);
																infoWindow.open(map, marker);
												});
								}

								// show the map and place some markers
								initMap();

								setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'London', 'Just some content');
								setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Amsterdam', 'More content');
								setMarker(map, new google.maps.LatLng(48.856614, 2.352222), 'Paris', 'Text here');
				};

				return {
								restrict: 'A',
								template: '<div id="gmaps"></div>',
								replace: true,
								link: link
				};
});

exports['default'] = moduleName;
module.exports = exports['default'];

},{"./map.directive":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
				value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var moduleName = 'GoogleMapApp.findLocation.mapdirective';

var FindLocationMapDirective = (function () {
				function FindLocationMapDirective($scope, $stateParams, $state) {
								_classCallCheck(this, FindLocationMapDirective);

								this.restrict = 'A';
								this.replace = 'true';
								this.template = '<div id="gmaps"></div>';
				}

				_createClass(FindLocationMapDirective, [{
								key: 'link',

								// directive link function
								value: function link(scope, element, attrs) {

												var map = undefined,
												    infoWindow = undefined;
												var markers = [];

												var currentPosition = function currentPosition(position) {

																var lat = position.coords.latitude;
																var lon = position.coords.longitude;
																var newPosition = new google.maps.LatLng(lat, lon);

																setMarker(map, newPosition, 'MyLocation', 'I am here now!');
																map.setZoom(8);
																map.setCenter(newPosition);
												};

												// map config
												var mapOptions = {
																center: new google.maps.LatLng(50, 2),
																zoom: 4,
																mapTypeId: google.maps.MapTypeId.ROADMAP,
																scrollwheel: false
												};

												// init the map
												var initMap = function initMap() {
																if (map === void 0) {
																				map = new google.maps.Map(element[0], mapOptions);
																				navigator.geolocation.getCurrentPosition(currentPosition);
																}
												};

												// place a marker
												var setMarker = function setMarker(map, position, title, content) {
																var marker = undefined;
																var markerOptions = {
																				position: position,
																				map: map,
																				title: title,
																				icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
																};

																marker = new google.maps.Marker(markerOptions);
																markers.push(marker); // add marker to array

																google.maps.event.addListener(marker, 'click', function () {
																				// close window if not undefined
																				if (infoWindow !== void 0) {
																								infoWindow.close();
																				}

																				// create new window
																				var infoWindowOptions = {
																								content: content
																				};

																				infoWindow = new google.maps.InfoWindow(infoWindowOptions);
																				infoWindow.open(map, marker);
																});
												};

												// show the map and place some markers
												initMap();
								}
				}], [{
								key: 'directiveFactory',
								value: function directiveFactory() {
												FindLocationMapDirective.instance = new FindLocationMapDirective();
												return FindLocationMapDirective.instance;
								}
				}]);

				return FindLocationMapDirective;
})();

FindLocationMapDirective.$inject = ['$scope', '$stateParams', '$state'];

angular.module(moduleName, []).directive('findLocationMapDirective', FindLocationMapDirective.directiveFactory);

;

exports['default'] = moduleName;
module.exports = exports['default'];

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var moduleName = 'GoogleMapApp.findLocation.search';

var FindLocationSearchController = function FindLocationSearchController($scope, $stateParams, $state) {
    _classCallCheck(this, FindLocationSearchController);

    console.log('running search ctrl..');
};

FindLocationSearchController.$inject = ['$scope', '$stateParams', '$state'];

angular.module(moduleName, []).controller('findLocationSearchController', FindLocationSearchController);

exports['default'] = moduleName;
module.exports = exports['default'];

},{}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _findLocationFindLocationState = require('./find-location/find-location.state');

var _findLocationFindLocationState2 = _interopRequireDefault(_findLocationFindLocationState);

var moduleName = 'GoogleMapApp';

var GoogleMapApp = function GoogleMapApp() {
    _classCallCheck(this, GoogleMapApp);
};

GoogleMapApp.$inject = ['$rootScope', '$stateParams', '$state'];

angular.module(moduleName, ['ngAnimate', 'ngAria', 'ngMaterial', 'ui.router', _findLocationFindLocationState2['default']])

// We start with an abstract root state if we need specific overall data in our child states.

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider.state('root', {
        url: '',
        abstract: true
    });

    $urlRouterProvider.otherwise('/');
}]).run(['$rootScope', '$stateParams', '$state', function ($rootScope, $stateParams, $state) {

    console.log('running googlemap-app abstract state..');
}]);

// export is mandatory if you want to import this module elsewhere

exports['default'] = moduleName;
module.exports = exports['default'];

},{"./find-location/find-location.state":2}],7:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _googlemapApp = require('./googlemap-app');

var _googlemapApp2 = _interopRequireDefault(_googlemapApp);

angular.bootstrap(document, [_googlemapApp2['default']]);

},{"./googlemap-app":6}]},{},[7]);
