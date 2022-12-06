class MapaDinamico {
    inicializarMapa() {
        const directionsService = new google.maps.DirectionsService();
        //Coordenadas del parque sanfrancisco
        var coordenadasSanFrancisco = {lat: 43.36186082440911, lng: -5.850503392121233};
        var informacion = new google.maps.InfoWindow;
        var mapaSiFalla = new google.maps.Map(document.querySelector("main"), 
                {zoom: 15, 
                center: coordenadasSanFrancisco,
        mapTypeId: google.maps.MapTypeId.SATELLITE});
        
        //Tenemos que comprobar si nuestro navegador permite la geolocalizacion
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let posicion = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                var mapa = new google.maps.Map(document.querySelector("main"), 
                                                {zoom: 15, 
                                                center: posicion,
						mapTypeId: google.maps.MapTypeId.SATELLITE});

                
                directionsService.route({
                    origin: posicion,
                    destination: coordenadasSanFrancisco,
                    travelMode: "DRIVING"
                }, (response, status) => {
                    if (status === "OK") {
                        new google.maps.DirectionsRenderer({
                            suppressMarkers: true,
                            directions: response,
                            map: mapa,
                          });

                    } 
                }
                )
            }, 
                err => {
                    informacion.setPosition({lat: 43.361640, lng: -5.850467});
                    informacion.setContent("Ubicación por defecto. Geolocalización fallida");
                    informacion.open(mapaSiFalla);
                }
            )
        } else {
            informacion.setPosition({lat: 43.361640, lng: -5.850467});
            informacion.setContent("Ubicación por defecto. Geolocalización no soportada");
            informacion.open(mapaSiFalla);
        }
    }
}

let m = new MapaDinamico();