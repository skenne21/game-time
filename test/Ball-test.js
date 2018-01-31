const  { assert } = require('chai');
const Ball = require('../lib/Ball.js');

describe( 'Ball', function() {
  let ball;

  beforeEach(function() {
    ball = new Ball(30, 30, 20, 8, 8);
  })

  it ('should return true', function() {
    assert.equal(true, true);
  })

  it ('should have a x and y', function() {
    assert.equal(ball.x, 30);
    assert.equal(ball.y, 30)
  })

  it ('should have a radius', function() {
    assert.equal(ball.radius, 20);
  })

  it ('should take a x velocity and y velocity', function() {
    assert.equal(ball.dx, 8);
    assert.equal(ball.dy, 8);
  })

  it ('should have a default start angle', function() {
    assert.equal(ball.startAngle, 0);
  })

  it ('should have a default end angle', function() {
    assert.equal(ball.endAngle, Math.PI * 2);
  })

  it ('should have a default collided value of false', function() {
    assert.equal(ball.collided, false);
  })

  it ('should have a default value of ball hit bottom of false', function() {
    assert.equal(ball.hitBottom, false);
  })

  it ('should have a ball color', function() {
    assert.equal(ball.ballColor, '#eee');
  })

  it ('should have an x value that changes upon moving to equal the x-velocity', function() {
    assert.equal(ball.x, 30);
    ball.moveBall();
    assert.equal(ball.x, 38);
  })

  it ('should have a y value that changes upon moving to equal the y-velocity', function() {
      assert.equal(ball.y, 30);
    ball.moveBall();
    assert.equal(ball.y, 38);
  })
})

















