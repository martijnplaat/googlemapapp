import { default as GoogleMapAppFindLocationMap } from './map.factory';

const moduleName = 'GoogleMapApp.findLocation.mapdirective';
const MAPFACTORY = new WeakMap();

class FindLocationMapDirective {

    constructor(findLocationMapFactory) {
    	this.restrict = 'A';
        this.replace = 'true';
        this.template = '<div class="gmaps"></div>';

        this.mapfactory = findLocationMapFactory;
    }

    // directive link function
	link(scope, element, attrs) {
        FindLocationMapDirective.instance.mapfactory.initMap(element[0]);
	};

	static directiveFactory(findLocationMapFactory){
        FindLocationMapDirective.instance = new FindLocationMapDirective(findLocationMapFactory);
        return FindLocationMapDirective.instance;
    }

}

FindLocationMapDirective.$inject = ['findLocationMapFactory'];

angular.module(moduleName, [
    GoogleMapAppFindLocationMap
])
    .directive('findLocationMapDirective', FindLocationMapDirective.directiveFactory)

    ;

export default moduleName;