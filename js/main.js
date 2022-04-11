class Game {
    constructor() {
        this.monsters = [];
        this.books = [];
        this.time = 0;
        this.lives = 3;
        this.booksCaught = 0;
        this.player = new Player();
        this.bookInterval = null;
        this.monsterInterval = null;
    }

    createNewPlayer(){;
        const board = document.getElementById("board");
        this.player.className = "player";
        document.createElement("player");
        board.appendChild(librarian);
    };

    startGame() {
        this.time++;

        this.createNewPlayer();

        
        this.monsterInterval = setInterval( () => {
            const newMonster = new Monster();
            newMonster.className = "monster";
            document.createElement("monster");
            board.appendChild(monster);
            this.monsters.push(newMonster);

            this.monsters.forEach( (monster) => {
            monster.monsterApproach();
            monster.collisionDetection();
            })
            
        }, 50);


        this.bookInterval = setInterval( () => {
            const newMonster = new Monster();
            newMonster.className = "monster";
            document.createElement("monster");
            board.appendChild(monster);
            this.monsters.push(newMonster);

            this.monsters.forEach( (monster) => {
            monster.monsterApproach();
            monster.collisionDetection();
            })
            
        }, 50);
    }

    removeMonster(monster){
        this.monsters.shift(monster);
        const elem = document.querySelector("monster");
        elem.board.removeChild(monster);
    }

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
        document.addEventListener("keydown", (event) => {
            if(event.key === "ArrowUp"){
                this.positionY++;
            } if(event.key === "ArrowDown"){
                this.positionY--;
            }

    }
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
