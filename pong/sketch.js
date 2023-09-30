let bx, by, bWidth, bHeight;
let ballSpeedX, ballSpeedY, ballVelocityX, ballVelocityY;
let player1, player2;

function setup() {
    createCanvas(1000, 1000);
    background(0);
    rectMode(CENTER);
    bx = width / 2;
    by = height / 2;
    bHeight = 20;
    bWidth = 20;
    ballSpeedX = 5;
    ballSpeedY = 5;
    ballVelocityX = random(-ballSpeedX,ballSpeedX);
    ballVelocityY = random(-ballSpeedY,ballSpeedY);

    player1 = new Paddle(width * 0.2, height / 2, 87, 83); 
    player2 = new Paddle(width * 0.8, height / 2, 73, 75); // ChatGPT taught me about keycodes lol
}

function draw() {
    background(0);
    fill(color(255, 20, 147));
    noStroke();
    ellipse(bx, by, bWidth, bHeight);

    fill(color(255, 20, 147));
    player1.display();
    player1.keyControl();

    fill(color(255, 20, 147));
    player2.display();
    player2.keyControl();

    bx += ballVelocityX;
    by += ballVelocityY;


    if (bx< player1.localLx + player1.widthP / 2 && by > player1.localLy - player1.heightP / 2 && by < player1.localLy + player1.heightP / 2) {
        if (bx<= player1.localLx + player1.widthP / 2 && bx>= player1.localLx) {
            ballVelocityX *= -1;
        }
    }

    if (bx> player2.localLx - player2.widthP / 2 && by > player2.localLy - player2.heightP / 2 && by < player2.localLy + player2.heightP / 2) {
        if (bx>= player2.localLx - player2.widthP / 2 && bx<= player2.localLx) {
            ballVelocityX *= -1;
        }
    }

    if (bx < 0 || bx > width) {

        //back to the middle
        bx = width / 2;
        by = height / 2;

        //different vector every time
        ballVelocityX = random(-ballSpeedX,ballSpeedX);
        ballVelocityY = random(-ballSpeedY,ballSpeedY);
    }
}

class Paddle {
    constructor(lx, ly, upKey, downKey) {
        this.widthP = 20;
        this.heightP = 100;
        this.speedP = 10;
        this.localLx = lx;
        this.localLy = ly;
        this.localUpKey = upKey;
        this.localDownKey = downKey;
    }

    display() {
        rect(this.localLx, this.localLy, this.widthP, this.heightP);
    }

    // I was trying this with a switch statment and it didn't work. ChatGPT introduced me to keyIsDown(), but I wrote this method myself
    keyControl() {
        if (keyIsDown(this.localUpKey)) {
            this.localLy -= this.speedP;
        }
        if (keyIsDown(this.localDownKey)) {
            this.localLy += this.speedP;
        }
    }
}