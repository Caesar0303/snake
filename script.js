const world = document.getElementById("world");
const pen = world.getContext('2d');
let recordTab = document.getElementById('record_tab')
let scoreTab = document.getElementById('score_tab')
let score = 0;
let titleSize = 20;
let titleCount = world.width/titleSize;

//Создаем переменную "Скорость",начальная скорость равна на один координату вверх
let velocity = {
    x: 0,
    y: -1,
}

// Переменная еда и его координаты.
let food = {
    x: 15,
    y: 15,
}

// Массив тела змеи
let snake = [];

// Голова змеи и его координаты
let snakeHead = {
    x: 1,
    y: 10,
}

// Количество тейлов у змеи, его размер
let snakeTailCount = 2;

// Прорисовываем мир, задаем цвет и размер
function drawWorld () {
    pen.fillStyle = '#CD9575'; 
    pen.fillRect(0,0, world.width, world.height)
}

// Массив рекорды, в него будет добавлятся баллы заработанные игроком
let records = [];

// Прорисовываем змею, задаем цвета и размер.
function drawSnake () {
    pen.fillStyle = 'darkgreen';
    for (let i = 0; i < snake.length; i++) {
        pen.fillRect(snake[i].x * titleSize, snake[i].y * titleSize, titleSize - 2, titleSize - 2)
        // Условие если координаты тела и головы змеи совпадают...
        if(
            snake[i].x === snakeHead.x && 
            snake[i].y === snakeHead.y 
        ) 
        // то задать размеры змеи 2 тайла, вывести результаты, записать результаты в массив "Рекордс" и вывести максимальное значение из массива и отобразить в html.
        {
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

// Прорисовываем еду, задаем цвета и размер.
function drawFood () {
    pen.fillStyle = 'darkred'
    pen.fillRect(food.x * titleSize, food.y * titleSize, titleSize - 2, titleSize - 2)
}

// Обновление головы, задается скорость.
function updateSnakeHead () {
    snakeHead.x += velocity.x;
    snakeHead.y += velocity.y;
    // Условий если змея выходит за край мира, перемещать его в противоположный край мира.
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


// Обновление тела, массив тела добавляется к голове змеи
function updateSnakeBody () {
    snake.push({
        x: snakeHead.x,
        y: snakeHead.y,        
    })

    while(snake.length > snakeTailCount){
        snake.shift();
    }
}

// Функция поедания еды, если координаты головы равна координатам еды...
function eatFood () {
    if(
        food.x === snakeHead.x &&
        food.y === snakeHead.y
    )
    // то добавить один тайл к змейке, добавить один балл в счет, рандомно переместить еду
    {
        snakeTailCount++
        score++
        food.x = Math.floor(Math.random()*titleCount)
        food.y = Math.floor(Math.random()*titleCount)
    }
}

// Задается свойство клавишам, если нажать на стрелку влево, изменить скорость на один тайл влево.
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


function onKeyDown (event) {
    if (keyDownHandlers.hasOwnProperty(event.key)){
        keyDownHandlers[event.key]()
    }
}

// Вызвать все функций
function updateGame () {
    updateSnakeHead()
    drawWorld()
    drawFood()
    drawSnake()
    eatFood()
    drawFood()
    updateSnakeBody()
}

// Если клавиша нажата, срабатывает функция "onKeyDown"
document.addEventListener('keydown', onKeyDown)
// Обновлять игру раз в 200 мс.
setInterval(updateGame, 200)