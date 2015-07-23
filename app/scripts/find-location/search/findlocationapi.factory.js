import { default as GoogleMapAppConfig } from '../../general/config.constant';

const moduleName = 'GoogleMapApp.findLocation.API';

const HTTP = new WeakMap();
const CONFIG = new WeakMap();

class FindLocationAPIFactory {

    constructor($http,config) {
        HTTP.set(this, $http);
        CONFIG.set(this, config);
    }

    getlocations(filtertype, query) {
        // $http returns a promise, which has a then function, which also returns a promise

        let postURL = CONFIG.get(this).locationsapihost+filtertype+'?q='+query+'&max='+CONFIG.get(this).maxnumberresults;

        let promise = HTTP.get(this).get(postURL)
            .success( (uitkomst) => {
                return uitkomst;
            })
            .error( (error, status) => {
                console.log(error);
            });
            
        return promise;
    }

    static FindLocationAPIFactoryInstance($http, config) {
        return new FindLocationAPIFactory($http, config);
    }
}

FindLocationAPIFactory.FindLocationAPIFactoryInstance.$inject = ['$http','config'];

angular.module(moduleName, [
    GoogleMapAppConfig
])

    .factory('findLocationAPIFactory', FindLocationAPIFactory.FindLocationAPIFactoryInstance);

export default moduleName;