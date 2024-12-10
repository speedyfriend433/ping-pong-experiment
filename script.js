const game = document.getElementById("game");
const ball = document.getElementById("ball");
const playerPaddle = document.getElementById("playerPaddle");
const aiPaddle = document.getElementById("aiPaddle");
const trajectoryCanvas = document.getElementById("trajectory");
const ctx = trajectoryCanvas.getContext("2d");

trajectoryCanvas.width = game.clientWidth;
trajectoryCanvas.height = game.clientHeight;

let ballX = game.clientWidth / 2;
let ballY = game.clientHeight / 2;
let ballSpeedX = Math.random() * 6 - 3; // -3 ~ 3
let ballSpeedY = Math.random() * 6 - 3; // -3 ~ 3
let playerPaddleX = game.clientWidth / 2;
let aiPaddleX = game.clientWidth / 2;

function drawTrajectory() {
  ctx.clearRect(0, 0, trajectoryCanvas.width, trajectoryCanvas.height);
  ctx.beginPath();
  ctx.moveTo(aiPaddleX + aiPaddle.offsetWidth / 2, aiPaddle.offsetTop + aiPaddle.offsetHeight);
  ctx.lineTo(ballX + 10, ballY + 10);
  ctx.strokeStyle = "rgba(0, 255, 255, 0.7)";
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(ballX + 10, ballY + 10, 5, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.stroke();
}

function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX <= 0 || ballX >= game.clientWidth - 20) ballSpeedX *= -1;

  const playerTop = playerPaddle.offsetTop;
  const playerLeft = playerPaddle.offsetLeft;
  const playerRight = playerLeft + playerPaddle.offsetWidth;

  const aiBottom = aiPaddle.offsetTop + aiPaddle.offsetHeight;
  const aiLeft = aiPaddle.offsetLeft;
  const aiRight = aiLeft + aiPaddle.offsetWidth;

  if (ballY + 20 >= playerTop && ballX >= playerLeft && ballX <= playerRight) {
    ballSpeedY *= -1;
    ballSpeedX = Math.random() * 6 - 3; // 무작위 속도
  } else if (ballY <= aiBottom && ballX >= aiLeft && ballX <= aiRight) {
    ballSpeedY *= -1;
    ballSpeedX = Math.random() * 6 - 3; // 무작위 속도
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  drawTrajectory();
}

function updatePlayerPaddle(event) {
  const rect = game.getBoundingClientRect();
  playerPaddleX = event.clientX - rect.left - playerPaddle.offsetWidth / 2;
  playerPaddleX = Math.max(0, Math.min(playerPaddleX, game.clientWidth - playerPaddle.offsetWidth));
  playerPaddle.style.left = `${playerPaddleX}px`;
}

function updateAiPaddle() {
  const aiCenter = aiPaddleX + aiPaddle.offsetWidth / 2;
  if (aiCenter < ballX + 10) {
    aiPaddleX += 3; // AI 속도
  } else if (aiCenter > ballX + 10) {
    aiPaddleX -= 3;
  }

  aiPaddleX = Math.max(0, Math.min(aiPaddleX, game.clientWidth - aiPaddle.offsetWidth));
  aiPaddle.style.left = `${aiPaddleX}px`;
}

function gameLoop() {
  updateBall();
  updateAiPaddle();
  requestAnimationFrame(gameLoop);
}

game.addEventListener("mousemove", updatePlayerPaddle);
gameLoop();

