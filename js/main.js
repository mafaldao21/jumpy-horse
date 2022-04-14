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
        this.music = new Audio('../music/Lobo Loco - Dancing Sparrows B (ID 610) - Remastered.mp3');
        this.bookCounter = document.getElementById("books")
    }

    createNewPlayer(){
        this.librarian = new Player();
        this.librarian.domLibrarian = document.createElement("img");
        this.librarian.domLibrarian.className = "player";
        //this.librarian.domLibrarian.src = "../img/librarianicon.png";
        this.librarian.domLibrarian.src = "../img/librarianicon.png";
        this.librarian.domLibrarian.style.height = this.librarian.height + "px";
        this.librarian.domLibrarian.style.width = this.librarian.width + "px";
        this.board.appendChild(this.librarian.domLibrarian);
        this.librarian.domLibrarian.style.left = this.librarian.positionX + "px"
        this.librarian.domLibrarian.style.bottom = this.librarian.positionY + "px"
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
        monster.domMonster.style.left =  monster.positionX + "px"
        monster.domMonster.style.bottom =  monster.positionY + "px"
    };

    createNewBook() {
        const book = new Book()
        
        book.domBook = document.createElement("img");
        book.domBook.className = "book";
        
        book.domBook.src = "../img/book.png";
        book.domBook.style.height = book.height + "px";
        book.domBook.style.width = book.width + "px";
        this.board.appendChild(book.domBook);
        book.domBook.style.left =  book.positionX + "px"
        book.domBook.style.bottom =  book.positionY + "px"
        this.books.push(book);
        

    };

    movePlayer() {
        window.addEventListener("keydown", (event) => {
            if(event.key=== "ArrowUp") {
                this.librarian.positionY+=10;
            } else if (event.key === "ArrowDown") {
                this.librarian.positionY-=10;
            }
            this.librarian.domLibrarian.style.left = this.librarian.positionX + "px"
            this.librarian.domLibrarian.style.bottom = this.librarian.positionY + "px"
            
        });
                
    }

    startMusic() {
        const music = new Audio('../music/Lobo Loco - Dancing Sparrows B (ID 610) - Remastered.mp3');
        music.play();   
    } 
       
      
    

    runGame(){ 
        window.alert("You must collect 5 rare books from the Restricted Section of the Library. Your very job depends on it!\n\nDon't forget to watch out for the Dusties, they have a really sharp bite.\n\nUse ArrowUp to move the librarian up, ArrowDown to move down.")
        this.createNewPlayer();
        this.movePlayer();

        this.newInterval = setInterval( () => {
            
                if(this.time%60===0){
                    this.createNewBook()
                    this.createNewMonster()
                    
                }

               

                this.monsters.forEach( (monster) => {
                    //move, draw again, detectcollision
                    monster.positionX-=9;
                    monster.domMonster.style.left =  monster.positionX + "px"
                    monster.domMonster.style.bottom =  monster.positionY + "px"
                    this.collisionDetection(monster);
                    this.catchOutside(monster);
                    
                })
                
                
                 this.books.forEach( (book) => {
                    book.positionX-=5;
                    book.domBook.style.left =  book.positionX + "px"
                    book.domBook.style.bottom =  book.positionY + "px"
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
            this.librarian.height + this.librarian.positionY > monster.positionY){
                console.log("hits monster")
            if (this.lives > 1) {
                
                this.lives--;
                document.getElementById("lives").innerHTML = `${this.lives}/3 Lives Left`;
                this.removeMonster(monster);
                alert("Oh no! You were caught by a Dusty! You have " + this.lives +  " lives left");
            }
            else {
                this.lives --;
                this.removeMonster(monster);
                alert("Oh no! You were defeated by the Dusties!");
                window.open("../gameover.html")
                this.time===0;
                this.booksCaught===0;
                this.lives===3;
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
              
             if(this.booksCaught<5) {
                this.booksCaught++;
                document.getElementById("books").innerHTML = `${this.booksCaught}/5 Books`;
                alert("You got one! You now have " + this.booksCaught +  " out of 5 books!");
                this.removeBook(book);
             }
            }
                
        if (this.booksCaught===5) {
                    alert("You got all five books!");
                     this.removeBook(book);
                    window.open("../youdidit.html") 
                    this.time===0;
                }

    } 
    
}



//player

class Player {
    constructor() {
        this.positionX = 0;
        this.positionY = 250;
        this.domLibrarian = null;
        this.height = 200;
        this.width = 150;

    }

}     

//monster

class Monster {
    constructor() {
        this.positionX = 700;
        this.positionY = Math.floor(Math.random() * 700);
        this.domMonster = null;
        this.width = 80;
        this.height = 80
    }

};

//book

class Book {
    constructor() {
        this.positionX = 700;
        this.positionY = Math.floor(Math.random() * 700);
        this.domBook = null;
        this.width = 100;
        this.height = 100;
    }
}


const game = new Game();
game.runGame();
