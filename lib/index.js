const Paddle = require('../lib/Paddle.js');
const Ball = require('../lib/Ball.js');
const Block = require('../lib/Block.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const paddle = new Paddle (400, 700, 200, 20);
const ball = new Ball (500, 670, 20, 10, 10);
const block =  new Block(...arguments);
const startBtn  = document.querySelector('.start-btn');
const blockArray = block.createArrayOfBlocks();


startBtn.addEventListener('click', startGame);


// function createWall() {
//   blockArray = block.createArrayOfBlocks();
//   block.createBlocks(blockArray, ctx);
// }

// createWall();





function createIntialCanvas( ){
  ball.createBall(ctx);
  paddle.createPaddle(ctx);
  blockArray.forEach( (block, index, array) => {
    block.createBlocks(array, ctx)
  });
}

createIntialCanvas();



function startGame() {
  let welcomeWindow = document.querySelector('.start-game')
  welcomeWindow.classList.add('hide-start');
  canvas.addEventListener('mousemove', animatePaddle); 
  gameLoop()
}


function gameLoop() {
  ctx.clearRect(0, 0, 1000, 800);
  ball.moveBall(canvas).createBall(ctx);
  blockArray.forEach( (block, index, array) => {
    if (block.ballHit=== false) {
      block.createBlocks(array, ctx)
    }
  })

  blockArray.forEach( (block, index, array) => {
    if (block.ballHit === false) {
      if  ((ball.x > block.x) && 
           (ball.y < block.y + block.h)  &&
           (ball.x < block.x + block.w)) { 
          block.ballHit = true;
          ball.dy = -ball.dy;
          block.createBlocks(array, ctx);
      }
    }
  })

  paddle.createPaddle(ctx);
  paddle.paddleBallCollison(ball);
  
  requestAnimationFrame(gameLoop);

}

// requestAnimationFrame(gameLoop)


function animatePaddle(e) {
  let mouseEvent = e;
  paddle.clearPaddle(ctx).movePaddle(mouseEvent, canvas).createPaddle(ctx);
}





