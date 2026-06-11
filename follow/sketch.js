// 백그라운드 셋업과 드로우 차이
// 코드 옯겨보기

let x = 200;
let y = 200;
let d  = 100;

function setup() {
  createCanvas(400, 400);   // 캔버스 사이트
  background(150, 150, 0, 255);
}

function draw() {
  //background(100, 150, 0);      // 캔버스 바탕 색상. 인자1개(흑백), 인자3개(RGB), 인자4개(RGBA) 
  
  //circle(x, y, d);
  circle(mouseX, mouseY, d)
  
}