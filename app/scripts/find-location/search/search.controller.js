const moduleName = 'GoogleMapApp.findLocation.search';

class FindLocationSearchController {

    constructor($scope, $stateParams, $state) {
    		console.log('running search ctrl..');
    }

}

FindLocationSearchController.$inject = ['$scope', '$stateParams', '$state'];

angular.module(moduleName, [
    
])
    .controller('findLocationSearchController', FindLocationSearchController);

export default moduleName;