class CalculadoraRPN {
    constructor() {
        this.pila= new Pila();
        this.pantalla = '';
        this.dato = '';
        this.funciones = true;

        document.addEventListener('keydown', (event) => {
            const key = event.key;
            
            if (key !== ' ') {
                if (Number.isInteger(Number(key)) || key === '.')
                    this.digitos(key);
                else {
                    if (key === '+')
                        this.suma();
                    else if (key === '-')
                        this.resta();
                    else if (key === '*')
                        this.multiplicacion();
                    else if (key === '/')
                        this.division();
                    else if (key === 'Enter')
                        this.push();
                }
            }
        });
    }

    digitos(digito) {
        this.dato += digito;
        this.actualizarDato();
    }

    suma() {
        if (this.pila.len() >= 2) {
            let op2 =  this.pila.pop();
            let op1 = this.pila.pop();
            let result = eval(op1 + "+" + op2);
            this.pila.push(result);
            this.actualizarPantalla();
        }
    }

    resta() {
        if (this.pila.len() >= 2) {
            let op2 =  this.pila.pop();
            let op1 = this.pila.pop();
            let result = eval(op1 + "-" + op2);
            this.pila.push(result);
            this.actualizarPantalla();
        }
    }

    multiplicacion() {
        if (this.pila.len() >= 2) {
            let op2 =  this.pila.pop();
            let op1 = this.pila.pop();
            let result = eval(op1 + "*" + op2);
            this.pila.push(result);
            this.actualizarPantalla();
        }
    }

    division() {
        if (this.pila.len() >= 2) {
            let op2 =  this.pila.pop();
            let op1 = this.pila.pop();
            let result = eval(op1 + "/" + op2);
            this.pila.push(result);
            this.actualizarPantalla();
        }
    }

    raiz() {
        if(this.pila.len() >= 1) {
            let op = this.pila.pop();
            let result = eval(Math.sqrt(op));
            this.pila.push(result);
            this.actualizarPantalla();
        }
    }

    cuadrado() {
        if(this.pila.len() >= 1) {
            let op = this.pila.pop();
            let result = eval(op + "**2");
            this.pila.push(result);
            this.actualizarPantalla();
        }
    }

    logaritmo() {
        if(this.pila.len() >= 1) {
            let op = this.pila.pop();
            let result = eval(Math.log10(op));
            this.pila.push(result);
            this.actualizarPantalla();
        }
    }

    limpiar() {
        this.pila = new Pila();
        this.dato = '';
        this.actualizarPantalla();
        this.actualizarDato();
    }

    seno() {
        if(this.pila.len() >= 1) {
            let op = this.pila.pop();
            op = op * Math.PI / 180
            let result;
            if(this.funciones) {
                result = eval(Math.sin(op)) 
            } else {
                result = eval(Math.asin(op))
            }
            this.pila.push(result);
            this.actualizarPantalla();
        }
    }

    coseno() {
        if(this.pila.len() >= 1) {
            let op = this.pila.pop();
            op = op * Math.PI / 180
            let result;
            if(this.funciones) {
                result = eval(Math.cos(op)) 
            } else {
                result = eval(Math.acos(op))
            }
            this.pila.push(result);
            this.actualizarPantalla();
        }
    }

    tangente() {
        if(this.pila.len() >= 1) {
            let op = this.pila.pop();
            op = op * Math.PI / 180
            let result;
            if(this.funciones) {
                result = eval(Math.tan(op)) 
            } else {
                result = eval(Math.atan(op))
            }
            this.pila.push(result);
            this.actualizarPantalla();
        }
    }

    push() {
        if (this.dato.length > 0) {
            this.pila.push(Number(this.dato));
            this.actualizarPantalla();
            this.limpiarDato();
        }
    }

    limpiarDato() {
        this.dato = '';
        this.actualizarDato();
    }

    actualizarPantalla() {
        let result = "";
        for(let i = 0; i < this.pila.len(); i++) {
            result += this.pila.get(i).toString() + "\n";
        }
        document.getElementsByName("pila")[0].value = result;
    }

    actualizarDato() {
        document.getElementsByName("dato")[0].value = this.dato;
    }

    cambiarFuncionesTrigonometricas() {
        if (this.funciones) {
            document.querySelector("body > main > form > input[type=button]:nth-child(10)").value = 'arcsen';
            document.querySelector("body > main > form > input[type=button]:nth-child(11)").value = 'arccos';
            document.querySelector("body > main > form > input[type=button]:nth-child(12)").value = 'arctan';
            this.funciones = false;
        } else {
            document.querySelector("body > main > form > input[type=button]:nth-child(10)").value = 'sen';
            document.querySelector("body > main > form > input[type=button]:nth-child(11)").value = 'cos';
            document.querySelector("body > main > form > input[type=button]:nth-child(12)").value = 'tan';
            this.funciones = true;
        }
    }

    punto() {
        if(!this.dato.includes('.') && this.dato.length > 0) {
            this.dato += '.';
        }
        this.actualizarDato();
    }
}

class Pila {

    constructor() {
        this.pila = new Array();
    }

    push(valor) {
        this.pila.push(valor);
    }

    pop() {
        return this.pila.pop();
    }

    get(index) {
        return this.pila[index];
    }

    len() {
        return this.pila.length;
    }

}

let calculadora = new CalculadoraRPN();