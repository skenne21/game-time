class Food {
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

  createFood(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y++, this.radius,
      this.startAngle, this.endAngle, this.counterClockwise);
    ctx.fillStyle = 'black';
    ctx.fill();
    
    return this;
  }

  clearFood(ctx) {
    ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    return this;
  }

  updateAndDraw(ctx, foods) {
    // let y =  foods.y;
    // y += this.dy;
    // y++;
    console.log
    this.dy = 4
    ctx.beginPath();
    ctx.arc(foods.x, foods.y++, foods.radius, foods.startAngle, foods.endAngle, foods.counterClockwise);
    ctx.fillStyle = 'black';
    ctx.fill();
  }

  updateAndClearFood(ctx, foods) {
    ctx.clearRect( foods.x - foods.radius, foods.y - foods.radius, foods.radius * 2, foods.radius *2)
  }
}

module.exports = Food;