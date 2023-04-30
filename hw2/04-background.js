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

  const toggleColorChange = () => {
    let buttonText = "";
    let classToRemove = "";
    let classToAdd = "";

    if (isRunning) {
      buttonText = "Start";
      classToRemove = "btn-danger";
      classToAdd = "btn-primary";
      clearInterval(intervalId);
    } else {
      buttonText = "Stop";
      classToRemove = "btn-primary";
      classToAdd = "btn-danger";
      const interval = parseInt(intervalInput.value.trim(), 10) || 3;
      intervalId = setInterval(changeBackgroundColor, interval * 1000);
    }

    isRunning = !isRunning;
    startStopButton.textContent = buttonText;
    startStopButton.classList.remove(classToRemove);
    startStopButton.classList.add(classToAdd);
  };

  startStopButton.addEventListener("click", toggleColorChange);

  toggleColorChange();
});
