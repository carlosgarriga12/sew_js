class CalculadoraMilan{
    
    constructor() {
        this.pantalla = '';
        this.memoria = new Number(0);
        this.operandos = new Array();
        this.operandoPulsado = false;
        this.op1 = "";
        this.op2 = "";
        this.igualPulsado = false;

        document.addEventListener('keydown', (event) => {
            const key = event.key;
            
            if (key !== ' ') { 
                if (Number.isInteger(Number(key)))
                    this.digitos(key);
                else {
                    if (key === '.')
                        this.punto();
                    else if (key === '+')
                        this.suma();
                    else if (key === '-')
                        this.resta();
                    else if (key === '*')
                        this.multiplicacion();
                    else if (key === '/')
                        this.division();
                    else if (key.toUpperCase() === 'C')
                        this.borrar();
                    else if (key === 'Enter')
                        this.calcular();
                }
            }
        });
    }   

    digitos(digito){
        if (this.op1.length == 0 && this.op2.length == 0 && this.operandos.length == 0) {
            this.pantalla = '';
        }
        if (this.operandos.length == 0) {
            this.op1 += digito;
            this.pantalla += digito;
        } else {
            if (this.op2.length == 0) {
                this.pantalla = '';
            } 
            if (this.operandoPulsado) {
                this.op2 = '';
            }
            this.op2 += digito;
            this.pantalla += digito;
        }
        this.operandoPulsado = false;
        this.actualizaPantalla();
    }

    punto(){
        if (this.operandos.length == 0) {
            if(this.op1.includes('.') || this.op1.length == 0) {
                return;
            }
            this.op1 += '.';
            this.pantalla += '.';
        } else {
            if(this.op2.includes('.') || this.op2.length == 0) {
                return;
            }
            this.op2 += '.';
            this.pantalla += '.';
        }
        this.actualizaPantalla();
    }
    
    suma(){
        //Comprueba si ya se presionó la tecla antes
        if (this.op1.length !=0 && !this.operandoPulsado) {
            //En el caso de que tengamos más operandos calculamos el resultado previo
            if (this.operandos.length > 0 && this.op2.length > 0 && !this.igualPulsado) {
                let result = eval(this.op1 + this.operandos.shift() + this.op2);
                this.pantalla = "" + result;
                this.op1 = "" + result;
                this.op2 = "";
                this.actualizaPantalla();
            }
            if (this.igualPulsado) {
                this.operandos = new Array();
            }
            this.operandos.push('+');
            this.pantalla = '';
            this.operandoPulsado = true;
            this.igualPulsado =  false;
        }
    }

    resta(){
        if (this.op1.length !=0 && !this.operandoPulsado) {
            if (this.operandos.length > 0 && this.op2.length > 0 && !this.igualPulsado) {
                let result = eval(this.op1 + this.operandos.shift() + this.op2);
                this.pantalla = "" + result;
                this.op1 = "" + result;
                this.op2 = "";
                this.actualizaPantalla();
            }
            if (this.igualPulsado) {
                this.operandos = new Array();
            }
            this.operandos.push('-');
            this.pantalla = '';
            this.operandoPulsado = true;
            this.igualPulsado =  false;
        }
    }

    multiplicacion(){
        if (this.op1.length !=0 && !this.operandoPulsado) {
            if (this.operandos.length > 0 && this.op2.length > 0 && !this.igualPulsado) {
                let result = eval(this.op1 + this.operandos.shift() + this.op2);
                this.pantalla = "" + result;
                this.op1 = "" + result;
                this.op2 = "";
                this.actualizaPantalla();
            }
            if (this.igualPulsado) {
                this.operandos = new Array();
            }
            this.operandos.push('*');
            this.pantalla = '';
            this.operandoPulsado = true;
            this.igualPulsado =  false;
        }
    }

    division(){
        if (this.op1.length !=0 && !this.operandoPulsado) {
            if (this.operandos.length > 0 && this.op2.length > 0 && !this.igualPulsado) {
                let result = eval(this.op1 + this.operandos.shift() + this.op2);
                this.pantalla = "" + result;
                this.op1 = "" + result;
                this.op2 = "";
                this.actualizaPantalla();
            }
            if (this.igualPulsado) {
                this.operandos = new Array();
            }
            this.operandos.push('/');
            this.pantalla = '';
            this.operandoPulsado = true;
            this.igualPulsado =  false;
        }
    }

    mrc(){
        if (this.operandos.length == 0) {
            if (this.op1.length != 0) {
                if (typeof this.op1 != Number) {
                    this.op1 = new Number(this.op1);
                }
                this.memoria = this.op1;
                document.querySelector('input[type=text]').value = "M " + this.op1;
                this.op1 = "";
            }
        } else {
            if (this.op2.length != 0) {
                if (this.igualPulsado) {
                    document.querySelector('input[type=text]').value = "M " + this.memoria;
                } else {
                    let result = eval(this.op1 + this.operandos[0] + this.op2);
                    this.memoria = result;
                    document.querySelector('input[type=text]').value = "M " + result;
                }
                this.op1 = "";
                this.op2 = "";
                this.operandos = new Array();
            }
        }
    }

    mMenos(){
        if (this.operandos.length == 0) {
            if (this.op1.length != 0) {
                if (typeof this.op1 != Number) {
                    this.op1 = new Number(this.op1);
                }
                this.memoria = this.memoria - this.op1;
                document.querySelector('input[type=text]').value = "M " + this.op1;
                this.op1 = "";
            }
        } else {
            if (this.op2.length != 0) {
                let result = eval(this.op1 + this.operandos[0] + this.op2);
                this.memoria = this.memoria - result;
                document.querySelector('input[type=text]').value = "M " + this.memoria;
                this.op1 = "";
                this.op2 = "";
                this.operandos = new Array();
            }
        }
    }

    mMas(){
        if (this.operandos.length == 0) {
            if (this.op1.length != 0) {
                if (typeof this.op1 != Number) {
                    this.op1 = new Number(this.op1);
                }
                this.memoria = this.memoria + this.op1;
                document.querySelector('input[type=text]').value = "M " + this.op1;
                this.op1 = "";
            }
        } else {
            if (this.op2.length != 0) {
                let result = eval(this.op1 + this.operandos[0] + this.op2);
                this.memoria = this.memoria + result;
                document.querySelector('input[type=text]').value = "M " + this.memoria;
                this.op1 = "";
                this.op2 = "";
                this.operandos = new Array();
            }
        }
    }

    porcentaje(){
        if (this.op1.length == 0) {
            return;
        } else {
            if (this.op2.length != 0 && this.operandos.length != 0) {
                if (typeof op1 != Number) {
                    this.op1 = new Number(this.op1)
                }
                let result;
                if (this.operandos[0] == '+' || this.operandos[0] == '-') {
                    result = eval(this.op1 + this.operandos[0] + this.op1 
                        + "*" + this.op2 + "/" + 100)
                } else if (this.operandos[0] == '*'){
                    result = eval(this.op1 + this.operandos[0] + this.op2 + "/" + 100)
                } else {
                    result = eval(this.op1 + this.operandos[0] + this.op2 + "*" + 100)
                }
                this.op1 = result;
                this.pantalla = result;
                this.actualizaPantalla();
            } else {
                this.op1 = "0";
                this.pantalla = this.op1;
            }
        }
    }

    raiz(){
        if (typeof op1 != Number) {
            this.op1 = new Number(this.op1);
        }
        this.op1 = Math.sqrt(this.op1);
        this.pantalla = this.op1;
        this.op2 = "";
        this.actualizaPantalla();
    }

    masMenos() {
        if (this.pantalla.length == 0) {
            return;
        }
        if(this.operandos.length == 0) {
            if (typeof this.op1 != Number) {
                this.op1 = new Number(this.op1);
                this.op1 *= -1;
                this.pantalla = this.op1;
            } 
        } else {
            if (typeof this.op2 != Number) {
                this.op2 = new Number(this.op2);
                this.op2 *= -1;
                this.pantalla = this.op2;
            } 
        }
        this.actualizaPantalla();
    }

    calcular () {
        let result;
        if ((this.operandos[0] == '*' || this.operandos[0] ==  '/') 
            && this.op2.length == 0) {
            this.op2 = 1;
            result = eval(this.op1 + this.operandos[0] + this.op2);
            this.op2 = result;
            this.operandoPulsado = false;
        } else {
            try  {
                if (this.op1.length == 0) {
                    return;
                }
                if (this.operandos.length == 0) {
                    result = this.op1;
                } else {
                    result = eval(this.op1 + this.operandos[0] + this.op2);
                }
                if (result == Infinity) {
                    throw err;
                }
            } catch (err) {
                this.borrar();
                this.pantalla = 'MATH ERROR';
                this.actualizaPantalla();
                return;
            }
            
            this.pantalla = result;
            this.actualizaPantalla();
            this.op1 = result;
            this.igualPulsado = true;
        }
    }

    actualizaPantalla() {
       document.querySelector('input[type=text]').value = this.pantalla;
    }

    ce() {
        if (this.operandos.length != 0) {
            this.op2 = '';
        } else {
            this.op1 = '';
        }
        document.querySelector('input[type=text]').value = '0';
    }

    borrar(){
        this.pantalla = '0';
        this.memoria = new Number(0);
        this.operandos = new Array();
        this.operandoPulsado = false;
        this.op1 = "";
        this.op2 = "";
        this.igualPulsado = false;
        this.actualizaPantalla();
    }
}

