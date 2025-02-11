import './index.css';

declare global {
    interface Window {
        electronAPI: {
            closeApp: () => void;
            openSite: () => void;
        };
    }
}


document.getElementById('close-btn').addEventListener('click', () => {
    window.electronAPI.closeApp();
});

document.getElementById('link-site').addEventListener('click', () => {
    console.log('clique no front')
    window.electronAPI.openSite();
});

let timer: string | NodeJS.Timeout;
let seconds = 0;
let running = false;

function updateDisplay() {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    document.getElementById('timer').innerText = `${hrs}:${mins}:${secs}`;
}

function startTimer() {
    if (!running) {
        running = true;
        timer = setInterval(() => {
            seconds++;
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    running = false;
    clearInterval(timer);
}

function resetTimer() {
    running = false;
    clearInterval(timer);
    seconds = 0;
    updateDisplay();
}

document.getElementById('start').addEventListener('click', () => {
    startTimer()
});
document.getElementById('pause').addEventListener('click', () => {
    pauseTimer()
});
document.getElementById('reset').addEventListener('click', () => {
    resetTimer()
});
