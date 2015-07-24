import { default as GoogleMapAppFindLocationMapDirective } from './map.directive';

const moduleName = 'GoogleMapApp.findLocation.mapcontroller';

class FindLocationMapController {
    constructor() { }
}

angular.module(moduleName, [
    GoogleMapAppFindLocationMapDirective
])
    .controller('findLocationMapController', FindLocationMapController)

    ;

export default moduleName;