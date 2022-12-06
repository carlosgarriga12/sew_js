class GeoLocalizacion{
    constructor (){
        this.longitud         
        this.latitud          
        this.altitud          
        this.precision        
        this.precisionAltitud 
        this.rumbo            
        this.velocidad

        navigator.geolocation.getCurrentPosition(position => {
            this.longitud         = position.coords.longitude; 
            this.latitud          = position.coords.latitude;  
            this.altitud          = position.coords.altitude;
            this.precision        = position.coords.accuracy;
            this.precisionAltitud = position.coords.altitudeAccuracy;
            this.rumbo            = position.coords.heading;
            this.velocidad        = position.coords.speed;
        });
    }
    
    localizar() {
        let section = document.createElement('section')
        section.innerHTML = "<h2>Ubicación ahora mismo</h2>";

        $("body").append(section)

        let datos = '<ul><li>Longitud: ' + this.longitud + '</li>';
        datos += '<li>Latitud: ' + this.latitud + '</li>';
        datos += '<li>Altitud: ' + this.altitud + '</li>';
        datos += '<li>Precision: ' + this.precision + '</li>';
        datos += '<li>Precision altitud: ' + this.precision + '</li>';
        datos += '<li>Rumbo: ' + this.rumbo + '</li>';
        datos += '<li>Velocidad: ' + this.rumbo + '</li></ul>';

        section.innerHTML += datos;

        $("button").attr("disabled","disabled");
     }
}

let localizador = new GeoLocalizacion();