class CalculadoraCientifica extends CalculadoraMilan {
    constructor() {
        super();
        //Si los grados están en falso es que la unidad son radianes
        this.grados = true;
        this.notacion = false;
        this.hyperbolicFunctions = false;
        this.arc = false;
        this.memoriaCientifica = null;
    }

    seno() {
        if (!this.operandoPulsado) {
            if (this.op1.length != 0) {
                this.op1 = new Number(this.op1);
                let result;
                if (this.grados) {
                    this.op1 = this.op1 * Math.PI / 180  
                } 
                if (this.hyperbolicFunctions) {
                    if (this.arc) {
                        result = eval(Math.asinh(this.op1))
                    } else {
                        result = eval(Math.sinh(this.op1))
                    }   
                } else {
                    if (this.arc) {
                        result = eval(Math.asin(this.op1))
                    } else {
                        result = eval(Math.sin(this.op1))
                    }
                }
                this.op1 = result;
                this.pantalla = this.op1;
                this.actualizaPantalla();
            }
        } else {
            if (this.op2.length != 0) {
                this.op2 = new Number(this.op2);
                let result;
                if (this.grados) {
                    this.op2 = this.op2 * Math.PI / 180  
                } 
                if (this.hyperbolicFunctions) {
                    if (this.arc) {
                        result = eval(Math.asinh(this.op2))
                    } else {
                        result = eval(Math.sinh(this.op2))
                    }   
                } else {
                    if (this.arc) {
                        result = eval(Math.asin(this.op2))
                    } else {
                        result = eval(Math.sin(this.op2))
                    }
                }
                this.op2 = result;
                this.pantalla = this.op2;
                this.actualizaPantalla();
            }
        }
    }

