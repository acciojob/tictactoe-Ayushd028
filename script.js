let player1 = "";
let player2 = "";
let currentPlayer = "x";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;

async function startGame() {
    player1 = document.getElementById("player1").value.trim();
    player2 = document.getElementById("player2").value.trim();

    if (player1 === "" || player2 === "") {
        alert("Please enter both player names.");
        return;
    }

    document.querySelector(".player-input").style.display = "none";
    document.querySelector(".game-container").style.display = "block";
    
    document.querySelector(".message").textContent = `${player1}, you're up!`;
    gameActive = true;
    currentPlayer = "x";
    gameBoard = ["", "", "", "", "", "", "", "", ""];

    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = ""; 
       await cell.addEventListener("click", handleMove);
    });
}

function handleMove(event) {
    let cell = event.target;
    let cellIndex = parseInt(cell.id) - 1;

    if (!gameActive || gameBoard[cellIndex] !== "") return;

    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        document.querySelector(".message").textContent = 
            `${currentPlayer === "x" ? player1 : player2}, congratulations you won!`;
        gameActive = false;
        return;
    }

    if (!gameBoard.includes("")) {
        document.querySelector(".message").textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "x" ? "o" : "x";
    document.querySelector(".message").textContent = 
        `${currentPlayer === "x" ? player1 : player2}, you're up!`;
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}
