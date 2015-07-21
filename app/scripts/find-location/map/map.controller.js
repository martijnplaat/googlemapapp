const moduleName = 'GoogleMapApp.findLocation.map';

class FindLocationMapController {

    constructor($scope, $stateParams, $state) {
    	console.log('running map ctrl..');
    }

}

FindLocationMapController.$inject = ['$scope', '$stateParams', '$state'];

angular.module(moduleName, [
    
])
    .controller('findLocationMapController', FindLocationMapController);

export default moduleName;