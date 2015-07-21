const moduleName = 'GoogleMapApp.findLocation.mapdirective';

class FindLocationMapDirective {

    constructor($scope, $stateParams, $state) {

    	this.restrict = 'A';
        this.replace = 'true';
        this.template = '<div id="gmaps"></div>';

    }

    // directive link function
	link(scope, element, attrs) {

	        let map, infoWindow;
	        let markers = [];
	        
			let currentPosition = (position) => {
         
		        let lat = position.coords.latitude;
		        let lon = position.coords.longitude;
		        let newPosition = new google.maps.LatLng(lat, lon);

		        setMarker(map, newPosition, 'MyLocation', 'I am here now!');
		        map.setZoom(8);
		        map.setCenter(newPosition);

      		};

	        // map config
	        let mapOptions = {
	            center: new google.maps.LatLng(50, 2),
	            zoom: 4,
	            mapTypeId: google.maps.MapTypeId.ROADMAP,
	            scrollwheel: false
	        };
	        
			// init the map
	        let initMap = () => {
	            if (map === void 0) {
	                map = new google.maps.Map(element[0], mapOptions);
	                navigator.geolocation.getCurrentPosition(currentPosition);
	            }
	        }    
	        
	        // place a marker
	        let setMarker = (map, position, title, content) => {
	            let marker;
	            let markerOptions = {
	                position: position,
	                map: map,
	                title: title,
	                icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
	            };

	            marker = new google.maps.Marker(markerOptions);
	            markers.push(marker); // add marker to array
	            
	            google.maps.event.addListener(marker, 'click', function () {
	                // close window if not undefined
	                if (infoWindow !== void 0) {
	                    infoWindow.close();
	                }

	                // create new window
	                let infoWindowOptions = {
	                    content: content
	                };
	                
	                infoWindow = new google.maps.InfoWindow(infoWindowOptions);
	                infoWindow.open(map, marker);
	            });
	        }

	        // show the map and place some markers
	        initMap();

	};
	    
	static directiveFactory(){
        FindLocationMapDirective.instance = new FindLocationMapDirective();
        return FindLocationMapDirective.instance;
    }


}

FindLocationMapDirective.$inject = ['$scope', '$stateParams', '$state'];

angular.module(moduleName, [
    
])
    .directive('findLocationMapDirective', FindLocationMapDirective.directiveFactory);

    ;

export default moduleName;