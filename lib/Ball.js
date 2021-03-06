const GamePiece = require('../lib/Game-Piece.js');

class Ball extends GamePiece {
  constructor (x, y, radius, dx, dy) {
    super(x, y);
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.collided = false;
    this.hitBottom = false;
    this.ballColor = '#eee';
  }

  createBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius,
      this.startAngle, this.endAngle, this.dx);
    ctx.fillStyle = this.ballColor;
    ctx.fill();
    ctx.closePath();
    return this;
  }

  clearBall(ctx) {
    ctx.clearRect(this.x - this.radius, this.y - this.radius, 
      this.radius * 2, this.radius * 2);
    return this;
  }

  moveBall() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.dx > 
      1000 - this.radius || 
      this.x + this.dx < this.radius) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy < this.radius) {
      this.dy = -this.dy;
    } else if (this.y + this.dy > 800 - this.radius) {
      this.hitBottom = true;
    }
    return this;
  }
}

module.exports = Ball;