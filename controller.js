import Game from "./engine/game.js"

const game = new Game(4);
game_board(game.gameState);

document.onkeydown = function(key) {
    switch(key.which) {
        case 38:
            game.move("up");
            game_board(game.gameState);
            break;
        case 40:
            game.move("down");
            game_board(game.gameState);
            break;
        case 39:
            game.move("right");
            game_board(game.gameState);
            break;
        case 37:
            game.move("left");
            game_board(game.gameState);
            break;
        default: return;
    }
    key.preventDefault();
}
game.onMove(gameState => {
    let score = document.getElementsByTagName("button")[0];
    score.innerHTML = ""
    score.innerHTML = "s c o r e : " + game.gameState.score
})


game.onLose(gameState => {
    let status = document.getElementsByTagName("h3")[0]
    status.innerHTML = ""
    status.innerHTML = "GAME OVER!"
})

game.onWin(gameState => {
    let status = document.getElementsByTagName("h3")[0]
    status.innerHTML = "YOU WIN!"
})

document.getElementById('reset').onclick = reset_game;


function reset_game() {
    game.setupNewGame()
    game_board(game.gameState)

    let score = document.getElementsByTagName("button")[0];
    score.innerHTML = ""
    score.innerHTML = "s c o r e : " + game.gameState.score

    let status = document.getElementsByTagName("h3")[0]
    status.innerHTML = ""
}


function game_board(gameState) {
    let tiles = document.getElementsByClassName("grid-container")[0];
    let tile = tiles.getElementsByTagName("div");

    //document.getElementById("myDiv").style.backgroundColor = "lightblue";

    for (let i =0; i<16; i++) {
        tile[i].innerHTML = ""
        tile[i].style.backgroundColor = "rgba(255, 255, 255, 0.8)"
        if (gameState.board[i] !== 0) {
            tile[i].innerHTML = gameState.board[i]

            if (gameState.board[i] === 0) {
                tile[i].style.backgroundColor = "rgba(255, 255, 255, 0.8)"
            } else if (gameState.board[i] === 2) {
                tile[i].style.backgroundColor = "#aaaf99"
            } else if (gameState.board[i] === 4) {
                tile[i].style.backgroundColor = "#e9ccb1"
            } else if (gameState.board[i] === 8) {
                tile[i].style.backgroundColor = "#d3c4be"
            } else if (gameState.board[i] === 16) {
                tile[i].style.backgroundColor = "#e4dac2"
            } else if (gameState.board[i] === 32) {
                tile[i].style.backgroundColor = "#f4eee1"
            } else if (gameState.board[i] === 64) {
                tile[i].style.backgroundColor = "#c4bdac"
            } else if (gameState.board[i] === 128) {
                tile[i].style.backgroundColor = "#ebcfc4"
            } else if (gameState.board[i] === 256) {
                tile[i].style.backgroundColor = "#e8e69d"
            } else if (gameState.board[i] === 512) {
                tile[i].style.backgroundColor = "#d8ab96"
            } else if (gameState.board[i] === 1024) {
                tile[i].style.backgroundColor = "#d2d6c7"
            } else if (gameState.board[i] === 2048) {
                tile[i].style.backgroundColor = "#f7e6d3"
            } else {
                tile[i].style.backgroundColor = "#999999"
            }
            
        }
    }
}



