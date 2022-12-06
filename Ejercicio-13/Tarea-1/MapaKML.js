class MapaKMl {

    inicializarMapa(coordenadas) {
        var parqueSanFrancisco = {lat: 43.361640, lng: -5.850467};

        var mapa = new google.maps.Map(document.querySelector("main"), {
          zoom: 15,
          center: parqueSanFrancisco,
        }); 
        
        coordenadas.forEach((pos) => {
            new google.maps.Marker({
                position: pos,
                map: mapa,
              });
        })
    }
    
    leerKML(datos) {
        let coordenadas = new DOMParser().parseFromString(datos, "text/xml").getElementsByTagName("coordinates");

        let coordenadasParseadas = []

        for(let coordenada of coordenadas) {
            let coordenadaSplit = coordenada.innerHTML.trim().split(",")
            let coord = {
                lat: Number(coordenadaSplit[1]),
                lng: Number(coordenadaSplit[0])
            }

            coordenadasParseadas.push(coord);
        }

        this.inicializarMapa(coordenadasParseadas);

    }

    cargarArchivos(archivos) {
        let archivo = archivos[0];
        let reader = new FileReader();

        if (archivo.name.match(/.kml/)) { // Leemos el archivo... 
            reader.onload = e => this.leerKML(reader.result);
            reader.readAsText(archivo);
        } else // Si el archivo no es KML...
            $('main').html("<h2>Archivo no válido</h2><p>Solo admitimos archivos KML</p>");
    }
}

let m = new MapaKMl();