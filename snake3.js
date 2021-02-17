//Determines the color of the snake.
var scolor = prompt("Please enter the color you would like your snake to be: ");

//board color and fill color.
const board_border = 'black';
const board_background = "white";

//snake border color and fill color.
const snake_col = scolor;
const snake_border = "black";

let snake = [
  // Number of starting snake parts
  {x: 100, y: 50}
  //,{x: 90, y: 50}
  //,{x: 80, y: 50}
  //,{x: 70, y: 50}
]

// Tracks score of the game
let score = 0;

//True if changing direction
let changing_direction = false;

// Food position
let food_x;
let food_y;

// Obstacle position
let ob_x;
let ob_y;

let ob2_x;
let ob2_y;

let ob3_x;
let ob3_y;

// Horizontal velocity
let dx = 10;

// Vertical velocity
let dy = 0;

// Get the canvas element
const board = document.getElementById("board");
// Return a two dimensional drawing context
const board_ctx = board.getContext("2d");

// Start game as soon as page loads.
main();
gen_food();
// Removed for testing new level formulation, can restore if needed.(basically added just to make a difference between two levels)
gen_obstacle();

document.addEventListener("keydown", change_direction);
// main function called repeatedly to keep the game running
function main() {
    if (gameEnded()){ 
    alert("You hit the boundary Game Over! Refresh the page to start again!");
    return;
    } else if (obGameEnded()){
    alert("You hit the obstacle, Game Over! Refresh the page to start again!");
    return;
    }

    changing_direction = false;
    setTimeout(function onTick() {
      clearCanvas();
      drawFood();
      moveSnake();
      drawSnake();
      drawObstacles();
      // Redirects page to next level once specific score is hit.
      pageRedirect();
      // Call main again
      main();
    },100)
}

// draw a border around the canvas
function clearCanvas() {
  //  Select the colour to fill the drawing
  board_ctx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  board_ctx.strokestyle = board_border;
  // Draw a "filled" rectangle to cover the entire canvas
  board_ctx.fillRect(0, 0, board.width, board.height);
  // Draw a "border" around the entire canvas
  board_ctx.strokeRect(0, 0, board.width, board.height);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart)
}

// Draw the food on the canvas
function drawFood() {
  //color of the food.
  board_ctx.fillStyle = 'lightgreen';
  board_ctx.strokestyle = 'darkgreen';
  // size of the actual food object.
  board_ctx.fillRect(food_x, food_y, 15, 15);
  board_ctx.strokeRect(food_x, food_y, 15, 15);
}

// Draw an obstacle on the canvas.
function drawObstacles() {
  //color of the obstacle.
  board_ctx.fillStyle = 'black';
  board_ctx.strokestyle = 'black';

  // size of the first obstacle.
  // fillRect(x, y, width, height)
  board_ctx.fillRect(ob_x, ob_y,30,30);
  board_ctx.strokeRect(ob_x, ob_y,30,30);

  // size of the second obstacle.
  board_ctx.fillRect(ob2_x, ob2_y, 15, 300);
  board_ctx.strokeRect(ob2_x, ob2_y, 15, 300);

  // size of the third obstacle
  board_ctx.fillRect(ob3_x, ob3_y, 15, 300);
  board_ctx.strokeRect(ob3_x, ob3_y, 15, 300);
}

//function that redirects to different level once a certain score is hit.
function pageRedirect(){
  if(score == 50){
    window.location.href = "credits.html";
  } 
}

// Draw one snake part
function drawSnakePart(snakePart) {

  // Set the colour of the snake part
  board_ctx.fillStyle = snake_col;
  // Set the border colour of the snake part
  board_ctx.strokestyle = snake_border;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  // Changes size of snake also
  
  board_ctx.fillRect(snakePart.x, snakePart.y, 15, 15);
  // Draw a border around the snake part
  board_ctx.strokeRect(snakePart.x, snakePart.y, 15, 15);
}

// Deals with game ending condition for border.
function gameEnded() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }

  // boundary of map
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > board.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > board.height - 10;

  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall;
}

// Deals with game ending condition for obstacle.
function obGameEnded() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }

  // deals with the collision of one specefic object.
  if (snake[0].x < ob_x + 30 && snake[0].x + 15 > ob_x && snake[0].y < ob_y + 30 && snake[0].y + 15 > ob_y) {
    return true;
  }

  // deals with the collision of the long object.
  if (snake[0].x < ob2_x + 15 && snake[0].x + 15 > ob2_x && snake[0].y < ob2_y + 300 && snake[0].y + 15 > ob2_y) {
    return true;
  }

  // deals with the collision of the second long object.
  if (snake[0].x < ob3_x + 15 && snake[0].x + 15 > ob3_x && snake[0].y < ob3_y + 300 && snake[0].y + 15 > ob3_y) {
    return true;
  }

}

function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

// generate food at random on canvas.
function gen_food(){
  // Generate a random number the food x-coordinate
  food_x = random_food(0, board.width - 10);
  // Generate a random number for the food y-coordinate
  food_y = random_food(0, board.height - 10);
  // if the new food location is where the snake currently is, generate a new food location
  snake.forEach(function snakeEaten(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });

}

//generate obstacle on the canvas.
function gen_obstacle(){
  // x-coordinate for the obstacle.
  ob_x = 300;
  //y-coordinate for the obstacle.
  ob_y = 250;

  // x-coordinate for the second obstacle.
  ob2_x = 100;
  // y-coordinate for the second obstacle.
  ob2_y = 100;

  // x-coordinate for the third obstacle.
  ob3_x = 500;
  // y-coordinate for the third obstacle.
  ob3_y = 100;

}

// function that deals with the changing direction and speed of the snake.
function change_direction(event){
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  
  // Prevent the snake from reversing
  // change these values depending on the difficulty.
  if (changing_direction) return;
  changing_direction = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }

}

function moveSnake(){
  // Create the new Snake's head
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  // Add new head to the beginning of the snake body
  snake.unshift(head);

  const has_eaten = snake[0].x === food_x && snake[0].y === food_y;
  if(has_eaten){
    //increase score
    score += 10;
    //display score on screen
    document.getElementById('score').innerHTML = score;
    // Generate new food location
    gen_food();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}
