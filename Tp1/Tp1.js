let BIT = [];
let imgFondo;
let estado = 0;

const quietoMin = 0;
const quietoMax = 3;

const festejoMin = 4;
const festejoMax = 7;

let frameActual = 0;
let velocidad = 22; 

let posX = 400;
let posY = 440;

function preload() {
  for (let i = 0; i < 8; i++) {
    BIT[i] = loadImage("./data/BIT" + nf(i, 4) + ".png");
  }
  
  imgFondo = loadImage("./data/FondoBIT.png");
}

function setup() {
  createCanvas(800, 600);
  imageMode(CENTER);
}

function draw() {
  dibujarFondo();

  if (estado === 0) {
    frameActual = frameBucle(frameActual, quietoMin, quietoMax, velocidad);
  } else if (estado === 1) {
    frameActual = animacionFestejo(frameActual, festejoMin, festejoMax, velocidad);
  }

  dibujarBIT(BIT[frameActual], posX, posY);
  mostrarInformacion();
}

//Animacion quieto
function frameBucle(frameActual, min, max, vel) {
  if (frameCount % vel === 0) {
    frameActual++;

    if (frameActual > max) {
      frameActual = min;
    }
  }

  return frameActual;
}

//Animacion festejo
function animacionFestejo(frameActual, min, max, vel) {
  if (frameCount % vel === 0) {
    frameActual++;

    if (frameActual > max) {
      estado = 0;
      frameActual = quietoMin;
    }
  }

  return frameActual;
}

function dibujarBIT(imagen, x, y) {
  image(imagen, x, y, 250, 250);
}

function dibujarFondo() {
  imageMode(CORNER);
  image(imgFondo, 0, 0, width, height);
  
  imageMode(CENTER);

  noStroke();
  fill(0, 0, 0, 110);
  ellipse(posX, posY + 70, 110, 14);
}

function mostrarInformacion() {
  stroke(255, 255, 255, 100);
  strokeWeight(1);
  fill(15, 15, 25, 210);
  rect(200, 545, 400, 40, 8);
  
  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(15);
  text("ESPACIO = FESTEJAR      R = REINICIAR", width / 2, 565);
}

function reiniciar() {
  estado = 0;
  frameActual = 0;
  posX = 400;
  posY = 440;
}

function keyPressed() {
  if (key === ' ') {
    if (estado === 0) {
      estado = 1;
      frameActual = festejoMin;
    }
  }

  if (key === 'r' || key === 'R') {
    reiniciar();
  }
}
