const Paddle = require('../lib/Paddle.js');
const Food = require('../lib/Food.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const paddle = new Paddle (500, ...arguments);
const startFood = new Food (...arguments);
var food;
var foodArray = []

function makeFoods() {
  for(let i = 0; i < 100; i++) {
  food = new Food(...arguments);
  food.createFood(ctx);
  foodArray.push(food); 
  }
}

makeFoods();

function gameLoop() {
  paddle.createPaddle(ctx);
  food.clearFood(ctx);
  for (var i = 0; i < foodArray.length; i++) {
    var updateFood = foodArray[i];
    food.updateAndDraw(ctx,updateFood);
    food.updateAndClearFood(ctx, updateFood)
    // food.updateAndDraw(ctx, updateFood) 
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

canvas.addEventListener('mousemove', function() {
  paddle.clearPaddle(ctx)
  paddle.x = event.pageX;
  paddle.createPaddle(ctx);
})