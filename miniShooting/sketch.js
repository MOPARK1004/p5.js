// 원(플레이어)의 초기 위치 및 크기
let x = 200, y = 300, d = 50; 
let bgm;

// 하늘에서 떨어질 삼각형들을 저장할 배열
let triangles = []; 
let spawnTimer = 0; // 삼각형 생성 주기를 조절할 타이머

function preload() {
  soundFormats('mp3', 'ogg');
  // 기존에 사용하시던 로컬 효과음 경로입니다.
  bgm = loadSound('./pop.mp3');
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  // 1. 플레이어(원) 그리기
  fill(255, 204, 0); // 눈에 잘 띄는 노란색 원
  stroke(0);
  strokeWeight(2);
  ellipse(x, y, d);

  // 2. 키보드 입력에 따른 원 이동 (상하좌우 대각선 이동 가능하도록 수정)
  if (keyIsDown(LEFT_ARROW)) {
    x -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    x += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    y -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    y += 5;
  }

  // 3. 원이 화면 벽에 부딪혔을 때의 예외 처리 및 효과음 재생
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

  // 4. 일정 시간마다 새로운 삼각형 생성 (약 1.5초마다 하나씩)
  spawnTimer++;
  if (spawnTimer > 90) { 
    // 화면 위쪽 무작위 x좌표에 삼각형 객체 생성해서 배열에 추가
    triangles.push(new FallingTriangle(random(30, width - 30), -20));
    spawnTimer = 0;
  }

  // 5. 생성된 삼각형들 업데이트 및 그리기 (배열 역순 순회로 안전하게 제거)
  for (let i = triangles.length - 1; i >= 0; i--) {
    let t = triangles[i];
    t.update();
    t.display();

    // 원과 삼각형의 충돌 검사
    if (t.checkCollision(x, y, d/2)) {
      bgm.play();               // 닿으면 효과음 재생
      triangles.splice(i, 1);    // 배열에서 해당 삼각형 제거 (사라짐 효과)
      continue;                 // 아래 화면 이탈 코드는 건너뜀
    }

    // 화면 아래로 완전히 벗어난 삼각형 제거 (메모리 관리)
    if (t.isOffScreen()) {
      triangles.splice(i, 1);
    }
  }
}

// --- 삼각형을 정의하는 클래스 (Class) ---
class FallingTriangle {
  constructor(x, y) {
    this.x = x;      // 삼각형의 기준 x 좌표 (무게중심 역할)
    this.y = y;      // 삼각형의 기준 y 좌표
    this.size = 25;  // 삼각형 크기
    this.speed = random(2, 4); // 떨어지는 속도 무작위 지정 (다채로움 제공)
  }

  // 아래로 떨어지게 하는 기능
  update() {
    this.y += this.speed;
  }

  // 화면에 삼각형 그리기
  display() {
    fill(255, 100, 100); // 눈에 띄는 빨간색 삼각형
    stroke(0);
    strokeWeight(2);
    
    // 기준 좌표(this.x, this.y)를 기준으로 꼭짓점 3개를 계산하여 그립니다.
    triangle(
      this.x, this.y - this.size,                // 위쪽 꼭짓점
      this.x - this.size, this.y + this.size,    // 왼쪽 아래 꼭짓점
      this.x + this.size, this.y + this.size     // 오른쪽 아래 꼭짓점
    );
  }

  // 화면을 완전히 벗어났는지 판정
  isOffScreen() {
    return this.y > height + this.size * 2;
  }

  // 플레이어(원)와의 충돌 검사 로직
  // 원과 삼각형의 세 꼭짓점 사이의 거리 중 하나라도 원의 반지름보다 작으면 충돌로 판정합니다.
  checkCollision(playerX, playerY, playerRadius) {
    // 삼각형의 실제 세 꼭짓점 좌표 계산
    let x1 = this.x, y1 = this.y - this.size;
    let x2 = this.x - this.size, y2 = this.y + this.size;
    let x3 = this.x + this.size, y3 = this.y + this.size;

    // 각 꼭짓점과 원의 중심 사이의 거리 측정
    let d1 = dist(playerX, playerY, x1, y1);
    let d2 = dist(playerX, playerY, x2, y2);
    let d3 = dist(playerX, playerY, x3, y3);

    // 또한, 삼각형의 중심 자체가 원 내부에 들어왔는지 검사 (가장 직관적인 영역 판정)
    let dCenter = dist(playerX, playerY, this.x, this.y);

    // 꼭짓점 중 하나가 닿았거나, 중심이 원 안으로 쏙 들어왔을 때 참(true) 반환
    if (d1 < playerRadius || d2 < playerRadius || d3 < playerRadius || dCenter < playerRadius) {
      return true;
    }
    return false;
  }
}