const scenarios = [
    { text: "A woman complains about unfair termination after resisting harassment.", correctBox: "IndustrialDisputes" },
    { text: "A female employee is not paid the same as her male colleague for the same work.", correctBox: "EqualRemuneration" },
    { text: "A company does not have a POSH committee in place.", correctBox: "POSH" },
    { text: "A woman is discriminated against in hiring due to her gender.", correctBox: "Article15" },
    { text: "An employee is mistreated, affecting her dignity and right to life.", correctBox: "Article21" },
];

let timeLeft = 120;
let timerInterval;

// Shuffle scenarios
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Drag and drop setup
function setupDragAndDrop() {
    shuffle(scenarios);  // Shuffle scenarios each time
    const scenarioContainer = document.getElementById('scenarios');
    scenarioContainer.innerHTML = '';  // Clear existing content

    scenarios.forEach(scenario => {
        const div = document.createElement('div');
        div.className = 'scenario';
        div.textContent = scenario.text;
        div.draggable = true;
        div.dataset.correctBox = scenario.correctBox;
        div.addEventListener('dragstart', dragStart);
        scenarioContainer.appendChild(div);
    });

    document.querySelectorAll('.box').forEach(box => {
        box.addEventListener('dragover', dragOver);
        box.addEventListener('drop', drop);
        box.addEventListener('dragleave', dragLeave);
    });
}

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.dataTransfer.setData('correctBox', e.target.dataset.correctBox);
}

function dragOver(e) {
    e.preventDefault();
}

function drop(e) {
    e.preventDefault();
    const draggedText = e.dataTransfer.getData('text/plain');
    const correctBox = e.dataTransfer.getData('correctBox');
    const droppedBoxId = e.target.id;

    if (e.target.classList.contains('box')) {
        const draggedElement = [...document.querySelectorAll('.scenario')].find(el => el.textContent === draggedText);
        if (draggedElement) {
            const isCorrect = correctBox === droppedBoxId;
            draggedElement.classList.remove('correct', 'wrong', 'grey');
            if (isCorrect) {
                draggedElement.classList.add('correct');
            } else {
                draggedElement.classList.add('wrong');
            }
            e.target.appendChild(draggedElement);
            checkCompletion();
        }
    }
}

function dragLeave(e) {
    e.target.style.backgroundColor = '';
}

// Timer logic
function startTimer() {
    const timerElement = document.getElementById('timer');
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerElement.textContent = `Time Left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            endGame(false);
        }
    }, 1000);
}

// Check if all scenarios are sorted correctly
function checkCompletion() {
    const allCorrect = [...document.querySelectorAll('.scenario')].every(scenario => 
        (scenario.classList.contains('correct') && scenario.parentElement.id !== 'scenarios') ||
        scenario.parentElement.id === 'scenarios'
    );

    if (allCorrect && document.querySelectorAll('#scenarios .scenario').length === 0) {
        clearInterval(timerInterval);
        endGame(true);
    }
}

// End game logic
function endGame(success) {
    document.querySelector('.container_minigame3').classList.add('hidden');
    const resultElement = document.getElementById('result');
    const buttonContainer = document.querySelector('.button-container');
    buttonContainer.classList.remove('hidden');

    // Show result based on success or failure
    if (success) {
        resultElement.textContent = "All the scenarios are successfully sorted.";
        resultElement.style.color = "green";
    } else {
        resultElement.textContent = "Time's up!";
        resultElement.style.color = "red";
    }

    // Ensure both buttons are displayed
    document.getElementById('tryAgainBtn').classList.remove('hidden');
    document.getElementById('backToChaptersBtn').classList.remove('hidden');
}

// Initialize
setupDragAndDrop();
startTimer();

// Button actions
document.getElementById('tryAgainBtn').addEventListener('click', () => {
    location.reload();  // Reload the page to restart the game
});
// Add event listener for the "Back to Chapters" button
document.getElementById('backToChaptersBtn').addEventListener('click', () => {
    window.location.href = 'chapters.html';  // Redirect to chapters page
});
