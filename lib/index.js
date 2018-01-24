const Paddle = require('../lib/Paddle.js');
const Ball = require('../lib/Ball.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const paddle = new Paddle (500, ...arguments);
const ball = new Ball (...arguments);


function gameLoop() {

  paddle.createPaddle(ctx);
  ball.clearBall(ctx);
  ball.createBall(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

canvas.addEventListener('mousemove', function() {
  paddle.clearPaddle(ctx)
  paddle.x = event.pageX;
  paddle.createPaddle(ctx);
})