    coseno() {
        if (!this.operandoPulsado) {
            if (this.op1.length != 0) {
                this.op1 = new Number(this.op1);
                let result;
                if (this.grados) {
                    this.op1 = this.op1 * Math.PI / 180  
                }
                if (this.hyperbolicFunctions) {
                    if (this.arc) {
                        result = eval(Math.acosh(this.op1))
                    } else {
                        result = eval(Math.cosh(this.op1))
                    }   
                } else {
                    if (this.arc) {
                        result = eval(Math.acos(this.op1))
                    } else {
                        result = eval(Math.cos(this.op1))
                    }
                }
                result = eval(Math.cos(this.op1))
                this.op1 = result;
                this.pantalla = this.op1;
                this.actualizaPantalla();
            }
        } else {
            if (this.op2.length != 0) {
                this.op2 = new Number(this.op2);
                let result;
                if (this.grados) {
                    this.op2 = this.op2 * Math.PI / 180  
                } 
                if (this.hyperbolicFunctions) {
                    if (this.arc) {
                        result = eval(Math.acosh(this.op2))
                    } else {
                        result = eval(Math.cosh(this.op2))
                    }   
                } else {
                    if (this.arc) {
                        result = eval(Math.acos(this.op2))
                    } else {
                        result = eval(Math.cos(this.op2))
                    }
                }
                this.op2 = result;
                this.pantalla = this.op2;
                this.actualizaPantalla();
            }
        }
    }

