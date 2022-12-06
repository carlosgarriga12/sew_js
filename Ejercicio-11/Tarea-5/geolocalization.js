class MapaDinamico {
    inicializarMapa() {
        //Coordenadas de la estatua de Mafalda
        var mapa = new google.maps.Map(document.querySelector("main"), 
                                                {zoom: 15, 
                                                center: {lat: 43.361640, lng: -5.850467},
						mapTypeId: google.maps.MapTypeId.SATELLITE});

        var informacion = new google.maps.InfoWindow;

        //Tenemos que comprobar si nuestro navegador permite la geolocalizacion
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                let posicion = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                informacion.setPosition(posicion);
                informacion.setContent("Tu posición actual");
                informacion.open(mapa);
                mapa.setCenter(posicion);
            }, 
                err => {
                    informacion.setPosition({lat: 43.361640, lng: -5.850467});
                    informacion.setContent("Ubicación por defecto. Geolocalización fallida");
                    informacion.open(mapa);
                }
            )
        } else {
            informacion.setPosition({lat: 43.361640, lng: -5.850467});
            informacion.setContent("Ubicación por defecto. Geolocalización no soportada");
            informacion.open(mapa);
        }
    }
}

let m = new MapaDinamico();