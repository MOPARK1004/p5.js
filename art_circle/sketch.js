function setup() {
  createCanvas(400, 400);
  
  frameRate(20);
  
  background(255);
}

function draw() {
  
  
  stroke(random(255), random(255), random(255), 80);
  strokeWeight(random(3, 20));  
  //point(random(400), random(400));
  
  circle(random(400), random(400), random(3,20));
  
} 