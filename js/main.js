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
        //this.monster = null;
        //this.book = null;
        this.music = new Audio('../music/Lobo Loco - Dancing Sparrows B (ID 610) - Remastered.mp3');
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
        const monster = new Monster()
        monster.domMonster = document.createElement("img");
        monster.domMonster.className = "obstacle";
        monster.domMonster.src = "../img/447-4472384_monster-royalty-free-inc-cartoon-monster.png";
        monster.domMonster.style.height = monster.height + "px";
        monster.domMonster.style.width = monster.width + "px";
        this.board.appendChild(monster.domMonster);
        this.monsters.push(monster);
        //document.getElementsByClassName("obstacle")[0].style.top = this.monster.positionY + "%"
        //this.monster.domMonster.style.top = this.monster.positionY + "%"
        monster.domMonster.style.left =  monster.positionX + "vw"
        monster.domMonster.style.bottom =  monster.positionY + "vh"
    };

    createNewBook() {
        const book = new Book()
        
        book.domBook = document.createElement("img");
        book.domBook.className = "book";
        
        book.domBook.src = "../img/book.png";
        book.domBook.style.height = book.height + "px";
        book.domBook.style.width = book.width + "px";
        this.board.appendChild(book.domBook);
        //document.getElementsByClassName("book")[0].style.top = this.book.positionX + "%";
        book.domBook.style.left =  book.positionX + "vw"
        book.domBook.style.bottom =  book.positionY + "vh"
        this.books.push(book);
        

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

    startMusic() {
        const music = new Audio('../music/Lobo Loco - Dancing Sparrows B (ID 610) - Remastered.mp3');
        music.play();   
    } 

    togglePlay() {
        let isPlaying = false;
        
        isPlaying ? this.music.pause() : this.music.play();

        if(onplaying(this.music)) {
            isPlaying = true;
          };

        if(onpause(this.music)) {
            isPlaying = false;
        };
      };
       
      
    

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
                    this.collisionDetection(monster);
                    
                })
                
                
                 this.books.forEach( (book) => {
                    book.positionX--;
                    book.domBook.style.left =  book.positionX + "vw"
                    book.domBook.style.bottom =  book.positionY + "vh"
                    //this.catchOutside(book);
                    this.catchDetection(book);
                })

            this.time++     
                 

        }, 50);
     
    
    };
  

   

    collisionDetection(monster) {
        if(this.librarian.positionX < monster.positionX + monster.width &&
            this.librarian.positionX + this.librarian.width > monster.positionX &&
            this.librarian.positionY < monster.positionY + monster.height &&
            this.librarian.height + this.librarian.positionY > monster.positionY){
            if (this.lives > 1) {
                this.lives--
                this.removeMonster(monster);
                console.log("monster")
                //alert("Oh no! You were caught by a Dusty! You have " + this.lives +  " lives left");
            }
            else {
                this.lives --;
                this.removeMonster(monster);
                //alert("Oh no! You were defeated by the Dusties!");
                //window.open("../gameover.html") 
            }
        

        }
    }
    
    removeBook(book) {
        this.books.shift(book);
        this.board.removeChild(document.querySelector(".book"));
    }

    removeMonster(monster){
        this.monsters.shift(monster);
        this.board.removeChild(document.querySelector(".obstacle"));
    };

    catchOutside() {
        let monster1 = document.querySelector('.obstacle');
        let bounding = monster1.getBoundingClientRect();
        
        if(bounding.left<0) {
            this.removeMonster(monster1)
        } 

        let book = document.querySelector('.book');
        let secondBounding = book.getBoundingClientRect();
        
        if(secondBounding.left<0) {
            this.removeBook(book)
        }
    }

    

    catchDetection(book) {
        if(this.librarian.positionX < book.positionX + book.width &&
            this.librarian.positionX + this.librarian.width > book.positionX &&
            this.librarian.positionY < book.positionY + book.height &&
            this.librarian.height + this.librarian.positionY > book.positionY) {
                this.booksCaught++;
                document.getElementById("books").innerHTML = `${this.booksCaught}`;
                console.log("You got one! You now have " + this.booksCaught +  " out of 5 books!");
                this.removeBook(book);
            }
                
        if (this.booksCaught===5) {
                    //alert("You got all five books!");
                     this.removeBook(book);
                    //window.open("../youdidit.html") 
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
        this.positionX = 85;
        this.positionY = Math.floor(Math.random() * 70);
        this.domMonster = null;
        this.width = 150;
        this.height = 150
    }

};

//book

class Book {
    constructor() {
        this.positionX = 85;
        this.positionY = Math.floor(Math.random() * 70);
        this.domBook = null;
        this.width = 150;
        this.height = 150;
    }
}


const game = new Game();
game.runGame();
