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
    this.blockColumnTotal = 3;
    this.offSet = 20;
    this.ballHit = false;
  }

  createArrayOfBlocks() {
    let blocks = []
    for (let column = 0; column < this.blockColumnTotal; column++) {
      for (let row = 0; row < this.blockRowTotal; row++) {
        this.x = (column * (35 + this.padding)) + this.offSet;
        this.y = (row *  (3 + this.padding)) + this.offSet + 50;
        let block = new Block(this.x, this.y, this.w, this.h)
        blocks.push(block);
      }
    }
    return blocks  
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
      ctx.fillRect(block.x, block.y, block.w, block.h)
      }
    })
  }

}


module.exports = Block;