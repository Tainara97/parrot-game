const cartas = ["bobrossparrot", "explodyparrot", "fiestaparrot", "metalparrot", "revertitparrot", "tripletsparrot", "unicornparrot"];
const cartasJogo = [];
let paresSelecionados = [];
let paresAcertados = [];
let qtdeCartas = 0;
let qtdeJogadas = 0;

function perguntarQtdeCartas() {
    qtdeCartas = Number(prompt("Com quantas cartas você quer jogar?"));
    while (qtdeCartas < 4 || qtdeCartas > 14 || qtdeCartas % 2 !== 0)  {
        qtdeCartas = Number(prompt("Com quantas cartas você quer jogar?"));
    }
    iniciarJogo();
}

perguntarQtdeCartas();

function embaralharCartas() {
    return Math.random() - 0.5; 
}

function criarPares () {
    cartas.sort(embaralharCartas);
    const qtdePares = qtdeCartas / 2;
    
    for (let index = 0; index < qtdePares; index++ ) {
        cartasJogo.push(cartas[index]); 
        cartasJogo.push(cartas[index]);
    }
    cartasJogo.sort(embaralharCartas);
}

function iniciarJogo() {
    criarPares();
    const carta = document.querySelector(".jogo-cartas");
    carta.innerHTML = "";
    
    for (let index = 0; index < cartasJogo.length; index++ ) {
        let elementoCarta = `
            <div class="carta" onclick="clicarCartas(this)">
                <div class="lado-frente lado">
                    <img src="projeto__parrots__imagens/assets/${cartasJogo[index]}.gif"/>
                </div>
                <div class="lado-verso lado">
                    <img src="projeto__parrots__imagens/assets/back.png"/>
                </div>
            </div>
        `;
        carta.innerHTML += elementoCarta;
    }
}

function clicarCartas(carta) { 
    if (carta.classList.contains("clicado") || paresSelecionados.length === 2) {
        return;
    } 
    carta.classList.add("clicado");
    paresSelecionados.push(carta);
    qtdeJogadas++;
    
    if (paresSelecionados.length === 2) {
       setTimeout(compararCartas, 1000);
    }
}

function compararCartas() {
    const primeiraCarta = paresSelecionados[0];
    const segundaCarta = paresSelecionados[1];

    const imagemCarta1 = primeiraCarta.querySelector(".lado-frente img").src;
    const imagemCarta2 = segundaCarta.querySelector(".lado-frente img").src;

    if (imagemCarta1 !== imagemCarta2) {
        primeiraCarta.classList.remove("clicado");
        segundaCarta.classList.remove("clicado");
        paresSelecionados = [];
    } else {
        paresAcertados.push(primeiraCarta, segundaCarta);
        paresSelecionados = [];
        fimJogo();
    }
}

function fimJogo() {
    if (paresAcertados.length === qtdeCartas) {
        alert(`Você ganhou em ${qtdeJogadas} jogadas!`);
    }
}   



