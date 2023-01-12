const bodyRef = document.querySelector('body');
const startBtnRef = document.querySelector('button[data-start]');
const stopBtnRef = document.querySelector('button[data-stop]');
stopBtnRef.disabled = true;

let timerId = null;

startBtnRef.addEventListener('click', handleStartBtnClick);
stopBtnRef.addEventListener('click', handleStopBtnClick);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBodyColor() {
  bodyRef.style.backgroundColor = getRandomHexColor();
}

function handleStartBtnClick() {
  timerId = setInterval(changeBodyColor, 1000);
  startBtnRef.disabled = true;
  stopBtnRef.disabled = false;
}

function handleStopBtnClick() {
  clearInterval(timerId);
  startBtnRef.disabled = false;
  stopBtnRef.disabled = true;
}
