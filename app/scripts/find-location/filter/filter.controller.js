import { default as GoogleMapAppConfig } from '../../general/config.constant';

const moduleName = 'GoogleMapApp.findLocation.filter';
const ROOTSCOPE = new WeakMap();
const CONFIG = new WeakMap();

class FindLocationFilterController {

    constructor($rootScope, $stateParams, $state, config) {
        ROOTSCOPE.set(this, $rootScope);
        CONFIG.set(this, config);
    }

    checkValue(filterType) {
        ROOTSCOPE.get(this).selectedFilterType = filterType.name;
    }

    loadFilters() {
    	this.filters = CONFIG.get(this).filters;
    }

}

FindLocationFilterController.$inject = ['$rootScope', '$stateParams', '$state', 'config'];

angular.module(moduleName, [
    GoogleMapAppConfig
])
    .controller('findLocationFilterController', FindLocationFilterController);

export default moduleName;