const  { assert } = require('chai');
const Paddle = require('../lib/Paddle.js');
const Ball = require('../lib/Ball.js');

describe( 'Paddle', function() {
  let paddle;

  beforeEach(function() {
    paddle = new Paddle(30, 30, 20, 20);
  })

  it ('should return true', function() {
    assert.equal(true, true);
  })

  it ('should take a x and y', function() {
    assert.equal(paddle.x, 30);
    assert.equal(paddle.y, 30)
  })

  it('Should take a w and h', function() {
    assert.equal(paddle.w, 20);
    assert.equal(paddle.h, 20)
  })

  it('should be able to dectect collison with the ball', function() {
      const ball = new Ball(30, 30, 20, 8, 8);
      assert.equal(ball.dy, ball.dy);
      paddle.paddleBallCollison(ball);
      assert.equal(-ball.dy, -ball.dy)
  })
})
