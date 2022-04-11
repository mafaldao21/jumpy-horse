class Game {
    constructor() {
        this.monsters = [];
        this.books = [];
        this.time = 0;
        this.lives = 3;
        this.booksCaught = 0;
        this.bookInterval = null;
        this.monsterInterval = null;
        this.board = document.getElementById("board");
    }

    createNewPlayer(){
        const player = new Player();
        const librarian = document.createElement("img");
        librarian.className = "librarian";
        this.board.appendChild(librarian);
    };

    createNewMonster() {
        const monster = new Monster()
        monster.className = "monster";
        document.createElement("img");
        this.board.appendChild(monster);
        this.monsters.push(monster);
    };

    createNewBook() {
        const book = new Book()
        book.className = "book";
        document.createElement("book");
        this.board.appendChild(book);
        this.books.push(book);

    };

    startGame() {
        this.time++;

        this.createNewPlayer();

        
        this.monsterInterval = setInterval( () => {
        
            this.monsters.forEach( (monster) => {
            monster.monsterApproach();
            monster.collisionDetection();
            })
            
        }, 50)


        this.bookInterval = setInterval( () => {

            this.books.forEach( (book) => {
            book.bookApproach();
            this.catchDetection();
            })
            
        }, 50)
    };

    removeMonster(monster){
        this.monsters.shift(monster);
        const elem = document.querySelector("monster");
        elem.board.removeChild(monster);
    };

    collisionDetection(obstacle) {
        if(blabla){
            this.lives --;
            alert("Oh no! You were caught by a dust monster! You have " + this.lives +  " lives left");
            this.removeMonster(monster);
        }

    }

    removeBook(book) {
        this.books.shift(book);
        const elem = document.querySelector("book");
        elem.board.removeChild(book);
    }

    catchDetection(book) {
        if(blabla){
            this.booksCaught++;
            alert("You got one! You now have " + this.booksCaught +  " out of 5 books!");
            this.removeBook(book);
        }

    }

}


//player

class Player {
    constructor() {
        this.positionX = 0;
        this.positionY = Math.floor(Math.random() * 90);
        this.className = "player";
        this.height = 200;
        this.width = 300;
        this.domElement = null;
    }

    movePlayer() {
        window.addEventListener("keydown", (event) => {
            if(event.key=== "ArrowUp") {
                this.positionY++
            } else if (event.key === "ArrowDown") {
                this.positionY--
            }
        })
    }

}     

//monster

class Monster {
    constructor() {
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * 90);
        this.className = "obstacle";
        this.domElement = null;
    }

    monsterApproach() {
        this.positionX--;
    }
}

//book

class Book {
    constructor() {
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * 90);
        this.className = "book";
        this.domElement = null;
    }

    bookApproach() {
        this.positionX--;
    }
}


const game = new Game();
game.startGame();
