const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const inst = document.getElementById('inst');
const context = canvas.getContext('2d');
let speed = 7;
let Box_count = 20;
let Box_size = canvas.width / Box_count - 2;
let head_x = 9;
let head_y = 9;
let score = 0;
let appleX = 5;
let appleY = 5;
let xVelocity = 0;
let yVelocity = 0;
let BlockX
let BlockY
let tremblex = 0
let trembley = 0
var speedIncrement = false;
let opacity = 1.0;
let alphaFinal = 0.0;
let alphaWeight = 1;
const sound1 = new Audio("audio1.mp3")
class Snake {
    constructor({positionX, positionY}){
        this.position = {
            x: positionX,
            y: positionY
        }
    }
    draw(){
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.position.x* Box_count + tremblex, this.position.y* Box_count + trembley, Box_size + tremblex, Box_size +trembley);
        ctx.fillStyle = 'green';
        for(let i=0;i<snakeParts.length; i++){
            let part = snakeParts[i];
            ctx.fillRect(part.x*Box_count, part.y*Box_count, Box_size, Box_size);
            
        }
        snakeParts.push(new SnakePart(head_x, head_y));
        while(snakeParts.length > taillength){
            snakeParts.shift();
        }
    }
}
const snake = new Snake(head_x, head_y)
function drawGame(){
    changeSnakePosition();
    
    clearScreen();
    let result = isGameOver();
    if(result){
        return;
    }
  
    checkAppleCollision();
    ctx.globalAlpha = opacity
    drawApple();
    snake.draw()
    drawScore();
    newcontent()
    opacity += alphaFinal
    if (opacity >= 1.0) {
        opacity = 1.0;
        alphaFinal = -alphaWeight;
    }
    if (opacity <= 0.0) {
        opacity = 0.0;
        alphaFinal = alphaWeight;
    }
    console.log(opacity)
    setTimeout(drawGame, 1000/speed);
}

function newcontent(){
    ctx.fillStyle = 'white'
    ctx.fillRect(BlockX*Box_count, BlockY*Box_count, Box_size, Box_size)
    
}
function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0, canvas.width, canvas.height);

}
function changeSnakePosition(){
    head_x = head_x + xVelocity;
    head_y = head_y + yVelocity;
}
function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = "10px Verdana";
    ctx.fillText('score ' + score, canvas.width-50, 10);
}
function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX*Box_count, appleY*Box_count, Box_size, Box_size);

}


document.body.addEventListener('keydown',
    function(event){
        if(event.key == "ArrowUp"){
            if(yVelocity==1) return;
            yVelocity = -1;
            xVelocity = 0;
        } 
        if(event.key == "ArrowDown"){
            if(yVelocity==-1) return;
            yVelocity = 1;
            xVelocity = 0;
        } 
        if(event.key == "ArrowLeft"){
            if(xVelocity==1) return;
            yVelocity = 0;
            xVelocity = -1;
        } 
        if(event.key == "ArrowRight"){
            if(xVelocity==-1) return;
            yVelocity = 0;
            xVelocity = 1;
        } 
    }
    
)
function checkAppleCollision(){
    if(appleX == head_x && appleY == head_y){
        appleX = Math.floor(Math.random()*Box_count)
        appleY = Math.floor(Math.random()*Box_count)
        BlockX = Math.floor(Math.random()*Box_count)
        BlockY = Math.floor(Math.random()*Box_count)
        taillength ++;
        score ++;
        
        
    }
}

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}
const snakeParts = [];
let taillength = 2;
function isGameOver(){
    if(yVelocity === 0 && xVelocity === 0) return false;
    let gameOver = false; 
    if(head_x < -1){
        gameOver = true;
    } else if(head_x >= Box_count+1){
        gameOver = true;
    } else if(head_y<-1){
        gameOver= true;
    } else if(head_y >=Box_count+1){
        gameOver = true;    
    } else if(head_x == BlockX&&head_y==BlockY) gameOver = true
    console.log(head_x,head_y)
    for(let i=0; i <snakeParts.length;i++){
        let part = snakeParts[i];
        if(part.x === head_x && part.y === head_y){
            gameOver = true;
            break;
        }
    }

    if(gameOver){
        ctx.fillStyle = 'white';
        ctx.font ='50px Verdana';
        ctx.fillText("Game Over!!", canvas.width / 6.5, canvas.height/2);
        sound1.play();
    }
    return gameOver;
}

// const sound2 = new Audio("");


drawGame();
console.log(xVelocity)


