const Paddle = require('../lib/Paddle.js');
const Ball = require('../lib/Ball.js');
const Block = require('../lib/Block.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const paddle = new Paddle (500, 700, 75, 20);

const ball = new Ball (500, 670, 20, 5, 5);
const block =  new Block(...arguments)
// let blockArray;

canvas.addEventListener('touchmove', animatePaddle); 

// function createWall() {
//   blockArray = block.createArrayOfBlocks();
//   block.createBlocks(blockArray, ctx);
// }

// createWall();

let blockArray = block.createArrayOfBlocks();

function gameLoop() {
  ctx.clearRect(0, 0, 1000, 800)
  ball.moveBall(canvas).createBall(ctx);
  blockArray.forEach( (block, index, array) => {
    if (block.draw === false) {
      block.createBlocks(array, ctx)
    }
  })

  blockArray.forEach( (block, index, array) => {
    if (block.draw === false) {
      if  ((ball.x > block.x) && 
           (ball.y < block.y + block.h)  &&
           (ball.x < block.x + block.w)) { 
          block.draw = true;
          ball.dy = -ball.dy;
          block.createBlocks(array, ctx)
      }
    }
  }) 

  paddle.createPaddle(ctx);
  // PaddleBallCollison()
  // ball.clearBall(ctx).moveBall(canvas).createBall(ctx);
  
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);


function animatePaddle(e) {
  let mouseEvent = e;
  console.log(mouseEvent)
  // paddle.clearPaddle(ctx).movePaddle(mouseEvent).createPaddle(ctx);
}





// function PaddleBallCollison() {
//   if (ball.x > paddle.x && paddle.x + paddle.w) {
//     ball.dy = -ball.dy;
//     ball.dx = -ball.dx;
//   }
// }




