class Ball {
  constructor () {
    this.x = Math.random() * (990 - 10) + 10;
    this.y = Math.random() * (550 - 1) + 10;
    this.radius = 7;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.counterClockwise = false;
    this.dx = 0;
    this.dy = 3;
   
  }

  createBall(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius,
      this.startAngle, this.endAngle, this.counterClockwise);
    ctx.fillStyle = 'black';
    ctx.fill();
    
    return this;
  }

  clearBall(ctx) {
    ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    return this;
  }

}

module.exports = Ball;