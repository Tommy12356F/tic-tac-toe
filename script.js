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
    const reset = ()=>{

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
    const p1 = Player("Vedant", "X");
    const p2 = Player("Crazy","O");

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

    // EVERYTHING related to game flow lives here

})();

const playRound = (index) => {
   
};