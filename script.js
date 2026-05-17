var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// carregando imagens
var bird = new Image();
bird.src = "images/bird.png"
var bg = new Image();
bg.src = "images/bg.png"
var chao = new Image();
chao.src = "images/chao.png"
var canocima = new Image();
canocima.src = "images/canocima.png"
var canobaixo = new Image();
canobaixo.src = "images/canobaixo.png"

// variaveis
var eec = 100;
var constant;
var bX = 33;
var bY = 200;
var gravity = 1.3;
var score = 0;
var cano = [];

cano[0] = {
    x : canvas.width,
    y : 0
}

//carregando audios
var fly = new Audio();
fly.src = "sounds/fly.mp3"
var scor = new Audio();
scor.src = "sounds/score.mp3"

//captura de tecla
document.addEventListener("keydown",voa);

//voando
function voa(){
    bY = bY - 26;
    fly.play();
}

function jogo(){
    //fundo do jogo
    ctx.drawImage(bg,0,0)

    // criando canos
    for(let i = 0; i< cano.length; i++){
        //posição do cano de baixo
        constant = canocima.height + eec;
        //configurando cano de cima
        ctx.drawImage(canocima,cano[i].x,cano[i].y);
        //configurando cano baixo
        ctx.drawImage(canobaixo,cano[i].x,cano[i].y+constant)
        // movimentação do cano
        cano[i].x = cano[i].x - 1
        if(cano[i].x == 125){
            cano.push({
                x : canvas.width,
                y : Math.floor(Math.random()*canocima.height)-canocima.height
            })
        }
        //passaro entre as bordas do cano
        if(bX + bird.width >= cano[i].x && bX <= cano[i].x + canocima.width
            //passsaro colidiu com cano de cima ou com o cano de baixo
            && (bY <= cano[i].y + canocima.height || bY+bird.height >= cano[i].y+constant)
            //passaro colidiu com o chão
            || bY +bird.height >= canvas.height - chao.height){
            location.reload();
            }
        if(cano[i].x == 5){
            score = score + 1;
            scor.play();
        }
 
    }


    //desenhando o chão
    ctx.drawImage(chao,0,canvas.height - chao.height);

    //passaro
    ctx.drawImage(bird,bX,bY);
    bY += gravity;

    // criando placar
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Placar: " + score, 10,canvas.height-20);

    requestAnimationFrame(jogo);
}


jogo();