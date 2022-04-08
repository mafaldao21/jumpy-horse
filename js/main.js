function createElement(className) {
    const board = document.getElementById("board");
    const newElm = document.createElement(className);
    newElm.className = className;


    board.appendChild(newElm);
        
    return newElm;
}


function drawDomElm(instance){
    const img = new Image(); // Create new <img> element
    if(instance.className==="player"){
         instance.domElement.innerHTML = this.img.src = '../librarianicon.png'
    }
   
}


//start game

const game = new Game(createElement, drawDomElm);
game.start();


//event listeners

document.addEventList("keydown", (event) => {
    if(event.key === "ArrowUp"){
        game.makePlayerMove("up");
    } if(event.key === "ArrowDown"){
        game.makePlayerMove("down");
    }
})