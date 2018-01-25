class Paddle {
  constructor( x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  createPaddle(ctx) {
    ctx.beginPath();
    ctx.fillStyle = '#1E90FF';
    ctx.fillRect( this.x, this.y, this.w, this.h);
    return this;
  }

  clearPaddle(ctx) {
    ctx.clearRect( this.x, this.y, this.w, this.h);
    return this;
  }

  movePaddle(mouseEvent) {
    if (this.x > 0 || this.x < canvas.width - this.w) {
      this.x = mouseEvent.pageX;
    }
    return this;
  }

}

module.exports = Paddle;