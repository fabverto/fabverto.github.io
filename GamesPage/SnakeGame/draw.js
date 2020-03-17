const canvas = document.querySelector(".Canvas");
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;
var snake;
var fruit;
let speed = 200;

(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();

    interval();
}());

window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    speed = 20;
    clearInterval(t);
    interval1();
    console.log(speed);
    snake.changeDirection(direction);
}));

window.addEventListener('keyup', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    speed = 200;
    clearInterval(t);
    interval();
    console.log(speed);
}));

function interval() {
   t = window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }

        snake.checkCollision();
        document.querySelector('.score')
            .innerText = "Fruit Eaten: " + snake.total;

    }, speed);
}

function interval1() {
        window.setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        fruit.draw();
        snake.update();
        snake.draw();

        if (snake.eat(fruit)) {
            fruit.pickLocation();
        }

        snake.checkCollision();
        document.querySelector('.score')
            .innerText = "Fruit Eaten: " + snake.total;

    }, speed);
}