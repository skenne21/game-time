const { assert } = require('chai');
const Block = require('../lib/Block.js');

describe( 'Block', function() {
  let block;

  beforeEach(function() {
    block = new Block(30, 30);
  })

  it ('should return true', function() {
    assert.equal(true, true);
  })

  it ('should have a x and y', function() {
    assert.equal(block.x, 30);
    assert.equal(block.y, 30)
  })

  it('should have a default w and h', function() {
    assert.equal(block.w, 85);
    assert.equal(block.h, 30);
  });

  it('should have a default color', function() {
    assert.equal(block.color, '#73A557');
  });

  it('should have a default hit ball value to false', function() {
    assert.equal(block.ballHit, false);
  });

}) 