var vConcatena = true; // teste concatenacao

function concatena(botao)  // concatena strings
{
  var visor = document.tela.visor.value;

  if ( botao == '*' || botao == '/' || botao == '-' || botao == '+') {  //teste se botao de operador
    vConcatena = true;
    if (botao == visor.substr(visor.length - 1)  || document.tela.visor.value == '' )  { //nao deixa repetir o mesmo operador
        return;
      }
    if ( visor.substr(visor.length - 1)  == '*' ||  visor.substr(visor.length - 1) == '/' || visor.substr(visor.length - 1) == '-' || visor.substr(visor.length - 1) == '+') {
      console.log("aqui " + visor);
      return;
    }
  }

  if (!vConcatena) {  //testa se a tela vem de um resultado
    vConcatena = true;
    document.tela.visor.value = botao;
  } else {
    document.tela.visor.value = document.tela.visor.value + botao;
  }

}

function calcula(visor) //prepara expressao aritmetica
{
    var expressao = visor;
    var n = [], op = [], index = 0, oplast = true;

    n[index] = "";

    for (var c = 0; c < expressao.length; c++) {

        if (isNaN(parseInt(expressao[c])) && expressao[c] !== ".") // testa se é numero ou operador. Falta implementar decimais
        {
            op[index] = expressao[c];
            index++;
            n[index] = "";
            oplast = true;
        } else {
            n[index] += expressao[c];
            oplast = false;
        }
    }

    vExpressao = [];

    for (var c = 0; c < n.length; c++) {  //prepara expressao em numeros e operadores
        vExpressao += n[c] + ' ';
        if ( typeof op[c] != 'undefined' ) {
          vExpressao +=  op[c] + ' ';
        }
      }

    calculo(); //calcula valores
}

function calculo(valor1, operador, valor2){ //parse de numeros e operador

  switch (operador)
    {
      case "+":
          return parseInt(valor1) + parseInt(valor2);
      case "-":
          return parseInt(valor1) - parseInt(valor2);
      case "*":
          return parseInt(valor1) * parseInt(valor2);
      case "/":
          return parseInt(valor1) / parseInt(valor2);
    }

    resultado();  //calculo e recursao da expressao

}

function resultado() {  //calcula e faz recursao da expressao

    operacoes = vExpressao.split(' '); //divide em elementos
    indice = 0;

    if ( operacoes.includes('*') || operacoes.includes('/') ){  //testa operadores maiores
      indice = 0;
      while (operacoes[indice]) {
        if ( operacoes[indice] === '*' || operacoes[indice] === '/' ){
          operacoes[indice-1] = calculo(operacoes[indice-1], operacoes[indice], operacoes[indice+1]);
          operacoes.splice(indice,2);
          indice--;
        }
        indice++;
      }
    }

    if ( operacoes.includes('-') || operacoes.includes('+') ){  //testa operadores menores
      indice = 0;
      while (operacoes[indice]) {
        if ( operacoes[indice] === '-' || operacoes[indice] === '+' ){
          operacoes[indice-1] = calculo(operacoes[indice-1], operacoes[indice], operacoes[indice+1]);
          operacoes.splice(indice,2);
          indice--;
        }
        indice++;
      }
    }

    operacoes.length--; //limpa vazio do final da expressao
    document.tela.visor.value = operacoes;  //mostra resultado
    vConcatena = false; //desativa concatenar mais numeros
}

function limpa() {  //lima a tela inteira
    window.location.reload();
}
