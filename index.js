const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const inst = document.getElementById('inst');
const context = canvas.getContext('2d');
const color  = ['blue', 'red', 'yellow', 'white','pink','green', 'purple']
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
let previous_player_score;

if (document.cookie != "") {
    // let equals_i = document.cookie.indexOf("=");
    // previous_player_score = parseInt(document.cookie.substring(equals_i + 1));
    // console.log(document.cookie)
    
    let values = document.cookie.split(';');
    for(let i = 0; i <values.length; i++) {
        let c = values[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
    let [name, score_] = c.split("=");
    alert(`user ${name}'s high score is: ${score_}`)
    //   if (c.indexOf(score) == 0) {
    //     score = c.substring(name.length, c.length);
    //   }
    }
    if (score != 0) score = 0;
} window.onload = function(){
}
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
            ctx.fillStyle = color[Math.floor(Math.random()*7)]
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
    virus.globalAlpha = opacity
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
const image1 = new Image();
const virus = new Image();
virus.src = "virus.png"
image1.src = 'game.png'
function newcontent(){
    ctx.drawImage(virus, BlockX*Box_count, BlockY*Box_count, Box_size, Box_size)
    
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
    ctx.drawImage(image1, appleX*Box_count, appleY*Box_count, Box_size, Box_size);
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
        sound1.play()
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
    if(head_x < 0){
        gameOver = true;
    } else if(head_x >= Box_count){
        gameOver = true;
    } else if(head_y<0){
        gameOver= true;
    } else if(head_y >=Box_count){
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
        sound2.play()
        ctx.fillStyle = 'white';
        ctx.font ='50px Verdana';
        ctx.fillText("Game Over!!", canvas.width / 6.5, canvas.height/2);
        sound1.play();
        document.cookie = "";
        if (score > 0)
            document.cookie = "user=" + score;
    }
    return gameOver;
}
const sound1 = new Audio('ore.mp3')
const sound2 = new Audio("audio1.mp3");


drawGame();
console.log(xVelocity)

function checkCookie() {
    let user = getCookie("username");
    if (user != "") {
      alert("Welcome again " + user);
    } else {
       user = prompt("Please enter your name:","");
       if (user != "" && user != null) {
         cookieEntry(user)
       }
    }
  }
function cookieEntry(user){

}