
class LevelUp  {
  constructor(level) {
    this.level = level;
  }

  changeLevel( blockArray, ctx) {
    if (this.level === 1) {
      this.level = 2;
      blockArray.forEach((block, index, array) => {
        block.blockRowTotal = 8;
        blockArray = block.createArrayOfBlocks();
        blockArray.forEach ( (block, index, array) => {
          block.createBlocks( blockArray, ctx);
        }) 
      })
    }
  }


}

module.exports = LevelUp;