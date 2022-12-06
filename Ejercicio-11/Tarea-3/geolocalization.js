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
        this.apiKey = "AIzaSyAfPvwKFEh2NWOP7VjuHLpM6lhPsF45_mg";
        this.url = "";

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

    generarUrl(latitud, longitud) {
        this.url = "https://maps.googleapis.com/maps/api/staticmap?";
        this.url += "center=" + latitud + "," + longitud;
        this.url += "&zoom=16&size=800x600";
        this.url += "&markers=color:red%7Clabel:A%7C" + latitud + "," + longitud;
        this.url += "&sensor=false";
        this.url += "&key=";
        this.url += this.apiKey;

    }

    localizar() {
        let section = document.createElement('section');
        if (!this.error) {
            this.generarUrl(this.latitud, this.longitud)
            let strImg = '<img src=' + '\"' + this.url + '\"' + "alt='Mapa con su posición actual'>";
            section.innerHTML = strImg;

        } else {
            let strErrorMsg = "<h2>" + this.mensajeError + "</h2>" + "<p>Lo sentimos</p>";
            section.innerHTML = strErrorMsg;
        }

        $("body").append(section)
        $("button").attr("disabled","disabled");
     }
}

let localizador = new GeoLocalizacion();