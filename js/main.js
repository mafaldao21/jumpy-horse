class Game {
    constructor() {
        this.monsters = [];
        this.books = [];
        this.time = 0;
        this.lives = 3;
        this.booksCaught = 0;
        this.newInterval = null;
        this.board = document.getElementById("board");
        this.librarian = null;
        this.monster = null;
        this.book = null;
        this.bookCounter = document.getElementById("books")
    }

    createNewPlayer(){
        this.librarian = new Player();
        this.librarian.domLibrarian = document.createElement("img");
        this.librarian.domLibrarian.className = "player";
        this.librarian.domLibrarian.src = "../img/librarianicon.png";
        this.librarian.domLibrarian.style.height = this.librarian.height + "px";
        this.librarian.domLibrarian.style.width = this.librarian.width + "px";
        this.board.appendChild(this.librarian.domLibrarian);
        this.librarian.domLibrarian.style.left = this.librarian.positionX + "vw"
        this.librarian.domLibrarian.style.bottom = this.librarian.positionY + "vh"
    };

    createNewMonster() {
        this.monster = new Monster()
        this.monster.domMonster = document.createElement("img");
        this.monster.domMonster.className = "obstacle";
        this.monster.domMonster.src = "../img/447-4472384_monster-royalty-free-inc-cartoon-monster.png";
        this.monster.domMonster.style.height = this.monster.height + "px";
        this.monster.domMonster.style.width = this.monster.width + "px";
        this.board.appendChild(this.monster.domMonster);
        this.monsters.push(this.monster);
        //document.getElementsByClassName("obstacle")[0].style.top = this.monster.positionY + "%"
        //this.monster.domMonster.style.top = this.monster.positionY + "%"
        this.monster.domMonster.style.left =  this.monster.positionX + "vw"
        this.monster.domMonster.style.bottom =  this.monster.positionY + "vh"
    };

    createNewBook() {
        this.book = new Book()
        this.book.domBook = document.createElement("img");
        this.book.domBook.className = "book";
        
        this.book.domBook.src = "../img/book.png";
        this.book.domBook.style.height = this.book.height + "px";
        this.book.domBook.style.width = this.book.width + "px";
        this.board.appendChild(this.book.domBook);
        this.books.push(this.book);
        //document.getElementsByClassName("book")[0].style.top = this.book.positionX + "%";
        this.book.domBook.style.left =  this.book.positionX + "vw"
        this.book.domBook.style.bottom =  this.book.positionY + "vh"

    };

    movePlayer() {
        window.addEventListener("keydown", (event) => {
            if(event.key=== "ArrowUp") {
                this.librarian.positionY++;
                //document.getElementsByClassName("player")[0].style.bottom = this.positionY + "%";
                
            } else if (event.key === "ArrowDown") {
                this.librarian.positionY--
                //document.getElementsByClassName("player")[0].style.bottom = this.positionY + "%";
            }
            this.librarian.domLibrarian.style.left = this.librarian.positionX + "vw"
            this.librarian.domLibrarian.style.bottom = this.librarian.positionY + "vh"
            
        });
                
    }

    startMusic(str) {
        const music = new Audio('../music/Lobo Loco - Dancing Sparrows B (ID 610) - Remastered.mp3');
        if(str==="start"){
            music.play();
        } else if(str==="pause" && music.pause===false) {
            music.pause(); 
        }
        
    }
    

    runGame(){ 
        this.createNewPlayer();
        this.movePlayer();

        this.newInterval = setInterval( () => {
            
                if(this.time%60===0){
                    this.createNewBook()
                    this.createNewMonster()
                    
                }
               

                this.monsters.forEach( (monster) => {
                    //move, draw again, detectcollision
                    monster.positionX--;
                    monster.domMonster.style.left =  monster.positionX + "vw"
                    monster.domMonster.style.bottom =  monster.positionY + "vh"
                    this.collisionDetection(this.monster);
                    
                })
                
                
                 this.books.forEach( (book) => {
                    book.positionX--;
                    book.domBook.style.left =  book.positionX + "vw"
                    book.domBook.style.bottom =  book.positionY + "vh"
                    this.catchOutside(book);
                    this.catchDetection(book);
                })
                    
                   
                


            this.time++     
                 

        }, 50);
     
    
    };
  

   

    collisionDetection(monster) {
        if(this.librarian.positionX < monster.positionX + monster.width &&
            this.librarian.positionX + this.librarian.width > monster.positionX &&
            this.librarian.positionY < monster.positionY + monster.height &&
            this.librarian.height + this.librarian.positionY > monster.positionY && this.lives >1){
            this.lives--;
            alert("Oh no! You were caught by a Dusty! You have " + this.lives +  " lives left");
            this.removeMonster(monster);
        } else if (this.librarian.positionX < monster.positionX + monster.width &&
            this.librarian.positionX + this.librarian.width > monster.positionX &&
            this.librarian.positionY < monster.positionY + monster.height &&
            this.librarian.height + this.librarian.positionY > monster.positionY && this.lives===1){
            this.lives --;
            this.removeMonster(monster);
            alert("Oh no! You were defeated by the Dusties!");
            window.open(blabla) //link to game over page

        }
    }
    
    removeBook(book) {
        this.books.shift(book);
        this.board.removeChild(document.querySelector(".book"));
    }

    removeMonster(){
        this.monsters.shift(this.monster);
        this.board.removeChild(document.querySelector(".obstacle"));
    };

    catchOutside() {
        if(this.book.positionX < 0) {
            this.removeBook()
        }

        if(this.monster.positionX < 0) {
            this.removeMonster()
        }
    }

    

    catchDetection(book) {
        if(this.librarian.positionX < book.positionX + book.width &&
            this.librarian.positionX + this.librarian.width > book.positionX &&
            this.librarian.positionY < book.positionY + book.height &&
            this.librarian.height + this.librarian.positionY > book.positionY && this.booksCaught<4) {
            this.booksCaught++;
            
            alert("You got one! You now have " + this.booksCaught +  " out of 5 books!");
            this.books.innerHTML() = "${this.booksCaught}";
            this.removeBook(book);
        } else if(this.librarian.positionX < book.positionX + book.width &&
            this.librarian.positionX + this.librarian.width > book.positionX &&
            this.librarian.positionY < book.positionY + book.height &&
            this.librarian.height + this.librarian.positionY > book.positionY && this.booksCaught===4) {
            this.booksCaught++;
            alert("You got all five books!");
            this.removeBook(book);
            //window.open(blabla) //open you did it

        }

    } 

    
}



//player

class Player {
    constructor() {
        this.positionX = 0;
        this.positionY = 35;
        this.domLibrarian = null;
        this.height = 200;
        this.width = 200;

    }

    movePlayer() {
        window.addEventListener("keydown", (event) => {
            if(event.key=== "ArrowUp") {
                this.positionY++;
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
        this.positionY = Math.floor(Math.random() * 80);
        this.domMonster = null;
        this.width = 150;
        this.height = 150
    }

};

//book

class Book {
    constructor() {
        this.positionX = 100;
        this.positionY = Math.floor(Math.random() * 90);
        this.domBook = null;
        this.width = 150;
        this.height = 150;
    }
}


const game = new Game();
game.runGame();
