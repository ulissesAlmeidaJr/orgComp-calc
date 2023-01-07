import BigNumber from "./bignumber.mjs"

window.mudarLabel = function mudarLabel(){
    var valor;
    valor = document.getElementById("selectPrec").value;
    
    if (valor == "porcentagem"){
        var a;
        a = document.getElementById("labelPrec");
        a.innerHTML = "Porcentagem Mínima de Precisão: ";

    }
    else {
        a = document.getElementById("labelPrec");
        a.innerHTML = "Casas Decimais de Precisão: ";
    }
}

window.teste = function teste(){
    var n1, b2;
    n1 = prompt("N1: ");
    n1 = BigNumber(n1);

    b2 = n1.multipliedBy(2);
    document.write(b2)
    
}

function calcPorCasa(){
    var deciNum, casasPrec;
    var deciInt, deciFrac, deciFracTemp;
    var binInt, binFrac;

    // Entradas
    deciNum = document.getElementById("deciInput").value;
    casasPrec = document.getElementById("precision").value;

    // Separando parte inteira de parte fracionária
    deciInt = Math.trunc(deciNum);
    deciFrac = '0.' + deciNum.split('.')[1]

    // Convertendo parte inteira para binário
    binInt = parseInt(deciInt).toString(2);

    // convertendo parte fracionária para binário
    deciFracTemp = BigNumber(deciFrac);

    binFrac = "";
    while (true){
        if (deciFracTemp.gte(1)){
            deciFracTemp = deciFracTemp.minus(1);
        }

        deciFracTemp = deciFracTemp.multipliedBy(2);
        binFrac += Math.trunc(deciFracTemp);

        if (binFrac.length == casasPrec){
            break;
        }


    }

    alert("Resultado..: " + binInt + "." + binFrac);
}


window.converterbtn = function converterbtn(){
    var valor;

    valor = document.getElementById("selectPrec").value;
    if (valor == "porcentagem"){
        calcPorPerc(); // Ainda não declarada

    }
    else {
        calcPorCasa();
    }
}