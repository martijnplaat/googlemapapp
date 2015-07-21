import { default as GoogleMapAppFindLocationMapDirective } from './map.directive';

const moduleName = 'GoogleMapApp.findLocation.mapctrl';

class FindLocationMapController {

    constructor($scope, $stateParams, $state) {
    	console.log('running map ctrl..');
    }

}

FindLocationMapController.$inject = ['$scope', '$stateParams', '$state'];

angular.module(moduleName, [
    GoogleMapAppFindLocationMapDirective
])
    .controller('findLocationMapController', FindLocationMapController)

    ;

export default moduleName;