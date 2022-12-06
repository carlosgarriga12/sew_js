class Modificacion{

    mostrarParrafos() {
        $("p").show();
    }

    esconderParrafos() {
        $("p").hide();
    }

    modificarDatosTabla() {
        $("table tr td").each(function() {
            $(this).text("Hola");
        });
    }

    agregarParrafo() {
        $("article").append("<p>Párrafo añadido correctamente</p>")
    }

    iterarElementos() {
        $("*", document).each(function () {
            var parent = $(this).parent().get(0).tagName;
            var tipoElemento = $(this).get(0).tagName;
            $(this).append(document.createTextNode(" Padre : <" + parent + "> elemento : <" + tipoElemento + ">"));
        });
    }

    sumarFila() {
        var numberOfColumns = $('table tr:first').children().length;
        let str = "";
        for(let i = 0; i < numberOfColumns; i++) {
            str += "<td>fila</td>";
        }
        $('table').append('<tr>' + str +'</tr>');
    }

    sumarColumna() {
        $("table tr:first").append('')
        var first = true;
        $("table tr").each(function () {
            if (!first) {
                $(this).append('<td>dato</td>');
            } else {
                $(this).append('<th>columna</th>');
            }
            first = false;
        });
    }
}

let m = new Modificacion();