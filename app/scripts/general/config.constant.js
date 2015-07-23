const moduleName = 'GoogleMapApp.config';

angular.module(moduleName, [])

.constant('config', {
    'version' : '0.0.1',
    'locationsapihost' : ' http://still-atoll-8938.herokuapp.com/api/locations/',
    'filters' : [{ id: 1, name: 'streets' },{ id: 2, name: 'stations' }], // 'cities' and 'places' causes HTTP 500 error.
    'maxnumberresults' : '20'
});

export default moduleName;