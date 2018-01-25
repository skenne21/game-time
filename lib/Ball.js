class Ball {
  constructor (x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.dx = dx;
    this.dy = dy;
  }

  createBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius,
      this.startAngle, this.endAngle, this.dx);
    ctx.fillStyle = 'black';
    ctx.fill();
    ctx.closePath();
    return this;
  }

  clearBall(ctx) {
    ctx.clearRect(this.x - this.radius, this.y - this.radius, 
      this.radius * 2, this.radius * 2);
    return this;
  }

  moveBall(canvas) {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy > canvas.height - this.radius || this.y + this.dy < this.radius) {
      this.dy = -this.dy;
    } 
    // if (this.y + this.dy < this.radius) {
    //   this.dy = -this.dy;
    // } else if (this.y + this.dy > canvas.height - this.radius) {
    //   alert('GAME OVER!');
    //   // document.location.reload();
    // }
    return this;
  }
}

module.exports = Ball;