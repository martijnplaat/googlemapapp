import { default as GoogleMapAppFindLocationState } from './find-location/find-location.state';

const moduleName = 'GoogleMapApp';

class GoogleMapApp {
	
	constructor() {

	}

}

GoogleMapApp.$inject = ['$rootScope', '$stateParams', '$state'];

angular.module(moduleName, [
    'ngAnimate',
    'ngAria',
    'ngMaterial',
    'ui.router',
    GoogleMapAppFindLocationState
])

// We start with an abstract root state if we need specific overall data in our child states.

.config(['$stateProvider','$urlRouterProvider', ($stateProvider, $urlRouterProvider) => {
        $stateProvider
            .state('root', {
                url: '',
                abstract: true
            })
        ;

        $urlRouterProvider.otherwise('/');
       
    }])

.run(['$rootScope', '$stateParams', '$state', ($rootScope, $stateParams, $state) => {
	
    console.log("running googlemap-app abstract state..");
}])

;

// export is mandatory if you want to import this module elsewhere

export default moduleName;