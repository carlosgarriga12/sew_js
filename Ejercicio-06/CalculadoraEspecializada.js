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
        document.querySelector("#pila").value = result;
    }

    actualizarDato() {
        document.querySelector("#dato").value = this.dato;
    }

    cambiarFuncionesTrigonometricas() {
        if (this.funciones) {
            document.querySelector("body > main > section > input[type=button]:nth-child(6)").value = 'arcsen';
            document.querySelector("body > main > section > input[type=button]:nth-child(7)").value = 'arccos';
            document.querySelector("body > main > section > input[type=button]:nth-child(8)").value = 'arctan';
            this.funciones = false;
        } else {
            document.querySelector("body > main > section > input[type=button]:nth-child(6)").value = 'sen';
            document.querySelector("body > main > section > input[type=button]:nth-child(7)").value = 'cos';
            document.querySelector("body > main > section > input[type=button]:nth-child(8)").value = 'tan';
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

class CalculadoraEspecializada extends CalculadoraRPN{

    constructor() {
        super();
        this.pilaTexto = new Pila();
    }

    x(){    
        this.pila.push(x => x)
        this.pilaTexto.push('x');
        this.actualizarPantallaTexto();
    }

    cuadrado() {
        this.pila.push(x => Math.pow(x, 2))
        this.pilaTexto.push('x^2');
        this.actualizarPantallaTexto();
    }

    sin() {
        this.pila.push(x => Math.sin(x))
        this.pilaTexto.push('sen(x)');
        this.actualizarPantallaTexto();
    }

    cos() {
        this.pila.push(x => Math.cos(x))
        this.pilaTexto.push('cos(x)');
        this.actualizarPantallaTexto();
    }

    tan() {
        this.pila.push(x => Math.tan(x))
        this.pilaTexto.push('tan(x)');
        this.actualizarPantallaTexto();
    }

    raiz() {
        this.pila.push(x => Math.sqrt(x))
        this.pilaTexto.push('√x');
        this.actualizarPantallaTexto();
    }

    push() {
        if (this.dato.length > 0) {
            this.pila.push(Number(this.dato));
            this.pilaTexto.push(this.dato)
            this.actualizarPantallaTexto();
            this.limpiarDato();
        }
    }
    
    suma() {
        let f2 = this.pila.pop()
        let f2Str = this.pilaTexto.pop()
        let f1 = this.pila.pop()
        let f1Str = this.pilaTexto.pop()

        let result = x => f1(x) + f2(x)
        let resultStr = f1Str + "+" + f2Str
        this.pila.push(result)
        this.pilaTexto.push(resultStr)
        this.actualizarPantalla();
        this.actualizarPantallaTexto();
    }

    resta() {
        let f2 = this.pila.pop()
        let f2Str = this.pilaTexto.pop()
        let f1 = this.pila.pop()
        let f1Str = this.pilaTexto.pop()

        let result = x => f1(x) - f2(x)
        let resultStr = f1Str + "-" + f2Str
        this.pila.push(result)
        this.pilaTexto.push(resultStr)
        this.actualizarPantalla();
        this.actualizarPantallaTexto();
    }

    multiplicacion() {
        let f2 = this.pila.pop()
        let f2Str = this.pilaTexto.pop()
        let f1 = this.pila.pop()
        let f1Str = this.pilaTexto.pop()

        let result = x => f1(x) * f2(x)
        let resultStr = f1Str + "*" + f2Str
        this.pila.push(result)
        this.pilaTexto.push(resultStr)
        this.actualizarPantalla();
        this.actualizarPantallaTexto();
    }

    division() {
        let f2 = this.pila.pop()
        let f2Str = this.pilaTexto.pop()
        let f1 = this.pila.pop()
        let f1Str = this.pilaTexto.pop()

        let result = x => f1(x) / f2(x)
        let resultStr = f1Str + "/" + f2Str
        this.pila.push(result)
        this.pilaTexto.push(resultStr)
        this.actualizarPantalla();
        this.actualizarPantallaTexto();
    }

    //Calcular la derivada en un punto
    derivada() {
        let value = new Number(this.pila.pop())
        this.pilaTexto.pop();
        let f = this.pila.pop()
        this.pilaTexto.pop();   
        let fDerivada = this.derivadaDe(f)
        let result = fDerivada(value)

        this.pila.push(result)
        this.pilaTexto.push(result)
        this.actualizarPantalla();
        this.actualizarPantallaTexto();
    }

    derivadaDe(f) {
        let h = 0.0000001
        return x => (f(x + h) - f(x))/h
    }

    //Calcular la integral definida entre dos puntos
    integral() {
        let b = new Number(this.pila.pop());
        this.pilaTexto.pop();
        let a = new Number(this.pila.pop());
        this.pilaTexto.pop();
        let f = this.pila.pop()
        this.pilaTexto.pop();
        let result = this.integralEntreDosPuntos(f, a, b);

        this.pila.push(result);
        this.pilaTexto.push(result);
        this.actualizarPantalla();
        this.actualizarPantallaTexto();
    }

    //Vamos a resolver la integral definida entre dos puntos mediante la
    //formula del punto medio compuesta con 100 nodos
    integralEntreDosPuntos(f, a, b) {
        let n = 100;
        let h = Math.abs(b - a)/n
        
        let nodes = new Array();
        for(let i = 0; i < n; i++) {
            let result;
            if(i == 0) {
                result = a + h/2;
                nodes.push(result);
            } else {
                result = nodes[i - 1] + h;
                nodes.push(result);
            }
        }

        let initialValue = 0;
        let result = nodes.reduce((acc, curr) => acc + f(curr), initialValue) * h

        return result;
    }   

    limite() {
        let value = new Number(this.pila.pop())
        this.pilaTexto.pop();
        let f = this.pila.pop()
        this.pilaTexto.pop();

        let result = f(value)

        this.pila.push(result)
        this.pilaTexto.push(result)
        this.actualizarPantalla();
        this.actualizarPantallaTexto();
    }

    actualizarPantallaTexto() {
        let result = "";
        for(let i = 0; i < this.pilaTexto.len(); i++) {
            result += this.pilaTexto.get(i).toString() + "\n";
        }
        document.querySelector("#pila").value = result;
    }

    limpiar() {
        this.pila = new Pila();
        this.pilaTexto = new Pila();
        this.dato = '';
        this.actualizarPantalla();
        this.actualizarDato();
        this.actualizarPantallaTexto();
    }
}

let calculadora = new CalculadoraEspecializada();