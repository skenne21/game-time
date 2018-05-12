/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Paddle = __webpack_require__(1);
	var Ball = __webpack_require__(3);
	var Game = __webpack_require__(4);
	
	var paddle = new Paddle(400, 700, 950, 10);
	var ball = new Ball(300, 370, 20, 10, 10);
	var game = new Game();
	
	var canvas = document.getElementById('game');
	var ctx = canvas.getContext('2d');
	var startBtn = document.querySelector('.start-btn');
	var replayBtn = document.querySelector('.replay-button');
	var replayGameBtn = document.querySelector('.replay-game');
	
	var blockArray = game.createArrayOfBlocks();
	
	startBtn.addEventListener('click', startGame);
	replayBtn.addEventListener('click', reloadGame);
	canvas.addEventListener('mousemove', animatePaddle);
	replayGameBtn.addEventListener('click', playAgain);
	
	function createInitialCanvas() {
	  game.initialScore(ctx);
	  game.drawScore(ctx);
	  game.drawLevels(ctx);
	  ball.createBall(ctx);
	  paddle.createPaddle(ctx);
	  blockArray.forEach(function (block, index, array) {
	    block.createBlocks(array, ctx);
	  });
	}
	
	createInitialCanvas();
	
	function playAgain() {
	  document.location.reload();
	}
	
	function startGame() {
	  game.startGameWindow();
	  canvas.addEventListener('mousemove', animatePaddle);
	  gameLoop();
	}
	
	function endGame() {
	  game.compareHighScore();
	  game.storeHighScore();
	  game.endGameWindow();
	}
	
	function reloadGame(event) {
	  var gameEvent = event;
	
	  game.resetGame(gameEvent);
	  game.compareHighScore();
	}
	
	function gameLoop() {
	  ctx.clearRect(0, 0, 1000, 800);
	  game.drawScore(ctx);
	  game.drawLevels(ctx);
	  ball.moveBall().createBall(ctx);
	  paddle.createPaddle(ctx);
	  paddle.paddleBallCollison(ball);
	
	  blockArray.forEach(function (block, index, array) {
	    if (block.ballHit === false) {
	      block.createBlocks(array, ctx);
	    }
	  });
	
	  blockArray.forEach(function (block, index, array) {
	    if (block.ballHit === false) {
	      var blockCollision = block.blockCollisionTest(ball);
	
	      if (blockCollision === true) {
	        block.ballHit = true;
	        ball.dy = -ball.dy;
	        game.userScore++;
	        block.createBlocks(array, ctx);
	      }
	    }
	  });
	
	  if (ball.hitBottom === true) {
	    endGame();
	  }
	
	  var noBlocksInArray = blockArray.every(function (block) {
	    return block.ballHit === true;
	  });
	
	  if (noBlocksInArray === true) {
	    runLevelUp();
	  }
	
	  if (game.pauseGame === false) {
	    requestAnimationFrame(gameLoop);
	  }
	}
	
	function runLevelUp() {
	  ball.clearBall(ctx);
	  game.changeLevel();
	  game.pauseGame = true;
	  game.compareHighScore().storeHighScore();
	  blockArray = game.createArrayOfBlocks();
	  game.levelUpBall(ball);
	  game.levelUpPaddle(paddle);
	  ball.createBall(ctx);
	  if (game.level === 4) {
	    game.wonGameWindow();
	  } else {
	    levelUpWindow();
	  }
	}
	
	function levelUpWindow() {
	  game.levelUpWindow();
	  var restartLevelBtn = document.querySelector('.restart-level-button');
	
	  restartLevelBtn.addEventListener('click', restartGame);
	}
	
	function restartGame() {
	  var parentSection = this.closest('section');
	
	  game.restartGame(parentSection);
	  game.pauseGame = false;
	  gameLoop();
	}
	
	function animatePaddle(e) {
	  var mouseEvent = e;
	
	  paddle.clearPaddle(ctx).movePaddle(mouseEvent, canvas).createPaddle(ctx);
	}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GamePiece = __webpack_require__(2);
	
	var Paddle = function (_GamePiece) {
	  _inherits(Paddle, _GamePiece);
	
	  function Paddle(x, y, w, h) {
	    _classCallCheck(this, Paddle);
	
	    var _this = _possibleConstructorReturn(this, (Paddle.__proto__ || Object.getPrototypeOf(Paddle)).call(this, x, y));
	
	    _this.w = w;
	    _this.h = h;
	    return _this;
	  }
	
	  _createClass(Paddle, [{
	    key: 'createPaddle',
	    value: function createPaddle(ctx) {
	      ctx.beginPath();
	      ctx.fillStyle = '#483D8B';
	      ctx.fillRect(this.x, this.y, this.w, this.h);
	      ctx.closePath();
	      return this;
	    }
	  }, {
	    key: 'clearPaddle',
	    value: function clearPaddle(ctx) {
	      ctx.clearRect(this.x, this.y, this.w, this.h);
	      return this;
	    }
	  }, {
	    key: 'movePaddle',
	    value: function movePaddle(mouseEvent, canvas) {
	      var relativeX = mouseEvent.pageX - canvas.offsetLeft;
	
	      if (relativeX - this.w / 2 > 0 && relativeX + this.w / 2 < canvas.width) {
	        this.x = relativeX - this.w / 2;
	      }
	      return this;
	    }
	  }, {
	    key: 'paddleBallCollison',
	    value: function paddleBallCollison(ball) {
	      if (ball.x + ball.radius > this.x && ball.x - ball.radius < this.x + this.w && ball.y + ball.radius > this.y && ball.y - ball.radius < this.y + this.h) {
	        ball.dy = -ball.dy;
	      }
	    }
	  }]);
	
	  return Paddle;
	}(GamePiece);
	
	module.exports = Paddle;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var GamePiece = function GamePiece(x, y) {
	  _classCallCheck(this, GamePiece);
	
	  this.x = x;
	  this.y = y;
	};
	
	module.exports = GamePiece;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GamePiece = __webpack_require__(2);
	
	var Ball = function (_GamePiece) {
	  _inherits(Ball, _GamePiece);
	
	  function Ball(x, y, radius, dx, dy) {
	    _classCallCheck(this, Ball);
	
	    var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this, x, y));
	
	    _this.radius = radius;
	    _this.dx = dx;
	    _this.dy = dy;
	    _this.startAngle = 0;
	    _this.endAngle = Math.PI * 2;
	    _this.collided = false;
	    _this.hitBottom = false;
	    _this.ballColor = '#eee';
	    return _this;
	  }
	
	  _createClass(Ball, [{
	    key: 'createBall',
	    value: function createBall(ctx) {
	      ctx.beginPath();
	      ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.dx);
	      ctx.fillStyle = this.ballColor;
	      ctx.fill();
	      ctx.closePath();
	      return this;
	    }
	  }, {
	    key: 'clearBall',
	    value: function clearBall(ctx) {
	      ctx.clearRect(this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
	      return this;
	    }
	  }, {
	    key: 'moveBall',
	    value: function moveBall() {
	      this.x += this.dx;
	      this.y += this.dy;
	
	      if (this.x + this.dx > 1000 - this.radius || this.x + this.dx < this.radius) {
	        this.dx = -this.dx;
	      }
	      if (this.y + this.dy < this.radius) {
	        this.dy = -this.dy;
	      } else if (this.y + this.dy > 800 - this.radius) {
	        this.hitBottom = true;
	      }
	      return this;
	    }
	  }]);
	
	  return Ball;
	}(GamePiece);
	
	module.exports = Ball;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Block = __webpack_require__(5);
	
	var Game = function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.pauseGame = false;
	    this.userScore = 0;
	    this.highScore = 0;
	    this.level = 1;
	    this.block = new (Function.prototype.bind.apply(Block, [null].concat(Array.prototype.slice.call(arguments))))();
	    this.padding = 55;
	    this.blockColumnTotal = 10;
	    this.offSet = 25;
	    this.blocks = [];
	    this.fontStyle = "24px Arial";
	    this.fillStyle = "#eee";
	  }
	
	  _createClass(Game, [{
	    key: "initialScore",
	    value: function initialScore() {
	      var initialHighScore = localStorage.getItem('high score');
	      var parseHighScore = JSON.parse(initialHighScore);
	
	      if (parseHighScore > 0) {
	        this.highScore = parseHighScore;
	      }
	      return this;
	    }
	  }, {
	    key: "drawLevels",
	    value: function drawLevels(ctx) {
	      ctx.font = this.fontStyle;
	      ctx.fillStyle = this.fillStyle;
	      ctx.fillText(" Level: " + this.level, 450, 40);
	    }
	  }, {
	    key: "drawScore",
	    value: function drawScore(ctx) {
	      ctx.font = this.fontStyle;
	      ctx.fillStyle = this.fillStyle;
	      ctx.fillText(" Your Score: " + this.userScore, 40, 40);
	
	      ctx.font = this.fontStyle;
	      ctx.fillStyle = this.fillStyle;
	      ctx.fillText(" High score: " + this.highScore, 800, 40);
	      return this;
	    }
	  }, {
	    key: "startGameWindow",
	    value: function startGameWindow() {
	      var welcomeWindow = document.querySelector('.start-game');
	
	      welcomeWindow.classList.add('hide-start');
	    }
	  }, {
	    key: "storeHighScore",
	    value: function storeHighScore() {
	      var stringedHighScore = JSON.stringify(this.highScore);
	
	      localStorage.setItem('high score', stringedHighScore);
	      return this;
	    }
	  }, {
	    key: "compareHighScore",
	    value: function compareHighScore() {
	      var getHighScore = localStorage.getItem('high score');
	      var parseHighScore = JSON.parse(getHighScore);
	
	      if (parseHighScore < this.userScore) {
	        parseHighScore = this.userScore;
	        this.highScore = parseHighScore;
	      }
	      return this;
	    }
	  }, {
	    key: "endGameWindow",
	    value: function endGameWindow() {
	      var endGameWindow = document.querySelector('.hide-end-game');
	
	      endGameWindow.classList.remove('hide-end-game');
	      endGameWindow.classList.add('end-game');
	      var userScoreSpan = document.querySelector('.end-game-score');
	
	      userScoreSpan.innerHTML = this.userScore;
	      return this;
	    }
	  }, {
	    key: "resetGame",
	    value: function resetGame(gameEvent) {
	      if (gameEvent.target.matches('.replay-button') === true) {
	        gameEvent.preventDefault();
	        document.location.reload();
	      }
	    }
	  }, {
	    key: "changeLevel",
	    value: function changeLevel() {
	      this.level++;
	      return this;
	    }
	  }, {
	    key: "createArrayOfBlocks",
	    value: function createArrayOfBlocks() {
	      if (this.level === 1) {
	        for (var column = 0; column < this.blockColumnTotal; column++) {
	          for (var row = 0; row < 3; row++) {
	            this.block.x = column * (40 + this.padding) + this.offSet;
	            this.block.y = row * (3 + this.padding) + this.offSet + 50;
	            var block = new Block(this.block.x, this.block.y, this.block.w, this.block.h);
	
	            this.blocks.push(block);
	          }
	        }
	        return this.blocks;
	      } else if (this.level === 2) {
	        for (var _column = 0; _column < this.blockColumnTotal; _column++) {
	          for (var _row = 0; _row < 6; _row++) {
	            this.block.x = _column * (40 + this.padding) + this.offSet;
	            this.block.y = _row * (3 + this.padding) + this.offSet + 50;
	            var _block = new Block(this.block.x, this.block.y, this.block.w, this.block.h);
	
	            this.blocks.push(_block);
	          }
	        }
	        return this.blocks;
	      } else if (this.level === 3) {
	        for (var _column2 = 0; _column2 < this.blockColumnTotal; _column2++) {
	          for (var _row2 = 0; _row2 < 7; _row2++) {
	            this.block.x = _column2 * (40 + this.padding) + this.offSet;
	            this.block.y = _row2 * (3 + this.padding) + this.offSet + 50;
	            var _block2 = new Block(this.block.x, this.block.y, this.block.w, this.block.h);
	
	            this.blocks.push(_block2);
	          }
	        }
	        return this.blocks;
	      }
	      return this;
	    }
	  }, {
	    key: "levelUpBall",
	    value: function levelUpBall(ball) {
	      ball.x = 390;
	      ball.y = 500;
	      if (this.level === 2) {
	        ball.dx = 11;
	        ball.dy = 11;
	      }
	      if (this.level === 3) {
	        ball.radius = 17;
	      }
	      return this;
	    }
	  }, {
	    key: "levelUpPaddle",
	    value: function levelUpPaddle(paddle) {
	      if (this.level === 3) {
	        paddle.w = 150;
	      }
	    }
	  }, {
	    key: "wonGameWindow",
	    value: function wonGameWindow() {
	      var wonWindow = document.querySelector('.hide-game-won');
	
	      var finalScore = document.querySelector('.final-score');
	
	      finalScore.innerText = this.userScore;
	      wonWindow.classList.remove('hide-game-won');
	      wonWindow.classList.add('game-won');
	    }
	  }, {
	    key: "levelUpWindow",
	    value: function levelUpWindow() {
	      var endLevelWindow = document.querySelector('.hide-level-up');
	      var endUserScore = document.querySelector('.end-level-score');
	
	      endUserScore.innerText = this.userScore;
	      endLevelWindow.classList.remove('hide-level-up');
	      endLevelWindow.classList.add('level-up');
	    }
	  }, {
	    key: "restartGame",
	    value: function restartGame(parentSection) {
	      parentSection.classList.remove('level-up');
	      parentSection.classList.add('hide-level-up');
	    }
	  }]);
	
	  return Game;
	}();
	
	module.exports = Game;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var GamePiece = __webpack_require__(2);
	
	var Block = function (_GamePiece) {
	  _inherits(Block, _GamePiece);
	
	  function Block(x, y) {
	    _classCallCheck(this, Block);
	
	    var _this = _possibleConstructorReturn(this, (Block.__proto__ || Object.getPrototypeOf(Block)).call(this, x, y));
	
	    _this.w = 85;
	    _this.h = 30;
	    _this.color = '#73A557';
	    _this.ballHit = false;
	    return _this;
	  }
	
	  _createClass(Block, [{
	    key: 'createBlocks',
	    value: function createBlocks(blockArray, ctx) {
	      var _this2 = this;
	
	      blockArray.forEach(function (block) {
	        if (block.ballHit === false) {
	          ctx.beginPath();
	          ctx.fillStyle = _this2.color;
	          ctx.fillRect(block.x, block.y, block.w, block.h);
	          ctx.closePath();
	        }
	      });
	    }
	  }, {
	    key: 'blockCollisionTest',
	    value: function blockCollisionTest(ball) {
	      if (ball.x > this.x && ball.y < this.y + this.h && ball.x < this.x + this.w) {
	        return true;
	      }
	      return this;
	    }
	  }]);
	
	  return Block;
	}(GamePiece);
	
	module.exports = Block;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTcyN2NmZTJmZGQxODViMDU5YjAiLCJ3ZWJwYWNrOi8vLy4vbGliL2luZGV4LmpzIiwid2VicGFjazovLy8uL2xpYi9QYWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0dhbWUtUGllY2UuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0JhbGwuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0dhbWUuanMiLCJ3ZWJwYWNrOi8vLy4vbGliL0Jsb2NrLmpzIl0sIm5hbWVzIjpbIlBhZGRsZSIsInJlcXVpcmUiLCJCYWxsIiwiR2FtZSIsInBhZGRsZSIsImJhbGwiLCJnYW1lIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImN0eCIsImdldENvbnRleHQiLCJzdGFydEJ0biIsInF1ZXJ5U2VsZWN0b3IiLCJyZXBsYXlCdG4iLCJyZXBsYXlHYW1lQnRuIiwiYmxvY2tBcnJheSIsImNyZWF0ZUFycmF5T2ZCbG9ja3MiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRHYW1lIiwicmVsb2FkR2FtZSIsImFuaW1hdGVQYWRkbGUiLCJwbGF5QWdhaW4iLCJjcmVhdGVJbml0aWFsQ2FudmFzIiwiaW5pdGlhbFNjb3JlIiwiZHJhd1Njb3JlIiwiZHJhd0xldmVscyIsImNyZWF0ZUJhbGwiLCJjcmVhdGVQYWRkbGUiLCJmb3JFYWNoIiwiYmxvY2siLCJpbmRleCIsImFycmF5IiwiY3JlYXRlQmxvY2tzIiwibG9jYXRpb24iLCJyZWxvYWQiLCJzdGFydEdhbWVXaW5kb3ciLCJnYW1lTG9vcCIsImVuZEdhbWUiLCJjb21wYXJlSGlnaFNjb3JlIiwic3RvcmVIaWdoU2NvcmUiLCJlbmRHYW1lV2luZG93IiwiZXZlbnQiLCJnYW1lRXZlbnQiLCJyZXNldEdhbWUiLCJjbGVhclJlY3QiLCJtb3ZlQmFsbCIsInBhZGRsZUJhbGxDb2xsaXNvbiIsImJhbGxIaXQiLCJibG9ja0NvbGxpc2lvbiIsImJsb2NrQ29sbGlzaW9uVGVzdCIsImR5IiwidXNlclNjb3JlIiwiaGl0Qm90dG9tIiwibm9CbG9ja3NJbkFycmF5IiwiZXZlcnkiLCJydW5MZXZlbFVwIiwicGF1c2VHYW1lIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwiY2xlYXJCYWxsIiwiY2hhbmdlTGV2ZWwiLCJsZXZlbFVwQmFsbCIsImxldmVsVXBQYWRkbGUiLCJsZXZlbCIsIndvbkdhbWVXaW5kb3ciLCJsZXZlbFVwV2luZG93IiwicmVzdGFydExldmVsQnRuIiwicmVzdGFydEdhbWUiLCJwYXJlbnRTZWN0aW9uIiwiY2xvc2VzdCIsImUiLCJtb3VzZUV2ZW50IiwiY2xlYXJQYWRkbGUiLCJtb3ZlUGFkZGxlIiwiR2FtZVBpZWNlIiwieCIsInkiLCJ3IiwiaCIsImJlZ2luUGF0aCIsImZpbGxTdHlsZSIsImZpbGxSZWN0IiwiY2xvc2VQYXRoIiwicmVsYXRpdmVYIiwicGFnZVgiLCJvZmZzZXRMZWZ0Iiwid2lkdGgiLCJyYWRpdXMiLCJtb2R1bGUiLCJleHBvcnRzIiwiZHgiLCJzdGFydEFuZ2xlIiwiZW5kQW5nbGUiLCJNYXRoIiwiUEkiLCJjb2xsaWRlZCIsImJhbGxDb2xvciIsImFyYyIsImZpbGwiLCJCbG9jayIsImhpZ2hTY29yZSIsImFyZ3VtZW50cyIsInBhZGRpbmciLCJibG9ja0NvbHVtblRvdGFsIiwib2ZmU2V0IiwiYmxvY2tzIiwiZm9udFN0eWxlIiwiaW5pdGlhbEhpZ2hTY29yZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJwYXJzZUhpZ2hTY29yZSIsIkpTT04iLCJwYXJzZSIsImZvbnQiLCJmaWxsVGV4dCIsIndlbGNvbWVXaW5kb3ciLCJjbGFzc0xpc3QiLCJhZGQiLCJzdHJpbmdlZEhpZ2hTY29yZSIsInN0cmluZ2lmeSIsInNldEl0ZW0iLCJnZXRIaWdoU2NvcmUiLCJyZW1vdmUiLCJ1c2VyU2NvcmVTcGFuIiwiaW5uZXJIVE1MIiwidGFyZ2V0IiwibWF0Y2hlcyIsInByZXZlbnREZWZhdWx0IiwiY29sdW1uIiwicm93IiwicHVzaCIsIndvbldpbmRvdyIsImZpbmFsU2NvcmUiLCJpbm5lclRleHQiLCJlbmRMZXZlbFdpbmRvdyIsImVuZFVzZXJTY29yZSIsImNvbG9yIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDdENBLEtBQU1BLFNBQVMsbUJBQUFDLENBQVEsQ0FBUixDQUFmO0FBQ0EsS0FBTUMsT0FBTyxtQkFBQUQsQ0FBUSxDQUFSLENBQWI7QUFDQSxLQUFNRSxPQUFPLG1CQUFBRixDQUFRLENBQVIsQ0FBYjs7QUFFQSxLQUFNRyxTQUFTLElBQUlKLE1BQUosQ0FBWSxHQUFaLEVBQWlCLEdBQWpCLEVBQXNCLEdBQXRCLEVBQTJCLEVBQTNCLENBQWY7QUFDQSxLQUFNSyxPQUFPLElBQUlILElBQUosQ0FBVSxHQUFWLEVBQWUsR0FBZixFQUFvQixFQUFwQixFQUF3QixFQUF4QixFQUE0QixFQUE1QixDQUFiO0FBQ0EsS0FBTUksT0FBTyxJQUFJSCxJQUFKLEVBQWI7O0FBRUEsS0FBTUksU0FBU0MsU0FBU0MsY0FBVCxDQUF3QixNQUF4QixDQUFmO0FBQ0EsS0FBTUMsTUFBTUgsT0FBT0ksVUFBUCxDQUFrQixJQUFsQixDQUFaO0FBQ0EsS0FBTUMsV0FBWUosU0FBU0ssYUFBVCxDQUF1QixZQUF2QixDQUFsQjtBQUNBLEtBQU1DLFlBQVlOLFNBQVNLLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQWxCO0FBQ0EsS0FBTUUsZ0JBQWdCUCxTQUFTSyxhQUFULENBQXVCLGNBQXZCLENBQXRCOztBQUVBLEtBQUlHLGFBQWFWLEtBQUtXLG1CQUFMLEVBQWpCOztBQUVBTCxVQUFTTSxnQkFBVCxDQUEwQixPQUExQixFQUFtQ0MsU0FBbkM7QUFDQUwsV0FBVUksZ0JBQVYsQ0FBMkIsT0FBM0IsRUFBb0NFLFVBQXBDO0FBQ0FiLFFBQU9XLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDRyxhQUFyQztBQUNBTixlQUFjRyxnQkFBZCxDQUErQixPQUEvQixFQUF3Q0ksU0FBeEM7O0FBR0EsVUFBU0MsbUJBQVQsR0FBK0I7QUFDN0JqQixRQUFLa0IsWUFBTCxDQUFrQmQsR0FBbEI7QUFDQUosUUFBS21CLFNBQUwsQ0FBZWYsR0FBZjtBQUNBSixRQUFLb0IsVUFBTCxDQUFnQmhCLEdBQWhCO0FBQ0FMLFFBQUtzQixVQUFMLENBQWdCakIsR0FBaEI7QUFDQU4sVUFBT3dCLFlBQVAsQ0FBb0JsQixHQUFwQjtBQUNBTSxjQUFXYSxPQUFYLENBQW9CLFVBQUNDLEtBQUQsRUFBUUMsS0FBUixFQUFlQyxLQUFmLEVBQXlCO0FBQzNDRixXQUFNRyxZQUFOLENBQW1CRCxLQUFuQixFQUEwQnRCLEdBQTFCO0FBQ0QsSUFGRDtBQUdEOztBQUVEYTs7QUFHQSxVQUFTRCxTQUFULEdBQXFCO0FBQ25CZCxZQUFTMEIsUUFBVCxDQUFrQkMsTUFBbEI7QUFDRDs7QUFFRCxVQUFTaEIsU0FBVCxHQUFxQjtBQUNuQmIsUUFBSzhCLGVBQUw7QUFDQTdCLFVBQU9XLGdCQUFQLENBQXdCLFdBQXhCLEVBQXFDRyxhQUFyQztBQUNBZ0I7QUFDRDs7QUFFRCxVQUFTQyxPQUFULEdBQW9CO0FBQ2xCaEMsUUFBS2lDLGdCQUFMO0FBQ0FqQyxRQUFLa0MsY0FBTDtBQUNBbEMsUUFBS21DLGFBQUw7QUFDRDs7QUFFRCxVQUFTckIsVUFBVCxDQUFvQnNCLEtBQXBCLEVBQTJCO0FBQ3pCLE9BQUlDLFlBQVlELEtBQWhCOztBQUVBcEMsUUFBS3NDLFNBQUwsQ0FBZUQsU0FBZjtBQUNBckMsUUFBS2lDLGdCQUFMO0FBQ0Q7O0FBRUQsVUFBU0YsUUFBVCxHQUFvQjtBQUNsQjNCLE9BQUltQyxTQUFKLENBQWMsQ0FBZCxFQUFpQixDQUFqQixFQUFvQixJQUFwQixFQUEwQixHQUExQjtBQUNBdkMsUUFBS21CLFNBQUwsQ0FBZWYsR0FBZjtBQUNBSixRQUFLb0IsVUFBTCxDQUFnQmhCLEdBQWhCO0FBQ0FMLFFBQUt5QyxRQUFMLEdBQWdCbkIsVUFBaEIsQ0FBMkJqQixHQUEzQjtBQUNBTixVQUFPd0IsWUFBUCxDQUFvQmxCLEdBQXBCO0FBQ0FOLFVBQU8yQyxrQkFBUCxDQUEwQjFDLElBQTFCOztBQUVBVyxjQUFXYSxPQUFYLENBQW9CLFVBQUNDLEtBQUQsRUFBUUMsS0FBUixFQUFlQyxLQUFmLEVBQXlCO0FBQzNDLFNBQUlGLE1BQU1rQixPQUFOLEtBQWtCLEtBQXRCLEVBQTZCO0FBQzNCbEIsYUFBTUcsWUFBTixDQUFtQkQsS0FBbkIsRUFBMEJ0QixHQUExQjtBQUNEO0FBQ0YsSUFKRDs7QUFNQU0sY0FBV2EsT0FBWCxDQUFvQixVQUFDQyxLQUFELEVBQVFDLEtBQVIsRUFBZUMsS0FBZixFQUF5QjtBQUMzQyxTQUFJRixNQUFNa0IsT0FBTixLQUFrQixLQUF0QixFQUE2QjtBQUMzQixXQUFJQyxpQkFBaUJuQixNQUFNb0Isa0JBQU4sQ0FBeUI3QyxJQUF6QixDQUFyQjs7QUFFQSxXQUFJNEMsbUJBQW1CLElBQXZCLEVBQTZCO0FBQzNCbkIsZUFBTWtCLE9BQU4sR0FBZ0IsSUFBaEI7QUFDQTNDLGNBQUs4QyxFQUFMLEdBQVUsQ0FBQzlDLEtBQUs4QyxFQUFoQjtBQUNBN0MsY0FBSzhDLFNBQUw7QUFDQXRCLGVBQU1HLFlBQU4sQ0FBbUJELEtBQW5CLEVBQTBCdEIsR0FBMUI7QUFDRDtBQUNGO0FBQ0YsSUFYRDs7QUFhQSxPQUFJTCxLQUFLZ0QsU0FBTCxLQUFtQixJQUF2QixFQUE2QjtBQUMzQmY7QUFDRDs7QUFFRCxPQUFJZ0Isa0JBQWtCdEMsV0FBV3VDLEtBQVgsQ0FBa0I7QUFBQSxZQUN0Q3pCLE1BQU1rQixPQUFOLEtBQWtCLElBRG9CO0FBQUEsSUFBbEIsQ0FBdEI7O0FBR0EsT0FBSU0sb0JBQW9CLElBQXhCLEVBQThCO0FBQzVCRTtBQUNEOztBQUVELE9BQUlsRCxLQUFLbUQsU0FBTCxLQUFtQixLQUF2QixFQUE4QjtBQUM1QkMsMkJBQXNCckIsUUFBdEI7QUFDRDtBQUNGOztBQUVELFVBQVNtQixVQUFULEdBQXNCO0FBQ3BCbkQsUUFBS3NELFNBQUwsQ0FBZWpELEdBQWY7QUFDQUosUUFBS3NELFdBQUw7QUFDQXRELFFBQUttRCxTQUFMLEdBQWlCLElBQWpCO0FBQ0FuRCxRQUFLaUMsZ0JBQUwsR0FBd0JDLGNBQXhCO0FBQ0F4QixnQkFBYVYsS0FBS1csbUJBQUwsRUFBYjtBQUNBWCxRQUFLdUQsV0FBTCxDQUFpQnhELElBQWpCO0FBQ0FDLFFBQUt3RCxhQUFMLENBQW1CMUQsTUFBbkI7QUFDQUMsUUFBS3NCLFVBQUwsQ0FBZ0JqQixHQUFoQjtBQUNBLE9BQUlKLEtBQUt5RCxLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFDcEJ6RCxVQUFLMEQsYUFBTDtBQUNELElBRkQsTUFFTztBQUNMQztBQUNEO0FBQ0Y7O0FBRUQsVUFBU0EsYUFBVCxHQUF5QjtBQUN2QjNELFFBQUsyRCxhQUFMO0FBQ0EsT0FBSUMsa0JBQWtCMUQsU0FBU0ssYUFBVCxDQUF1Qix1QkFBdkIsQ0FBdEI7O0FBRUFxRCxtQkFBZ0JoRCxnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMENpRCxXQUExQztBQUNEOztBQUdELFVBQVNBLFdBQVQsR0FBdUI7QUFDckIsT0FBSUMsZ0JBQWdCLEtBQUtDLE9BQUwsQ0FBYSxTQUFiLENBQXBCOztBQUVBL0QsUUFBSzZELFdBQUwsQ0FBaUJDLGFBQWpCO0FBQ0E5RCxRQUFLbUQsU0FBTCxHQUFpQixLQUFqQjtBQUNBcEI7QUFDRDs7QUFFRCxVQUFTaEIsYUFBVCxDQUF1QmlELENBQXZCLEVBQTBCO0FBQ3hCLE9BQUlDLGFBQWFELENBQWpCOztBQUVBbEUsVUFBT29FLFdBQVAsQ0FBbUI5RCxHQUFuQixFQUF3QitELFVBQXhCLENBQW1DRixVQUFuQyxFQUErQ2hFLE1BQS9DLEVBQXVEcUIsWUFBdkQsQ0FBb0VsQixHQUFwRTtBQUNELEU7Ozs7Ozs7Ozs7Ozs7Ozs7QUMxSUQsS0FBTWdFLFlBQVksbUJBQUF6RSxDQUFRLENBQVIsQ0FBbEI7O0tBRU1ELE07OztBQUNKLG1CQUFhMkUsQ0FBYixFQUFnQkMsQ0FBaEIsRUFBbUJDLENBQW5CLEVBQXNCQyxDQUF0QixFQUF5QjtBQUFBOztBQUFBLGlIQUNqQkgsQ0FEaUIsRUFDZEMsQ0FEYzs7QUFFdkIsV0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBQ0EsV0FBS0MsQ0FBTCxHQUFTQSxDQUFUO0FBSHVCO0FBSXhCOzs7O2tDQUVZcEUsRyxFQUFLO0FBQ2hCQSxXQUFJcUUsU0FBSjtBQUNBckUsV0FBSXNFLFNBQUosR0FBZ0IsU0FBaEI7QUFDQXRFLFdBQUl1RSxRQUFKLENBQWMsS0FBS04sQ0FBbkIsRUFBc0IsS0FBS0MsQ0FBM0IsRUFBOEIsS0FBS0MsQ0FBbkMsRUFBc0MsS0FBS0MsQ0FBM0M7QUFDQXBFLFdBQUl3RSxTQUFKO0FBQ0EsY0FBTyxJQUFQO0FBQ0Q7OztpQ0FFV3hFLEcsRUFBSztBQUNmQSxXQUFJbUMsU0FBSixDQUFlLEtBQUs4QixDQUFwQixFQUF1QixLQUFLQyxDQUE1QixFQUErQixLQUFLQyxDQUFwQyxFQUF1QyxLQUFLQyxDQUE1QztBQUNBLGNBQU8sSUFBUDtBQUNEOzs7Z0NBRVVQLFUsRUFBWWhFLE0sRUFBUTtBQUM3QixXQUFJNEUsWUFBWVosV0FBV2EsS0FBWCxHQUFtQjdFLE9BQU84RSxVQUExQzs7QUFFQSxXQUFJRixZQUFhLEtBQUtOLENBQUwsR0FBUyxDQUF0QixHQUEyQixDQUEzQixJQUNGTSxZQUFhLEtBQUtOLENBQUwsR0FBUyxDQUF0QixHQUEyQnRFLE9BQU8rRSxLQURwQyxFQUMyQztBQUN6QyxjQUFLWCxDQUFMLEdBQVNRLFlBQVksS0FBS04sQ0FBTCxHQUFTLENBQTlCO0FBQ0Q7QUFDRCxjQUFPLElBQVA7QUFDRDs7O3dDQUVrQnhFLEksRUFBTTtBQUN2QixXQUFLQSxLQUFLc0UsQ0FBTCxHQUFTdEUsS0FBS2tGLE1BQWQsR0FBdUIsS0FBS1osQ0FBN0IsSUFDRHRFLEtBQUtzRSxDQUFMLEdBQVN0RSxLQUFLa0YsTUFBZCxHQUF1QixLQUFLWixDQUFMLEdBQVMsS0FBS0UsQ0FEcEMsSUFFRHhFLEtBQUt1RSxDQUFMLEdBQVN2RSxLQUFLa0YsTUFBZCxHQUF1QixLQUFLWCxDQUYzQixJQUdEdkUsS0FBS3VFLENBQUwsR0FBU3ZFLEtBQUtrRixNQUFkLEdBQXVCLEtBQUtYLENBQUwsR0FBUyxLQUFLRSxDQUh4QyxFQUc0QztBQUMxQ3pFLGNBQUs4QyxFQUFMLEdBQVUsQ0FBQzlDLEtBQUs4QyxFQUFoQjtBQUNEO0FBQ0Y7Ozs7R0FyQ2tCdUIsUzs7QUF3Q3JCYyxRQUFPQyxPQUFQLEdBQWlCekYsTUFBakIsQzs7Ozs7Ozs7OztLQzFDTTBFLFMsR0FDSixtQkFBWUMsQ0FBWixFQUFlQyxDQUFmLEVBQWtCO0FBQUE7O0FBQ2hCLFFBQUtELENBQUwsR0FBU0EsQ0FBVDtBQUNBLFFBQUtDLENBQUwsR0FBU0EsQ0FBVDtBQUNELEU7O0FBR0hZLFFBQU9DLE9BQVAsR0FBaUJmLFNBQWpCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQQSxLQUFNQSxZQUFZLG1CQUFBekUsQ0FBUSxDQUFSLENBQWxCOztLQUVNQyxJOzs7QUFDSixpQkFBYXlFLENBQWIsRUFBZ0JDLENBQWhCLEVBQW1CVyxNQUFuQixFQUEyQkcsRUFBM0IsRUFBK0J2QyxFQUEvQixFQUFtQztBQUFBOztBQUFBLDZHQUMzQndCLENBRDJCLEVBQ3hCQyxDQUR3Qjs7QUFFakMsV0FBS1csTUFBTCxHQUFjQSxNQUFkO0FBQ0EsV0FBS0csRUFBTCxHQUFVQSxFQUFWO0FBQ0EsV0FBS3ZDLEVBQUwsR0FBVUEsRUFBVjtBQUNBLFdBQUt3QyxVQUFMLEdBQWtCLENBQWxCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQkMsS0FBS0MsRUFBTCxHQUFVLENBQTFCO0FBQ0EsV0FBS0MsUUFBTCxHQUFnQixLQUFoQjtBQUNBLFdBQUsxQyxTQUFMLEdBQWlCLEtBQWpCO0FBQ0EsV0FBSzJDLFNBQUwsR0FBaUIsTUFBakI7QUFUaUM7QUFVbEM7Ozs7Z0NBRVV0RixHLEVBQUs7QUFDZEEsV0FBSXFFLFNBQUo7QUFDQXJFLFdBQUl1RixHQUFKLENBQVEsS0FBS3RCLENBQWIsRUFBZ0IsS0FBS0MsQ0FBckIsRUFBd0IsS0FBS1csTUFBN0IsRUFDRSxLQUFLSSxVQURQLEVBQ21CLEtBQUtDLFFBRHhCLEVBQ2tDLEtBQUtGLEVBRHZDO0FBRUFoRixXQUFJc0UsU0FBSixHQUFnQixLQUFLZ0IsU0FBckI7QUFDQXRGLFdBQUl3RixJQUFKO0FBQ0F4RixXQUFJd0UsU0FBSjtBQUNBLGNBQU8sSUFBUDtBQUNEOzs7K0JBRVN4RSxHLEVBQUs7QUFDYkEsV0FBSW1DLFNBQUosQ0FBYyxLQUFLOEIsQ0FBTCxHQUFTLEtBQUtZLE1BQTVCLEVBQW9DLEtBQUtYLENBQUwsR0FBUyxLQUFLVyxNQUFsRCxFQUNFLEtBQUtBLE1BQUwsR0FBYyxDQURoQixFQUNtQixLQUFLQSxNQUFMLEdBQWMsQ0FEakM7QUFFQSxjQUFPLElBQVA7QUFDRDs7O2dDQUVVO0FBQ1QsWUFBS1osQ0FBTCxJQUFVLEtBQUtlLEVBQWY7QUFDQSxZQUFLZCxDQUFMLElBQVUsS0FBS3pCLEVBQWY7O0FBRUEsV0FBSSxLQUFLd0IsQ0FBTCxHQUFTLEtBQUtlLEVBQWQsR0FDRixPQUFPLEtBQUtILE1BRFYsSUFFRixLQUFLWixDQUFMLEdBQVMsS0FBS2UsRUFBZCxHQUFtQixLQUFLSCxNQUYxQixFQUVrQztBQUNoQyxjQUFLRyxFQUFMLEdBQVUsQ0FBQyxLQUFLQSxFQUFoQjtBQUNEO0FBQ0QsV0FBSSxLQUFLZCxDQUFMLEdBQVMsS0FBS3pCLEVBQWQsR0FBbUIsS0FBS29DLE1BQTVCLEVBQW9DO0FBQ2xDLGNBQUtwQyxFQUFMLEdBQVUsQ0FBQyxLQUFLQSxFQUFoQjtBQUNELFFBRkQsTUFFTyxJQUFJLEtBQUt5QixDQUFMLEdBQVMsS0FBS3pCLEVBQWQsR0FBbUIsTUFBTSxLQUFLb0MsTUFBbEMsRUFBMEM7QUFDL0MsY0FBS2xDLFNBQUwsR0FBaUIsSUFBakI7QUFDRDtBQUNELGNBQU8sSUFBUDtBQUNEOzs7O0dBNUNnQnFCLFM7O0FBK0NuQmMsUUFBT0MsT0FBUCxHQUFpQnZGLElBQWpCLEM7Ozs7Ozs7Ozs7OztBQ2pEQSxLQUFNaUcsUUFBUSxtQkFBQWxHLENBQVEsQ0FBUixDQUFkOztLQUVNRSxJO0FBQ0osbUJBQWM7QUFBQTs7QUFDWixVQUFLc0QsU0FBTCxHQUFpQixLQUFqQjtBQUNBLFVBQUtMLFNBQUwsR0FBaUIsQ0FBakI7QUFDQSxVQUFLZ0QsU0FBTCxHQUFpQixDQUFqQjtBQUNBLFVBQUtyQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLFVBQUtqQyxLQUFMLHNDQUFpQnFFLEtBQWpCLDJDQUEwQkUsU0FBMUI7QUFDQSxVQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLFVBQUtDLGdCQUFMLEdBQXdCLEVBQXhCO0FBQ0EsVUFBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDQSxVQUFLQyxNQUFMLEdBQWMsRUFBZDtBQUNBLFVBQUtDLFNBQUwsR0FBaUIsWUFBakI7QUFDQSxVQUFLMUIsU0FBTCxHQUFpQixNQUFqQjtBQUNEOzs7O29DQUVjO0FBQ2IsV0FBSTJCLG1CQUFtQkMsYUFBYUMsT0FBYixDQUFxQixZQUFyQixDQUF2QjtBQUNBLFdBQUlDLGlCQUFpQkMsS0FBS0MsS0FBTCxDQUFXTCxnQkFBWCxDQUFyQjs7QUFFQSxXQUFJRyxpQkFBaUIsQ0FBckIsRUFBd0I7QUFDdEIsY0FBS1YsU0FBTCxHQUFpQlUsY0FBakI7QUFDRDtBQUNELGNBQU8sSUFBUDtBQUNEOzs7Z0NBRVVwRyxHLEVBQUs7QUFDZEEsV0FBSXVHLElBQUosR0FBVyxLQUFLUCxTQUFoQjtBQUNBaEcsV0FBSXNFLFNBQUosR0FBZ0IsS0FBS0EsU0FBckI7QUFDQXRFLFdBQUl3RyxRQUFKLENBQWEsYUFBYSxLQUFLbkQsS0FBL0IsRUFBc0MsR0FBdEMsRUFBMkMsRUFBM0M7QUFDRDs7OytCQUVTckQsRyxFQUFLO0FBQ2JBLFdBQUl1RyxJQUFKLEdBQVcsS0FBS1AsU0FBaEI7QUFDQWhHLFdBQUlzRSxTQUFKLEdBQWdCLEtBQUtBLFNBQXJCO0FBQ0F0RSxXQUFJd0csUUFBSixDQUFhLGtCQUFrQixLQUFLOUQsU0FBcEMsRUFBK0MsRUFBL0MsRUFBbUQsRUFBbkQ7O0FBRUExQyxXQUFJdUcsSUFBSixHQUFXLEtBQUtQLFNBQWhCO0FBQ0FoRyxXQUFJc0UsU0FBSixHQUFnQixLQUFLQSxTQUFyQjtBQUNBdEUsV0FBSXdHLFFBQUosQ0FBYSxrQkFBa0IsS0FBS2QsU0FBcEMsRUFBK0MsR0FBL0MsRUFBb0QsRUFBcEQ7QUFDQSxjQUFPLElBQVA7QUFDRDs7O3VDQUVpQjtBQUNoQixXQUFJZSxnQkFBZ0IzRyxTQUFTSyxhQUFULENBQXVCLGFBQXZCLENBQXBCOztBQUVBc0cscUJBQWNDLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLFlBQTVCO0FBQ0Q7OztzQ0FFZ0I7QUFDZixXQUFJQyxvQkFBb0JQLEtBQUtRLFNBQUwsQ0FBZSxLQUFLbkIsU0FBcEIsQ0FBeEI7O0FBRUFRLG9CQUFhWSxPQUFiLENBQXFCLFlBQXJCLEVBQW1DRixpQkFBbkM7QUFDQSxjQUFPLElBQVA7QUFDRDs7O3dDQUVrQjtBQUNqQixXQUFJRyxlQUFlYixhQUFhQyxPQUFiLENBQXFCLFlBQXJCLENBQW5CO0FBQ0EsV0FBSUMsaUJBQWlCQyxLQUFLQyxLQUFMLENBQVdTLFlBQVgsQ0FBckI7O0FBRUEsV0FBSVgsaUJBQWlCLEtBQUsxRCxTQUExQixFQUFxQztBQUNuQzBELDBCQUFpQixLQUFLMUQsU0FBdEI7QUFDQSxjQUFLZ0QsU0FBTCxHQUFpQlUsY0FBakI7QUFDRDtBQUNELGNBQU8sSUFBUDtBQUNEOzs7cUNBRWU7QUFDZCxXQUFJckUsZ0JBQWdCakMsU0FBU0ssYUFBVCxDQUF1QixnQkFBdkIsQ0FBcEI7O0FBRUE0QixxQkFBYzJFLFNBQWQsQ0FBd0JNLE1BQXhCLENBQStCLGVBQS9CO0FBQ0FqRixxQkFBYzJFLFNBQWQsQ0FBd0JDLEdBQXhCLENBQTRCLFVBQTVCO0FBQ0EsV0FBSU0sZ0JBQWdCbkgsU0FBU0ssYUFBVCxDQUF1QixpQkFBdkIsQ0FBcEI7O0FBRUE4RyxxQkFBY0MsU0FBZCxHQUEwQixLQUFLeEUsU0FBL0I7QUFDQSxjQUFPLElBQVA7QUFDRDs7OytCQUVVVCxTLEVBQVc7QUFDcEIsV0FBSUEsVUFBVWtGLE1BQVYsQ0FBaUJDLE9BQWpCLENBQXlCLGdCQUF6QixNQUErQyxJQUFuRCxFQUF5RDtBQUN2RG5GLG1CQUFVb0YsY0FBVjtBQUNBdkgsa0JBQVMwQixRQUFULENBQWtCQyxNQUFsQjtBQUNEO0FBQ0Y7OzttQ0FFYTtBQUNaLFlBQUs0QixLQUFMO0FBQ0EsY0FBTyxJQUFQO0FBQ0Q7OzsyQ0FFcUI7QUFDcEIsV0FBSSxLQUFLQSxLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFDcEIsY0FBSyxJQUFJaUUsU0FBUyxDQUFsQixFQUFxQkEsU0FBUyxLQUFLekIsZ0JBQW5DLEVBQXFEeUIsUUFBckQsRUFBK0Q7QUFDN0QsZ0JBQUssSUFBSUMsTUFBTSxDQUFmLEVBQWtCQSxNQUFNLENBQXhCLEVBQTJCQSxLQUEzQixFQUFrQztBQUNoQyxrQkFBS25HLEtBQUwsQ0FBVzZDLENBQVgsR0FBZ0JxRCxVQUFVLEtBQUssS0FBSzFCLE9BQXBCLENBQUQsR0FBaUMsS0FBS0UsTUFBckQ7QUFDQSxrQkFBSzFFLEtBQUwsQ0FBVzhDLENBQVgsR0FBZ0JxRCxPQUFRLElBQUksS0FBSzNCLE9BQWpCLENBQUQsR0FBOEIsS0FBS0UsTUFBbkMsR0FBNEMsRUFBM0Q7QUFDQSxpQkFBSTFFLFFBQVEsSUFBSXFFLEtBQUosQ0FDVixLQUFLckUsS0FBTCxDQUFXNkMsQ0FERCxFQUVWLEtBQUs3QyxLQUFMLENBQVc4QyxDQUZELEVBR1YsS0FBSzlDLEtBQUwsQ0FBVytDLENBSEQsRUFJVixLQUFLL0MsS0FBTCxDQUFXZ0QsQ0FKRCxDQUFaOztBQU1BLGtCQUFLMkIsTUFBTCxDQUFZeUIsSUFBWixDQUFpQnBHLEtBQWpCO0FBQ0Q7QUFDRjtBQUNELGdCQUFPLEtBQUsyRSxNQUFaO0FBQ0QsUUFmRCxNQWVPLElBQUksS0FBSzFDLEtBQUwsS0FBZSxDQUFuQixFQUFzQjtBQUMzQixjQUFLLElBQUlpRSxVQUFTLENBQWxCLEVBQXFCQSxVQUFTLEtBQUt6QixnQkFBbkMsRUFBcUR5QixTQUFyRCxFQUErRDtBQUM3RCxnQkFBSyxJQUFJQyxPQUFNLENBQWYsRUFBa0JBLE9BQU0sQ0FBeEIsRUFBMkJBLE1BQTNCLEVBQWtDO0FBQ2hDLGtCQUFLbkcsS0FBTCxDQUFXNkMsQ0FBWCxHQUFnQnFELFdBQVUsS0FBSyxLQUFLMUIsT0FBcEIsQ0FBRCxHQUFpQyxLQUFLRSxNQUFyRDtBQUNBLGtCQUFLMUUsS0FBTCxDQUFXOEMsQ0FBWCxHQUFnQnFELFFBQVEsSUFBSSxLQUFLM0IsT0FBakIsQ0FBRCxHQUE4QixLQUFLRSxNQUFuQyxHQUE0QyxFQUEzRDtBQUNBLGlCQUFJMUUsU0FBUSxJQUFJcUUsS0FBSixDQUNWLEtBQUtyRSxLQUFMLENBQVc2QyxDQURELEVBRVYsS0FBSzdDLEtBQUwsQ0FBVzhDLENBRkQsRUFHVixLQUFLOUMsS0FBTCxDQUFXK0MsQ0FIRCxFQUlWLEtBQUsvQyxLQUFMLENBQVdnRCxDQUpELENBQVo7O0FBTUEsa0JBQUsyQixNQUFMLENBQVl5QixJQUFaLENBQWlCcEcsTUFBakI7QUFDRDtBQUNGO0FBQ0QsZ0JBQU8sS0FBSzJFLE1BQVo7QUFDRCxRQWZNLE1BZUEsSUFBSSxLQUFLMUMsS0FBTCxLQUFlLENBQW5CLEVBQXNCO0FBQzNCLGNBQUssSUFBSWlFLFdBQVMsQ0FBbEIsRUFBcUJBLFdBQ25CLEtBQUt6QixnQkFEUCxFQUN5QnlCLFVBRHpCLEVBQ21DO0FBQ2pDLGdCQUFLLElBQUlDLFFBQU0sQ0FBZixFQUFrQkEsUUFBTSxDQUF4QixFQUEyQkEsT0FBM0IsRUFBa0M7QUFDaEMsa0JBQUtuRyxLQUFMLENBQVc2QyxDQUFYLEdBQWdCcUQsWUFBVSxLQUFLLEtBQUsxQixPQUFwQixDQUFELEdBQWlDLEtBQUtFLE1BQXJEO0FBQ0Esa0JBQUsxRSxLQUFMLENBQVc4QyxDQUFYLEdBQWdCcUQsU0FBUSxJQUFJLEtBQUszQixPQUFqQixDQUFELEdBQThCLEtBQUtFLE1BQW5DLEdBQTRDLEVBQTNEO0FBQ0EsaUJBQUkxRSxVQUFRLElBQUlxRSxLQUFKLENBQ1YsS0FBS3JFLEtBQUwsQ0FBVzZDLENBREQsRUFFVixLQUFLN0MsS0FBTCxDQUFXOEMsQ0FGRCxFQUdWLEtBQUs5QyxLQUFMLENBQVcrQyxDQUhELEVBSVYsS0FBSy9DLEtBQUwsQ0FBV2dELENBSkQsQ0FBWjs7QUFNQSxrQkFBSzJCLE1BQUwsQ0FBWXlCLElBQVosQ0FBaUJwRyxPQUFqQjtBQUNEO0FBQ0Y7QUFDRCxnQkFBTyxLQUFLMkUsTUFBWjtBQUNEO0FBQ0QsY0FBTyxJQUFQO0FBQ0Q7OztpQ0FFV3BHLEksRUFBTTtBQUNoQkEsWUFBS3NFLENBQUwsR0FBUyxHQUFUO0FBQ0F0RSxZQUFLdUUsQ0FBTCxHQUFTLEdBQVQ7QUFDQSxXQUFJLEtBQUtiLEtBQUwsS0FBZSxDQUFuQixFQUFzQjtBQUNwQjFELGNBQUtxRixFQUFMLEdBQVcsRUFBWDtBQUNBckYsY0FBSzhDLEVBQUwsR0FBVSxFQUFWO0FBQ0Q7QUFDRCxXQUFJLEtBQUtZLEtBQUwsS0FBZSxDQUFuQixFQUFzQjtBQUNwQjFELGNBQUtrRixNQUFMLEdBQWMsRUFBZDtBQUNEO0FBQ0QsY0FBTyxJQUFQO0FBQ0Q7OzttQ0FFYW5GLE0sRUFBUTtBQUNwQixXQUFJLEtBQUsyRCxLQUFMLEtBQWUsQ0FBbkIsRUFBc0I7QUFDcEIzRCxnQkFBT3lFLENBQVAsR0FBVyxHQUFYO0FBQ0Q7QUFDRjs7O3FDQUVlO0FBQ2QsV0FBSXNELFlBQVkzSCxTQUFTSyxhQUFULENBQXVCLGdCQUF2QixDQUFoQjs7QUFFQSxXQUFJdUgsYUFBYTVILFNBQVNLLGFBQVQsQ0FBdUIsY0FBdkIsQ0FBakI7O0FBRUF1SCxrQkFBV0MsU0FBWCxHQUF1QixLQUFLakYsU0FBNUI7QUFDQStFLGlCQUFVZixTQUFWLENBQW9CTSxNQUFwQixDQUEyQixlQUEzQjtBQUNBUyxpQkFBVWYsU0FBVixDQUFvQkMsR0FBcEIsQ0FBd0IsVUFBeEI7QUFDRDs7O3FDQUVlO0FBQ2QsV0FBSWlCLGlCQUFpQjlILFNBQVNLLGFBQVQsQ0FBdUIsZ0JBQXZCLENBQXJCO0FBQ0EsV0FBSTBILGVBQWUvSCxTQUFTSyxhQUFULENBQXVCLGtCQUF2QixDQUFuQjs7QUFFQTBILG9CQUFhRixTQUFiLEdBQXlCLEtBQUtqRixTQUE5QjtBQUNBa0Ysc0JBQWVsQixTQUFmLENBQXlCTSxNQUF6QixDQUFnQyxlQUFoQztBQUNBWSxzQkFBZWxCLFNBQWYsQ0FBeUJDLEdBQXpCLENBQTZCLFVBQTdCO0FBQ0Q7OztpQ0FFV2pELGEsRUFBZTtBQUN6QkEscUJBQWNnRCxTQUFkLENBQXdCTSxNQUF4QixDQUErQixVQUEvQjtBQUNBdEQscUJBQWNnRCxTQUFkLENBQXdCQyxHQUF4QixDQUE0QixlQUE1QjtBQUNEOzs7Ozs7QUFHSDdCLFFBQU9DLE9BQVAsR0FBaUJ0RixJQUFqQixDOzs7Ozs7Ozs7Ozs7Ozs7O0FDMUxBLEtBQU11RSxZQUFZLG1CQUFBekUsQ0FBUSxDQUFSLENBQWxCOztLQUVNa0csSzs7O0FBQ0osa0JBQVl4QixDQUFaLEVBQWVDLENBQWYsRUFBa0I7QUFBQTs7QUFBQSwrR0FDVkQsQ0FEVSxFQUNQQyxDQURPOztBQUVoQixXQUFLQyxDQUFMLEdBQVMsRUFBVDtBQUNBLFdBQUtDLENBQUwsR0FBUyxFQUFUO0FBQ0EsV0FBSzBELEtBQUwsR0FBYSxTQUFiO0FBQ0EsV0FBS3hGLE9BQUwsR0FBZSxLQUFmO0FBTGdCO0FBTWpCOzs7O2tDQUVZaEMsVSxFQUFZTixHLEVBQUs7QUFBQTs7QUFDNUJNLGtCQUFXYSxPQUFYLENBQW9CLGlCQUFTO0FBQzNCLGFBQUlDLE1BQU1rQixPQUFOLEtBQWtCLEtBQXRCLEVBQTZCO0FBQzNCdEMsZUFBSXFFLFNBQUo7QUFDQXJFLGVBQUlzRSxTQUFKLEdBQWdCLE9BQUt3RCxLQUFyQjtBQUNBOUgsZUFBSXVFLFFBQUosQ0FBYW5ELE1BQU02QyxDQUFuQixFQUFzQjdDLE1BQU04QyxDQUE1QixFQUErQjlDLE1BQU0rQyxDQUFyQyxFQUF3Qy9DLE1BQU1nRCxDQUE5QztBQUNBcEUsZUFBSXdFLFNBQUo7QUFDRDtBQUNGLFFBUEQ7QUFRRDs7O3dDQUVrQjdFLEksRUFBTTtBQUN2QixXQUFLQSxLQUFLc0UsQ0FBTCxHQUFTLEtBQUtBLENBQWYsSUFDQ3RFLEtBQUt1RSxDQUFMLEdBQVMsS0FBS0EsQ0FBTCxHQUFTLEtBQUtFLENBRHhCLElBRUN6RSxLQUFLc0UsQ0FBTCxHQUFTLEtBQUtBLENBQUwsR0FBUyxLQUFLRSxDQUY1QixFQUVnQztBQUM5QixnQkFBTyxJQUFQO0FBQ0Q7QUFDRCxjQUFPLElBQVA7QUFDRDs7OztHQTNCaUJILFM7O0FBK0JwQmMsUUFBT0MsT0FBUCxHQUFpQlUsS0FBakIsQyIsImZpbGUiOiJtYWluLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIDE3MjdjZmUyZmRkMTg1YjA1OWIwIiwiY29uc3QgUGFkZGxlID0gcmVxdWlyZSgnLi4vbGliL1BhZGRsZS5qcycpO1xuY29uc3QgQmFsbCA9IHJlcXVpcmUoJy4uL2xpYi9CYWxsLmpzJyk7XG5jb25zdCBHYW1lID0gcmVxdWlyZSgnLi4vbGliL0dhbWUuanMnKTtcblxuY29uc3QgcGFkZGxlID0gbmV3IFBhZGRsZSAoNDAwLCA3MDAsIDk1MCwgMTApO1xuY29uc3QgYmFsbCA9IG5ldyBCYWxsICgzMDAsIDM3MCwgMjAsIDEwLCAxMCk7XG5jb25zdCBnYW1lID0gbmV3IEdhbWUoKTtcblxuY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUnKTtcbmNvbnN0IGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuY29uc3Qgc3RhcnRCdG4gID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LWJ0bicpO1xuY29uc3QgcmVwbGF5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlcGxheS1idXR0b24nKTtcbmNvbnN0IHJlcGxheUdhbWVCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmVwbGF5LWdhbWUnKVxuXG5sZXQgYmxvY2tBcnJheSA9IGdhbWUuY3JlYXRlQXJyYXlPZkJsb2NrcygpO1xuXG5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0R2FtZSk7XG5yZXBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCByZWxvYWRHYW1lKTtcbmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBhbmltYXRlUGFkZGxlKTtcbnJlcGxheUdhbWVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwbGF5QWdhaW4pO1xuXG5cbmZ1bmN0aW9uIGNyZWF0ZUluaXRpYWxDYW52YXMoKSB7XG4gIGdhbWUuaW5pdGlhbFNjb3JlKGN0eCk7XG4gIGdhbWUuZHJhd1Njb3JlKGN0eCk7XG4gIGdhbWUuZHJhd0xldmVscyhjdHgpO1xuICBiYWxsLmNyZWF0ZUJhbGwoY3R4KTtcbiAgcGFkZGxlLmNyZWF0ZVBhZGRsZShjdHgpO1xuICBibG9ja0FycmF5LmZvckVhY2goIChibG9jaywgaW5kZXgsIGFycmF5KSA9PiB7XG4gICAgYmxvY2suY3JlYXRlQmxvY2tzKGFycmF5LCBjdHgpO1xuICB9KTtcbn1cblxuY3JlYXRlSW5pdGlhbENhbnZhcygpO1xuXG5cbmZ1bmN0aW9uIHBsYXlBZ2FpbigpIHtcbiAgZG9jdW1lbnQubG9jYXRpb24ucmVsb2FkKClcbn1cblxuZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICBnYW1lLnN0YXJ0R2FtZVdpbmRvdygpO1xuICBjYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgYW5pbWF0ZVBhZGRsZSk7IFxuICBnYW1lTG9vcCgpXG59XG5cbmZ1bmN0aW9uIGVuZEdhbWUgKCkge1xuICBnYW1lLmNvbXBhcmVIaWdoU2NvcmUoKTtcbiAgZ2FtZS5zdG9yZUhpZ2hTY29yZSgpXG4gIGdhbWUuZW5kR2FtZVdpbmRvdygpOyBcbn1cblxuZnVuY3Rpb24gcmVsb2FkR2FtZShldmVudCkge1xuICBsZXQgZ2FtZUV2ZW50ID0gZXZlbnQ7XG5cbiAgZ2FtZS5yZXNldEdhbWUoZ2FtZUV2ZW50KTtcbiAgZ2FtZS5jb21wYXJlSGlnaFNjb3JlKCk7XG59XG5cbmZ1bmN0aW9uIGdhbWVMb29wKCkge1xuICBjdHguY2xlYXJSZWN0KDAsIDAsIDEwMDAsIDgwMCk7XG4gIGdhbWUuZHJhd1Njb3JlKGN0eCk7XG4gIGdhbWUuZHJhd0xldmVscyhjdHgpO1xuICBiYWxsLm1vdmVCYWxsKCkuY3JlYXRlQmFsbChjdHgpO1xuICBwYWRkbGUuY3JlYXRlUGFkZGxlKGN0eCk7XG4gIHBhZGRsZS5wYWRkbGVCYWxsQ29sbGlzb24oYmFsbCk7XG5cbiAgYmxvY2tBcnJheS5mb3JFYWNoKCAoYmxvY2ssIGluZGV4LCBhcnJheSkgPT4ge1xuICAgIGlmIChibG9jay5iYWxsSGl0ID09PSBmYWxzZSkge1xuICAgICAgYmxvY2suY3JlYXRlQmxvY2tzKGFycmF5LCBjdHgpXG4gICAgfVxuICB9KVxuXG4gIGJsb2NrQXJyYXkuZm9yRWFjaCggKGJsb2NrLCBpbmRleCwgYXJyYXkpID0+IHtcbiAgICBpZiAoYmxvY2suYmFsbEhpdCA9PT0gZmFsc2UpIHtcbiAgICAgIGxldCBibG9ja0NvbGxpc2lvbiA9IGJsb2NrLmJsb2NrQ29sbGlzaW9uVGVzdChiYWxsKTtcbiAgICAgIFxuICAgICAgaWYgKGJsb2NrQ29sbGlzaW9uID09PSB0cnVlKSB7IFxuICAgICAgICBibG9jay5iYWxsSGl0ID0gdHJ1ZTtcbiAgICAgICAgYmFsbC5keSA9IC1iYWxsLmR5O1xuICAgICAgICBnYW1lLnVzZXJTY29yZSsrO1xuICAgICAgICBibG9jay5jcmVhdGVCbG9ja3MoYXJyYXksIGN0eCk7XG4gICAgICB9XG4gICAgfVxuICB9KVxuXG4gIGlmIChiYWxsLmhpdEJvdHRvbSA9PT0gdHJ1ZSkge1xuICAgIGVuZEdhbWUoKTtcbiAgfVxuXG4gIGxldCBub0Jsb2Nrc0luQXJyYXkgPSBibG9ja0FycmF5LmV2ZXJ5KCBibG9jayA9PlxuICAgIGJsb2NrLmJhbGxIaXQgPT09IHRydWUpXG5cbiAgaWYgKG5vQmxvY2tzSW5BcnJheSA9PT0gdHJ1ZSkge1xuICAgIHJ1bkxldmVsVXAoKVxuICB9XG5cbiAgaWYgKGdhbWUucGF1c2VHYW1lID09PSBmYWxzZSkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShnYW1lTG9vcCk7XG4gIH0gXG59XG5cbmZ1bmN0aW9uIHJ1bkxldmVsVXAoKSB7XG4gIGJhbGwuY2xlYXJCYWxsKGN0eCk7XG4gIGdhbWUuY2hhbmdlTGV2ZWwoKTtcbiAgZ2FtZS5wYXVzZUdhbWUgPSB0cnVlOyBcbiAgZ2FtZS5jb21wYXJlSGlnaFNjb3JlKCkuc3RvcmVIaWdoU2NvcmUoKTtcbiAgYmxvY2tBcnJheSA9IGdhbWUuY3JlYXRlQXJyYXlPZkJsb2NrcygpO1xuICBnYW1lLmxldmVsVXBCYWxsKGJhbGwpO1xuICBnYW1lLmxldmVsVXBQYWRkbGUocGFkZGxlKTtcbiAgYmFsbC5jcmVhdGVCYWxsKGN0eCk7XG4gIGlmIChnYW1lLmxldmVsID09PSA0KSB7XG4gICAgZ2FtZS53b25HYW1lV2luZG93KCk7XG4gIH0gZWxzZSB7XG4gICAgbGV2ZWxVcFdpbmRvdygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGxldmVsVXBXaW5kb3coKSB7XG4gIGdhbWUubGV2ZWxVcFdpbmRvdygpO1xuICBsZXQgcmVzdGFydExldmVsQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJlc3RhcnQtbGV2ZWwtYnV0dG9uJyk7XG5cbiAgcmVzdGFydExldmVsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcmVzdGFydEdhbWUpO1xufVxuXG5cbmZ1bmN0aW9uIHJlc3RhcnRHYW1lKCkge1xuICBsZXQgcGFyZW50U2VjdGlvbiA9IHRoaXMuY2xvc2VzdCgnc2VjdGlvbicpO1xuXG4gIGdhbWUucmVzdGFydEdhbWUocGFyZW50U2VjdGlvbilcbiAgZ2FtZS5wYXVzZUdhbWUgPSBmYWxzZTtcbiAgZ2FtZUxvb3AoKTsgXG59XG5cbmZ1bmN0aW9uIGFuaW1hdGVQYWRkbGUoZSkge1xuICBsZXQgbW91c2VFdmVudCA9IGU7XG5cbiAgcGFkZGxlLmNsZWFyUGFkZGxlKGN0eCkubW92ZVBhZGRsZShtb3VzZUV2ZW50LCBjYW52YXMpLmNyZWF0ZVBhZGRsZShjdHgpO1xufVxuXG5cblxuXG5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9pbmRleC5qcyIsImNvbnN0IEdhbWVQaWVjZSA9IHJlcXVpcmUoJy4uL2xpYi9HYW1lLVBpZWNlLmpzJyk7XG5cbmNsYXNzIFBhZGRsZSBleHRlbmRzIEdhbWVQaWVjZSB7XG4gIGNvbnN0cnVjdG9yKCB4LCB5LCB3LCBoKSB7XG4gICAgc3VwZXIoeCwgeSk7XG4gICAgdGhpcy53ID0gdztcbiAgICB0aGlzLmggPSBoO1xuICB9XG5cbiAgY3JlYXRlUGFkZGxlKGN0eCkge1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJyM0ODNEOEInO1xuICAgIGN0eC5maWxsUmVjdCggdGhpcy54LCB0aGlzLnksIHRoaXMudywgdGhpcy5oKTtcbiAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjbGVhclBhZGRsZShjdHgpIHtcbiAgICBjdHguY2xlYXJSZWN0KCB0aGlzLngsIHRoaXMueSwgdGhpcy53LCB0aGlzLmgpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbW92ZVBhZGRsZShtb3VzZUV2ZW50LCBjYW52YXMpIHtcbiAgICBsZXQgcmVsYXRpdmVYID0gbW91c2VFdmVudC5wYWdlWCAtIGNhbnZhcy5vZmZzZXRMZWZ0O1xuICAgICAgXG4gICAgaWYgKHJlbGF0aXZlWCAtICh0aGlzLncgLyAyKSA+IDAgJiYgXG4gICAgICByZWxhdGl2ZVggKyAodGhpcy53IC8gMikgPCBjYW52YXMud2lkdGgpIHtcbiAgICAgIHRoaXMueCA9IHJlbGF0aXZlWCAtIHRoaXMudyAvIDI7ICBcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBwYWRkbGVCYWxsQ29sbGlzb24oYmFsbCkge1xuICAgIGlmICgoYmFsbC54ICsgYmFsbC5yYWRpdXMgPiB0aGlzLngpICYmIFxuICAgICAgKGJhbGwueCAtIGJhbGwucmFkaXVzIDwgdGhpcy54ICsgdGhpcy53KSAmJiBcbiAgICAgIChiYWxsLnkgKyBiYWxsLnJhZGl1cyA+IHRoaXMueSkgJiYgXG4gICAgICAoYmFsbC55IC0gYmFsbC5yYWRpdXMgPCB0aGlzLnkgKyB0aGlzLmgpKSB7IFxuICAgICAgYmFsbC5keSA9IC1iYWxsLmR5OyBcbiAgICB9XG4gIH0gIFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhZGRsZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvUGFkZGxlLmpzIiwiY2xhc3MgR2FtZVBpZWNlIHtcbiAgY29uc3RydWN0b3IoeCwgeSkge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVQaWVjZTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvR2FtZS1QaWVjZS5qcyIsImNvbnN0IEdhbWVQaWVjZSA9IHJlcXVpcmUoJy4uL2xpYi9HYW1lLVBpZWNlLmpzJyk7XG5cbmNsYXNzIEJhbGwgZXh0ZW5kcyBHYW1lUGllY2Uge1xuICBjb25zdHJ1Y3RvciAoeCwgeSwgcmFkaXVzLCBkeCwgZHkpIHtcbiAgICBzdXBlcih4LCB5KTtcbiAgICB0aGlzLnJhZGl1cyA9IHJhZGl1cztcbiAgICB0aGlzLmR4ID0gZHg7XG4gICAgdGhpcy5keSA9IGR5O1xuICAgIHRoaXMuc3RhcnRBbmdsZSA9IDA7XG4gICAgdGhpcy5lbmRBbmdsZSA9IE1hdGguUEkgKiAyO1xuICAgIHRoaXMuY29sbGlkZWQgPSBmYWxzZTtcbiAgICB0aGlzLmhpdEJvdHRvbSA9IGZhbHNlO1xuICAgIHRoaXMuYmFsbENvbG9yID0gJyNlZWUnO1xuICB9XG5cbiAgY3JlYXRlQmFsbChjdHgpIHtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy5yYWRpdXMsXG4gICAgICB0aGlzLnN0YXJ0QW5nbGUsIHRoaXMuZW5kQW5nbGUsIHRoaXMuZHgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmJhbGxDb2xvcjtcbiAgICBjdHguZmlsbCgpO1xuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGNsZWFyQmFsbChjdHgpIHtcbiAgICBjdHguY2xlYXJSZWN0KHRoaXMueCAtIHRoaXMucmFkaXVzLCB0aGlzLnkgLSB0aGlzLnJhZGl1cywgXG4gICAgICB0aGlzLnJhZGl1cyAqIDIsIHRoaXMucmFkaXVzICogMik7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBtb3ZlQmFsbCgpIHtcbiAgICB0aGlzLnggKz0gdGhpcy5keDtcbiAgICB0aGlzLnkgKz0gdGhpcy5keTtcblxuICAgIGlmICh0aGlzLnggKyB0aGlzLmR4ID4gXG4gICAgICAxMDAwIC0gdGhpcy5yYWRpdXMgfHwgXG4gICAgICB0aGlzLnggKyB0aGlzLmR4IDwgdGhpcy5yYWRpdXMpIHtcbiAgICAgIHRoaXMuZHggPSAtdGhpcy5keDtcbiAgICB9XG4gICAgaWYgKHRoaXMueSArIHRoaXMuZHkgPCB0aGlzLnJhZGl1cykge1xuICAgICAgdGhpcy5keSA9IC10aGlzLmR5O1xuICAgIH0gZWxzZSBpZiAodGhpcy55ICsgdGhpcy5keSA+IDgwMCAtIHRoaXMucmFkaXVzKSB7XG4gICAgICB0aGlzLmhpdEJvdHRvbSA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQmFsbDtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9saWIvQmFsbC5qcyIsImNvbnN0IEJsb2NrID0gcmVxdWlyZSgnLi4vbGliL0Jsb2NrLmpzJyk7XG5cbmNsYXNzIEdhbWUge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnBhdXNlR2FtZSA9IGZhbHNlO1xuICAgIHRoaXMudXNlclNjb3JlID0gMDtcbiAgICB0aGlzLmhpZ2hTY29yZSA9IDA7XG4gICAgdGhpcy5sZXZlbCA9IDE7XG4gICAgdGhpcy5ibG9jayA9IG5ldyBCbG9jayguLi5hcmd1bWVudHMpO1xuICAgIHRoaXMucGFkZGluZyA9IDU1O1xuICAgIHRoaXMuYmxvY2tDb2x1bW5Ub3RhbCA9IDEwO1xuICAgIHRoaXMub2ZmU2V0ID0gMjU7XG4gICAgdGhpcy5ibG9ja3MgPSBbXTtcbiAgICB0aGlzLmZvbnRTdHlsZSA9IFwiMjRweCBBcmlhbFwiO1xuICAgIHRoaXMuZmlsbFN0eWxlID0gXCIjZWVlXCI7XG4gIH1cblxuICBpbml0aWFsU2NvcmUoKSB7XG4gICAgbGV0IGluaXRpYWxIaWdoU2NvcmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlnaCBzY29yZScpO1xuICAgIGxldCBwYXJzZUhpZ2hTY29yZSA9IEpTT04ucGFyc2UoaW5pdGlhbEhpZ2hTY29yZSk7XG5cbiAgICBpZiAocGFyc2VIaWdoU2NvcmUgPiAwKSB7XG4gICAgICB0aGlzLmhpZ2hTY29yZSA9IHBhcnNlSGlnaFNjb3JlO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGRyYXdMZXZlbHMoY3R4KSB7XG4gICAgY3R4LmZvbnQgPSB0aGlzLmZvbnRTdHlsZTtcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5maWxsU3R5bGU7XG4gICAgY3R4LmZpbGxUZXh0KFwiIExldmVsOiBcIiArIHRoaXMubGV2ZWwsIDQ1MCwgNDApO1xuICB9XG5cbiAgZHJhd1Njb3JlKGN0eCkge1xuICAgIGN0eC5mb250ID0gdGhpcy5mb250U3R5bGU7XG4gICAgY3R4LmZpbGxTdHlsZSA9IHRoaXMuZmlsbFN0eWxlO1xuICAgIGN0eC5maWxsVGV4dChcIiBZb3VyIFNjb3JlOiBcIiArIHRoaXMudXNlclNjb3JlLCA0MCwgNDApO1xuXG4gICAgY3R4LmZvbnQgPSB0aGlzLmZvbnRTdHlsZTtcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5maWxsU3R5bGU7XG4gICAgY3R4LmZpbGxUZXh0KFwiIEhpZ2ggc2NvcmU6IFwiICsgdGhpcy5oaWdoU2NvcmUsIDgwMCwgNDApO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc3RhcnRHYW1lV2luZG93KCkge1xuICAgIGxldCB3ZWxjb21lV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0YXJ0LWdhbWUnKTtcblxuICAgIHdlbGNvbWVXaW5kb3cuY2xhc3NMaXN0LmFkZCgnaGlkZS1zdGFydCcpO1xuICB9XG5cbiAgc3RvcmVIaWdoU2NvcmUoKSB7XG4gICAgbGV0IHN0cmluZ2VkSGlnaFNjb3JlID0gSlNPTi5zdHJpbmdpZnkodGhpcy5oaWdoU2NvcmUpO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2hpZ2ggc2NvcmUnLCBzdHJpbmdlZEhpZ2hTY29yZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBjb21wYXJlSGlnaFNjb3JlKCkge1xuICAgIGxldCBnZXRIaWdoU2NvcmUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnaGlnaCBzY29yZScpO1xuICAgIGxldCBwYXJzZUhpZ2hTY29yZSA9IEpTT04ucGFyc2UoZ2V0SGlnaFNjb3JlKTtcblxuICAgIGlmIChwYXJzZUhpZ2hTY29yZSA8IHRoaXMudXNlclNjb3JlKSB7XG4gICAgICBwYXJzZUhpZ2hTY29yZSA9IHRoaXMudXNlclNjb3JlO1xuICAgICAgdGhpcy5oaWdoU2NvcmUgPSBwYXJzZUhpZ2hTY29yZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBlbmRHYW1lV2luZG93KCkge1xuICAgIGxldCBlbmRHYW1lV2luZG93ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhpZGUtZW5kLWdhbWUnKTtcblxuICAgIGVuZEdhbWVXaW5kb3cuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1lbmQtZ2FtZScpO1xuICAgIGVuZEdhbWVXaW5kb3cuY2xhc3NMaXN0LmFkZCgnZW5kLWdhbWUnKTtcbiAgICBsZXQgdXNlclNjb3JlU3BhbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lbmQtZ2FtZS1zY29yZScpO1xuXG4gICAgdXNlclNjb3JlU3Bhbi5pbm5lckhUTUwgPSB0aGlzLnVzZXJTY29yZTtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgcmVzZXRHYW1lIChnYW1lRXZlbnQpIHtcbiAgICBpZiAoZ2FtZUV2ZW50LnRhcmdldC5tYXRjaGVzKCcucmVwbGF5LWJ1dHRvbicpID09PSB0cnVlKSB7XG4gICAgICBnYW1lRXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGRvY3VtZW50LmxvY2F0aW9uLnJlbG9hZCgpO1xuICAgIH1cbiAgfVxuXG4gIGNoYW5nZUxldmVsKCkge1xuICAgIHRoaXMubGV2ZWwrKztcbiAgICByZXR1cm4gdGhpc1xuICB9XG4gXG4gIGNyZWF0ZUFycmF5T2ZCbG9ja3MoKSB7XG4gICAgaWYgKHRoaXMubGV2ZWwgPT09IDEpIHtcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IHRoaXMuYmxvY2tDb2x1bW5Ub3RhbDsgY29sdW1uKyspIHtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgMzsgcm93KyspIHtcbiAgICAgICAgICB0aGlzLmJsb2NrLnggPSAoY29sdW1uICogKDQwICsgdGhpcy5wYWRkaW5nKSkgKyB0aGlzLm9mZlNldDtcbiAgICAgICAgICB0aGlzLmJsb2NrLnkgPSAocm93ICogICgzICsgdGhpcy5wYWRkaW5nKSkgKyB0aGlzLm9mZlNldCArIDUwO1xuICAgICAgICAgIGxldCBibG9jayA9IG5ldyBCbG9jayhcbiAgICAgICAgICAgIHRoaXMuYmxvY2sueCwgXG4gICAgICAgICAgICB0aGlzLmJsb2NrLnksIFxuICAgICAgICAgICAgdGhpcy5ibG9jay53LFxuICAgICAgICAgICAgdGhpcy5ibG9jay5oKVxuXG4gICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChibG9jayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJsb2NrcyBcbiAgICB9IGVsc2UgaWYgKHRoaXMubGV2ZWwgPT09IDIpIHtcbiAgICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8IHRoaXMuYmxvY2tDb2x1bW5Ub3RhbDsgY29sdW1uKyspIHtcbiAgICAgICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgNjsgcm93KyspIHtcbiAgICAgICAgICB0aGlzLmJsb2NrLnggPSAoY29sdW1uICogKDQwICsgdGhpcy5wYWRkaW5nKSkgKyB0aGlzLm9mZlNldDtcbiAgICAgICAgICB0aGlzLmJsb2NrLnkgPSAocm93ICogICgzICsgdGhpcy5wYWRkaW5nKSkgKyB0aGlzLm9mZlNldCArIDUwO1xuICAgICAgICAgIGxldCBibG9jayA9IG5ldyBCbG9jayhcbiAgICAgICAgICAgIHRoaXMuYmxvY2sueCwgXG4gICAgICAgICAgICB0aGlzLmJsb2NrLnksIFxuICAgICAgICAgICAgdGhpcy5ibG9jay53LCBcbiAgICAgICAgICAgIHRoaXMuYmxvY2suaClcblxuICAgICAgICAgIHRoaXMuYmxvY2tzLnB1c2goYmxvY2spO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5ibG9ja3MgXG4gICAgfSBlbHNlIGlmICh0aGlzLmxldmVsID09PSAzKSB7XG4gICAgICBmb3IgKGxldCBjb2x1bW4gPSAwOyBjb2x1bW4gPCBcbiAgICAgICAgdGhpcy5ibG9ja0NvbHVtblRvdGFsOyBjb2x1bW4rKykge1xuICAgICAgICBmb3IgKGxldCByb3cgPSAwOyByb3cgPCA3OyByb3crKykge1xuICAgICAgICAgIHRoaXMuYmxvY2sueCA9IChjb2x1bW4gKiAoNDAgKyB0aGlzLnBhZGRpbmcpKSArIHRoaXMub2ZmU2V0O1xuICAgICAgICAgIHRoaXMuYmxvY2sueSA9IChyb3cgKiAgKDMgKyB0aGlzLnBhZGRpbmcpKSArIHRoaXMub2ZmU2V0ICsgNTA7XG4gICAgICAgICAgbGV0IGJsb2NrID0gbmV3IEJsb2NrKFxuICAgICAgICAgICAgdGhpcy5ibG9jay54LCBcbiAgICAgICAgICAgIHRoaXMuYmxvY2sueSwgXG4gICAgICAgICAgICB0aGlzLmJsb2NrLncsIFxuICAgICAgICAgICAgdGhpcy5ibG9jay5oKVxuXG4gICAgICAgICAgdGhpcy5ibG9ja3MucHVzaChibG9jayk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmJsb2NrcyBcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIGxldmVsVXBCYWxsKGJhbGwpIHtcbiAgICBiYWxsLnggPSAzOTA7XG4gICAgYmFsbC55ID0gNTAwO1xuICAgIGlmICh0aGlzLmxldmVsID09PSAyKSB7XG4gICAgICBiYWxsLmR4ICA9IDExO1xuICAgICAgYmFsbC5keSA9IDExO1xuICAgIH1cbiAgICBpZiAodGhpcy5sZXZlbCA9PT0gMykge1xuICAgICAgYmFsbC5yYWRpdXMgPSAxNztcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsZXZlbFVwUGFkZGxlKHBhZGRsZSkge1xuICAgIGlmICh0aGlzLmxldmVsID09PSAzKSB7XG4gICAgICBwYWRkbGUudyA9IDE1MDtcbiAgICB9XG4gIH1cblxuICB3b25HYW1lV2luZG93KCkge1xuICAgIGxldCB3b25XaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlkZS1nYW1lLXdvbicpO1xuXG4gICAgbGV0IGZpbmFsU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmluYWwtc2NvcmUnKTtcblxuICAgIGZpbmFsU2NvcmUuaW5uZXJUZXh0ID0gdGhpcy51c2VyU2NvcmU7XG4gICAgd29uV2luZG93LmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUtZ2FtZS13b24nKTtcbiAgICB3b25XaW5kb3cuY2xhc3NMaXN0LmFkZCgnZ2FtZS13b24nKTtcbiAgfVxuICBcbiAgbGV2ZWxVcFdpbmRvdygpIHtcbiAgICBsZXQgZW5kTGV2ZWxXaW5kb3cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGlkZS1sZXZlbC11cCcpO1xuICAgIGxldCBlbmRVc2VyU2NvcmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZW5kLWxldmVsLXNjb3JlJyk7XG5cbiAgICBlbmRVc2VyU2NvcmUuaW5uZXJUZXh0ID0gdGhpcy51c2VyU2NvcmU7XG4gICAgZW5kTGV2ZWxXaW5kb3cuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZS1sZXZlbC11cCcpO1xuICAgIGVuZExldmVsV2luZG93LmNsYXNzTGlzdC5hZGQoJ2xldmVsLXVwJyk7XG4gIH1cblxuICByZXN0YXJ0R2FtZShwYXJlbnRTZWN0aW9uKSB7XG4gICAgcGFyZW50U2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdsZXZlbC11cCcpO1xuICAgIHBhcmVudFNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnaGlkZS1sZXZlbC11cCcpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lO1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2xpYi9HYW1lLmpzIiwiY29uc3QgR2FtZVBpZWNlID0gcmVxdWlyZSgnLi4vbGliL0dhbWUtUGllY2UuanMnKTtcblxuY2xhc3MgQmxvY2sgZXh0ZW5kcyBHYW1lUGllY2Uge1xuICBjb25zdHJ1Y3Rvcih4LCB5KSB7XG4gICAgc3VwZXIoeCwgeSk7XG4gICAgdGhpcy53ID0gODU7IFxuICAgIHRoaXMuaCA9IDMwO1xuICAgIHRoaXMuY29sb3IgPSAnIzczQTU1Nyc7XG4gICAgdGhpcy5iYWxsSGl0ID0gZmFsc2U7XG4gIH1cblxuICBjcmVhdGVCbG9ja3MoYmxvY2tBcnJheSwgY3R4KSB7XG4gICAgYmxvY2tBcnJheS5mb3JFYWNoKCBibG9jayA9PiB7XG4gICAgICBpZiAoYmxvY2suYmFsbEhpdCA9PT0gZmFsc2UpIHtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jb2xvcjtcbiAgICAgICAgY3R4LmZpbGxSZWN0KGJsb2NrLngsIGJsb2NrLnksIGJsb2NrLncsIGJsb2NrLmgpO1xuICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICB9XG4gICAgfSlcbiAgfVxuIFxuICBibG9ja0NvbGxpc2lvblRlc3QoYmFsbCkge1xuICAgIGlmICgoYmFsbC54ID4gdGhpcy54KSAmJiBcbiAgICAgICAgKGJhbGwueSA8IHRoaXMueSArIHRoaXMuaCkgJiYgXG4gICAgICAgIChiYWxsLnggPCB0aGlzLnggKyB0aGlzLncpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gQmxvY2s7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vbGliL0Jsb2NrLmpzIl0sInNvdXJjZVJvb3QiOiIifQ==