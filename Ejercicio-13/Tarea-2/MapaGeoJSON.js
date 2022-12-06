class MapGeoJSON {
    inicializarMapa(archivos) {
        let archivo = archivos[0];

        if (archivo.name.includes(".GeoJSON")) { 
            
            var parqueSanFrancisco = {lat: 43.361640, lng: -5.850467};

            var infoWindow = new google.maps.InfoWindow();

            var mapa = new google.maps.Map(document.querySelector("main"), {
                zoom: 15,
                center: parqueSanFrancisco,
            });
            
            let reader = new FileReader();
            reader.onload = () => {
                mapa.data.addGeoJson(JSON.parse(reader.result));
            };
            reader.readAsText(archivo);

            mapa.data.addListener('click', (event) => {
                infoWindow.setPosition(event.feature.getGeometry().get());
                infoWindow.setContent(event.feature.getProperty("name"));
                infoWindow.open(mapa);
            });

        } else {
            $('main').html("<h2>Archivo no válido</h2><p>Solo admitimos archivos GeoJSON</p>");
        }
    }
}

let m = new MapGeoJSON();