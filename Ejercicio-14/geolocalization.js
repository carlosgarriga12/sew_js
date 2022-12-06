class Mapa {
    constructor() {
        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              this.toggleFullScreen();
            }
          }, false);
    }

    inicializarMapa(archivos) {
        let archivo = archivos[0];
        const directionsService = new google.maps.DirectionsService();

        if(archivo.name.includes(".GeoJSON")) {
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
                    new google.maps.Marker({
                        position: posicion,
                        map: mapa
                    });
                    let reader = new FileReader();
                    let coordenadaDeDestino;
                    reader.onload = () => {
                        let json = JSON.parse(reader.result);

                        let longitud = json.features[0].geometry.coordinates[0];
                        let latitud = json.features[0].geometry.coordinates[1];
                        coordenadaDeDestino = {
                            lat: latitud,
                            lng: longitud
                        }

                        new google.maps.Marker({
                            position: coordenadaDeDestino,
                            map: mapa
                        });

                        directionsService.route({
                            origin: posicion,
                            destination: coordenadaDeDestino,
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
                    };

                    reader.readAsText(archivo);
                }
                )
            }
        } else {
            $('main').html("<h2>Archivo no válido</h2><p>Solo admitimos archivos GeoJSON</p>");
        }
    }

    toggleFullScreen() {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else if (document.exitFullscreen) {
          document.exitFullscreen();
        }
    }

}

let m = new Mapa();