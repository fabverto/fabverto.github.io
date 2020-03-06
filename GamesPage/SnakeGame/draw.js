const canvas = document.querySelector(".Canvas");
const context = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height/scale;
const columns = canvas.width/scale;

let snake;
let fruit;

(function setup() {
    snake = new Snake();
    fruit = new Fruit();

    fruit.pickLocation();


    window.setInterval(() => {
        context.clearRect(0,0,canvas.width, canvas.height);
        fruit.drawFruit();
        snake.update();
        snake.drawSnake();

        if(snake.eat(fruit)){
            fruit.pickLocation();

        }
    }, 250);
}());


window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
        snake.changeDirection(direction);

}))