class GeoLocalizacion{
    constructor (){
        this.longitud         
        this.latitud          
        this.altitud          
        this.precision        
        this.precisionAltitud 
        this.rumbo            
        this.velocidad
        this.error = false;
        this.mensajeError = '';

        navigator.geolocation.getCurrentPosition(position => {
            this.longitud         = position.coords.longitude; 
            this.latitud          = position.coords.latitude;  
            this.altitud          = position.coords.altitude;
            this.precision        = position.coords.accuracy;
            this.precisionAltitud = position.coords.altitudeAccuracy;
            this.rumbo            = position.coords.heading;
            this.velocidad        = position.coords.speed;
        }, error => {
            this.funcionError(error)            
        } 
        );
    }
    
    funcionError(error) {
        this.error = true;
        if(error.code == error.PERMISSION_DENIED) {
            this.mensajeError = "Permisos de localización no concedidos, no se ha podido localizar";
        } else if (error.code == error.POSITION_UNAVAILABLE) {
            this.mensajeError = "No ha sido posible encontrar su posición";            
        } else if (error.code == error.TIMEOUT) {
            this.mensajeError = "Ha agotado el tiempo de espera";
        } else if (error.code == error.UNKNOWN_ERROR) {
            this.mensajeError = "Ha ocurrido un error inesperado";
        }
    }

    localizar() {
        let section = document.createElement('section');
        
        if (!this.error) {
            section.innerHTML = "<h2>Ubicación ahora mismo</h2>";    
            let datos = '<ul><li>Longitud: ' + this.longitud + '</li>';
            datos += '<li>Latitud: ' + this.latitud + '</li>';
            datos += '<li>Altitud: ' + this.altitud + '</li>';
            datos += '<li>Precision: ' + this.precision + '</li>';
            datos += '<li>Precision altitud: ' + this.precision + '</li>';
            datos += '<li>Rumbo: ' + this.rumbo + '</li>';
            datos += '<li>Velocidad: ' + this.rumbo + '</li></ul>';
            section.innerHTML += datos;

        } else {
            section.innerHTML = "<h2>" + this.mensajeError + "</h2>";
            section.innerHTML += "<p>Lo sentimos</p>";
        }

        $("body").append(section)
        $("button").attr("disabled","disabled");
     }
}

let localizador = new GeoLocalizacion();