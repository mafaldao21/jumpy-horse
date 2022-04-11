function createElement(className) {
    const board = document.getElementById("board");
    const newElm = document.createElement(className);
    newElm.className = className;


    board.appendChild(newElm);
        
    return newElm;
}


function drawDomElm(instance){
    instance.domElement.style.width = instance.width + "vw";
    instance.domElement.style.height = instance.height + "vh";

    instance.domElement.style.left = instance.positionX + "vw";
    instance.domElement.style.bottom = instance.positionY + "vh";
    
}


//start game

const game = new Game(createElement, drawDomElm);
game.start();


//event listeners

document.addEventListener("keydown", (event) => {
    if(event.key === "ArrowUp"){
        game.makePlayerMove("up");
    } if(event.key === "ArrowDown"){
        game.makePlayerMove("down");
    }
})