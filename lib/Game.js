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
  }

  initialLocalStorage() {
    let stringifyHighScore = JSON.stringify(this.HighScore);
    localStorage.setItem('high score', stringifyHighScore);
    return this;
  }

  intialScore(ctx) {
    console.log(this.highScore)
    let initialHighScore = localStorage.getItem('high score');
    let parseHighScore = JSON.parse(initialHighScore);
    this.highScore = parseHighScore;
    return this;
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
    console.log(parseHighScore);
    if (parseHighScore < this.userScore) {
      parseHighScore = this.userScore;
      this.highScore = parseHighScore;
      let stringifyHighScore = JSON.stringify(this.highScore);
      localStorage.setItem('high score', stringifyHighScore);
    }

    return this;
  }

  endGameWindow() {
    let endGameWindow = document.querySelector('.hide-end-game');

    endGameWindow.classList.remove('hide-end-game');
    endGameWindow.classList.add('end-game');
    let userScoreSpan = document.querySelector('.end-game-score');

    userScoreSpan.innerHTML = this.userScore;

  }

  resetGame (gameEvent) {
    if (gameEvent.target.matches('.replay-button') === true) {
      gameEvent.preventDefault();
      document.location.reload();
    }
  }

  changeLevel1() {
    if (this.level === 1) {
      this.level = 2; 
    }
  }

  changeLevel2() {
    if (this.level === 2) {
      this.level = 3;
    }
  }



}

module.exports = Game;