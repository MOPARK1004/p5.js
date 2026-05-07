function setup() {
  createCanvas(400, 400);
  background(220);
  
  strokeWeight(10);
  fill('yellow');
  circle(200, 200, 350);
  
  fill('black');
  circle(130, 130, 20);
  circle(270, 130, 20);
  
  noFill();
  strokeWeight(15);
  arc(200, 200, 250, 250, 0, PI);
  
  //frameRate(20);
}

function draw() {
  //background(220);
}