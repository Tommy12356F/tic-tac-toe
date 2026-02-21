const Gameboard = (function() {

    // private stuff here
    const board=["", "", "", "", "", "", "", "", ""]
    const placeMark = (index, marker) => {
        if (board[index]==="" && index<=8 && index>=0){
            board[index]=marker;
            return true;
        }else{
            return false;
        }

    };
    
    const reset = () => {
        board.fill("")
        
        

         
            
    };

    
    const getBoard = ()=>{
        return board;

    };

    return {
        // public stuff here
        getBoard, placeMark, reset 
    };
    
    

})();


function Player(name,marker){
    
    return {
        name,marker
    }
}

const GameController = (function () {
    let p1 = Player("Vedant", "X");
    let p2 = Player("Crazy","O");

    let currentPlayer=p1;
    let gameOver=false;

    const winPatterns = [
        [0, 1, 2], // rows
        [3, 4, 5],
        [6, 7, 8],

        [0, 3, 6], // columns
        [1, 4, 7],
        [2, 5, 8],

        [0, 4, 8], // diagonals
        [2, 4, 6]
    ];

    const checkWin = () => {
        const board = Gameboard.getBoard()

        return winPatterns.some(pattern=>
            pattern.every(index=>
                board[index] === currentPlayer.marker
            )
        );
   
    };
    const checkTie = () =>{
        const board =Gameboard.getBoard()
        return board.every(cell =>
            cell !==""
        )
    }
    const startGame = (name1, name2) => {
        p1 = Player(name1, "X");
        p2 = Player(name2, "O");

        currentPlayer = p1;
        gameOver = false;

        Gameboard.reset();

        
        

    };

    // EVERYTHING related to game flow lives here
    const playRound = (index) => {
        if ( gameOver ) return;
        const success = Gameboard.placeMark(index, currentPlayer.marker);
        if ( !success ) return;
        if (checkWin()) {
            gameOver = true;
            return;
        }
        if (checkTie()){
            gameOver = true;
            return;
        }
        currentPlayer = currentPlayer === p1 ? p2 : p1; //switches player




   
    };
    return { playRound,startGame };

})();

const DisplayController = (function () {
    const setup = document.getElementById("setup-screen");
    const game = document.getElementById("game-screen");
    const p1 = document.getElementById("player1-name")
    const p2 = document.getElementById("player2-name")
    const start = document.getElementById("start-game")
    const reset = document.getElementById("reset");
    start.addEventListener("click",()=>{
        let player1=p1.value || "player1"
        let player2=p2.value || "player2"
        GameController.startGame(player1, player2)
        setup.classList.add("hidden");
        game.classList.remove("hidden");
        render();





    })
    reset.addEventListener("click",()=>{
        
        GameController.startGame(p1.value, p2.value);
        render()
    })


    
    const cells = document.querySelectorAll(".cell");
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            const i = Number(cell.dataset.index)
            GameController.playRound(i);
            render()

        });
    });


    // for each cell:
    //     cells[i].textContent = board[i]
    //     function render()
    function render() {
        const board = Gameboard.getBoard();
        // board.every(cell => cell)
        // board[index] === currentPlayer.marker
        cells.forEach((cell,index)=> {
            cell.textContent = board[index];
            cell.style.color= "white"

        })

    }
    render();



})();

