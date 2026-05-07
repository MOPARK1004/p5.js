function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // 얼굴 : 원
  strokeWeight(5);
  fill(255, 255, 255);
  ellipse(200, 200, 390);  
  
  //원 : 빨간색
  
  //noStroke();
  //fill(random(255), random(255), random(255));
  fill(255, 0, 0);
  ellipse(100, 100, 50);  
  ellipse(300, 100, 50);  
  

  //삼각형 : 초록색
  fill(0, 255, 0);
  triangle(200, 150, 150, 200, 250, 200);
  
  
  //사각형 : 파란색
  fill(0, 0, 255);
  rect(100, 250, 200, 50);
}