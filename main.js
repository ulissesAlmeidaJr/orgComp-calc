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
    return 0;
    
}

function binFracParaDecimal(binFrac){
    var i, deciValue = BigNumber(0);
    for (i = 0; i < binFrac.length; i++){

        deciValue = (deciValue.plus(BigNumber("0.5").pow(i+1).multipliedBy(binFrac.charAt(i))));

    }

    return deciValue;
}

function calcularPrecisaoPerc(numeroIncerto, numeroCorreto){
    return (numeroIncerto.div(numeroCorreto)).multipliedBy(100);
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
    if (!deciNum.includes(".")){
        deciNum = deciNum + ".0";
    }
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

function calcPorPerc(){

    var deciNum, percPrec;
    var deciInt, deciFrac, deciFracTemp;
    var binInt, binFrac;
    var precisaoAtual;

    // Entradas
    deciNum = document.getElementById("deciInput").value;
    percPrec = document.getElementById("precision").value;

    // Separando parte inteira de parte fracionária
    deciInt = Math.trunc(deciNum);
    if (!deciNum.includes(".")){
        deciNum = deciNum + ".0";
    }
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

        precisaoAtual = calcularPrecisaoPerc(binFracParaDecimal(binFrac), BigNumber(deciFrac));
        if (precisaoAtual.gte(percPrec)){
            break;
        }


    }

    alert("Resultado..: " + binInt + "." + binFrac + " Com " + precisaoAtual + "% de precisão");
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