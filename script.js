const world = document.getElementById("world");
const pen = world.getContext('2d');
let recordTab = document.getElementById('record_tab')
let scoreTab = document.getElementById('score_tab')
let score = 0;
let titleSize = 20;
let titleCount = world.width/titleSize;

let velocity = {
    x: 0,
    y: -1,
}

let food = {
    x: 15,
    y: 15,
}

let snake = [];
let snakeHead = {
    x: 1,
    y: 10,
}

let snakeTailCount = 2;

function drawWorld () {
    pen.fillStyle = '#CD9575'; 
    pen.fillRect(0,0, world.width, world.height)
}

let records = [];
function drawSnake () {
    pen.fillStyle = 'darkgreen';
    for (let i = 0; i < snake.length; i++) {
        pen.fillRect(snake[i].x * titleSize, snake[i].y * titleSize, titleSize - 2, titleSize - 2)
        if(
            snake[i].x === snakeHead.x && 
            snake[i].y === snakeHead.y 
        ) {
            console.log('!')
            if (score > 0) {
            scoreTab.innerHTML = "Столкновение! Набрано очков: " + score;
            records.push(score);
            console.log(records)
            var max = records[0];
            for (let z = 1; z < records.length; z++) {
                if (records[z] > max) {
                    max = records[z];
                }   
            }
            recordTab.innerHTML = "Ваш рекорд: " + max; 
            score = 0; 
          }
          snakeTailCount = 2;
        }
    } 
}

function drawFood () {
    pen.fillStyle = 'darkred'
    pen.fillRect(food.x * titleSize, food.y * titleSize, titleSize - 2, titleSize - 2)
}

function updateSnakeHead () {
    snakeHead.x += velocity.x;
    snakeHead.y += velocity.y;

    if(snakeHead.x<0) {
        snakeHead.x = titleCount -1;
    }
    if(snakeHead.x > titleCount -1) {
        snakeHead.x = 0;
    }

    if(snakeHead.y<0) {
        snakeHead.y = titleCount -1;
    }
    if(snakeHead.y > titleCount -1) {
        snakeHead.y = 0;
    }
}

function updateSnakeBody () {
    snake.push({
        x: snakeHead.x,
        y: snakeHead.y,        
    })

    while(snake.length > snakeTailCount){
        snake.shift();
    }
}

function eatFood () {
    if(
        food.x === snakeHead.x &&
        food.y === snakeHead.y
    ){
        snakeTailCount++
        score++
        food.x = Math.floor(Math.random()*titleCount)
        food.y = Math.floor(Math.random()*titleCount)
    }
}

const keyDownHandlers = {
    'ArrowLeft': () => {
        velocity.x = -1;
        velocity.y = 0;
    },
    'ArrowRight': () => {
        velocity.x = 1;
        velocity.y = 0;
    },
    'ArrowUp': () => {
        velocity.x = 0;
        velocity.y = -1;
    },
    'ArrowDown': () => {
        velocity.x = 0;
        velocity.y = 1;
    }
}

function backx (){
    if (velocity.x == -1) {
}
}

function onKeyDown (event) {
    if (keyDownHandlers.hasOwnProperty(event.key)){
        keyDownHandlers[event.key]()
    }
}

function updateGame () {
    updateSnakeHead()
    drawWorld()
    drawFood()
    drawSnake()
    eatFood()
    drawFood()
    backx()
    updateSnakeBody()
}

document.addEventListener('keydown', onKeyDown)
setInterval(updateGame, 1000/5)