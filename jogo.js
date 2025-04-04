//Moonlander. Um jogo de alunissagem.
//Leonardo T. Cruz (https://github.com/LeoBomDCode-dev)
//28/03/2025
//Versão 0.1.0

/** @type {HTMLCanvasElement} */

//Seção de Modelagem de dados
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d");

let lancamentoPelaEsquerda = (Math.round(Math.random()) == 0) ? true : false;

let moduloLunar = {
    posicao: {
        x: lancamentoPelaEsquerda ? 100 : 700,
        y: Math.random() * canvas.height / 2, // Posição aleatória no eixo Y (metade superior do canvas)
    },
    angulo: lancamentoPelaEsquerda ?  -Math.PI/2 : Math.PI /2, 
    largura: 20,
    altura: 20,
    cor: "lightgray",
    motorLigado: false,
    velocidade: {
        x: lancamentoPelaEsquerda ? 2 : -2,
        y: 0
    },
    combustivel: 100,
    rotacaoHorario: false,
    rotacaoAntiHorario: false
}


let estrelas = [];
for (let i = 0; i < 500; i++) {
    estrelas[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: Math.sqrt(Math.random() * 2) + 1, // Raio aleatório entre 1 e 3
        brilho: 1.0,
        apagando: true,
        cintilação: 0.05 * Math.random() // Cintilação aleatória entre 0.05 e 0.1
        

    }
}

let estrela = [];

for (let i = 0; i < 250; i++) {
    estrela[i] = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        raio: 2
    }
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
    mostrarIndicador(
        mensagem = `Velocidade horizontal: ${(10 * moduloLunar.velocidade.x).toFixed(2)}`,
        x = 150,
        y = 50,
    )
 
}

function mostrarVelocidadeVertical() {
    mostrarIndicador(
        mensagem = `Velocidade vertical: ${(10 * moduloLunar.velocidade.y).toFixed(2)}`,
        x = 150,
        y = 30
    )

}

function mostrarAngulo() {
    mostrarIndicador(
        mensagem = `Ângulo: ${(moduloLunar.angulo * 180 / Math.PI).toFixed(2)}°`,
        x = 400,
        y = 30
    )

}

function mostrarCombustivel() {
    mostrarIndicador(
        mensagem = `Combustível: ${(moduloLunar.combustivel).toFixed(0)}%`,
        x = 150,
        y = 80
    )

}

function mostrarAltitude() {
    mostrarIndicador(
        mensagem = `Altitude: ${(canvas.height - moduloLunar.posicao.y -10).toFixed(2)}`,
        x = 400,
        y = 50
    )

}

function desenharEstrelas(){
    contexto.save();
    for (let i = 0; i < estrelas.length; i++) {
        let estrela = estrelas[i];
        contexto.beginPath();
        contexto.arc(estrela.x, estrela.y, estrela.raio, 0 , 2 *Math.PI );
        contexto.closePath();
        contexto.fillStyle = `rgba(255, 255, 255, ${estrela.brilho}) `;
        contexto.fill();
        if(estrela.apagando){
            estrela.brilho -= estrela.cintilação;
            if(estrela.brilho <= 0){;
                estrela.apagando = false;
            }      
        } else {
        (estrela.brilho += estrela.cintilação);
        if(estrela.brilho > 1){;
              estrela.apagando = true;
        }

    }
}
}
function mostrarIndicador(mensagem, x, y) {
    contexto.font = "bold 18px Arial";
    contexto.textAlign = "center";
    contexto.textBaseLine = "middle";
    contexto.fillStyle = "lightgray";
    contexto.fillText(mensagem, x, y);
}

function desenhar() {
    //limpar a tela
    contexto.clearRect(0, 0, canvas.width, canvas.height);
    //Esta função atualiza a posição do módulo lunar em função da gravidade

    atracaoGravitacional();
    desenharEstrelas();
    desenharModuloLunar();
    mostrarVelocidadeHorizontal();
    mostrarVelocidadeVertical();
    mostrarCombustivel();
    mostrarAngulo();
    mostrarAltitude();
 
    //Esta função repete a execução da função desenhar a cada quadro
    if (moduloLunar.posicao.y >= (canvas.height - 0.5 * moduloLunar.altura)){

        if (moduloLunar.velocidade.y >= 0.5 || 
            moduloLunar.velocidade.x >= 0.5) {
            contexto.font = "bold 30px Arial";
            contexto.textAlign = "center";
            contexto.textBaseLine = "middle";
            contexto.fillStyle = "red";
            contexto.fillText ("Você Morreu!💀", canvas.width / 2, canvas.height / 2);
            return
            
        }else{ 


             if (moduloLunar.velocidade.y <= 0.5 && moduloLunar.velocidade.x <= 0.5) {
                contexto.font = "bold 30px Arial";
                contexto.textAlign = "center";
                contexto.textBaseLine = "middle";
                contexto.fillStyle = "green";
                contexto.fillText("Você Alunissou com Sucesso!🙊", canvas.width / 2, canvas.height / 2);
           
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