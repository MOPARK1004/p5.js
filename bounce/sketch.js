let x=100, y=200, d=50, dir=2;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  ellipse(x, y, d);
  
  if(x > (width - d/2)) {
    dir = dir * -1;
  } else if (x < d/2 ) {
    dir = dir * -1;         
  }
  
  if (x < 200) {
    fill(150, 255, 150);
  } else {
    fill (255, 0, 0);
  }
  
  x += dir;
}