const draggableListItems = document.querySelectorAll('.draggable-list li');
const endMessage = document.getElementById('endMessage');
const timerDisplay = document.getElementById('timer'); // Timer element
const backToChapters = document.getElementById('backToChapters'); // Back to Chapters button
let selectedId;
let dropTargetId;
let matchingCounter = 0;
const totalPairs = 5;
let timeLeft = 60; // 1 minute
let timerInterval;
const matchedPairs = []; // To store the matched pairs

addEventListeners();
startTimer(); // Start the timer when the game starts

function dragStart() {
  selectedId = this.id;
}

function dragEnter() {
  this.classList.add('over');
}

function dragLeave() {
  this.classList.remove('over');
}

function dragOver(ev) {
  ev.preventDefault();
}

function dragDrop() {
  dropTargetId = this.id;
  if (checkForMatch(selectedId, dropTargetId)) {
    document.getElementById(selectedId).style.display = 'none';
    document.getElementById(dropTargetId).style.display = 'none';
    matchingCounter++;

    // Store the matched pairs
    matchedPairs.push({
      right: document.getElementById(selectedId).innerText,
      description: document.getElementById(dropTargetId).innerText,
    });
  }

  if (matchingCounter === totalPairs) {
    clearInterval(timerInterval); // Stop the timer when all pairs are matched
    displayEndMessage('Well done!', false);
  }

  this.classList.remove('over');
}

function checkForMatch(selected, dropTarget) {
  const matches = {
    'r1': 'd5',
    'r2': 'd3',
    'r3': 'd1',
    'r4': 'd2',
    'r5': 'd4'
  };
  return matches[selected] === dropTarget;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      displayEndMessage("Time's Up!", true); // Time's up, no table display
    }
  }, 1000); // Update every second
}

function displayEndMessage(message, hideTable) {
  let endTable = '';

  // If the game ended because of time running out, don't display the table
  if (!hideTable) {
    endTable = '<table id="table_tag"><tr><th>Consumer Right</th><th>Description</th></tr>';
  
    matchedPairs.forEach(pair => {
      endTable += `<tr><td>${pair.right}</td><td>${pair.description}</td></tr>`;
    });

    endTable += '</table>';
  }
  
  endMessage.style.display = 'block';
  endMessage.innerHTML = `<h3>${message}</h3>${endTable}<button onclick="playAgain()">Play Again</button>`;

  // Show the Back to Chapters button
  backToChapters.style.display = 'block';
}

function playAgain() {
  matchingCounter = 0;
  timeLeft = 60; // Reset the timer
  matchedPairs.length = 0; // Clear the matched pairs
  endMessage.style.display = 'none';
  backToChapters.style.display = 'none'; // Hide the Back to Chapters button
  clearInterval(timerInterval); // Clear the previous timer
  startTimer(); // Start a new timer

  // Reset the display of all draggable items
  draggableListItems.forEach(item => {
    document.getElementById(item.id).style.display = 'block';
  });
}

function addEventListeners() {
  draggableListItems.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragenter', dragEnter);
    item.addEventListener('drop', dragDrop);
    item.addEventListener('dragover', dragOver);
    item.addEventListener('dragleave', dragLeave);
  });
}
