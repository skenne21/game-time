const Paddle = require('../lib/Paddle.js');
const Ball = require('../lib/Ball.js');
const Block = require('../lib/Block.js');
const LevelUp = require('../lib/LevelUp.js');
const Game = require('../lib/Game.js');

const paddle = new Paddle (400, 700, 1050, 20);
const ball = new Ball (500, 670, 10, 20, 20);
const block =  new Block(...arguments);
// const blockLevelTwo = new Block(...arguments);
// const blockLevelThree = new Block(...arguments);
const game = new Game(...arguments);
const levelUp = new LevelUp(1)
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const startBtn  = document.querySelector('.start-btn');
const replayBtn = document.querySelector('.replay-button');

let blockArray = block.createArrayOfBlocks();
// let pauseGame = false;


startBtn.addEventListener('click', startGame);
replayBtn.addEventListener('click', reloadGame);
canvas.addEventListener('mousemove', animatePaddle);



// function createWall() {
//   blockArray = block.createArrayOfBlocks();
//   block.createBlocks(blockArray, ctx);
// }

// createWall();


function createIntialCanvas() {
  ball.createBall(ctx);
  paddle.createPaddle(ctx);
  blockArray.forEach( (block, index, array) => {
    block.createBlocks(array, ctx);
  });

  // game.compareHighScore();
  game.drawScore(ctx);
  // game.initialScore(ctx);
  // game.compareHighScore();
  // if(game.highScore === 0) {
  // game.initiallocalStorage().drawScore(ctx)
  // } else {
  // game.initialScore(ctx).compareHighScore().storeHighScore(ctx).drawScore(ctx); 
  // }
}

createIntialCanvas();

function startGame() {
  game.startGameWindow();
  canvas.addEventListener('mousemove', animatePaddle); 
  gameLoop()
}


function endGame () {
  game.compareHighScore().storeHighScore().endGameWindow(); 
}



function reloadGame(event) {
  let gameEvent = event;
  game.resetGame(gameEvent)
}

function gameLoop() {
  ctx.clearRect(0, 0, 1000, 800);
  game.drawScore(ctx);
  ball.moveBall(canvas).createBall(ctx);
  paddle.createPaddle(ctx);
  paddle.paddleBallCollison(ball);
  blockArray.forEach( (block, index, array) => {
    if (block.ballHit=== false) {
      block.createBlocks(array, ctx, game.pauseGame)
    }
  })

  blockArray.forEach( (block, index, array) => {
    if (block.ballHit === false) {
      if  ((ball.x > block.x) && 
           (ball.y < block.y + block.h)  &&
           (ball.x < block.x + block.w)) { 
          block.ballHit = true;
          ball.dy = -ball.dy;
          game.userScore++;
          block.createBlocks(array, ctx);
      }
    }
  })

  if (ball.hitBottom === true) {
    endGame();
  }

  let noBlocksInArray = blockArray.every( block => block.ballHit === true);
  console.log('no blocks in array?', noBlocksInArray)

  if (noBlocksInArray === true ) {
    runLevelUp()
  }

  if (game.pauseGame === false) {
    requestAnimationFrame(gameLoop);
  } 


}

function runLevelUp() {
  ball.clearBall(ctx);
  game.pauseGame = true; 



  if (game.level === 1) {
    game.changeLevel1()
  }

  if (game.level === 2) {
    console.log('levelTwo')
      ball.x = 350;
      ball.y = 500;
      blockArray.forEach((block, index, array) => {
        block.blockRowTotal = 8;
        blockArray = block.createArrayOfBlocks();
        blockArray.forEach ( (block, index, array) => {
          block.createBlocks( blockArray, ctx);
        }) 
      })
    }

  if (game.level === 2) {
    game.changeLevel2()
  }

  if (game.level === 3) {
    console.log('levelthree');
    ball.radius = 10;
    ball.dx = 10;
    ball.dy = 10;
    paddle.w = 50;
    blockArray.forEach((block, index, array) => {
      block.blockRowTotal = 10;
      blockArray = block.createArrayOfBlocks();
      blockArray.forEach ( (block, index, array) => {
          block.createBlocks( blockArray, ctx);
        }) 
      })
  }
  
  ball.createBall(ctx);
  levelUpWindow();
}

function levelUpWindow() {
  let endLevelWindow = document.querySelector('.hide-level-up');
  console.log(endLevelWindow)
  endLevelWindow.classList.remove('hide-level-up');
  endLevelWindow.classList.add('level-up');
  let restartLevelBtn = document.querySelector('.restart-level-button');
  restartLevelBtn.addEventListener('click', restartGame);
}


function restartGame() {
  
  let parentSection = this.closest('section');

  parentSection.classList.remove('level-up');
  parentSection.classList.add('hide-level-up')
  game.pauseGame = false;
  console.log(blockArray)
  gameLoop(); 
}


function animatePaddle(e) {
  let mouseEvent = e;

  paddle.clearPaddle(ctx).movePaddle(mouseEvent, canvas).createPaddle(ctx);
}





