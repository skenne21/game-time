const Snake = require('../lib/Snake.js')

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const snakeHead = new Snake (500, ...arguments);
// console.log(snakeHead)

function gameLoop() {
  snakeHead.createCircle(ctx);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

canvas.addEventListener('mousemove', function() {
  snakeHead.clearSnake(ctx)
  // ctx.clearRect(0, 0 , canvas.width, canvas.height)
  snakeHead.x = event.pageX;
  // console.log(snakeHead.x);
  snakeHead.createCircle(ctx);
})