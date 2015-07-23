const moduleName = 'GoogleMapApp.findLocation.mapfactory';

class FindLocationMapFactory {

    constructor() { }

    // init the map
    initMap(activeElement) {

        // map config
        let mapOptions = {
            center: new google.maps.LatLng(50, 2),
            zoom: 4,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            scrollwheel: false
        };

        if (this.map === void 0) {
            this.map = new google.maps.Map(activeElement, mapOptions);
            navigator.geolocation.getCurrentPosition(this.currentPosition);
        }
    }

    currentPosition(position) {
         
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let newPosition = new google.maps.LatLng(lat, lon);

                this.setMarker(this.map, newPosition, 'MyLocation', 'I am here now!');
                this.map.setZoom(8);
                this.map.setCenter(newPosition);

    };

            
    // place a marker
    setMarker(map, position, title, content) {
        let marker, infoWindow;
        let markerOptions = {
            position: position,
            map: map,
            title: title,
            icon: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png'
        };

        marker = new google.maps.Marker(markerOptions);
        this.markers.push(marker); // add marker to array
        
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

    static FindLocationMapFactoryInstance() {
        return new FindLocationMapFactory();
    }


}

FindLocationMapFactory.FindLocationMapFactoryInstance.$inject = [];

angular.module(moduleName, [
    
])

.factory('findLocationMapFactory', FindLocationMapFactory.FindLocationMapFactoryInstance);

export default moduleName;