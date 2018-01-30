const Ball = require('../lib/Ball.js');

class Block{
  constructor(x, y, w, h, color, blockRowTotal = 1) {
    this.x = x;
    this.y = y;
    this.w = 75; 
    this.h = 30;
    this.color = this.color;
    this.padding = 45;
    this.blockRowTotal = blockRowTotal;
    this.blockColumnTotal = 12;
    this.offSet = 20;
    this.ballHit = false;
  }

  createBlocks(blockArray, ctx) {
    // pause Game?
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
      ctx.fillStyle = 'green'
      ctx.fillRect(block.x, block.y, block.w, block.h);
      ctx.closePath();
      }
    })
  }

}


module.exports = Block;