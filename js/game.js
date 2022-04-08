class Game {
    constructor(create, draw) {
        this.time = 0;
        this.IntervalId = null;
        this.player = null;
        this.obstacles = [];
        this.books = [];
        this.create = create;
        this.draw = draw;
        this.lives = 3;
    }

    // create and draw player:
    start() {
        this.player = new Player();
        this.player.domElement = this.create("player");
        this.draw(this.player);

        this.runGame()

    }

    //start running game:
    runGame() {
        this.intervalId = setInterval(  () => {
            //move obstacles
            this.obstacles.forEach( (obstacle) => {

               

            },)

            //create and draw obstacles
           
            //move books
            this.books.forEach( (book) => {
               

            })

            //create and draw books
           
            this.time++

        }, Math.floor(Math.random()*5));
    }

    detectCollision(obstacle){
        

    };

    detectObstacleOutside(obstacle) {

    };


    detectCatch(book){

    };

    detectBookLost(book) {

    };

    makePlayerMove(direction){
        if(direction==="up"){
            this.player.moveUp();
        } if(direction=="down"){
            this.player.moveDown();
        }

    }
}


class Player {
    constructor() {
        this.positionX = 0;
        this.positionY = 50;
        this.domElement = null;
    }

    moveUp() {
        this.positionY++ ;
    }

    moveDown() {
        this.positionY-- ;
    }
}


class Obstacle {
    constructor(){
        this.positionX = 100;
        this.positionY = 0;
        this.domElement= null;
    }

    obstacleApproach() {

    }

}

class Book {
    constructor(){
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * 90);
        this.domElement = null;
    }
}