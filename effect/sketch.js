let x = 100, y=100, d=50;
let bgm;

function preload() {
  soundFormats('mp3', 'ogg');
  bgm = loadSound('./pop.mp3');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(x, y, d);
  
  if(keyIsDown(LEFT_ARROW)) {
    x -= 5;
  } else if(keyIsDown(RIGHT_ARROW)) {
    x += 5;
  } else if(keyIsDown(UP_ARROW)) {
    y -= 5;
  } else if(keyIsDown(DOWN_ARROW)) {
    y += 5;
  }
  
  if (x <= d/2) {
    x = d/2 + 10;    
    bgm.play();
  } else if (x >= width - d/2) {
    x = width - d/2 - 10;
    bgm.play();
  }
  
  if (y <= d/2) {
    y = d/2 + 10;
    bgm.play();
  } else if (y >= height - d/2) {
    y = height - d/2 - 10;
    bgm.play();
  }  
}
