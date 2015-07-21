const moduleName = 'GoogleMapApp.findLocation';

angular.module(moduleName, [])

.config(['$stateProvider', ($stateProvider) => {
	
	$stateProvider
		.state('root.findlocation', {
			url: '/',

			views: {

				'index@' : {
					templateUrl: 'views/find-location/find-location.html'
				},
				'filter@root.findlocation' : {
					templateUrl: 'views/find-location/filter/filter.html'
				},
				'search@root.findlocation' : {
					templateUrl: 'views/find-location/search/search.html'
				},
				'map@root.findlocation' : {
					templateUrl: 'views/find-location/map/map.html'
				}

			}
		})

}])

;

export default moduleName;