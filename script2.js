
function drawsnake () {
    let world = document.getElementById('world2');
    let snake = document.createElement('div') ;
    world.appendChild(snake);
    snake.classList.add('snake2')
}

drawsnake();