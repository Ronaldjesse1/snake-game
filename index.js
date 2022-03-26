const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const inst = document.getElementById('inst');
const context = canvas.getContext('2d');

window.onload = function(){
    context.fillStyle = 'blue';
    context.font ="50px Verdana";
    context.fillText('Use the arrow keys to change the direction of the snake');
}
let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;

let score = 0;
let appleX = 5;
let appleY = 5;
let xVelocity = 0;
let yVelocity = 0;
var speedIncrement = false;
function drawGame(){
    changeSnakePosition();
    let result = isGameOver();
    if(result){
        return;
    }
    clearScreen();
    
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/speed);
}

function clearScreen(){
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);

}
function changeSnakePosition(){
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}
function drawScore(){
    ctx.fillStyle = 'white';
    ctx.font = "10px Verdana";
    ctx.fillText('score ' + score, canvas.width-50, 10);
}
function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize);

}
function drawSnake(){
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize );
    ctx.fillStyle = 'green';
    for(let i=0;i<snakeParts.length; i++){
        let part = snakeParts[i];
        ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize);

    }
    snakeParts.push(new SnakePart(headX, headY));
    while(snakeParts.length > taillength){
        snakeParts.shift();
    }
}
document.body.addEventListener('keydown', keyDown);
function keyDown(event){
    if(event.keyCode == 38){
        if(yVelocity==1) return;
        yVelocity = -1;
        xVelocity = 0;
    } 
    if(event.keyCode == 40){
        if(yVelocity==-1) return;
        yVelocity = 1;
        xVelocity = 0;
    } 
    if(event.keyCode == 37){
        if(xVelocity==1) return;
        yVelocity = 0;
        xVelocity = -1;
    } 
    if(event.keyCode == 39){
        if(xVelocity==-1) return;
        yVelocity = 0;
        xVelocity = 1;
    } 
    
}
function checkAppleCollision(){
    if(appleX == headX && appleY == headY){
        appleX = Math.floor(Math.random()*tileCount);
        appleY = Math.floor(Math.random()*tileCount);
        taillength ++;
        score ++;
        
        speedIncrement = !speedIncrement;

        if(speedIncrement)speed ++;
    }
}

class SnakePart{
    constructor(x, y){
        this.x = x;
        this.y=y;
    }
}
const snakeParts = [];
let taillength = 2;
function isGameOver(){
    if(yVelocity ===0 && xVelocity === 0) return false;
    let gameOver = false; 
    if(headX < 0){
        gameOver = true;
    } else if(headX >= tileCount){
        gameOver = true;
    } else if(headY<0){
        gameOver= true;
    } else if(headY >=tileCount){
        gameOver = true;    
    } 

    for(let i=0; i <snakeParts.length;i++){
        let part = snakeParts[i];
        if(part.x === headX && part.y === headY){
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
const sound1 = new Audio("audio1.mp3")
// const sound2 = new Audio("");
drawGame();