    tangente() {
        if (!this.operandoPulsado) {
            if (this.op1.length != 0) {
                this.op1 = new Number(this.op1);
                let result;
                if (this.grados) {
                    this.op1 = this.op1 * Math.PI / 180  
                } 
                if (this.hyperbolicFunctions) {
                    if (this.arc) {
                        result = eval(Math.atanh(this.op1))
                    } else {
                        result = eval(Math.tanh(this.op1))
                    }   
                } else {
                    if (this.arc) {
                        result = eval(Math.atan(this.op1))
                    } else {
                        result = eval(Math.tan(this.op1))
                    }
                }
                this.op1 = result;
                this.pantalla = this.op1;
                this.actualizaPantalla();
            }
        } else {
            if (this.op2.length != 0) {
                this.op2 = new Number(this.op2);
                let result;
                if (this.grados) {
                    this.op2 = this.op2 * Math.PI / 180  
                } 
                if (this.hyperbolicFunctions) {
                    if (this.arc) {
                        result = eval(Math.atanh(this.op2))
                    } else {
                        result = eval(Math.tanh(this.op2))
                    }   
                } else {
                    if (this.arc) {
                        result = eval(Math.atan(this.op2))
                    } else {
                        result = eval(Math.tan(this.op2))
                    }
                }
                this.op2 = result;
                this.pantalla = this.op2;
                this.actualizaPantalla();
            }
        }
    }

    logaritmo() {
        if (!this.operandoPulsado) {
            if (this.op1.length != 0) {
                this.op1 = new Number(this.op1);
                let result = eval(Math.log10(this.op1));
                this.op1 = result;
                this.pantalla = this.op1;
                this.actualizaPantalla();
            }
        } else {
            if (this.op2.length != 0) {
                this.op2 = new Number(this.op2);
                let result = eval(Math.log10(this.op2))
                this.op2 = result;
                this.pantalla = this.op2;
                this.actualizaPantalla();
            }
        }
    }

    modulo() {
        if (this.op1.length !=0 && !this.operandoPulsado) {
            //En el caso de que tengamos más operandos calculamos el resultado previo
            if (this.operandos.length > 0 && this.op2.length > 0 && !this.igualPulsado) {
                let result = eval(this.op1 + this.operandos.shift() + this.op2);
                this.pantalla = "" + result;
                this.op1 = "" + result;
                this.op2 = "";
                this.actualizaPantalla();
            }
            if (this.igualPulsado) {
                this.operandos = new Array();
            }
            this.operandos.push('%');
            this.pantalla = '';
            this.operandoPulsado = true;
            this.igualPulsado =  false;
        }
    }

    cambiarFuncionesTrigonometricas() {
        if (!this.arc) {
            document.querySelector("body > main > section > input[type=button]:nth-child(3)").value = 'arcsen';
            document.querySelector("body > main > section > input[type=button]:nth-child(4)").value = 'arccos';
            document.querySelector("body > main > section > input[type=button]:nth-child(5)").value = 'arctan';
            this.arc = true;
        } else {
            document.querySelector("body > main > section > input[type=button]:nth-child(3)").value = 'sen';
            document.querySelector("body > main > section > input[type=button]:nth-child(4)").value = 'cos';
            document.querySelector("body > main > section > input[type=button]:nth-child(5)").value = 'tan';
            this.arc = false;
        }
    }

