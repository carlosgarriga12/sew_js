class CargadorDeArchivos{
    cargarArchivos(archivos) {
        let txt = "text/plain";
        let json = "application.json";
        let xml = "text/xml";

        this.archivo = archivos[0];
        let type = this.archivo.type;
        let content = ""

        if (type.match(txt) || type.match(json) || type.match(xml)) {
            content = "<h2>Archivo encontrado</h2>";
            content += "<ul><li>Nombre del archivo: " + this.archivo.name + "</li>";
            content += "<li>Tipo del archivo: " + this.archivo.type + "</li>";
            content += "<li>Tamaño del archivo: " + this.archivo.size + " bytes</li></ul>";
            content += "<p>Contenido del archivo: </p>";
            content += "<pre></pre>";
            let reader = new FileReader();

            reader.onload = evento => $('pre').text(reader.result);
            reader.readAsText(this.archivo);
            
        } else {
            content += "<h2>Tipo de archivo no válido</h2>";
            content += "<p>Porfavor seleccione un archivo de texto, JSON o XML";
            
        }

        $('main').html(content);
    }
}

let c = new CargadorDeArchivos();