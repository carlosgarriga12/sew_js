class Oro {
    constructor() {
        this.apiKey = "6r1g0e0is2do1j3gqzs5z1gshiuec4j11zrzj23c3hlsf33qj482l2ck1jvn";
        this.metal = "XAU";
        this.base = "EUR";

    }

    generarUrl() {
        let url = "https://commodities-api.com/api/latest?access_key="
        url += this.apiKey;
        url += "&base=";
        url += this.base;
        url += "&symbols=";
        url += this.metal;
        console.log(url)
        return url;
    }

    mostrarPrecioDelOro() {
        // get the most recent exchange rates via the "latest" endpoint:
        $.ajax({
            url: this.generarUrl(),   
            dataType: 'json',
            success: function(json) {
                // exchange rata data is stored in json.rates
                let result = 1 / json.data.rates.XAU
                result = result.toFixed(2);
                $('input').val(result + "€")
            } ,
            error:function(){
                alert("ALGO HA IDO MAL");
            }
        });
    }

}

let oro = new Oro();