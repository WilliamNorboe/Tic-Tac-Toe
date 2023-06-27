
let conDiv = document.querySelector("#container");
let turnDiv = document.querySelector("#turn");

let submit = document.querySelector("#submit");


const player = (pName, marker, turn)=>{
    return{
        pName, 
        marker,
        turn,
    }
}

let p1 = player("Player 1", "X", true);
let p2 = player("Player 2", "O", false);

const Gameboard = ( () => {
    const createBoard = ()=>{
        let tempBoard = [];
        for(let i = 0; i < 3; ++i){
            let row = [];
            for(let j = 0; j < 3; ++j){
                row.push('-');
            }
            tempBoard.push(row);
        }
        return tempBoard;
    };
    let board = createBoard();
    let spots = 9;
    const resetBoard = ()=>{
        spots = 9;
        for(let i = 0; i < 3; ++i){
            for(let j = 0; j < 3; ++j){
                board[i][j] = '-';
            }
        }
    }
    const checkWin = (pi)=>{
        for(let i = 0; i < 3; ++i){ // horizontal win
            for(let j = 0; j < 3; ++j){
                if(board[i][j] != pi.marker){
                    break;
                }
                if(j == 2){
                    p1.turn = false;
                    p2.turn = false;
                    return pi.pName;
                }
            }
        }
        for(let i = 0; i < 3; ++i){ // vertical win
            for(let j = 0; j < 3; ++j){
                if(board[j][i] != pi.marker){
                    break;
                }
                if(j == 2){
                    p1.turn = false;
                    p2.turn = false;
                    return pi.pName;
                }
            }
        }
        for(let i = 2, j = 0; i >=0, j<3; --i, ++j){ // diagonal wins
            if(board[i][j] != pi.marker){
                break;
            }
            if(j == 2){
                p1.turn = false;
                p2.turn = false;
                return pi.pName;
            }
        }
        for(let i = 0, j = 0; i<3, j<3; ++i, ++j){
            if(board[i][j] != pi.marker){
                break;
            }
            if(j == 2){
                p1.turn = false;
                p2.turn = false;
                return pi.pName;
            }
        }
        if(spots == 0){
            p1.turn = false;
            p2.turn = false;
            return "Tie";
        }
        return "";
    }
    const addMarker = (i, j) => {
        let result = "";
        if(board[i][j] != "-"){
            return result;
        }
        spots--;
        if(p1.turn){
            board[i][j] = p1.marker;
            p1.turn = false;
            p2.turn = true;
            result = checkWin(p1);
        }
        else if(p2.turn){
            board[i][j] = p2.marker;
            p2.turn = false;
            p1.turn = true;
            result = checkWin(p2);
        }

        return result;
    }
    return{
        board,
        addMarker,
        resetBoard,
    };
})();



const display = ( () => {
    const squareClicked = (id) => {
        console.log(id);
        let result = Gameboard.addMarker(id[6], id[7]);
        document.querySelector('#board').remove();
        showTurn(result);
        displayBoard(Gameboard.board);
    };
    const startGame = () =>{
        p1.pName = p1Name.value;
        p2.pName = p2Name.value;
        p1.turn = true;
        p2.turn = false;
        Gameboard.resetBoard();
        document.querySelector('#board').remove();
        turnDiv.textContent = "Turn: " + p1.pName;
        displayBoard(Gameboard.board);
    }
    const showTurn = (result) =>{
        if(result == "Tie"){
            turnDiv.textContent = "Result: Tie!";
            return;
        }
        else if(result != ""){
            turnDiv.textContent = "Result: " + result + " Won!";
            return;
        }
        if(p1.turn){
            turnDiv.textContent = "Turn: " + p1.pName;
        }
        else if(p2.turn){
            turnDiv.textContent = "Turn: " + p2.pName;
        }
    }
    const displayBoard = (board)=>{
        let boardDiv = document.createElement("div");
        boardDiv.id = "board";
        for(let i = 0; i < 3; ++i){
            let rowDiv = document.createElement("div");
            rowDiv.classList.add("row");
            for(let j = 0; j < 3; ++j){
                let squareDiv = document.createElement("div");
                squareDiv.classList.add("square");
                squareDiv.id = "square" + i + j;
                squareDiv.addEventListener("click", ()=>{squareClicked(squareDiv.id)} );
                squareDiv.textContent = board[i][j];
                rowDiv.appendChild(squareDiv);
            }
            boardDiv.appendChild(rowDiv);
        }
        conDiv.appendChild(boardDiv);
    };
    return{
        displayBoard,
        startGame,
    };
})();

// function startGame(e){

// }

display.displayBoard(Gameboard.board);
submit.addEventListener("click", function(event){
    event.preventDefault();
    p1.pName = p1Name.value;
        p2.pName = p2Name.value;
        p1.turn = true;
        p2.turn = false;
        Gameboard.resetBoard();
        console.log(Gameboard.board);
        document.querySelector('#board').remove();
        turnDiv.textContent = "Turn: " + p1.pName;
        display.displayBoard(Gameboard.board);
});
