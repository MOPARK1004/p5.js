function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  fill(0, 0);
  strokeWeight(10);
  angleMode(DEGREES); // 각도를 도 단위로 쓰겠다고 설정
  arc(125, 100, 100, 100, 200, 340, OPEN);
  arc(275, 100, 100, 100, 200, 340, OPEN);

}


