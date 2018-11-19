//espazio botoia sakatzerakoan "salto" komandoa hartuko du.

document.addEventListener('keydown', function (evento) {
    if (evento.keyCode == 32) {
        console.log("saltatu");

        if (nivel.hilda == false)
        {
          //mario saltatzen den momentuan salto egiteko
          //botoiari ematerakoan ez du ezer egingo
          if(mario.saltatzen == false)
          {
            saltatu();
          }
        }
        //galtzen baduzu espazioa ateratzerakoan
        //jokua berriro hasi egingo da
        else
        {
          nivel.abiadura = 9;
          seta.x = ancho + 100;
          nivel.markagailua = 0;
          nivel.hilda = false;
        }
    }
});

var imgMario, imgSeta, imgLurra, imgTxuria;

//argazkien karga
function argazkiKargatu()
{
    imgMario = new Image();
    imgSeta = new Image();
    imgLurra = new Image();
    imgTxuria = new Image();

    imgMario.src = "img/mario.png";
    imgSeta.src = "img/Seta.png";
    imgLurra.src = "img/lurra.png";
    imgTxuria.src = "img/txuria.png";


}

var ancho = 700;
var alto = 300;

var canvas, ctx;

function hasi()
{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    argazkiKargatu();
}

function Canvasegin()
{
    canvas.width = ancho;
    canvas.height = alto;
}

var suelo = 200;
var mario = {y: suelo,vy:0 ,gravedad:2 ,salto:28 ,vymax: 9,saltatzen: false};
var nivel = {abiadura:9, markagailua:0,hilda:false};
var seta = {x: ancho + 100 ,y:suelo}
var suelog = {x:0 , y:suelo + 30};


function MarioEgin() {
    ctx.drawImage(imgMario, 0, 0,164,164,100,mario.y,50,50);
}

function SetaEgin(){
  ctx.drawImage(imgSeta,0,0,275,183,seta.x,seta.y,125,75);
}

function Fondotxuria() {
  ctx.drawImage(imgTxuria, 0, 0,164,164,0,0,5000,5000);
}

function logicaSeta()
{
  if(seta.x < -100)
  {
    //"seta" amaiera ailegatzen den arabera puntuazioa
    //haunditzen joaten da
    seta.x = ancho + 100;
    nivel.markagailua++;
  }
  else{
    seta.x -= nivel.abiadura;
  }
}
//------------

function lurraEgin(){
  ctx.drawImage(imgLurra,suelog.x,0,700,390,0,suelog.y,7000,390);
}

function logicaLurra(){
  if(suelog.x > 70){
    suelog.x = 0;
  }
  else{
    suelog.x += nivel.abiadura - 6;
  }
}


function saltatu ()
{
  mario.saltatzen = true;
  mario.vy = mario.salto;
}

//vy=y posizioaren abiadura


function gravedad()
{
  if(mario.saltatzen == true)
  {
    if (mario.y - mario.vy - mario.gravedad > suelo)
    {
      mario.saltatzen = false;
      mario.vy = 0;
      mario.y = suelo;
    }
    else
    {
    mario.vy -= mario.gravedad;
    mario.y -= mario.vy;
    }
  }
}

function talka()
{
  //seta.x
  //mario.y
  if (seta.x >= 100 && seta.x <= 150)
  {
    //kasu honetan suelo da "seta"-ren y posizioa
    if(mario.y >= suelo)
    {
      nivel.hilda = true;
      nivel.abiadura = 0;
      //lurraren posizioa aldatu, bestela desagertu egiten
      //da talka egiterakoan
      suelog.x = 30;
      suelog.y = suelo + 30;
    }
  }
}

function puntuazioa()
{
  ctx.font = "30px impact";
  ctx.fillStyle = '#555555';
  ctx.fillText(`${nivel.markagailua}`,600,50);


  if (nivel.hilda == true)
  {
    ctx.font = "60px impact";
    ctx.fillText('GAME OVER',240,150);

    ctx.font = "30px impact";
    ctx.fillText('Sakatu "espazio"botoia berriro jolasteko',120,200);
  }
}



//bukle nagusia
var FPS = 60
setInterval(function () {
    principal();
}, 1000 / FPS);

//orria (principal) segunduro 10 aldiz segunduroko frekuentzia izango du.

//funtzioak kargatu egingo du
function principal()
{
    Canvasegin();
    gravedad();
    talka();
    logicaLurra();
    logicaSeta();
    Fondotxuria();
    lurraEgin();
    SetaEgin();
    MarioEgin();
    puntuazioa();
}
