class MapaDinamico {
    inicializarMapa() {
        //Coordenadas de la estatua de Mafalda
        var mapa = new google.maps.Map(document.querySelector("main"), 
                                                {zoom: 15, 
                                                center: {lat: 43.361640, lng: -5.850467},
						mapTypeId: google.maps.MapTypeId.SATELLITE});

        var marcador = new google.maps.Marker({
			position: {lat: 43.361640, lng: -5.850467}, 
			map: mapa
        });
    }
}

let m = new MapaDinamico();