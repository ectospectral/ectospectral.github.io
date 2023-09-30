let bx, by, bWidth, bHeight;
let ballSpeedX, ballSpeedY, ballVelocityX, ballVelocityY;
let player1, player2;
let score1, score2, scoreCount;

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
    
    score1 = 0;
    score2 = 0;
    scoreCount = 0;

    player1 = new Paddle(width*.2, height / 2, 87, 83); 
    player2 = new Paddle(width*.8, height / 2, 73, 75); // ChatGPT taught me about keycodes lol
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

    fill(color(255, 20 , 147));
    textSize(50);
    text(score1, width*.2, height*.2  );
    fill(color(255, 20 , 147));
    textSize(50);
    text(score2, width*.8, height*.2  );


    bx += ballVelocityX;
    by += ballVelocityY;


    if (bx< player1.localLx + player1.widthP / 2 && by > player1.localLy - player1.heightP / 2 && by < player1.localLy + player1.heightP / 2) {
        if (bx<= player1.localLx + player1.widthP / 2 && bx>= player1.localLx) {
            ballVelocityX *= -1;
            scoreCount = 1;
        }
    }

    if (bx> player2.localLx - player2.widthP / 2 && by > player2.localLy - player2.heightP / 2 && by < player2.localLy + player2.heightP / 2) {
        if (bx>= player2.localLx - player2.widthP / 2 && bx<= player2.localLx) {
            ballVelocityX *= -1;
            scoreCount = 2;
        }
    }

    if (by > height || bx > width || bx <= 0 || by <= 0) {

        //back to the middle
        bx = width / 2;
        by = height / 2;

        //different vector every time
        ballVelocityX = random(-ballSpeedX,ballSpeedX);
        ballVelocityY = random(-ballSpeedY,ballSpeedY);

        if (scoreCount == 1) {
            score1++;
            scoreCount = 0;
        }
        if (scoreCount == 2) {
            score2++;
            scoreCount = 0;
        } else {
            return;
        }
    }

    console.log(score1);
    console.log(score2);
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