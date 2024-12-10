const game = document.getElementById("game");
const ball = document.getElementById("ball");
const paddle = document.getElementById("paddle");
const trajectoryCanvas = document.getElementById("trajectory");
const ctx = trajectoryCanvas.getContext("2d");

trajectoryCanvas.width = game.clientWidth;
trajectoryCanvas.height = game.clientHeight;

let ballX = game.clientWidth / 2;
let ballY = game.clientHeight / 2;
let ballSpeedX = Math.random() * 6 - 3; // -3 ~ 3
let ballSpeedY = Math.random() * 6 - 3; // -3 ~ 3
let paddleX = game.clientWidth / 2;

function drawTrajectory() {
  ctx.clearRect(0, 0, trajectoryCanvas.width, trajectoryCanvas.height);
  ctx.beginPath();
  ctx.arc(ballX, ballY, 5, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
  ctx.stroke();
  ctx.closePath();
}

function updateBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  if (ballX <= 0 || ballX >= game.clientWidth - 20) ballSpeedX *= -1;
  if (ballY <= 0 || ballY >= game.clientHeight - 20) ballSpeedY *= -1;

  const paddleTop = paddle.offsetTop;
  const paddleLeft = paddle.offsetLeft;
  const paddleRight = paddleLeft + paddle.offsetWidth;

  if (ballY + 20 >= paddleTop && ballX >= paddleLeft && ballX <= paddleRight) {
    ballSpeedY *= -1;
    ballSpeedX = (Math.random() * 6 - 3);
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  drawTrajectory();
}

function updatePaddle(event) {
  const rect = game.getBoundingClientRect();
  paddleX = event.clientX - rect.left - paddle.offsetWidth / 2;
  paddleX = Math.max(0, Math.min(paddleX, game.clientWidth - paddle.offsetWidth));
  paddle.style.left = `${paddleX}px`;
}

function gameLoop() {
  updateBall();
  requestAnimationFrame(gameLoop);
}

game.addEventListener("mousemove", updatePaddle);
gameLoop();
