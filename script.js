let interval;

window.onload = function() {
    // Set the default value of the datetime picker to the current date and time
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000; // Get the timezone offset in milliseconds
    const localTime = new Date(now.getTime() - offset).toISOString().slice(0, 16);
    document.getElementById('datetime-picker').value = localTime;
};

function startCountdown() {
    const input = document.getElementById('datetime-picker').value;
    const targetDate = new Date(input).getTime();

    if (isNaN(targetDate)) {
        alert('Please select a valid date and time.');
        return;
    }

    const initialTime = targetDate - new Date().getTime();

    // Clear any existing interval to prevent multiple intervals running simultaneously
    clearInterval(interval);

    interval = setInterval(() => {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(interval);
            document.getElementById('days').innerText = '00';
            document.getElementById('hours').innerText = '00';
            document.getElementById('minutes').innerText = '00';
            document.getElementById('seconds').innerText = '00';
            updateProgress(0, initialTime);
            playSound();
            showModal();
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = String(days).padStart(2, '0');
        document.getElementById('hours').innerText = String(hours).padStart(2, '0');
        document.getElementById('minutes').innerText = String(minutes).padStart(2, '0');
        document.getElementById('seconds').innerText = String(seconds).padStart(2, '0');

        updateProgress(difference, initialTime);
    }, 1000);
}

function stopCountdown() {
    clearInterval(interval);
    document.getElementById('days').innerText = '00';
    document.getElementById('hours').innerText = '00';
    document.getElementById('minutes').innerText = '00';
    document.getElementById('seconds').innerText = '00';
    updateProgress(0, 1); // Setting the progress to 0
}

function updateProgress(remainingTime, initialTime) {
    const progress = document.getElementById('progress');
    const progressValue = (remainingTime / initialTime) * 314; // 314 is the circumference of the circle
    progress.style.strokeDashoffset = 314 - progressValue;
}

function playSound() {
    const sound = document.getElementById('alarm-sound');
    sound.play().catch(error => console.log('Failed to play sound:', error));
}

function showModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.style.display = 'none';
}
