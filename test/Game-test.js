const { assert } = require('chai');
const Game = require('../lib/Game.js');
const Block = require('../lib/Block.js');
const Ball = require('../lib/Ball.js');
const Paddle = require('../lib/Paddle.js')

describe( 'Game', function() {
  let game;

  beforeEach(function() {
    game = new Game(30, 30, 20, 20);
  });

  it ('should return true', function() {
    assert.equal(true, true);
  });

  it ('should have a default value of pause game of false', function() {
    assert.equal(game.pauseGame, false);
  });
  
  it ('should have a default user score of zero', function() {
    assert.equal(game.userScore, 0);
  });

  it ('should have a default high score of 0', function() {
    assert.equal(game.highScore, 0);
  });

  it ('should have a default level of one', function() {
    assert.equal(game.level, 1);
  });

  it ('should create a new instance of a block', function() {
    const block = new Block(30, 30);
    assert.deepEqual(game.block, block);
  });

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
  });

  it('should have a default font style', function() {
    assert.equal(game.fontStyle, "24px Arial")
  });

  it('should have a default font color', function() {
    assert.equal(game.fillStyle, "#eee")
  });

  it('should increment level by one', function() {
    assert.equal(game.level, 1);
    game.changeLevel();
    assert.equal(game.level, 2)
  });

  it('should create an array of blocks', function() {
    const block = new Block(30, 30);
    var blocks = [];
    
    assert.equal(game.blocks.length, 0);
    blocks = game.createArrayOfBlocks();
    assert.equal(game.blocks.length, 30);
  })

  it( 'should be able to level up the ball when the game level increments', function() {
    const ball = new Ball(30, 30, 20, 8, 8);
    game.level = 2
    assert.equal(ball.x, 30);
    assert.equal(ball.y, 30);
    assert.equal(ball.radius, 20)
    assert.equal(ball.dx, 8);
    assert.equal(ball.dy, 8);

    game.levelUpBall(ball);

    assert.equal(ball.x, 390);
    assert.equal(ball.y, 500);
    assert.equal(ball.radius, 20);
    assert.equal(ball.dx, 11);
    assert.equal(ball.dy, 11);

    game.level = 3;

    game.levelUpBall(ball);
    assert.equal(ball.radius, 17)
  })

  it('should be able to level up the paddle on level 3', function() {
    const paddle = new Paddle(30, 30, 20, 20)
    game.level = 3;

    assert.equal(paddle.w, 20);
    game.levelUpPaddle(paddle);
    assert.equal(paddle.w, 150);
  })
})











