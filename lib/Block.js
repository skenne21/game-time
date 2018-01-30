const GamePiece = require('../lib/Game-Piece.js');

class Block extends GamePiece{
  constructor(x, y) {
    super(x,y);
    this.w = 85; 
    this.h = 30;
    this.color = '#73A557';
    this.ballHit = false;
  }

  createBlocks(blockArray, ctx) {
    blockArray.forEach( block => {
      if (block.ballHit === false) {
      ctx.beginPath();
      ctx.fillStyle = this.color;
      ctx.fillRect(block.x, block.y, block.w, block.h);
      ctx.closePath();
      }
    })
  }
}


module.exports = Block;