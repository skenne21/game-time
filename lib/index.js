const Snake = require('../lib/Snake.js');
const Food = require('../lib/Food.js');

const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
var food;
const snakeHead = new Snake (500, ...arguments);
const startFood = new Food (...arguments);
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
  snakeHead.createCircle(ctx);

  let yIncrease = foodArray.forEach( value => {
    value.y++;
  })

  food.clearFood(ctx);
  food.createFood(ctx);
  

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

canvas.addEventListener('mousemove', function() {
  snakeHead.clearSnake(ctx)
  snakeHead.x = event.pageX;
  snakeHead.createCircle(ctx);
})