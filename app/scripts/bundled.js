(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _generalConfigConstant = require('../../general/config.constant');

var _generalConfigConstant2 = _interopRequireDefault(_generalConfigConstant);

var moduleName = 'GoogleMapApp.findLocation.filter';
var ROOTSCOPE = new WeakMap();
var CONFIG = new WeakMap();

var FindLocationFilterController = (function () {
    function FindLocationFilterController($rootScope, $stateParams, $state, config) {
        _classCallCheck(this, FindLocationFilterController);

        ROOTSCOPE.set(this, $rootScope);
        CONFIG.set(this, config);
    }

    _createClass(FindLocationFilterController, [{
        key: 'checkValue',
        value: function checkValue(filterType) {
            ROOTSCOPE.get(this).selectedFilterType = filterType.name;
        }
    }, {
        key: 'loadFilters',
        value: function loadFilters() {
            this.filters = CONFIG.get(this).filters;
        }
    }]);

    return FindLocationFilterController;
})();

FindLocationFilterController.$inject = ['$rootScope', '$stateParams', '$state', 'config'];

angular.module(moduleName, [_generalConfigConstant2['default']]).controller('findLocationFilterController', FindLocationFilterController);

exports['default'] = moduleName;
module.exports = exports['default'];

},{"../../general/config.constant":7}],2:[function(require,module,exports){
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

},{"./filter/filter.controller":1,"./map/map.controller":3,"./search/search.controller":6}],3:[function(require,module,exports){
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

angular.module(moduleName, [_mapDirective2['default']]).controller('findLocationMapController', FindLocationMapController);

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
								this.template = '<div class="gmaps"></div>';
				}

				_createClass(FindLocationMapDirective, [{
								key: 'link',

								// directive link function
								value: function link(scope, element, attrs) {

												var map = undefined,
												    infoWindow = undefined;
												var markers = [];

												// init the map
												var initMap = function initMap() {
																if (map === void 0) {
																				map = new google.maps.Map(element[0], mapOptions);
																				navigator.geolocation.getCurrentPosition(currentPosition);
																}
												};

												// map config
												var mapOptions = {
																center: new google.maps.LatLng(50, 2),
																zoom: 4,
																mapTypeId: google.maps.MapTypeId.ROADMAP,
																scrollwheel: false
												};

												var currentPosition = function currentPosition(position) {

																var lat = position.coords.latitude;
																var lon = position.coords.longitude;
																var newPosition = new google.maps.LatLng(lat, lon);

																setMarker(map, newPosition, 'MyLocation', 'I am here now!');
																map.setZoom(8);
																map.setCenter(newPosition);
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

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _generalConfigConstant = require('../../general/config.constant');

var _generalConfigConstant2 = _interopRequireDefault(_generalConfigConstant);

var moduleName = 'GoogleMapApp.findLocation.API';

var HTTP = new WeakMap();
var CONFIG = new WeakMap();
var LOCATION = new WeakMap();

var FindLocationAPIFactory = (function () {
    function FindLocationAPIFactory($http, config, $location) {
        _classCallCheck(this, FindLocationAPIFactory);

        HTTP.set(this, $http);
        CONFIG.set(this, config);
        LOCATION.set(this, $location);
    }

    _createClass(FindLocationAPIFactory, [{
        key: 'getlocations',
        value: function getlocations(filtertype, query) {
            // $http returns a promise, which has a then function, which also returns a promise

            var postURL = CONFIG.get(this).locationsapihost + filtertype + '?q=' + query + '&max=' + CONFIG.get(this).maxnumberresults;

            var promise = HTTP.get(this).get(postURL).success(function (uitkomst) {
                return uitkomst;
            }).error(function (error, status) {
                console.log(error);
            });

            return promise;
        }
    }], [{
        key: 'FindLocationAPIFactoryInstance',
        value: function FindLocationAPIFactoryInstance($http, config, $location) {
            return new FindLocationAPIFactory($http, config, $location);
        }
    }]);

    return FindLocationAPIFactory;
})();

FindLocationAPIFactory.FindLocationAPIFactoryInstance.$inject = ['$http', 'config', '$location'];

angular.module(moduleName, [_generalConfigConstant2['default']]).factory('findLocationAPIFactory', FindLocationAPIFactory.FindLocationAPIFactoryInstance);

exports['default'] = moduleName;
module.exports = exports['default'];

},{"../../general/config.constant":7}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _findlocationapiFactory = require('./findlocationapi.factory');

var _findlocationapiFactory2 = _interopRequireDefault(_findlocationapiFactory);

var moduleName = 'GoogleMapApp.findLocation.search';
var API = new WeakMap();
var ROOTSCOPE = new WeakMap();
var Q = new WeakMap();

var FindLocationSearchController = (function () {
    function FindLocationSearchController($rootScope, $stateParams, $state, findLocationAPIFactory, $q) {
        _classCallCheck(this, FindLocationSearchController);

        this.isDisabled = false;
        this.noCache = false;

        ROOTSCOPE.set(this, $rootScope);
        API.set(this, findLocationAPIFactory);
        Q.set(this, $q);
    }

    _createClass(FindLocationSearchController, [{
        key: 'selectedItemChange',
        value: function selectedItemChange(item) {
            console.log(JSON.stringify(item));
        }
    }, {
        key: 'querySearch',
        value: function querySearch(destinationAddress) {

            var deferred = Q.get(this).defer();

            this.filtertype = ROOTSCOPE.get(this).selectedFilterType;
            if (this.filtertype !== null && destinationAddress !== '') {
                API.get(this).getlocations(this.filtertype, destinationAddress).then(function (response) {
                    deferred.resolve(response.data.locations);
                })['catch'](function (response) {
                    var resp = [{ 'name': response.data }];
                    deferred.resolve(resp);
                });
            }

            return deferred.promise;
        }
    }]);

    return FindLocationSearchController;
})();

FindLocationSearchController.$inject = ['$rootScope', '$stateParams', '$state', 'findLocationAPIFactory', '$q'];

angular.module(moduleName, [_findlocationapiFactory2['default']]).controller('findLocationSearchController', FindLocationSearchController);

exports['default'] = moduleName;
module.exports = exports['default'];

},{"./findlocationapi.factory":5}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var moduleName = 'GoogleMapApp.config';

angular.module(moduleName, []).constant('config', {
    'version': '0.0.1',
    'locationsapihost': ' http://still-atoll-8938.herokuapp.com/api/locations/',
    'filters': [{ id: 1, name: 'streets' }, { id: 2, name: 'stations' }], // 'cities' and 'places' causes HTTP 500 error.
    'maxnumberresults': '20'
});

exports['default'] = moduleName;
module.exports = exports['default'];

},{}],8:[function(require,module,exports){
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

.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $stateProvider.state('root', {
        url: '',
        abstract: true
    });

    $urlRouterProvider.otherwise('/');
}]).run(['$rootScope', '$stateParams', '$state', function ($rootScope, $stateParams, $state) {

    $rootScope.selectedFilterType = null;
}]);

// export is mandatory if you want to import this module elsewhere

exports['default'] = moduleName;
module.exports = exports['default'];

},{"./find-location/find-location.state":2}],9:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _googlemapApp = require('./googlemap-app');

var _googlemapApp2 = _interopRequireDefault(_googlemapApp);

angular.bootstrap(document, [_googlemapApp2['default']]);

},{"./googlemap-app":8}]},{},[9]);
