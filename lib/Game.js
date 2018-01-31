const Block = require('../lib/Block.js');

class Game {
  constructor() {
    this.pauseGame = false;
    this.userScore = 0;
    this.highScore = 0;
    this.level = 1;
    this.block = new Block(...arguments);
    this.padding = 55;
    this.blockColumnTotal = 10;
    this.offSet = 25;
    this.blocks = [];
    this.fontStyle = "24px Arial";
    this.fillStyle = "#eee";
  }

  initialScore() {
    let initialHighScore = localStorage.getItem('high score');
    let parseHighScore = JSON.parse(initialHighScore);

    if (parseHighScore > 0) {
      this.highScore = parseHighScore;
    }
    return this;
  }

  drawLevels(ctx) {
    ctx.font = this.fontStyle;
    ctx.fillStyle = this.fillStyle;
    ctx.fillText(" Level: " + this.level, 450, 40);
  }

  drawScore(ctx) {
    ctx.font = this.fontStyle;
    ctx.fillStyle = this.fillStyle;
    ctx.fillText(" Your Score: " + this.userScore, 40, 40);

    ctx.font = this.fontStyle;
    ctx.fillStyle = this.fillStyle;
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
    if (this.level === 1) {
      for (let column = 0; column < this.blockColumnTotal; column++) {
        for (let row = 0; row < 3; row++) {
          this.block.x = (column * (40 + this.padding)) + this.offSet;
          this.block.y = (row *  (3 + this.padding)) + this.offSet + 50;
          let block = new Block(
            this.block.x, 
            this.block.y, 
            this.block.w,
            this.block.h)

          this.blocks.push(block);
        }
      }
      return this.blocks 
    } else if (this.level === 2) {
      for (let column = 0; column < this.blockColumnTotal; column++) {
        for (let row = 0; row < 6; row++) {
          this.block.x = (column * (40 + this.padding)) + this.offSet;
          this.block.y = (row *  (3 + this.padding)) + this.offSet + 50;
          let block = new Block(
            this.block.x, 
            this.block.y, 
            this.block.w, 
            this.block.h)

          this.blocks.push(block);
        }
      }
      return this.blocks 
    } else if (this.level === 3) {
      for (let column = 0; column < 
        this.blockColumnTotal; column++) {
        for (let row = 0; row < 8; row++) {
          this.block.x = (column * (40 + this.padding)) + this.offSet;
          this.block.y = (row *  (3 + this.padding)) + this.offSet + 50;
          let block = new Block(
            this.block.x, 
            this.block.y, 
            this.block.w, 
            this.block.h)

          this.blocks.push(block);
        }
      }
      return this.blocks 
    }
    return this
  }

  levelUpBall(ball) {
    ball.x  = 500;
    ball.y = 500;
    if (this.level === 2) {
      ball.dx  = 12;
      ball.dy = 12;
    }
    if (this.level === 3) {
      ball.radius = 17;
    }
    return this;
  }

  levelUpPaddle(paddle) {
    if (this.level === 3) {
      paddle.w = 150;
    }
  }

  wonGameWindow() {
    let wonWindow = document.querySelector('.hide-game-won');

    let finalScore = document.querySelector('.final-score');

    finalScore.innerText = this.userScore;
    wonWindow.classList.remove('hide-game-won');
    wonWindow.classList.add('game-won');
  }
  
  levelUpWindow() {
    let endLevelWindow = document.querySelector('.hide-level-up');
    let endUserScore = document.querySelector('.end-level-score');

    endUserScore.innerText = this.userScore;
    endLevelWindow.classList.remove('hide-level-up');
    endLevelWindow.classList.add('level-up');
  }

  restartGame(parentSection) {
    parentSection.classList.remove('level-up');
    parentSection.classList.add('hide-level-up')
  }
}

module.exports = Game;