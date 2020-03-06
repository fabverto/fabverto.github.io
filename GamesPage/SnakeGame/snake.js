function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 2;
    this.ySpeed = 0;
    this.total =0;
    this.tail = [];

    this.drawSnake = function(){
        context.fillStyle = "#53fa7e";

        for(let i =0; i<this.tail.length;i++){
            context.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        context.fillRect(this.x, this.y, scale, scale);
    }
    
    this.update = function () {
        for(let i=0; i<this.tail.length-1;i++){
            this.tail[i] = this.tail[i+1];
        }

        this.tail[this.total-1] = {x: this.x, y: this.y };

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if(this.x > canvas.width){
            this.x = 0;
        }
        if(this.y > canvas.height){
            this.y = 0;
        }
        if(this.x < 0){
            this.x = canvas.width;
        }
        if(this.y < 0){
            this.y = canvas.height;
        }

    }

    this.eat = function (fruit) {
        if(this.x === fruit.x && this.y === fruit.y) {
            return true;
            this.total = this.total + 1;
            console.log(this.total);
        }
            return false;
        }

    this.changeDirection = function (direction) {
        if(direction == "Up"){
            this.xSpeed = 0;
            this.ySpeed = -scale * 1;
        }
        if(direction == "Down"){
            this.xSpeed = 0;
            this.ySpeed = scale * 1;
        }
        if(direction == "Left"){
            this.xSpeed = -scale * 1;
            this.ySpeed = 0;
        }
        if(direction == "Right"){
            this.xSpeed = scale * 1;
            this.ySpeed = 0;
        }

    }
}

