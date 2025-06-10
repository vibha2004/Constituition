var errors = 0;
var matches = 0;
var cardList = ["21A", "39(e)", "24"];
var cardSet;
var board = [];
var rows = 2; // 3 rows
var columns = 3; // 2 columns

var card1Selected;
var card2Selected;

window.onload = function () {
    shuffleCards();
    startGame();
};

function shuffleCards() {
    cardSet = cardList.concat(cardList.map((card) => card + "-"));
    for (let i = 0; i < cardSet.length; i++) {
        let j = Math.floor(Math.random() * cardSet.length);
        let temp = cardSet[i];
        cardSet[i] = cardSet[j];
        cardSet[j] = temp;
    }
}

function startGame() {
    // Arrange the board 2x3
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            let cardImg = cardSet.pop();
            row.push(cardImg);

            let card = document.createElement("img");
            card.id = r.toString() + "-" + c.toString();
            card.src = "back.jpg";
            card.classList.add("card");
            card.addEventListener("click", selectCard);
            document.getElementById("board").append(card);
        }
        board.push(row);
    }
    setTimeout(hideCards, 1000);
}

function hideCards() {
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            let card = document.getElementById(r.toString() + "-" + c.toString());
            card.src = "back.jpg";
        }
    }
}

function selectCard() {
    if (this.src.includes("back")) {
        if (!card1Selected) {
            card1Selected = this;

            let coords = card1Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card1Selected.src = board[r][c] + ".png";
        } else if (!card2Selected && this != card1Selected) {
            card2Selected = this;

            let coords = card2Selected.id.split("-");
            let r = parseInt(coords[0]);
            let c = parseInt(coords[1]);

            card2Selected.src = board[r][c] + ".png";
            setTimeout(update, 1000);
        }
    }
}

function update() {
    if (!isMatchingPair(card1Selected.src, card2Selected.src)) {
        card1Selected.src = "back.jpg";
        card2Selected.src = "back.jpg";
        errors += 1;
        document.getElementById("errors").innerText = errors;
    } else {
        matches += 1;
    }

    card1Selected = null;
    card2Selected = null;

    // Check if the game is over
    if (matches === cardList.length) {
        endGame();
    }
}

function isMatchingPair(card1, card2) {
    return (
        (card1.includes("21A") && card2.includes("21A")) ||
        (card1.includes("39(e)") && card2.includes("39(e)")) ||
        (card1.includes("24") && card2.includes("24"))
    );
}

function endGame() {
    let resultDiv = document.getElementById("result");

    // Show appropriate message based on errors
    if (errors > 5) {
        resultDiv.innerHTML = "Better luck next time! <button id='playAgain'>Play Again</button>";
    } else {
        resultDiv.innerHTML = "Congratulations! <button id='playAgain'>Play Again</button>";
    }

    // Attach Play Again functionality
    document.getElementById("playAgain").addEventListener("click", resetGame);

    // Show the Back to Chapters button
    document.getElementById("backToChapters").style.display = "block";
}

function resetGame() {
    errors = 0;
    matches = 0;
    card1Selected = null;
    card2Selected = null;

    // Reset error count and the board
    document.getElementById("errors").innerText = errors;
    document.getElementById("board").innerHTML = "";

    // Remove the result message
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = "";

    // Hide the Back to Chapters button again for a new game
    document.getElementById("backToChapters").style.display = "none";

    // Shuffle and start the game again
    board = [];
    shuffleCards();
    startGame();
}


