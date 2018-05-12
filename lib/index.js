const Paddle = require('../lib/Paddle.js');
const Ball = require('../lib/Ball.js');
const Game = require('../lib/Game.js');

const paddle = new Paddle (400, 700, 320, 10);
const ball = new Ball (300, 370, 20, 10, 10);
const game = new Game();

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const startBtn  = document.querySelector('.start-btn');
const replayBtn = document.querySelector('.replay-button');
const replayGameBtn = document.querySelector('.replay-game')

let blockArray = game.createArrayOfBlocks();

startBtn.addEventListener('click', startGame);
replayBtn.addEventListener('click', reloadGame);
canvas.addEventListener('mousemove', animatePaddle);
replayGameBtn.addEventListener('click', playAgain);


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


function playAgain() {
  document.location.reload()
}

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
  ball.moveBall().createBall(ctx);
  paddle.createPaddle(ctx);
  paddle.paddleBallCollison(ball);

  blockArray.forEach( (block, index, array) => {
    if (block.ballHit === false) {
      block.createBlocks(array, ctx)
    }
  })

  blockArray.forEach( (block, index, array) => {
    if (block.ballHit === false) {
      let blockCollision = block.blockCollisionTest(ball);
      
      if (blockCollision === true) { 
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
  ball.clearBall(ctx);
  game.changeLevel();
  game.pauseGame = true; 
  game.compareHighScore().storeHighScore();
  blockArray = game.createArrayOfBlocks();
  game.levelUpBall(ball);
  game.levelUpPaddle(paddle);
  ball.createBall(ctx);
  if (game.level === 4) {
    game.wonGameWindow();
  } else {
    levelUpWindow();
  }
}

function levelUpWindow() {
  game.levelUpWindow();
  let restartLevelBtn = document.querySelector('.restart-level-button');

  restartLevelBtn.addEventListener('click', restartGame);
}


function restartGame() {
  let parentSection = this.closest('section');

  game.restartGame(parentSection)
  game.pauseGame = false;
  gameLoop(); 
}

function animatePaddle(e) {
  let mouseEvent = e;

  paddle.clearPaddle(ctx).movePaddle(mouseEvent, canvas).createPaddle(ctx);
}





