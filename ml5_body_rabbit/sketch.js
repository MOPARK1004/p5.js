/*
 * 👋 Hello! This is an ml5.js example made and shared with ❤️.
 * Learn more about the ml5.js project: https://ml5js.org/
 * ml5.js license and Code of Conduct: https://github.com/ml5js/ml5-next-gen/blob/main/LICENSE.md
 *
 * This example demonstrates drawing skeletons on poses for the MoveNet model.
 */

let video;
let bodyPose;
let poses = [];
let connections;

function preload() {
  // Load the bodyPose model
  bodyPose = ml5.bodyPose();
}

function setup() {
  createCanvas(640, 480);

  // Create the video and hide it
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  // Start detecting poses in the webcam video
  bodyPose.detectStart(video, gotPoses);
  // Get the skeleton connection information
  connections = bodyPose.getSkeleton();
}

function draw() {
  // Draw the webcam video
  image(video, 0, 0, width, height);

  // --- 기존 스켈레톤 라인 그리기 (주석을 해제하면 뼈대가 보입니다) ---
  /*
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < connections.length; j++) {
      let pointAIndex = connections[j][0];
      let pointBIndex = connections[j][1];
      let pointA = pose.keypoints[pointAIndex];
      let pointB = pose.keypoints[pointBIndex];
      if (pointA.confidence > 0.1 && pointB.confidence > 0.1) {
        stroke(255, 0, 0);
        strokeWeight(2);
        line(pointA.x, pointA.y, pointB.x, pointB.y);
      }
    }
  }
  */

  // --- 기존 랜드마크 포인트 그리기 (주석을 해제하면 녹색 점들이 보입니다) ---
  /*
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      if (keypoint.confidence > 0.1) {
        fill(0, 255, 0);
        noStroke();
        circle(keypoint.x, keypoint.y, 10);
      }
    }
  }
  */

  // --- 토끼 귀, 코 필터 그리기 ---
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i];
    
    // 얼굴 부위의 키포인트 매핑 (MoveNet COCO 모델 기준)
    // 0: nose, 1: left_eye, 2: right_eye, 3: left_ear, 4: right_ear
    let nose = pose.keypoints[0];
    let leftEye = pose.keypoints[1];
    let rightEye = pose.keypoints[2];
    
    // 얼굴이 감지되었을 때만 그리기 (신뢰도 0.2 이상)
    if (nose.confidence > 0.2 && leftEye.confidence > 0.2 && rightEye.confidence > 0.2) {
      
      // 양쪽 눈 사이의 거리를 계산하여 얼굴의 크기(Scale) 기준으로 삼습니다.
      let faceScale = dist(leftEye.x, leftEye.y, rightEye.x, rightEye.y);
      
      // 1. 토끼 귀 그리기 (Eyes 위에 배치)
      drawRabbitEars(leftEye, rightEye, faceScale);
      
      // 2. 토끼 코와 수염 그리기 (Nose에 배치)
      drawRabbitNose(nose, faceScale);
    }
  }
}

// 토끼 귀를 그려주는 함수
function drawRabbitEars(leftEye, rightEye, scale) {
  push();
  rectMode(CENTER);
  
  // 양 눈 사이의 중심을 머리 중심으로 계산
  let midX = (leftEye.x + rightEye.x) / 2;
  let midY = (leftEye.y + rightEye.y) / 2;
  
  // 얼굴 각도 계산 (머리의 기울기에 맞춰 귀가 같이 눕도록 설정)
  let angle = atan2(rightEye.y - leftEye.y, rightEye.x - leftEye.x);
  
  translate(midX, midY);
  rotate(angle);
  
  // 귀 크기 비례 설정
  let earW = scale * 0.4;
  let earH = scale * 1.5;
  
  // 왼쪽 귀 (위치 offset)
  push();
  translate(-scale * 0.4, -scale * 1.1); // 머리 위쪽 왼편으로 이동
  rotate(-5); // 약간 바깥으로 뻗치게 회전
  // 겉 귀 (흰색/연핑크)
  fill(255, 240, 245);
  noStroke();
  rect(0, 0, earW, earH, earW / 2); // 둥근 모서리 캡슐 모양
  // 속 귀 (진한 핑크)
  fill(255, 182, 193);
  rect(0, 0, earW * 0.6, earH * 0.7, (earW * 0.6) / 2);
  pop();
  
  // 오른쪽 귀
  push();
  translate(scale * 0.4, -scale * 1.1); // 머리 위쪽 오른편으로 이동
  rotate(5);
  // 겉 귀
  fill(255, 240, 245);
  noStroke();
  rect(0, 0, earW, earH, earW / 2);
  // 속 귀
  fill(255, 182, 193);
  rect(0, 0, earW * 0.6, earH * 0.7, (earW * 0.6) / 2);
  pop();
  
  pop();
}

// 토끼 코와 수염을 그려주는 함수
function drawRabbitNose(nose, scale) {
  push();
  translate(nose.x, nose.y);
  
  // 1. 고양이/토끼 수염 그리기 (코 양옆으로 뻗어나감)
  stroke(50);
  strokeWeight(scale * 0.05); // 수염 굵기도 얼굴 크기에 맞춤
  noFill();
  
  // 왼쪽 수염 3개
  line(-scale * 0.15, -scale * 0.02, -scale * 0.7, -scale * 0.1);
  line(-scale * 0.15, 0, -scale * 0.8, 0);
  line(-scale * 0.15, scale * 0.02, -scale * 0.7, scale * 0.1);
  
  // 오른쪽 수염 3개
  line(scale * 0.15, -scale * 0.02, scale * 0.7, -scale * 0.1);
  line(scale * 0.15, 0, scale * 0.8, 0);
  line(scale * 0.15, scale * 0.02, scale * 0.7, scale * 0.1);
  
  // 2. 분홍색 역삼각형/하트 모양 코 그리기
  noStroke();
  fill(255, 105, 180); // 핫핑크 색상
  let noseSize = scale * 0.3;
  // 하트 모양 코
  beginShape();
  for (let angle = 0; angle < 360; angle += 5) {
    let rad = radians(angle);
    // 하트 수식 적용하여 부드러운 코 묘사
    let hx = 16 * pow(sin(rad), 3);
    let hy = -(13 * cos(rad) - 5 * cos(2 * rad) - 2 * cos(3 * rad) - cos(4 * rad));
    vertex(hx * (noseSize / 30), hy * (noseSize / 30));
  }
  endShape(CLOSE);
  
  // 3. 코 밑의 입술선 경계선 (Y자 연결선)
  stroke(255, 105, 180);
  strokeWeight(scale * 0.06);
  line(0, noseSize * 0.2, 0, noseSize * 0.6);
  
  pop();
}

// Callback function for when bodyPose outputs data
function gotPoses(results) {
  // Save the output to the poses variable
  poses = results;
}
