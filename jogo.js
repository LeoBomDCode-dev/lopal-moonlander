//Moonlander. Um jogo de alunissagem.
//Leonardo T. Cruz (https://github.com/LeoBomDCode-dev)
//28/03/2025
//Versão 0.1.0

/** @type {HTMLCanvasElement} */

//Seção de Modelagem de dados
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");


let moduloLunar = {
    posicao: {
        x: Math.random() * canvas.width, // Posição aleatória no eixo X (largura do canvas)
        y: Math.random() * canvas.height / 2, // Posição aleatória no eixo Y (metade superior do canvas)
    },
    angulo: -Math.PI / 2,
    largura: 20,
    altura: 20,
    cor: "lightgray",
    motorLigado: false,
    velocidade: {
        x: 2,
        y: 0
    },
    combustivel: 100,
    rotacaoHorario: false,
    rotacaoAntiHorario: false
}

let estrelas = [];
for (let i = 0; i <500; i++){
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(Math.random() * 2),
        transparencia: 1.0, 
        diminuindo: true,
        razaoDeCintiliacao: Math.random() * 0.05,
    };
}


//Seção de visualização
function desenharModuloLunar() {
    contexto.save();
    contexto.beginPath();
    contexto.translate(moduloLunar.posicao.x, moduloLunar.posicao.y);
    contexto.rotate(moduloLunar.angulo);
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5,
        moduloLunar.largura, moduloLunar.altura);
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill();
    contexto.closePath();

    if (moduloLunar.motorLigado) {
        desenharChama();
        consumoCombustivel();
    }

    contexto.restore();
}

function desenharChama() {
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    //Determina o tamanho da chama
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 35);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}

function mostrarVelocidadeHorizontal() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `Velocidade horizontal: ${(10 * moduloLunar.velocidade.x).toFixed(2)}`;
    contexto.fillText(velocidade, 130, 60);
}

function mostrarVelocidadeVertical() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let velocidade = `Velocidade vertical: ${(10 * moduloLunar.velocidade.y).toFixed(2)}`;
    contexto.fillText(velocidade, 130, 40);
}

function mostrarAngulo() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let angulo = `Ângulo: ${(moduloLunar.angulo * 180 / Math.PI).toFixed(2)}°`;
    contexto.fillText(angulo, 130, 100);
}

function mostrarCombustivel() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let combustivel = `Combustível: ${(moduloLunar.combustivel).toFixed(0)}%`;
    contexto.fillText(combustivel, 130, 80);
}

function mostrarAltitude() {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    let altitude = `Altitude: ${(canvas.height - moduloLunar.posicao.y -10).toFixed(2)}`;
    contexto.fillText(altitude, 130, 120);
}

function desenharEstrelas(){
    for (let i; i < estrelas.length; i++) {
        let estrela = estrelas[i];
        contexto.beginPath();
        contexto.arc(estrela.x, estrela.y, estrela.raio, 0, 2* Math.PI);
        contexto.closePath();
        contexto.fillStyle = "rgba(255, 255, 255, " + estrela.transparencia + ")";
        contexto.fill();
        contexto.restore();

    }
}






function desenhar() {
    //limpar a tela
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    //Esta função atualiza a posição do módulo lunar em função da gravidade

    atracaoGravitacional();
    desenharModuloLunar();
    mostrarVelocidadeHorizontal();
    mostrarVelocidadeVertical();
    mostrarCombustivel();
    mostrarAngulo();
    mostrarAltitude();
    desenharEstrelas();
 
    //Esta função repete a execução da função desenhar a cada quadro
    if (moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura)){

        if (moduloLunar.velocidade.y >= 0.5 || moduloLunar.velocidade.x >= 0.5) {
            contexto.font = "bold 30px Arial";
            contexto.textAlign = "center";
            contexto.textBaseLine = "middle";
            contexto.fillStyle = "red";
            contexto.fillText("Você Morreu na Queda!💀", canvas.width / 2, canvas.height / 2);
            return
       
        }else{ 


             if (moduloLunar.velocidade.y <= 0.5 && moduloLunar.velocidade.x <= 0.5) {
                contexto.font = "bold 30px Arial";
                contexto.textAlign = "center";
                contexto.textBaseLine = "middle";
                contexto.fillStyle = "green";
                contexto.fillText("Você Alunissou com Sucesso!🚀", canvas.width / 2, canvas.height / 2);
           
                return
             }

        }
    }
    requestAnimationFrame(desenhar);
}


//Seção de controle


//Pressionando a seta para cima para ligar o motor
document.addEventListener("keydown", teclaPressionada);
function teclaPressionada(evento) {
    if (evento.keyCode == 38 && moduloLunar.combustivel > 0) {
        moduloLunar.motorLigado = true;

    } else if (evento.keyCode == 39) {
        moduloLunar.rotacaoAntiHorario = true;
        
        console.log("seta para a esquerda pressionada.");
    } else if (evento.keyCode == 37) {
        moduloLunar.rotacaoHorario = true;
       
        console.log("Seta para a direita pressionada.");
    }
}
//Soltando a seta para cima para desligar o motor
document.addEventListener("keyup", teclaSolta);
function teclaSolta(evento) {
    if (evento.keyCode == 38) {
        moduloLunar.motorLigado = false;
    } else if (evento.keyCode == 39) {
        moduloLunar.rotacaoAntiHorario = false;
    } else if (evento.keyCode == 37) {
        moduloLunar.rotacaoHorario = false;
      
    }

}

function consumoCombustivel() {
    if (moduloLunar.combustivel > 0) {
        moduloLunar.combustivel -= 0.1;
    } else {
        moduloLunar.combustivel = 0;
        moduloLunar.motorLigado = false;
    }
}

let gravidade = 0.01;

function atracaoGravitacional() {
    moduloLunar.posicao.x += moduloLunar.velocidade.x;
    moduloLunar.posicao.y += moduloLunar.velocidade.y;

    if (moduloLunar.rotacaoAntiHorario) {
        moduloLunar.angulo += Math.PI / 180;
    } else if (moduloLunar.rotacaoHorario) {
        moduloLunar.angulo -= Math.PI / 180;
    }

    if (moduloLunar.motorLigado) {
        moduloLunar.velocidade.y -= 0.0115 * Math.cos(moduloLunar.angulo);
        moduloLunar.velocidade.x += 0.0115 * Math.sin(moduloLunar.angulo);
    }
    moduloLunar.velocidade.y += gravidade;

}
desenhar();