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
            this.op1 += '.';
            this.pantalla += '.';
        } else {
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
                result = eval(this.op1 + this.operandos[0] + this.op2);
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

    }

}

let calculadora = new CalculadoraCientifica();