    cambiarFuncionesHiperbolicas() {
        if (!this.hyperbolicFunctions) {
            document.querySelector("body > main > section > input[type=button]:nth-child(3)").value += 'h';
            document.querySelector("body > main > section > input[type=button]:nth-child(4)").value += 'h';
            document.querySelector("body > main > section > input[type=button]:nth-child(5)").value += 'h';
            this.hyperbolicFunctions = true;
        } else {
            document.querySelector("body > main > section > input[type=button]:nth-child(3)").value = 
                document.querySelector("body > main > section > input[type=button]:nth-child(3)").value.substring(0, 
                document.querySelector("body > main > section > input[type=button]:nth-child(3)").value.length - 1);
            document.querySelector("body > main > section > input[type=button]:nth-child(4)").value = 
                document.querySelector("body > main > section > input[type=button]:nth-child(4)").value.substring(0, 
                document.querySelector("body > main > section > input[type=button]:nth-child(4)").value.length - 1);
            document.querySelector("body > main > section > input[type=button]:nth-child(5)").value = 
                document.querySelector("body > main > section > input[type=button]:nth-child(5)").value.substring(0, 
                document.querySelector("body > main > section > input[type=button]:nth-child(5)").value.length - 1);
            this.hyperbolicFunctions = false;
        }
    }

    factorialDe(numero) {
        if (numero == 0) {
            return 1;
        } else {
            return numero  * this.factorialDe(numero - 1)
        }
    }

    factorial() {
        if (!this.operandoPulsado) {
            if (this.op1.length != 0) {
                this.op1 = new Number(this.op1);
                let result = this.factorialDe(this.op1);
                this.op1 = result;
                this.pantalla = this.op1;
                this.actualizaPantalla();
            }
        } else {
            if (this.op2.length != 0) {
                this.op2 = new Number(this.op2);
                let result = this.factorialDe(this.op2);
                this.op2 = result;
                this.pantalla = this.op2;
                this.actualizaPantalla();
            }
        }
    }

    cuadrado() {
        if (!this.operandoPulsado) {
            if (this.op1.length != 0) {
                this.op1 = new Number(this.op1);
                let result = eval(this.op1 + "**" + 2);
                this.op1 = result;
                this.pantalla = this.op1;
                this.actualizaPantalla();
            }
        } else {
            if (this.op2.length != 0) {
                this.op2 = new Number(this.op2);
                let result = eval(this.op2 + "**" + 2);
                this.op2 = result;
                this.pantalla = this.op2;
                this.actualizaPantalla();
            }
        }
    }
    
    exponente() {
        //Comprueba si ya se presionó la tecla antes
        if (this.op1.length !=0 && !this.operandoPulsado) {
            //En el caso de que tengamos más operandos calculamos el resultado previo
            if (this.operandos.length > 0 && this.op2.length > 0 && !this.igualPulsado) {
                let result = eval(this.op1 + this.operandos.shift() + this.op2);
                this.pantalla = "" + result;
                this.op1 = "" + result;
                this.op2 = "";
                this.actualizaPantalla();
            }
            if (this.igualPulsado) {
                this.operandos = new Array();
            }
            this.operandos.push('**');
            this.pantalla = '';
            this.operandoPulsado = true;
            this.igualPulsado =  false;
        }
    }

    exp() {
        if (this.op1.length !=0 && !this.operandoPulsado) {
            //En el caso de que tengamos más operandos calculamos el resultado previo
            if (this.operandos.length > 0 && this.op2.length > 0 && !this.igualPulsado) {
                let result = eval(this.op1 + this.operandos.shift() + this.op2);
                this.pantalla = "" + result;
                this.op1 = "" + result;
                this.op2 = "";
                this.actualizaPantalla();
            }
            if (this.igualPulsado) {
                this.operandos = new Array();
            }
            this.operandos.push('*10**' + this.op2);
            this.pantalla = '';
            this.operandoPulsado = true;
            this.igualPulsado =  false;
        }
    }

    potenciaBase10() {
        if (!this.operandoPulsado) {
            if (this.op1.length != 0) {
                this.op1 = new Number(this.op1);
                let result = eval('10**' + this.op1);
                this.op1 = result;
                this.pantalla = this.op1;
                this.actualizaPantalla();
            }
        } else {
            if (this.op2.length != 0) {
                this.op2 = new Number(this.op2);
                let result = eval('10**' + this.op2);
                this.op2 = result;
                this.pantalla = this.op2;
                this.actualizaPantalla();
            }
        }
    }

