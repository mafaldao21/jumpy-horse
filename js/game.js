class Game {
    constructor(create, draw) {
        this.time = 0;
        this.IntervalId = null;
        this.player = null;
        this.obstacles = [];
        this.create = create;
        this.draw = draw;
        this.lives = 3;
    }

    // create and draw player:
    start() {

    }

    //start running game:
    runGame() {
        this.intervalId = setInterval(  () => {
            //move obstacles
            this.obstacles.forEach( (obstacle) => {


            })

            //create and draw obstacles
            if(){
            }

            this.time++

        }, 30);
    }

    detectCollision(obstacle){

    };

    detectObstacleOutside(obstacle) {

    };

    makeHorseJump(){

    }
}


class Player {
    constructor() {
        this.positionX = 20;
        this.positionY = 0;
        this.domElement = null;
    }

    horseJump() {

    }
}


class Obstacle {
    constructor(){
        this.positionX = 100;
        this.positionY = 0;
        this.domElement= null;
    }

}