/**  @type {HTMLCanvasElement}  */
let canvas = document.querySelector("#jogo");
let contexto = canvas.getContext("2d"); 


let moduloLunar = {
    posição: {
        x: 100,
        y: 100
    },
    angulo: 0,
    largura: 20,
    altura: 20,
    cor: "black",
    motorLigado: false,
    velocidade: {
        x: 0,
        y: 0
    }
}



function desenharModuloLunar(){
    contexto.save();
    contexto.beginPath(); // Inicia um novo caminho
    contexto.translate(moduloLunar.posição.x, moduloLunar.posição.y);
    contexto.rotate(moduloLunar.angulo );
    contexto.rect(moduloLunar.largura * -0.5, moduloLunar.altura * -0.5, moduloLunar.largura, moduloLunar.altura); // Desenha um retângulo
    contexto.fillStyle = moduloLunar.cor;
    contexto.fill(); // Preenche o retângulo
    contexto.closePath();
    

    if(moduloLunar.motorLigado){
        desenharChama();
    }


    contexto.restore();


}

  
function desenharChama(){
    contexto.beginPath();
    contexto.moveTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(moduloLunar.largura * 0.5, moduloLunar.altura * 0.5);
    contexto.lineTo(0, moduloLunar.altura * 0.5 + Math.random() * 40);
    contexto.lineTo(moduloLunar.largura * -0.5, moduloLunar.altura * 0.5);
    contexto.closePath();
    contexto.fillStyle = "orange";
    contexto.fill();
}

let x = 100;

function desenhar(){


    contexto.clearRect(0, 0, canvas.width, canvas.height);
    contexto.save();
    contexto.translate(canvas.width / 2, canvas.height / 2);
    contexto.beginPath(); // Inicia um novo caminho
    contexto.rotate(Math.PI / 4);
    contexto.rect(x, 100, 25, 10); // Desenha um retângulo
    contexto.fillStyle = "black"; // Preenche o círculo de preto
    contexto.fill(); // Preenche o círculo
    contexto.restore();

    x = x + 1;
  
    atraçãoGravitacional();
  requestAnimationFrame(desenhar);
  desenharModuloLunar();

}

document.addEventListener("keydown", teclaPressionada);
function teclaPressionada(evento){
    if(evento.keycode == 38){
    moduloLunar.motorLigado = true;
}
    }


document.addEventListener("keyup", teclaSolta);
function teclaSolta (evento){
if(evento.keycode == 38){
    moduloLunar.motorLigado = false;
      
    }

}

let gravidade = 0.1;
function atraçãoGravitacional(){
    moduloLunar.posição.x += moduloLunar.velocidade.x;
    moduloLunar.posição.y += moduloLunar.velocidade.y;
   if(moduloLunar.motorLigado){
       moduloLunar.velocidade.y -= 0.2;
    }
    moduloLunar.velocidade.y += gravidade;
    
}







desenhar();


