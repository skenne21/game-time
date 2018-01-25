class Block{
  constructor(x, y, w, h, color) {
    this.x = x;
    this.y = y;
    this.w = 75; 
    this.h = 30;
    this.color = this.color;
    this.padding = 45;
    this.blockRowTotal = 6;
    this.blockColumnTotal = 12;
    this.offSet = 20;
  }

  createArrayOfBlocks() {
    let blocks = []
    for (let column = 0; column < this.blockColumnTotal; column++) {
      for (let row = 0; row < this.blockRowTotal; row++){
        this.x = (column * (35 + this.padding)) + this.offSet;
        this.y = (row *  (3 + this.padding)) + this.offSet;
        let block = new Block(this.x, this.y, this.w, this.h)
        blocks.push(block);
      }
    }
    return blocks  
  }

  createBlocks(array, ctx) {
    array.forEach( block => {
      ctx.beginPath();
      let colors = ['002626', '0E4749', '95C623', 'E55812', 'B8860B'];
      let randomColor;
      const blockColor = colors.forEach( (color, index) => {
        let randomIndex = Math.floor(Math.random() * (colors.length - 0)) + 0;
        if (randomIndex === index) {
          randomColor = '#' + color
        }
        return randomColor  
      });
      ctx.fillStyle = randomColor
      ctx.fillRect(block.x, block.y, block.w, block.h)
    })
  }
}


module.exports = Block;