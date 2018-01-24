class Paddle {
  constructor(x) {
    this.x = x;
    this.y = 600;
    this.radius = 15;
    this.startAngle = 0;
    this.endAngle = Math.PI * 2;
    this.counterClockwise = false;
  }

  createPaddle(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise);
    ctx.fillStyle = '#1E90FF';
    ctx.fill();
    return this;
  }

  clearPaddle(ctx) {
    ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    return this;
  }

  movePaddle(e) {

  }


}

module.exports = Paddle;