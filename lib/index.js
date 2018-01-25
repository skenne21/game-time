const Paddle = require('../lib/Paddle.js');
const Ball = require('../lib/Ball.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const paddle = new Paddle (500, 700, 75, 20);
const ball = new Ball (500, 670, 20, 3, 3);

canvas.addEventListener('mousemove', animatePaddle); 


function gameLoop() {
  paddle.createPaddle(ctx);
  ball.clearBall(ctx).moveBall(canvas).createBall(ctx);

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


function animatePaddle(e) {
  let mouseEvent = e;
  
  paddle.clearPaddle(ctx).movePaddle(mouseEvent).createPaddle(ctx);
}



