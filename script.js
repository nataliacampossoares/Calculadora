/********
 * Seleção dos elementos HTML
 ********/
// Botões
const btnBotoes = document.querySelectorAll("[btn-numero]"); //[] é atributo
const btnOperacoes = document.querySelectorAll("[btn-operador]"); //selectorAll é me devolve um array de elemntos html
const btnIgual = document.querySelector("[btn-igual]");
const btnDelete = document.querySelector("[btn-delete]");
const btnAC = document.querySelector("[btn-ac]");

// As divs que vão exibir os valores da calculadora
const bufferElemento = document.querySelector("[txt-buffer]");
const displayElemento = document.querySelector("[txt-display]");

// Objeto que irá representar e armazenar os dados da calculadora
const calculadora = {
  operandoAnterior: "", //a
  operandoAtual: "", //b
  operador: "",
  bufferTextoElemento: bufferElemento, // DIV buffer
  displayTextoElemento: displayElemento, // DIV display
};

/********
 * Associar funções aos eventos dos elementos HTML
 ********/
// Botão AC
btnAC.addEventListener("click", () => {
  limpaVariaveis(calculadora);
});

// Botão Delete
btnDelete.addEventListener("click", () => {
  apagaDigito(calculadora);
});

// Botão de igual
btnIgual.addEventListener("click", () => {
  executaCalculo(calculadora);
});

// Botões dos números
for (let btn of btnBotoes) {
  btn.addEventListener("click", () => {
    adicionaNumero(calculadora, btn.innerText);
  });
}

// for(let item of btnOperacoes){
//   item.addEventListener("click", (event) => {
//     escolheOperador(calculadora, event.currentTarget.innerText)
//   })
// }

// Botões dos operadores
for (let btn of btnOperacoes) {
  btn.addEventListener("click", () => {
    escolheOperador(calculadora, btn.innerText);
  });
}

/********
 * Regras da aplicação
 ********/

/* Atualiza o display da calculadora.
 *  A atualização consiste em atualizar os elementos HTML buffer e display
 *  O elemento buffer é atulizado com o atributo operandoAnterior
 *  O elemento display é atualizado com o atributo operandoAtual
 */
function atualizaDisplay(calculadora, valor) {
  calculadora.displayTextoElemento.innerText =
    calculadora.operandoAnterior +
    calculadora.operador +
    calculadora.operandoAtual;
}

/* Limpa os atributos do objeto calculadora e atualiza o display.
 * Para atualizar o dispay, chame a função responsável por isso.
 */
function limpaVariaveis(calculadora) {
  calculadora.operandoAnterior = " ";
  calculadora.operandoAtual = " ";
  calculadora.operador = " ";
  atualizaDisplay(calculadora)
}

/* Função chamada quando um botão de número é pressionado
 * A função recebe o objeto calculadora e o número a ser exibido no display.
 * - Adiciona um dígito no atributo operandoAtual e atualiza o display
 * O dígito "." deve receber um tratamento especial
 */
function adicionaNumero(calculadora, numero) {
  calculadora.operandoAtual += numero;
  atualizaDisplay(calculadora, numero);
}

/* Função chamada quando um botão de operador é pressionado
 * Essa função tem comportamentos diferentes dependendo do estado da calculadora.
 * Se o operandoAnterior e o operandoAtual estiverem preenchidos
 * - executar o cálculo (chamar outra função para realizar o cálculo).
 * Caso o operandoAnterior estiver vazio,
 * - armazenar o operador recebido por parâmetro no atributo operador do objeto calculadora.
 * - copiar operandoAtual para o operandoAnterior, deixando a calculadora preparada para receber o próximo número
 */
function escolheOperador(calculadora, operador) {
  calculadora.operador = operador;
  calculadora.operandoAnterior = calculadora.operandoAtual;
  calculadora.operandoAtual = "";
  atualizaDisplay(calculadora, operador);
}

/* A função recebe o objeto calculadora e executa o calculo
 * - Verificar a operação a ser executada
 * - Executar a operação
 * - Atualizar os atributos operador, operandoAnterior e operandoAtual
 * - Atualizar o display
*/

/* Função chamada quando o botão delete for pressionado
 * Apaga o último dígito digitado no
 */
function apagaDigito(calculadora) {
  calculadora.displayTextoElemento.innerText =
    calculadora.displayTextoElemento.innerText.slice(0, -1);
  // atualizaDisplay(calculadora)
}

function executaCalculo(calculadora) {
  calculadora.bufferTextoElemento.innerText =
    calculadora.displayTextoElemento.innerText;

  const calculo = calculadora.displayTextoElemento.innerText.replace("÷", "/");

  const resultado = eval(calculo);
  atualizaDisplay(calculadora, "=");

  calculadora.operandoAtual = resultado;
  calculadora.displayTextoElemento.innerText = resultado;
}
