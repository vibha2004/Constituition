const dragList = document.getElementById('dragList');
const checkButton = document.getElementById('checkButton');
const playAgainButton = document.getElementById('playAgainButton');
const messageDiv = document.getElementById('message');
const timerDiv = document.getElementById('timer');
let draggedItem = null;
let timerInterval;
let timeRemaining = 60; // 1 minute in seconds

// Add event listeners for drag and drop events
dragList.addEventListener('dragstart', handleDragStart);
dragList.addEventListener('dragover', handleDragOver);
dragList.addEventListener('drop', handleDrop);
checkButton.addEventListener('click', checkOrder);
playAgainButton.addEventListener('click', resetOrder);

// Drag start event handler
function handleDragStart(event) {
  draggedItem = event.target.closest('.drag-item');
  if (draggedItem) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', draggedItem.innerHTML);
    draggedItem.style.opacity = '0.5';
  }
}

// Drag over event handler
function handleDragOver(event) {
  event.preventDefault();
  event.dataTransfer.dropEffect = 'move';
  
  const targetItem = event.target.closest('.drag-item');
  if (targetItem && targetItem !== draggedItem) {
    const boundingRect = targetItem.getBoundingClientRect();
    const offset = boundingRect.y + (boundingRect.height / 2);
    if (event.clientY - offset > 0) {
      targetItem.style.borderBottom = 'solid 2px #000';
      targetItem.style.borderTop = '';
    } else {
      targetItem.style.borderTop = 'solid 2px #000';
      targetItem.style.borderBottom = '';
    }
  }
}

// Drop event handler
function handleDrop(event) {
  event.preventDefault();
  
  const targetItem = event.target.closest('.drag-item');
  if (targetItem && targetItem !== draggedItem) {
    const rect = targetItem.getBoundingClientRect();
    if (event.clientY > rect.top + (rect.height / 2)) {
      targetItem.parentNode.insertBefore(draggedItem, targetItem.nextSibling);
    } else {
      targetItem.parentNode.insertBefore(draggedItem, targetItem);
    }
  }

  // Clean up styles
  if (draggedItem) {
    draggedItem.style.opacity = '';
    draggedItem.style.borderTop = '';
    draggedItem.style.borderBottom = '';
  }
  draggedItem = null;
}

// Check the order of the acts
function checkOrder() {
  const items = Array.from(dragList.querySelectorAll('.drag-item'));
  const correctOrder = [
    "The Clinical Establishments (Registration and Regulation) Act, 2010",
    "The Protection of Human Rights Act, 1993",
    "The Persons with Disabilities (Equal Opportunities, Protection of Rights and Full Participation) Act, 1995",
    "The Medical Termination of Pregnancy (MTP) Act, 1971",
    "The Consumer Protection Act, 2019"
  ];

  const currentOrder = items.map(item => item.querySelector('.act-text').textContent.trim());

  if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
    messageDiv.textContent = 'Correct sequence!';
    messageDiv.className = 'correct-message';
  } else {
    messageDiv.textContent = 'Wrong sequence!';
    messageDiv.className = 'wrong-message';
  }

  messageDiv.style.display = 'block';
  playAgainButton.style.display = 'block';
  clearInterval(timerInterval); // Stop the timer
}

// Reset the order and hide the message
function resetOrder() {
  messageDiv.style.display = 'none';
  playAgainButton.style.display = 'none';
  location.reload(); // This reloads the page to reset the list order
  startTimer(); // Restart the timer
}

// Update the timer every second
function updateTimer() {
  timeRemaining--;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerDiv.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    messageDiv.textContent = 'Time is up! Try again.';
    messageDiv.className = 'wrong-message';
    messageDiv.style.display = 'block';
    playAgainButton.style.display = 'block';
  }
}

// Start the timer
function startTimer() {
  timeRemaining = 60;
  timerInterval = setInterval(updateTimer, 1000);
}

// Start the timer when the page loads
startTimer();
