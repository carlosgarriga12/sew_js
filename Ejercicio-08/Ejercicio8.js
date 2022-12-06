class Meteorologia{
    constructor() {
        this.lugares = ['Oviedo', 'Gijón', 'Avilés', 'Mieres', 'Navia'];
        this.apiKey = "0c30c2356f6e12ad8a02ff25940e7e1b";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
    }

    generarURL(lugar) {
        let aUrl = "http://api.openweathermap.org/data/2.5/weather?q=" 
        + lugar + "," 
        + this.codigoPais 
        + this.unidades 
        + this.idioma 
        + "&APPID=" 
        + this.apiKey;

        return aUrl;
    }

    cargarDatosEnLugar(lugar) {
            var seccion = document.createElement("section");
            seccion.innerHTML = '';
            $("button").before(seccion);

            $.ajax({
                dataType: "json",
                url: this.generarURL(lugar),
                method: 'GET',
                success: function(datos){
                    var datosMeteorologicos = '';
                        datosMeteorologicos += "<h2>Datos meteorológicos de " + datos.name + "</h2>"
                        datosMeteorologicos += "<img src='https://openweathermap.org/img/w/" + datos.weather[0].icon + ".png' alt='imagen representando el tiempo actual' >";
                        datosMeteorologicos += "<ul><li>País: " + datos.sys.country + "</li>";
                        datosMeteorologicos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                        datosMeteorologicos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                        datosMeteorologicos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                        datosMeteorologicos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                        datosMeteorologicos += "<li>Temperatura mínima: " + datos.main.temp_min + " grados Celsius</li>";
                        datosMeteorologicos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                        datosMeteorologicos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                        datosMeteorologicos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                        datosMeteorologicos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                        datosMeteorologicos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                        datosMeteorologicos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                        datosMeteorologicos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                        datosMeteorologicos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                        datosMeteorologicos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                        datosMeteorologicos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                        datosMeteorologicos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";

                    seccion.innerHTML = datosMeteorologicos;

                },
                error:function(){
                    $(seccion).remove();
                }
            });
    }

    cargarDatos() {
        this.lugares.forEach(lugar => this.cargarDatosEnLugar(lugar));
        $("button").attr("disabled","disabled");
    }
}

let m = new Meteorologia();