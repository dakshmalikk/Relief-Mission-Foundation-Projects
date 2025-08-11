// Get references to DOM elements
const timeDisplay = document.getElementById('time-display');
const startPauseBtn = document.getElementById('start-pause-btn');
const lapBtn = document.getElementById('lap-btn');
const resetBtn = document.getElementById('reset-btn');
const lapsList = document.getElementById('laps-list');

// Stopwatch state variables
let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCounter = 0;

// --- Main Control Functions ---

function start() {
    isRunning = true;
    startPauseBtn.textContent = 'Pause';
    // Start time is the current time minus any elapsed time (for resuming)
    startTime = Date.now() - elapsedTime;
    // Update the time every 10 milliseconds for a smooth display
    timerInterval = setInterval(updateTime, 10);
    // Enable lap and reset buttons
    lapBtn.disabled = false;
    resetBtn.disabled = false;
}

function pause() {
    isRunning = false;
    startPauseBtn.textContent = 'Start';
    // Store the elapsed time
    elapsedTime = Date.now() - startTime;
    clearInterval(timerInterval);
}

function reset() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCounter = 0;
    timeDisplay.textContent = '00:00:00.00';
    startPauseBtn.textContent = 'Start';
    lapsList.innerHTML = '';
    // Disable lap and reset buttons
    lapBtn.disabled = true;
    resetBtn.disabled = true;
}

function lap() {
    lapCounter++;
    const lapTime = formatTime(elapsedTime);
    const listItem = document.createElement('li');
    listItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    // Add new lap to the top of the list
    lapsList.prepend(listItem);
}

// --- Helper Functions ---

function updateTime() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    // Convert milliseconds to hours, minutes, seconds, and hundredths
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let hundredths = Math.floor((time % 1000) / 10);

    // Pad with leading zeros if necessary
    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    hundredths = String(hundredths).padStart(2, '0');

    return `${hours}:${minutes}:${seconds}.${hundredths}`;
}

// --- Event Listeners ---

startPauseBtn.addEventListener('click', () => {
    if (isRunning) {
        pause();
    } else {
        start();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Initial state
lapBtn.disabled = true;
resetBtn.disabled = true;