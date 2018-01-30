const  { assert } = require('chai');
const Game = require('../lib/Game.js');
const Block = require('../lib/Block.js');
const Ball = require('../lib/Ball.js');

describe( 'Game', function() {
  let game;

  beforeEach(function() {
    game = new Game(30, 30, 20, 20);
  })

  it ('should return true', function() {
    assert.equal(true, true);
  })

  it ('should have a default value of pause game of false', function() {
    assert.equal(game.pauseGame, false);
  })
  
  it ('should have a default user score of zero', function() {
    assert.equal(game.userScore, 0);
  })

  it ('should have a default high score of 0', function() {
    assert.equal(game.highScore, 0);
  })

  it ('should have a default level of one', function() {
    assert.equal(game.level, 1);
  })

  it ('should create a new instance of a block', function() {
    const block = new Block(30, 30);
    assert.deepEqual(game.block, block);
  })

  it('should have a default padding', function() {
    assert.equal(game.padding, 55);
  });

  it('should have a default block column total', function() {
    assert.equal(game.blockColumnTotal, 10);
  });

  it('should have a default offset', function() {
    assert.equal(game.offSet, 25);
  });

  it ('should be able to hold blocks', function() {
    assert.deepEqual(game.blocks, []) 
  })

  it('should increment level by one', function() {
    assert.equal(game.level, 1);
    game.changeLevel();
    assert.equal(game.level, 2)
  })

  it('should create an array of blocks', function() {
    const block = new Block(30, 30);
    assert.equal(game.level, 1);

  //   if (this.level === 1) {
  //     for (let column = 0; column < this.blockColumnTotal; column++) {
  //       for (let row = 0; row < 3; row++) {
  //         this.block.x = (column * (40 + this.padding)) + this.offSet;
  //         this.block.y = (row *  (3 + this.padding)) + this.offSet + 50;
  //         let block = new Block(this.block.x, this.block.y, this.block.w, this.block.h)
  //         this.blocks.push(block);
  //       }
  //     }
  //     return this.blocks
  //   } 
  })

})