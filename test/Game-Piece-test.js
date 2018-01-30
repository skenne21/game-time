const { assert } = require('chai');
const GamePiece = require('../lib/Game-Piece.js');

describe( 'GamePiece', function() {
  let gamePiece;

  beforeEach(function() {
    gamePiece = new GamePiece(30, 30);
  })

  it('should return true', function() {
    assert.equal(true, true);
  })

  it ('should take a x', function() {
    assert.equal(gamePiece.x, 30);
  })

  it('Should take a y', function() {
    assert.equal(gamePiece.y, 30);

  })
})