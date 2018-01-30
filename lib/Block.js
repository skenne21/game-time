const Ball = require('../lib/Ball.js');

class Block{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.w = 85; 
    this.h = 30;
    this.color = 'green';
    this.ballHit = false;
  }

  createBlocks(blockArray, ctx) {
    blockArray.forEach( block => {
      if (block.ballHit=== false) {
      ctx.beginPath();
      // let colors = ['#002626', '#0E4749', '#95C623', '#E55812', '#B8860B'];
      // let randomColor;
      // const blockColor = colors.forEach( (color, index) => {
      //   let randomIndex = Math.floor(Math.random() * (colors.length - 0)) + 0;
      //   if (randomIndex === index) {
      //     randomColor = color
      //   }
      //   return randomColor  
      // });
      ctx.fillStyle = this.color;
      ctx.fillRect(block.x, block.y, block.w, block.h);
      ctx.closePath();
      }
    })
  }

}


module.exports = Block;