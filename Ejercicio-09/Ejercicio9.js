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
        + "&mode=xml"
        + "&APPID=" 
        + this.apiKey;

        return aUrl;
    }

    cargarDatosEnLugar(lugar) {
            var seccion = document.createElement("section");
            seccion.innerHTML = '';
            $('button').before(seccion);

            $.ajax({
                dataType: "xml",
                url: this.generarURL(lugar),
                method: 'GET',
                success: function(datos){
                    
                    var ciudad                = $('city',datos).attr("name");
                    var longitud              = $('coord',datos).attr("lon");
                    var latitud               = $('coord',datos).attr("lat");
                    var pais                  = $('country',datos).text();
                    var amanecer              = $('sun',datos).attr("rise");
                    var minutosZonaHoraria    = new Date().getTimezoneOffset();
                    var amanecerMiliSeg1970   = Date.parse(amanecer);
                        amanecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                    var amanecerLocal         = (new Date(amanecerMiliSeg1970)).toLocaleTimeString("es-ES");
                    var oscurecer             = $('sun',datos).attr("set");          
                    var oscurecerMiliSeg1970  = Date.parse(oscurecer);
                        oscurecerMiliSeg1970  -= minutosZonaHoraria * 60 * 1000;
                    var oscurecerLocal        = (new Date(oscurecerMiliSeg1970)).toLocaleTimeString("es-ES");
                    var temperatura           = $('temperature',datos).attr("value");
                    var temperaturaMin        = $('temperature',datos).attr("min");
                    var temperaturaMax        = $('temperature',datos).attr("max");
                    var temperaturaUnit       = $('temperature',datos).attr("unit");
                    var humedad               = $('humidity',datos).attr("value");
                    var humedadUnit           = $('humidity',datos).attr("unit");
                    var presion               = $('pressure',datos).attr("value");
                    var presionUnit           = $('pressure',datos).attr("unit");
                    var velocidadViento       = $('speed',datos).attr("value");
                    var nombreViento          = $('speed',datos).attr("name");
                    var direccionViento       = $('direction',datos).attr("value");
                    var codigoViento          = $('direction',datos).attr("code");
                    var nombreDireccionViento = $('direction',datos).attr("name");
                    var nubosidad             = $('clouds',datos).attr("value");
                    var nombreNubosidad       = $('clouds',datos).attr("name");
                    var visibilidad           = $('visibility',datos).attr("value");
                    var precipitacionValue    = $('precipitation',datos).attr("value");
                    var precipitacionMode     = $('precipitation',datos).attr("mode");
                    var descripcion           = $('weather',datos).attr("value");
                    var horaMedida            = $('lastupdate',datos).attr("value");
                    var horaMedidaMiliSeg1970 = Date.parse(horaMedida);
                        horaMedidaMiliSeg1970 -= minutosZonaHoraria * 60 * 1000;
                    var horaMedidaLocal       = (new Date(horaMedidaMiliSeg1970)).toLocaleTimeString("es-ES");
                    var fechaMedidaLocal      = (new Date(horaMedidaMiliSeg1970)).toLocaleDateString("es-ES");


                    var datosMeteorologicos = '';
                        datosMeteorologicos += "<h2>Datos meteorológicos de " + ciudad + "</h2>"
                        datosMeteorologicos += "<img src='https://openweathermap.org/img/w/" + $('weather',datos).attr("icon") + ".png' alt='imagen representando el tiempo actual' >";
                        datosMeteorologicos += "<ul><li>País: " + pais + "</li>";
                        datosMeteorologicos += "<li>Latitud: " + latitud + " grados</li>";
                        datosMeteorologicos += "<li>Longitud: " + longitud + " grados</li>";
                        datosMeteorologicos += "<li>Temperatura: " + temperatura + " grados Celsius</li>";
                        datosMeteorologicos += "<li>Temperatura máxima: " + temperaturaMax + " grados Celsius</li>";
                        datosMeteorologicos += "<li>Temperatura mínima: " + temperaturaMin + " grados Celsius</li>";
                        datosMeteorologicos += "<li>Temperatura (unidades): " + temperaturaUnit + "</li>";
                        datosMeteorologicos += "<li>Presión: " + presion + " " + presionUnit +"</li>";
                        datosMeteorologicos += "<li>Humedad: " + humedad + " " + humedadUnit + " </li>";
                        datosMeteorologicos += "<li>Amanece a las: " + amanecerLocal + "</li>";
                        datosMeteorologicos += "<li>Oscurece a las: " + oscurecerLocal + "</li>";
                        datosMeteorologicos += "<li>Nombre viento: " + nombreViento + "</li>";
                        datosMeteorologicos += "<li>Nombre del viento: " + nombreDireccionViento + "</li>";
                        datosMeteorologicos += "<li>Codigo del viento: " + codigoViento + "</li>";
                        datosMeteorologicos += "<li>Dirección del viento: " + direccionViento + " grados</li>";
                        datosMeteorologicos += "<li>Velocidad del viento: " + velocidadViento + " metros/segundo</li>";
                        datosMeteorologicos += "<li>Hora de la medida: " + horaMedidaLocal + "</li>";
                        datosMeteorologicos += "<li>Fecha de la medida: " + fechaMedidaLocal + "</li>";
                        datosMeteorologicos += "<li>Precipitación valor: " + precipitacionValue + " </li>";
                        datosMeteorologicos += "<li>Precipitación modo: " + precipitacionMode + " </li>";
                        datosMeteorologicos += "<li>Descripción: " + descripcion + "</li>";
                        datosMeteorologicos += "<li>Visibilidad: " + visibilidad + " metros</li>";
                        datosMeteorologicos += "<li>Nubosidad: " + nubosidad + " %</li>";
                        datosMeteorologicos += "<li>Nombre nubosidad: " + nombreNubosidad + " </li></ul>";

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