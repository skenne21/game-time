const Paddle = require('../lib/Paddle.js');
const Ball = require('../lib/Ball.js');
const Block = require('../lib/Block.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const paddle = new Paddle (400, 700, 200, 20);
const ball = new Ball (500, 670, 20, 7, 7);
const block =  new Block(...arguments);
const startBtn  = document.querySelector('.start-btn');
const blockArray = block.createArrayOfBlocks();
const replayBtn = document.querySelector('.replay-button');


startBtn.addEventListener('click', startGame);
replayBtn.addEventListener('click', reloadGame);

canvas.addEventListener('mousemove', animatePaddle); 

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
  let welcomeWindow = document.querySelector('.start-game');

  welcomeWindow.classList.add('hide-start');
  canvas.addEventListener('mousemove', animatePaddle); 
  gameLoop()
}

function endGame () {
  let endGameWindow = document.querySelector('.hide-end-game');

  endGameWindow.classList.remove('hide-end-game');
  endGameWindow.classList.add('end-game');
}

function reloadGame (event) {
  if (event.target.matches('.replay-button') === true) {
  event.preventDefault();
  document.location.reload();
  }
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

  if (ball.hitBottom === true) {
    endGame();
  }

  paddle.createPaddle(ctx);
  paddle.paddleBallCollison(ball);
  
  requestAnimationFrame(gameLoop);

}

function animatePaddle(e) {
  let mouseEvent = e;

  paddle.clearPaddle(ctx).movePaddle(mouseEvent, canvas).createPaddle(ctx);
}





