const Paddle = require('../lib/Paddle.js');
const Ball = require('../lib/Ball.js');
const Block = require('../lib/Block.js');
const Game = require('../lib/Game.js');

const paddle = new Paddle (400, 700, 250, 10);
const ball = new Ball (300, 370, 20, 7, 7);
const block =  new Block(...arguments);
const game = new Game(...arguments);

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const startBtn  = document.querySelector('.start-btn');
const replayBtn = document.querySelector('.replay-button');

let blockArray = game.createArrayOfBlocks();

startBtn.addEventListener('click', startGame);
replayBtn.addEventListener('click', reloadGame);
canvas.addEventListener('mousemove', animatePaddle);

function createInitialCanvas() {
  game.initialScore(ctx);
  game.drawScore(ctx);
  game.drawLevels(ctx);
  ball.createBall(ctx);
  paddle.createPaddle(ctx);
  blockArray.forEach( (block, index, array) => {
    block.createBlocks(array, ctx);
  });
}

createInitialCanvas();

function startGame() {
  game.startGameWindow();
  canvas.addEventListener('mousemove', animatePaddle); 
  gameLoop()
}

function endGame () {
  game.compareHighScore();
  game.storeHighScore()
  game.endGameWindow(); 
}

function reloadGame(event) {
  let gameEvent = event;
  game.resetGame(gameEvent);
  game.compareHighScore();
}

function gameLoop() {
  ctx.clearRect(0, 0, 1000, 800);
  game.drawScore(ctx);
  game.drawLevels(ctx);
  ball.moveBall(canvas).createBall(ctx);
  paddle.createPaddle(ctx);
  paddle.paddleBallCollison(ball);

  blockArray.forEach( (block, index, array) => {
    if (block.ballHit === false) {
      block.createBlocks(array, ctx)
    }
  })

  blockArray.forEach( (block, index, array) => {
    if (block.ballHit === false) {
      if  ((ball.x > block.x) && 
           (ball.y < block.y + block.h) && (ball.x < block.x + block.w)) { 
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

  let noBlocksInArray = blockArray.every( block =>
    block.ballHit === true)

  if (noBlocksInArray === true) {
    runLevelUp()
  }

  if (game.pauseGame === false) {
    requestAnimationFrame(gameLoop);
  } 
}

function runLevelUp() {
  game.pauseGame = true; 
  ball.clearBall(ctx);
  game.changeLevel();
  game.compareHighScore().storeHighScore();
  blockArray = game.createArrayOfBlocks();
  ball.x  = 500;
  ball.y = 500;
  ball.createBall(ctx);
  levelUpWindow();
}

function levelUpWindow() {
  let endLevelWindow = document.querySelector('.hide-level-up');
  let endUserScore = document.querySelector('.end-level-score');

  endUserScore.innerText = game.userScore;
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
  gameLoop(); 
}

function animatePaddle(e) {
  let mouseEvent = e;

  paddle.clearPaddle(ctx).movePaddle(mouseEvent, canvas).createPaddle(ctx);
}





