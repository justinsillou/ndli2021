document.addEventListener('DOMContentLoaded',() => {
    boat = document.querySelector(".boat");
    grid = document.querySelector('.grid');
    document.addEventListener('keydown', control)
    generateObstacles()

});
var grid
var boat;
var isJumping = false
var gravity = 0.8;
var jumpHeight = 5;
var jumpTime = 15; 
var fall = 5
var count;
var isGameOver

// timming
var timerId
var downTimerId

function control(e) {
    
    if (e.keyCode == 13 && isGameOver==true ) {
        location.reload();
    }
    if (e.keyCode == 32 && isGameOver==true ) {
        location.reload();
    }
    if (e.keyCode === 32) {
      if (!isJumping) {
        isJumping = true
        jump()
      }
    }
}

var position = 10;
var count = 0;
var timerId;

function jump() {
    count = 0
    timerId = setInterval(function () {
        //move down
        moveDown();
        moveUp()
    },20)
}

function moveDown() {
    if (count === 15) {
        clearInterval(timerId)
        let downTimerId = setInterval(function () {
            if (count === 0) {
            clearInterval(downTimerId)
            isJumping = false
            }
            position -= 3
            count -= 2
            position = position * gravity
            boat.style.bottom = position + 'px'
        },20); 
    } 
}

function moveUp() {
    position += 30
    count += 1
    position = position * gravity
    boat.style.bottom = position + 'px'
}


// Génération d'obstacle

function generateObstacles() {
    let randomTime = Math.random() * 4000
    let obstaclePosition = 1000
    const obstacle = document.createElement('div')
    if (!isGameOver) obstacle.classList.add('obstacle')
    grid.appendChild(obstacle)
    obstacle.style.left = obstaclePosition + 'px'
  
    let timerId = setInterval(function() {
      if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
        clearInterval(timerId)
        alert.innerHTML = 'Game Over'
        isGameOver = true
        let go = document.querySelector("#go");
        go.style.visibility ="visible";
        //remove all children
        var elements = document.getElementsByClassName("obstacle");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }   
      }
      obstaclePosition -=10
      obstacle.style.left = obstaclePosition + 'px'
    },20)
    if (!isGameOver) setTimeout(generateObstacles, randomTime)
  }