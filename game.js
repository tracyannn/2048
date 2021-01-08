export default class Game {
     
    constructor(size) {
        //create board
        this.size = size
        this.gameState = {
            board: new Array(this.size*this.size),
            score: 0,
            won: false,
            over: false
        }
        for (let i = 0; i<this.size*this.size; i++) {
            this.gameState.board[i] = 0
        }

        //generate first tile
        let x = Math.floor(Math.random() * this.size*this.size) 
        let tile = Math.floor(Math.random() * 100)
        if (tile > 9) {
            this.gameState.board[x] = 2
        } else {
            this.gameState.board[x] = 4
        }
       //generate second tile
        x = Math.floor(Math.random() * this.size*this.size) 
        while (this.gameState.board[x] != 0) {
            x = Math.floor(Math.random() * this.size*this.size) 
        }
        if (tile > 9) {
            this.gameState.board[x] = 2
        } else {
            this.gameState.board[x] = 4
        }

        this.move_listeners = []
        this.win_listeners = []
        this.lose_listeners = []
    } 
    

    setupNewGame() {
        //reset board
        this.gameState = {
            board: new Array(this.size*this.size),
            score: 0,
            won: false,
            over: false
        }
        for (let i = 0; i<this.size*this.size; i++) {
            this.gameState.board[i] = 0
        }
        //generate first tile
        let x = Math.floor(Math.random() * this.size*this.size) 
        let tile = Math.floor(Math.random() * 100)
        if (tile > 9) {
            this.gameState.board[x] = 2
        } else {
            this.gameState.board[x] = 4
        }
       //generate second tile
        x = Math.floor(Math.random() * this.size*this.size) 
        while (this.gameState.board[x] != 0) {
            x = Math.floor(Math.random() * this.size*this.size) 
        }
        if (tile > 9) {
            this.gameState.board[x] = 2
        } else {
            this.gameState.board[x] = 4
        }
    }

    loadGame(gameState) {
        //given a gameState object, it loads that board, score, etc
        this.gameState = gameState
    }

    move(direction) {
        //Given up, down, left, or right as string input, it takes the 
        //appropriate shifts and adds a random tile. 


        let old_board = [...this.gameState.board]


        if (direction === "up") {

            //shifting
            for (let tile = 1; tile<=this.gameState.board.length; tile++) {
                if (this.gameState.board[tile-1] > 0) {
                    let parent = tile - this.size
                    while(this.gameState.board[parent-1] == 0 && parent >0 ) {
                        this.gameState.board[parent-1] = this.gameState.board[tile-1]
                        this.gameState.board[tile-1] = 0
                        tile = parent 
                        parent = parent - this.size
                    }
                }
            }
            
            
            //combining tiles
            for (let i = 1; i<=this.gameState.board.length-this.size; i++) {
                let j = i + this.size
                if (this.gameState.board[i-1] == this.gameState.board[j-1] && j<= this.gameState.board.length) {
                    this.gameState.board[i-1] *= 2 
                    if (this.gameState.board[i-1] == 2048) {
                        this.gameState.won = true
                        this.win_listeners.forEach(listener => listener(this.gameState))
                    }
                    this.gameState.board[j-1] = 0
                    this.gameState.score += this.gameState.board[i-1]
                    let k = j+this.size
                    while (this.gameState.board[k-1] > 0 && k <= this.gameState.board.length) {
                        this.gameState.board[j-1] = this.gameState.board[k-1]
                        this.gameState.board[k-1] = 0
                        j = k
                        k = j+this.size
                    }
                }
            }
            
        }

        if (direction === "down") {
            //shifting
            for (let tile = this.gameState.board.length; tile>0; tile--) {
                if (this.gameState.board[tile-1] > 0) {
                    let parent = tile + this.size
                    while(this.gameState.board[parent-1] == 0 && parent <= this.gameState.board.length) {
                        this.gameState.board[parent-1] = this.gameState.board[tile-1]
                        this.gameState.board[tile-1] = 0
                        tile = parent 
                        parent = parent + this.size
                    }
                }
            }

            //combining tiles
            for (let i = this.gameState.board.length; i>=1+this.size; i--) {
                let j = i - this.size
                if (this.gameState.board[i-1] == this.gameState.board[j-1] && j >0) {
                    this.gameState.board[i-1] *= 2 
                    if (this.gameState.board[i-1] == 2048) {
                        this.gameState.won = true
                        this.win_listeners.forEach(listener => listener(this.gameState))
                    }
                    this.gameState.board[j-1] = 0
                    this.gameState.score += this.gameState.board[i-1]
                    let k = j-this.size
                    while (this.gameState.board[k-1] > 0 && k > 0) {
                        this.gameState.board[j-1] = this.gameState.board[k-1]
                        this.gameState.board[k-1] = 0
                        j = k
                        k = j-this.size
                    }
                }
            }
        }

        if (direction === "left") {
            //shifting
            for (let tile = 1; tile<=this.gameState.board.length; tile++) {
                if (this.gameState.board[tile-1] > 0 && tile%this.size !== 1) {
                    let parent = tile - 1
                    while(this.gameState.board[parent-1] == 0 && parent>0 && parent%this.size!==0) {
                        this.gameState.board[parent-1] = this.gameState.board[tile-1]
                        this.gameState.board[tile-1] = 0
                        tile = parent 
                        parent = parent - 1
                    }
                }
            }

            
            //combining tiles
            for (let i = 1; i<this.gameState.board.length; i++) {
                let j = i+1
                if (this.gameState.board[i-1] == this.gameState.board[j-1] && j<= this.gameState.board.length && i%this.size!==0) {
                    this.gameState.board[i-1] *= 2 
                    if (this.gameState.board[i-1] == 2048) {
                        this.gameState.won = true
                        this.win_listeners.forEach(listener => listener(this.gameState))
                    }
                    this.gameState.board[j-1] = 0
                    this.gameState.score += this.gameState.board[i-1]
                    let k = j+1
                    while (this.gameState.board[k-1] > 0 && k <= this.gameState.board.length && j%this.size !== 0) {
                        this.gameState.board[j-1] = this.gameState.board[k-1]
                        this.gameState.board[k-1] = 0
                        j = k
                        k = j+1
                    }
                }
            }
            
        }


        if (direction === "right") {
            //shifting
            for (let tile = this.gameState.board.length; tile>0; tile--) {
                if (this.gameState.board[tile-1] > 0 && tile%this.size !== 0) {
                    let parent = tile + 1
                    while(this.gameState.board[parent-1] == 0 && parent<=this.gameState.board.length && parent%this.size!==1) {
                        this.gameState.board[parent-1] = this.gameState.board[tile-1]
                        this.gameState.board[tile-1] = 0
                        tile = parent 
                        parent = parent + 1
                    }
                }
            }
            //combining tiles
            for (let i = this.gameState.board.length; i>0; i--) {
                let j = i-1
                if (this.gameState.board[i-1] == this.gameState.board[j-1] && j> 0 && i%this.size!==1) {
                    this.gameState.board[i-1] *= 2 
                    if (this.gameState.board[i-1] == 2048) {
                        this.gameState.won = true
                        this.win_listeners.forEach(listener => listener(this.gameState))
                    }
                    this.gameState.board[j-1] = 0
                    this.gameState.score += this.gameState.board[i-1]
                    let k = j-1
                    while (this.gameState.board[k-1] > 0 && k > 0 && j%this.size !== 1) {
                        this.gameState.board[j-1] = this.gameState.board[k-1]
                        this.gameState.board[k-1] = 0
                        j = k
                        k = j-1
                    }
                }
            }

            

        }


        let check = false
        let counter = 0

        //check if board is full
        for (let i = 0; i<this.gameState.board.length; i++) {
            if (this.gameState.board[i] > 0) {
                counter++
            }
        }

        //check if board changed (valid move)
        for (let i = 0; i<this.gameState.board.length; i++) {
            if (old_board[i] !== this.gameState.board[i]) {
                check = true
                break
            }
        }


        let matches = false

        //spawn new tile if valid move & board is not full
        if (check && counter < this.gameState.board.length) {
            let x = Math.floor(Math.random() * this.size*this.size) 
            let tile = Math.floor(Math.random() * 100)
            while (this.gameState.board[x] != 0) {
                x = Math.floor(Math.random() * this.size*this.size) 
                
            }
            counter++
            if (tile > 9) {
                this.gameState.board[x] = 2
            } else {
                this.gameState.board[x] = 4
            }
        }

        //event listener
        if (check) {
            this.move_listeners.forEach(listener => listener(this.gameState))
        }


        if (counter == this.gameState.board.length) {
            for (let i =1; i<=this.gameState.board.length; i++) {
                if (i%this.size == 1 ) {
                    if (this.gameState.board[i-1] === this.gameState.board[i]
                        || this.gameState.board[i-1] === this.gameState.board[i-1+this.size]
                        || this.gameState.board[i-1] === this.gameState.board[i-1-this.size]) {
                            matches = true
                            break
                        }
                } else if (i%this.size == 0) {
                    if (this.gameState.board[i-1] === this.gameState.board[i-1+this.size]
                        || this.gameState.board[i-1] === this.gameState.board[i-2]
                        || this.gameState.board[i-1] === this.gameState.board[i-1-this.size]) {
                            matches = true
                            break
                        }
                } else { 
                    if (this.gameState.board[i-1] === this.gameState.board[i] 
                        || this.gameState.board[i-1] === this.gameState.board[i-1+this.size]
                        || this.gameState.board[i-1] === this.gameState.board[i-2]
                        || this.gameState.board[i-1] === this.gameState.board[i-1-this.size]) {
                            matches = true
                            break
                        }
                }
                
            }

        }
    
        if (!matches && this.gameState.board.length == counter) {
         
            this.gameState.over = true
            this.lose_listeners.forEach(listener => listener(this.gameState))
        } 



     
    }


    toString() {
        //returns a string representation of the game as text/ascii 
        let game_string = ""
        let y = 1
        for (let i = 0; i <this.size*this.size; i++) {
            if (y%this.size == 0) {
                if (this.gameState.board[i] == 0) {
                    game_string += "[" + " ] \n"
                } else {
                    game_string += "[" + this.gameState.board[i] + "] \n"
                }
            } else {
                if (this.gameState.board[i] == 0) {
                    game_string += "[" + " ] "
                } else {
                    game_string += "[" + this.gameState.board[i] + "] "
                }
            }
            y++
        }
        return game_string
    }

/*
    these methods allow external observers to register event handler functions 
    that listen for the event 
*/
    onMove(callback) {
        this.move_listeners.push(callback)
    }
        

    onLose(callback) {
        this.lose_listeners.push(callback)

    }

    onWin(callback) {
        this.win_listeners.push(callback)

    }

    getGameState() {
        return this.gameState
    }


 }

 
 
