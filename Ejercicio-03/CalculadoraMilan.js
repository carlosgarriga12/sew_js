class CalculadoraMilan{
    
    constructor() {
        this.pantalla = '';
        this.memoria = new Number(0);
        this.operandos = new Array();
        this.operandoPulsado = false;
        this.op1 = "";
        this.op2 = "";
        this.igualPulsado = false;
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
                document.querySelector('body > form > input[type=text]:nth-child(2)').value = "M " + this.op1;
                this.op1 = "";
            }
        } else {
            if (this.op2.length != 0) {
                let result = eval(this.op1 + this.operandos[0] + this.o2);
                this.memoria = result;
                document.querySelector('body > form > input[type=text]:nth-child(2)').value = "M " + result;
                this.op1 = "";
                this.op2 = "";
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
                document.querySelector('body > form > input[type=text]:nth-child(2)').value = "M " + this.op1;
                this.op1 = "";
            }
        } else {
            if (this.op2.length != 0) {
                let result = eval(this.op1 + this.operandos[0] + this.o2);
                this.memoria = this.memoria - result;
                document.querySelector('body > form > input[type=text]:nth-child(2)').value = "M " + result;
                this.op1 = "";
                this.op2 = "";
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
                document.querySelector('body > form > input[type=text]:nth-child(2)').value = "M " + this.op1;
                this.op1 = "";
            }
        } else {
            if (this.op2.length != 0) {
                let result = eval(this.op1 + this.operandos[0] + this.o2);
                this.memoria = this.memoria + result;
                document.querySelector('body > form > input[type=text]:nth-child(2)').value = "M " + result;
                this.op1 = "";
                this.op2 = "";
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
        let result = eval(this.op1 + this.operandos[0] + this.op2);
        this.pantalla = result;
        this.actualizaPantalla();
        this.op1 = result;
        this.igualPulsado = true;
    }

    actualizaPantalla() {
       document.querySelector('body > form > input[type=text]:nth-child(2)').value = this.pantalla;
    }

    ce() {
        if (this.operandos.length != 0) {
            this.op2 = '';
        } else {
            this.op1 = '';
        }
        document.querySelector('body > form > input[type=text]:nth-child(2)').value = '0';
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

let calculadora = new CalculadoraMilan();