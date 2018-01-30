const GamePiece = require('../lib/Game-Piece.js');

class Paddle extends GamePiece{
  constructor( x, y, w, h) {
    super(x,y);
    this.w = w;
    this.h = h;
  }

  createPaddle(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#483D8B';
    ctx.fillRect( this.x, this.y, this.w, this.h);
    ctx.closePath();
    return this;
  }

  clearPaddle(ctx) {
    ctx.clearRect( this.x, this.y, this.w, this.h);
    return this;
  }

  movePaddle(mouseEvent, canvas) {
      let relativeX = mouseEvent.pageX - canvas.offsetLeft;
      
      if (relativeX > 0 && relativeX < canvas.width) {
        this.x = relativeX - this.w/2;
      }
    return this;
  }

  paddleBallCollison(ball) {
    if ((ball.x + ball.radius > this.x) && 
      (ball.x - ball.radius < this.x + this.w) && 
      (ball.y + ball.radius > this.y) && 
      (ball.y - ball.radius < this.y + this.h)) { 
        ball.dy = -ball.dy; 
    }
  }  
}

module.exports = Paddle;