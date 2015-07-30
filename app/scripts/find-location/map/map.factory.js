const moduleName = 'GoogleMapApp.findLocation.mapfactory';

class FindLocationMapFactory {

    constructor() {
        this.markers = [];
    }

    // init the map
    initMap(activeElement) {

        // map config
        let mapOptions = {
            center: new google.maps.LatLng(50, 2),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };

        if (FindLocationMapFactory.instance.map === void 0) {

            FindLocationMapFactory.instance.map = new google.maps.Map(activeElement, mapOptions);

            navigator.geolocation.getCurrentPosition(FindLocationMapFactory.instance.currentPosition);

        }
    }

    getMarkers() {
        return this.markers;
    }

    currentPosition(position) {

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let newPosition = new google.maps.LatLng(lat, lon);

        FindLocationMapFactory.instance.setMarker(newPosition, 'MyLocation', 'I am here now!', 'https://maps.google.com/mapfiles/ms/icons/green-dot.png');
        FindLocationMapFactory.instance.map.setZoom(8);
        FindLocationMapFactory.instance.map.setCenter(newPosition);
    };
     
    // place a marker
    setMarker(position, title, content, icon) {
        let marker, infoWindow;
        let markerOptions = {
            position: position,
            map: FindLocationMapFactory.instance.map,
            title: title,
            icon: icon
        };

        marker = new google.maps.Marker(markerOptions);
        FindLocationMapFactory.instance.markers.push(marker.title); // add marker to array
        
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
            infoWindow.open(FindLocationMapFactory.instance.map, marker);
        });
    }

    static FindLocationMapFactoryInstance() {
        FindLocationMapFactory.instance = new FindLocationMapFactory();
        return FindLocationMapFactory.instance;
    }
}

angular.module(moduleName, [])

    .factory('findLocationMapFactory', FindLocationMapFactory.FindLocationMapFactoryInstance);

export default moduleName;