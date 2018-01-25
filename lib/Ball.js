class Ball {
  constructor () {
    this.x = 500;
    this.y = 670;
    this.radius = 20;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.counterClockwise = false;
    // this.dx = dx;
    // this.dy = dy;
   
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
    ctx.clearRect(this.x - this.radius, this.y - this.radius, 
      this.radius * 2, this.radius * 2);
    return this;
  }

}

module.exports = Ball;