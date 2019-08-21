var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = 160
var y = 183;
var dy = 0;
var dx = 0;
var ballsize = 5;
let brickAmmount = parseInt(prompt('Please enter the amount of bricks'))

var gameMenu = true;

var paddleHeight = 5;
var paddleWidth = 50;
var paddleX = canvas.width / 2 - paddleWidth / 2;
var paddleY = canvas.height - 10;
var pdx = 0;

var bricks = [];

function makeBrick(x, y) {
    this.width = 50;
    this.height = 10;
    this.x = x;
    this.y = y;
    this.alive = true;
}

function brickPattern(brickAmmount) {
    var xPos = 35;
    var yPos = 30;
    for (i = 0; i < brickAmmount; i++) {
        bricks[i] = new makeBrick(xPos, yPos);
        if (xPos == 235) {
            xPos = 35;
            yPos += 10;
        }
        else {
            xPos += 50;
        }
    }
}

brickPattern(brickAmmount)

function drawBricks() {

    for (i = 0; i < bricks.length; i++) {
        if (bricks[i].alive) {
            ctx.beginPath();
            ctx.rect(bricks[i].x, bricks[i].y, bricks[i].width, bricks[i].height);
            ctx.stroke();
        }
        if (x + ballsize > bricks[i].x && x < bricks[i].x + bricks[i].width && (y == bricks[i].y + bricks[i].height || y + ballsize == bricks[i].y) && bricks[i].alive) {
            bricks[i].alive = false;
            scorenumb++;
            dy = -dy;
            if (scorenumb == brickAmmount) {
                location.reload();
            }
        }
        if (y < bricks[i].y + bricks[i].height && y + ballsize > bricks[i].y && (x + ballsize == bricks[i].x || x == bricks[i].x + bricks[i].width) && bricks[i].alive) {
            bricks[i].alive = false;
            scorenumb++;
            dx = -dx;
            if (scorenumb == brickAmmount) {
                location.reload();
            }
        }
    }
}



var scorenumb = 0;

document.addEventListener("keydown", function (e) {
    if (gameMenu) {
        switch (e.keyCode) {
            case 37:
                pdx = -2;
                dx = -2;
                break;
            case 39:
                pdx = 2;
                dx = 2;
                break;
            case 32:
                dx = 1;
                dy = 1;
                gameMenu = false;
        }
    }
    else {
        switch (e.keyCode) {
            case 37:
                pdx = -2;
                break;
            case 39:
                pdx = 2;
                break;
        }
    }

});

document.addEventListener("keyup", function (e) {
    if (gameMenu) {
        dx = 0;
    }
    pdx = 0;
});


function nextPos() {
    if (x < 0 || x > canvas.width - ballsize) {
        dx = -dx;
    }
    if (y < 0) {
        dy = -dy;
    }
    if (y > canvas.height - ballsize) {
        location.reload()
        dy = -dy;
    }
    if (y + ballsize == paddleY && x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;

    }
    x += dx;
    y += dy
    paddleX += pdx;
}

function score() {
    ctx.font = "15px Arial";
    ctx.fillText("Score: " + scorenumb, 10, 20);
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
    ctx.stroke();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballsize, 0, 2 * Math.PI);
    ctx.stroke();
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaddle();
    drawBricks();
    drawBall();
    score();
    nextPos()
}
setInterval(loop, 8);