    cambiarUnidades() {
        if (this.grados) {
            document.querySelector("body > main > article:nth-child(2) > input[type=button]:nth-child(1)").value = 'DEG'
            this.grados = false;
        } else {
            document.querySelector("body > main > article:nth-child(2) > input[type=button]:nth-child(1)").value = 'RAD'
            this.grados = true;
        }
    }

    borrarElemento() {
        if (!this.igualPulsado) {
            if (this.op2.length != 0) {
                if (this.op2.length > 1) {
                    this.op2 = this.op2.substring(0, this.op2.length - 1)
                    this.pantalla = this.op2;
                } else {
                    this.op2 = '0';
                    this.pantalla = '0';
                }
                this.actualizaPantalla();
            } else {
                if (this.op1.length != 0) {
                    if (this.op1.length > 1) {
                        this.op1 = this.op1.substring(0, this.op1.length - 1)
                        this.pantalla = this.op1;
                    } else {
                        this.op1 = '';
                        this.pantalla = '0';
                    }
                    this.actualizaPantalla();
                }
            }
        } else {
            this.op1 = new String(this.op1);
            if (this.op1.length > 1) {
                this.op1 = this.op1.substring(0, this.op1.length - 1)
                this.pantalla = this.op1;
            } else {
                this.op1 = '0';
                this.pantalla = '0';
            }
            this.actualizaPantalla();
        }
    }

    notacionCientifica() {
        if (!this.igualPulsado) {
            if (this.op2.length != 0) {
                this.op2 = new Number(this.op2);
                if (!this.notacion) {
                    this.pantalla = this.op2.toExponential();
                    this.notacion = true;
                } else {
                    this.pantalla = Number(this.op2.toExponential());
                    this.notacion = false;
                }
                this.actualizaPantalla();
            } else {
                if (this.op1.length != 0) {
                    this.op1 = new Number(this.op1);
                    if (!this.notacion) {
                        this.pantalla = this.op1.toExponential();
                        this.notacion = true;
                    } else {
                        this.pantalla = Number(this.op1.toExponential());
                        this.notacion = false;
                    }
                    this.actualizaPantalla();
                }
            }
        } else {
            this.op1 = new Number(this.op1);
            if (!this.notacion) {
                this.pantalla = this.op1.toExponential();
                this.notacion = true;
            } else {
                this.pantalla = Number(this.op1.toExponential());
                this.notacion = false;
            }
            this.actualizaPantalla();
        }
    }

    mc() {
       this.memoriaCientifica = null;
    }

    mr() {
        if(this.memoriaCientifica != null) {
            if (!this.igualPulsado) {
                if (this.op1.length == 0) {
                    this.op1 = this.memoriaCientifica;
                    this.pantalla = this.op1;
                    this.actualizaPantalla();
                    return;
                } else {
                    if (this.op2.length == 0) {
                        this.op2 = this.memoriaCientifica;
                        this.pantalla = this.op2;
                        this.actualizaPantalla();
                        return;
                    }
                }
            } else {
                if(this.operandoPulsado) {
                    if (this.op2.length == 0) {
                        this.op2 = this.memoriaCientifica;
                        this.pantalla = this.op2;
                        this.actualizaPantalla();
                        return;
                    }
                }
            }
        }
    }

    ms() {
        if (this.igualPulsado) {
            this.memoriaCientifica = this.op1;
        } else {
            if (!this.operandoPulsado) {
                this.memoriaCientifica = this.op1;
            }
        }
    }


    m_mas() {
        if (this.igualPulsado) {
            this.op1 = new Number(this.op1);
            this.memoriaCientifica += this.op1;
        } else {
            if (!this.operandoPulsado) {
                this.op1 = new Number(this.op1);
                this.memoriaCientifica += this.op1;
            }
        }
    }

    m_menos() {
        if (this.igualPulsado) {
            this.op1 = new Number(this.op1);
            this.memoriaCientifica -= this.op1;
        } else {
            if (!this.operandoPulsado) {
                this.op1 = new Number(this.op1);
                this.memoriaCientifica -= this.op1;
            }
        }
    }

}

let calculadora = new CalculadoraCientifica();