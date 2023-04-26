document.addEventListener("DOMContentLoaded", () => {
  const intervalInput = document.getElementById("interval-input");
  const startStopButton = document.getElementById("start-stop-button");
  let intervalId;
  let isRunning = false;

  const getRandomColor = () => {
    const h = Math.floor(Math.random() * 361);
    const s = Math.floor(Math.random() * 101);
    const l = Math.floor(Math.random() * 101);
    const a = 0.5;
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
  };

  const changeBackgroundColor = () => {
    document.body.style.backgroundColor = getRandomColor();
  };

  const startColorChange = (interval) => {
    intervalId = setInterval(changeBackgroundColor, interval * 1000);
  };

  const stopColorChange = () => {
    clearInterval(intervalId);
  };

  const toggleColorChange = () => {
    if (isRunning) {
      stopColorChange();
      startStopButton.textContent = "Start";
      startStopButton.classList.remove("btn-danger");
      startStopButton.classList.add("btn-primary");
    } else {
      const interval = parseInt(intervalInput.value.trim(), 10) || 3;
      startColorChange(interval);
      startStopButton.textContent = "Stop";
      startStopButton.classList.remove("btn-primary");
      startStopButton.classList.add("btn-danger");
    }
    isRunning = !isRunning;
  };

  startStopButton.addEventListener("click", toggleColorChange);

  toggleColorChange();
});
