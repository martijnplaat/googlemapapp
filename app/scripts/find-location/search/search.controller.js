import { default as GoogleMapAppFindLocationAPI } from './findlocationapi.factory';
import { default as GoogleMapAppFindLocationMap } from '../map/map.factory';


const moduleName = 'GoogleMapApp.findLocation.search';
const API = new WeakMap();
const ROOTSCOPE = new WeakMap();
const Q = new WeakMap();
const MAPFACTORY = new WeakMap();

class FindLocationSearchController {

    constructor($rootScope, findLocationAPIFactory, $q, findLocationMapFactory) {
		this.isDisabled = false;
		this.noCache = false;

		ROOTSCOPE.set(this, $rootScope);
		API.set(this, findLocationAPIFactory);
		Q.set(this, $q);
        MAPFACTORY.set(this, findLocationMapFactory);
    }

    selectedItemChange(item) {
        if(item.lat !== undefined && item.lng !== undefined) {
            let newPosition = new google.maps.LatLng(item.lat, item.lng);
            MAPFACTORY.get(this).setMarker(newPosition, 'MyDestination', item.name, 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png');    
        }    
    }

    querySearch(destinationAddress) {

    	let deferred = Q.get(this).defer();

    	this.filtertype = ROOTSCOPE.get(this).selectedFilterType;
    	if(this.filtertype !== null && destinationAddress !== '') {
    		API.get(this).getlocations(this.filtertype, destinationAddress)
    		.then( (response) => {
    			deferred.resolve(response.data.locations);
    		})
    		.catch( (response) => {
    			let resp = [{ "name" : response.data }];
    			deferred.resolve(resp);
    		})
    		
    	}

    	return deferred.promise;
    }

}

FindLocationSearchController.$inject = ['$rootScope', 'findLocationAPIFactory', '$q', 'findLocationMapFactory'];

angular.module(moduleName, [
    GoogleMapAppFindLocationAPI,
    GoogleMapAppFindLocationMap
])
    .controller('findLocationSearchController', FindLocationSearchController);

export default moduleName;