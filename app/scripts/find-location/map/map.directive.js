import { default as GoogleMapAppFindLocationMapFactory } from './map.factory';

const moduleName = 'GoogleMapApp.findLocation.mapdirective';
const MAPFACTORY = new WeakMap();

class FindLocationMapDirective {

    constructor($scope, $stateParams, $state, findLocationMapFactory) {
    	
    	this.restrict = 'A';
        this.replace = 'true';
        this.template = '<div class="gmaps"></div>';

        MAPFACTORY.set(this, findLocationMapFactory);

    }

    // directive link function
	link(scope, element, attrs) {

        MAPFACTORY.get(this).initMap(element[0]);         

	};
	    
	static directiveFactory(){
        FindLocationMapDirective.instance = new FindLocationMapDirective();
        return FindLocationMapDirective.instance;
    }

}

FindLocationMapDirective.$inject = ['$scope', '$stateParams', '$state', 'findLocationMapFactory'];

angular.module(moduleName, [
    GoogleMapAppFindLocationMapFactory
])
    .directive('findLocationMapDirective', FindLocationMapDirective.directiveFactory);

    ;

export default moduleName;