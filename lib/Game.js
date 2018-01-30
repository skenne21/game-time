const Block = require('../lib/Block.js');
const Ball = require('../lib/Ball.js');
const Paddle = require('../lib/Paddle.js');

class Game {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.pauseGame = false;
    this.userScore = 0;
    this.highScore = 0;
    this.level = 1;
    this.block = new Block(...arguments);
    this.ball = new Ball(...arguments)
  }

  intialScore(ctx) {
    let initialHighScore = localStorage.getItem('high score');
    let parseHighScore = JSON.parse(initialHighScore);
    if (parseHighScore > 0) {
      this.highScore = parseHighScore;
    }
    return this;
  }

  drawLevels(ctx) {
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(" Level: " + this.level, 450, 40);
  }

  drawScore(ctx) {
    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(" Your Score: " + this.userScore, 20, 40);

    ctx.font = "24px Arial";
    ctx.fillStyle = "black";
    ctx.fillText(" High score: " + this.highScore, 800, 40);
    return this;
  }

  startGameWindow() {
    let welcomeWindow = document.querySelector('.start-game');
    welcomeWindow.classList.add('hide-start');
  }

  storeHighScore() {
    let stringedHighScore = JSON.stringify(this.highScore);
    localStorage.setItem('high score', stringedHighScore);

    return this;
  }

  compareHighScore() {
    let getHighScore = localStorage.getItem('high score');
    let parseHighScore = JSON.parse(getHighScore);
    if (parseHighScore < this.userScore) {
      parseHighScore = this.userScore;
      this.highScore = parseHighScore;
    }

    return this;
  }

  endGameWindow() {
    let endGameWindow = document.querySelector('.hide-end-game');

    endGameWindow.classList.remove('hide-end-game');
    endGameWindow.classList.add('end-game');
    let userScoreSpan = document.querySelector('.end-game-score');

    userScoreSpan.innerHTML = this.userScore;
    return this
  }

  resetGame (gameEvent) {
    if (gameEvent.target.matches('.replay-button') === true) {
      gameEvent.preventDefault();
      document.location.reload();
    }
  }

  changeLevel() {
    this.level++;
    return this
  }
 
   createArrayOfBlocks() {
    let blocks = []
    if (this.level === 1) {
      for (let column = 0; column < this.block.blockColumnTotal; column++) {
        for (let row = 0; row < 3; row++) {
          this.block.x = (column * (35 + this.block.padding)) + this.block.offSet;
          this.block.y = (row *  (3 + this.block.padding)) + this.block.offSet + 50;
          let block = new Block(this.block.x, this.block.y, this.block.w, this.block.h)
          blocks.push(block);
        }
      }
    return blocks 
    } else if (this.level === 2) {
      
      for (let column = 0; column < this.block.blockColumnTotal; column++) {
        for (let row = 0; row < 6; row++) {
          this.block.x = (column * (35 + this.block.padding)) + this.block.offSet;
          this.block.y = (row *  (3 + this.block.padding)) + this.block.offSet + 50;
          let block = new Block(this.block.x, this.block.y, this.block.w, this.block.h)
          blocks.push(block);
        }
      }
    return blocks 
    } else if (this.level === 3) {

      for (let column = 0; column < this.block.blockColumnTotal; column++) {
        for (let row = 0; row < 8; row++) {
          this.block.x = (column * (35 + this.block.padding)) + this.block.offSet;
          this.block.y = (row *  (3 + this.block.padding)) + this.block.offSet + 50;
          let block = new Block(this.block.x, this.block.y, this.block.w, this.block.h)
          blocks.push(block);
        }
      }
    return blocks 
    }
    return this
  }
}

module.exports = Game;