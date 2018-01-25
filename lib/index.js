const Paddle = require('../lib/Paddle.js');
const Ball = require('../lib/Ball.js');
const Block = require('../lib/Block.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const paddle = new Paddle (500, 700, 100, 30);
const ball = new Ball (...arguments);
const block =  new Block(...arguments)


function createWall() {
  const array = block.createArrayOfBlocks();
  block.createBlocks(array, ctx);
  
}

createWall();

function gameLoop() {
  paddle.createPaddle(ctx);
  ball.clearBall(ctx);
  ball.createBall(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

canvas.addEventListener('mousemove', animatePaddle); 

function animatePaddle(e) {
  let mouseEvent = e;
  paddle.clearPaddle(ctx).movePaddle(mouseEvent).createPaddle(ctx);
}