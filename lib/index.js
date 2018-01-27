const Paddle = require('../lib/Paddle.js');
const Ball = require('../lib/Ball.js');
const Block = require('../lib/Block.js');
const LevelUp = require('../lib/LevelUp.js');


const paddle = new Paddle (400, 700, 1050, 20);
const ball = new Ball (500, 670, 10, 20, 20);
const block =  new Block(...arguments);
const levelUp = new LevelUp(1)
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const startBtn  = document.querySelector('.start-btn');
const replayBtn = document.querySelector('.replay-button');


let blockArray = block.createArrayOfBlocks();
let pauseGame = false;


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
  paddle.createPaddle(ctx);
  paddle.paddleBallCollison(ball);
  blockArray.forEach( (block, index, array) => {
    if (block.ballHit=== false) {
      block.createBlocks(array, ctx, pauseGame)
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

  let noBlocksInArray = blockArray.every( block => block.ballHit === true);

  if (noBlocksInArray === true ) {
    runLevelUp()
  }

  if (pauseGame === false) {
    requestAnimationFrame(gameLoop);
  } 


}

function runLevelUp() {
  ball.clearBall(ctx);
  pauseGame = true;
  blockArray.forEach( block => block.ballHit = false);
  levelUp.changeLevel(blockArray, ctx);
  ball.levelUpBall().createBall(ctx);
  levelUpWindow()
}

function levelUpWindow() {
  let endLevelWindow = document.querySelector('.hide-level-up');
  endLevelWindow.classList.remove('hide-level-up');
  endLevelWindow.classList.add('level-up');
  let restartLevelBtn = document.querySelector('.restart-level-button');
  restartLevelBtn.addEventListener('click', restartGame);
}


function restartGame() {
  this.closestParnet('section').classList.remove('level-up');
  this.closestParnet('section').classList.add('hide-level-up')
  pauseGame = false;  
}

// function gameLooplevelTwo() {
//   let changeBlockArray = blockArray.every( block => block.ballHit === true);
//   if ( changeBlockArray === true ) {
//     blockArray.forEach((block, index, array) => {
//       block.blockRowTotal = 8;
//       console.log(8)
//       blockArray = block.createArrayOfBlocks();
//       blockArray.forEach ( (block, index, array) => {
//         block.createBlocks( blockArray, ctx);
//       }) 
//     })
//   }

//   ctx.clearRect(0, 0, 1000, 800);
//   ball.moveBall(canvas).createBall(ctx);
//   paddle.createPaddle(ctx);
//   paddle.paddleBallCollison(ball);

//   levelTwo()
//   // let noBlocksInArray = blockArray.every( block => block.ballHit === true);
//   // console.log('should change to true:', noBlocksInArray)
//   // if (noBlocksInArray === true) {
//   //   levelThree()
  
  
// }






function animatePaddle(e) {
  let mouseEvent = e;

  paddle.clearPaddle(ctx).movePaddle(mouseEvent, canvas).createPaddle(ctx);
}





