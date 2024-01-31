document.addEventListener('DOMContentLoaded', () => {
    const breakLength = document.getElementById('break-length');
    const sessionLength = document.getElementById('session-length');
    const breakDecrement = document.getElementById('break-decrement');
    const breakIncrement = document.getElementById('break-increment');
    const sessionDecrement = document.getElementById('session-decrement');
    const sessionIncrement = document.getElementById('session-increment');
    const startStopButton = document.getElementById('start_stop');
    const resetButton = document.getElementById('reset');
    const timerLabel = document.getElementById('timer-label');
    const timeLeft = document.getElementById('time-left');
    const beep = document.getElementById('beep');
  
    let breakTime = parseInt(breakLength.textContent);
    let sessionTime = parseInt(sessionLength.textContent);
    let timer;
    let timerRunning = false;
    let onBreak = false;
  
    breakDecrement.addEventListener('click', () => {
      if (breakTime > 1) {
        breakTime--;
        breakLength.textContent = breakTime;
      }
    });
  
    breakIncrement.addEventListener('click', () => {
      if (breakTime < 60) {
        breakTime++;
        breakLength.textContent = breakTime;
      }
    });
  
    sessionDecrement.addEventListener('click', () => {
      if (sessionTime > 1) {
        sessionTime--;
        sessionLength.textContent = sessionTime;
        if (!timerRunning) {
          timeLeft.textContent = `${sessionTime}:00`;
        }
      }
    });
  
    sessionIncrement.addEventListener('click', () => {
      if (sessionTime < 60) {
        sessionTime++;
        sessionLength.textContent = sessionTime;
        if (!timerRunning) {
          timeLeft.textContent = `${sessionTime}:00`;
        }
      }
    });
  
    startStopButton.addEventListener('click', () => {
      if (!timerRunning) {
        startTimer();
        timerRunning = true;
      } else {
        clearInterval(timer);
        timerRunning = false;
      }
    });
  
    resetButton.addEventListener('click', () => {
      clearInterval(timer);
      timerRunning = false;
      breakTime = 5;
      sessionTime = 25;
      breakLength.textContent = breakTime;
      sessionLength.textContent = sessionTime;
      timerLabel.textContent = 'Session';
      timeLeft.textContent = `${sessionTime}:00`;
      beep.pause();
      beep.currentTime = 0;
    });
  
    function startTimer() {
      let totalSeconds = onBreak ? breakTime * 60 : sessionTime * 60;
  
      timer = setInterval(() => {
        totalSeconds--;
        const minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;
  
        timeLeft.textContent = `${minutes}:${seconds}`;
  
        if (totalSeconds <= 0) {
          beep.play();
          clearInterval(timer);
          onBreak = !onBreak;
          if (onBreak) {
            timerLabel.textContent = 'Break';
            totalSeconds = breakTime * 60;
          } else {
            timerLabel.textContent = 'Session';
            totalSeconds = sessionTime * 60;
          }
          startTimer();
        }
      }, 1000);
    }
  });
  