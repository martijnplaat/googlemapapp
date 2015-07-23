import { default as GoogleMapAppFindLocationAPI } from './findlocationapi.factory';

const moduleName = 'GoogleMapApp.findLocation.search';
const API = new WeakMap();
const ROOTSCOPE = new WeakMap();
const Q = new WeakMap();

class FindLocationSearchController {

    constructor($rootScope, $stateParams, $state, findLocationAPIFactory, $q) {
    		this.isDisabled = false;
    		this.noCache = false;

    		ROOTSCOPE.set(this, $rootScope);
    		API.set(this, findLocationAPIFactory);
    		Q.set(this, $q);
    }

    selectedItemChange(item) {
    	console.log(JSON.stringify(item));
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

FindLocationSearchController.$inject = ['$rootScope', '$stateParams', '$state', 'findLocationAPIFactory', '$q'];

angular.module(moduleName, [
    GoogleMapAppFindLocationAPI
])
    .controller('findLocationSearchController', FindLocationSearchController);

export default moduleName;