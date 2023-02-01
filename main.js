mudarBotao = "desligado";

nome = " ";

pontuacaoPunhoDireito = 0;
pontuacaoPunhoEsquerdo = 0;

punhoEsquerdoX = 0;
punhoEsquerdoY = 0;

punhoDireitoX = 0;
punhoDireitoY = 0;

som = 0;

function setup(){
    cnv = createCanvas(600,500);
    cnv.center();
    vd = createCapture(VIDEO);
    vd.hide();
    posenet = ml5.poseNet(vd, confirmaResultado);
    posenet.on('pose', pegarPoses);
}
function confirmaResultado(){
    console.log("Carrregado = )")
}
function pegarPoses(resultado){
    if(resultado.length > 0){
        console.log(resultado)

        punhoDireitoX = resultado[0].pose.rightWrist.x;
        punhoDireitoY = resultado[0].pose.rightWrist.y;
        pontuacaoPunhoDireito = resultado[0].pose.keypoints[10].score;
        console.log("A posição do x do punho direito é: "+punhoDireitoX+"A posição y do punho direito é:"+punhoDireitoY);

        punhoEsquerdoX = resultado[0].pose.leftWrist.x;
        punhoEsquerdoY = resultado[0].pose.leftWrist.y;    
        pontuacaoPunhoEsquerdo = resultado[0].pose.keypoints[9].score;
        console.log("A posição do x do punho esquerdo é: "+punhoEsquerdoX+"A posição y do punho direito é:"+punhoEsquerdoY);
    }
}
function preload(){
    song = loadSound("music.mp3");
}
function draw(){
    image(vd, 0, 0, 600, 500);

    fill(148,0,211);
    stroke(255, 255, 255);

    if(pontuacaoPunhoEsquerdo > 0.2){
        circle(punhoEsquerdoX, punhoEsquerdoY, 20);

        punhoEsquerdoVolume = Number(punhoEsquerdoY);
        arredondado = floor(punhoEsquerdoVolume);

        volume = arredondado/500;
        document.getElementById("volume").innerHTML = volume;
        song.setVolume(volume);
    }



    if(pontuacaoPunhoDireito > 0.2){
        circle(punhoDireitoX, punhoDireitoY, 20);

        if(punhoDireitoY > 0 && punhoDireitoY <= 100){
            som = 0.5;
            document.getElementById("velocidade").innerHTML = som;
        }

        else if(punhoDireitoY > 100 && punhoDireitoY <= 200){
            som = 1.0;
            document.getElementById("velocidade").innerHTML = som;
        }

        else if(punhoDireitoY > 200 && punhoDireitoY <= 300){
            som = 1.5;
            document.getElementById("velocidade").innerHTML = som;
        }

        else if(punhoDireitoY > 300 && punhoDireitoY <= 400){
            som = 2.0;
            document.getElementById("velocidade").innerHTML = som;
        }

        else if(punhoDireitoY > 400){
            som = 2.5;
            document.getElementById("velocidade").innerHTML = som;
        }
        song.rate(som);
    }
}
function reproduzir(){
    if(mudarBotao == "desligado"){
        nome = document.getElementById("musica").value;
        song.play();
        song.setVolume(1);
        song.rate(1);
        mudarBotao =  "ligado";
        document.getElementById("reproduzir").innerHTML = "<span class='material-symbols-outlined simbolo'>music_off</span>"
    }
    else{
        mudarBotao = "desligado";
        song.stop();
        document.getElementById("reproduzir").innerHTML = "<span class='material-symbols-outlined simbolo'>library_music</span>"
    }
}