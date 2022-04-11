class Game {
    constructor(create, draw) {
        this.time = 0;
        this.IntervalId = null;
        this.player = null;
        this.obstacles = [];
        this.books = [];
        this.create = create;
        this.draw = draw;
        this.booksCaught = 0;
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
            //spawn and move obstacles and books
            this.obstacles.forEach( (obstacle) => {
                obstacle.obstacleApproach();
                this.draw(obstacle);
                this.detectCollision(obstacle);
                this.detectIfOutside(obstacle);
            });

            this.books.forEach( (book) => {
                book.bookApproach();
                this.draw(book);
                this.detectCatch(book);
                this.detectIfOutside(book);
            });

           if (this.time%60===0) {
                const newMonster = new Obstacle();
                newMonster.domElement = this.create("obstacle");
                this.obstacles.push(newMonster);
            }

            if (this.time%60 === 0) {
                const newBook = new Book();
                newBook.domElement = this.create("book");
                this.books.push(newBook);
            }
           
            this.time++

        }, 50);
    }

    detectCollision(obstacle){
        if (this.player.positionX < this.obstacle.positionX + this.obstacle.width &&
            this.player.positionX + this.player.width > this.obstacle.positionX &&
            this.player.positionY < this.obstacle.positionY + this.obstacle.height &&
            this.player.height + this.player.positionY > this.obstacle.positionY) {
                this.lives --
                alert("Oh no! You were caught by a dust monster! You have " + this.lives +  " left");
                this.removeObstacle(obstacle);
            } else if (this.player.positionX < this.obstacle.positionX + this.obstacle.width &&
                this.player.positionX + this.player.width > this.obstacle.positionX &&
                this.player.positionY < this.obstacle.positionY + this.obstacle.height &&
                this.player.height + this.player.positionY > this.obstacle.positionY && this.lives<1) {
                    alert("Oh no! You died! Better luck next time :(");
                    this.removeObstacle(obstacle);
                    clearInterval(this.intervalId);
                    this.lives=3;
                    this.booksCaught=0;
                }
        

    };

    detectIfOutside(obstacle, book) {
        if (this.positionX > 100 == this.positionX < 0) {
            this.removeObstacle(obstacle);
            this.removeBook(book);
        }

    };


    detectCatch(book){
        if (player.positionX < book.positionX + book.width &&
            player.positionX + player.width > book.positionX &&
            player.positionY < book.positionY + book.height &&
            player.height + player.positionY > book.positionY) {
                this.booksCaught ++;
                alert("You got one! You now have " + this.booksCaught +  " out of 5 books!");
                this.removeBook(book);
            }
        

    };

    makePlayerMove(direction){
        if(direction==="up"){
            this.player.moveUp();
        } if(direction=="down"){
            this.player.moveDown();
        }
        this.draw(this.player);
    }

    removeObstacle(obstacle) {
        this.obstacles.shift(obstacle);
        obstacle.domElement.remove();
    }

    removeBook(book) {
        this.books.shift(book);
        book.domElement.remove();
    }
}


class Player {
    constructor() {
        this.height=30;
        this.width =35;
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
        this.height=18;
        this.width =20;
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * 90);
        this.domElement= null;
    }

    obstacleApproach() {
        this.positionX-- ;

    }

}

class Book {
    constructor(){
        this.height=20;
        this.width =20;
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * 90);
        this.domElement = null;
    }

    bookApproach() {
        this.positionX-- ;

    }
}