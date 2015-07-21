import { default as GoogleMapAppFilter } from './filter/filter.controller';
import { default as GoogleMapAppSearch } from './search/search.controller';
import { default as GoogleMapAppMap } from './map/map.controller';


const moduleName = 'GoogleMapApp.findLocation';

angular.module(moduleName, [
	GoogleMapAppFilter,
	GoogleMapAppSearch,
	GoogleMapAppMap
	])

.config(['$stateProvider', ($stateProvider) => {
	
	$stateProvider
		.state('root.findlocation', {
			url: '/',

			views: {

				'index@' : {
					templateUrl: '../../views/find-location/find-location.html'
				},
				'filter@root.findlocation' : {
					templateUrl: '../../views/find-location/filter/filter.html',
					controller: 'findLocationFilterController',
					controllerAs: 'ns'
				},
				'search@root.findlocation' : {
					templateUrl: '../../views/find-location/search/search.html',
					controller: 'findLocationSearchController',
					controllerAs: 'ns'
				},
				'map@root.findlocation' : {
					templateUrl: '../../views/find-location/map/map.html',
					controller: 'findLocationMapController',
					controllerAs: 'ns'
				}

			}
		})

}])

;

export default moduleName;