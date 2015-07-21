const moduleName = 'GoogleMapApp.findLocation.filter';

class FindLocationFilterController {

    constructor($scope, $stateParams, $state) {
    		
    }

    loadFilters() {
    	
    	this.filters = [
		        { id: 1, name: 'Cities' },
		        { id: 2, name: 'Streets' },
		        { id: 3, name: 'Stations' },
		        { id: 4, name: 'Places' }
      		];
    }

}

FindLocationFilterController.$inject = ['$scope', '$stateParams', '$state'];

angular.module(moduleName, [
    
])
    .controller('findLocationFilterController', FindLocationFilterController);

export default moduleName;