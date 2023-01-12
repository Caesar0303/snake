let snake2 = document.getElementById('snake2')
let a = 800;
function drawsnake () { 
    a = a + 20; 
    snake2.style.left = a + 'px';
}
setInterval(drawsnake, 500);
