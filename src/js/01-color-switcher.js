// Напиши скрипт, который после нажатия кнопки «Start», раз в секунду меняет цвет фона <body> на случайное значение используя инлайн стиль. При нажатии на кнопку «Stop», изменение цвета фона должно останавливаться.
// Учти, на кнопку «Start» можно нажать бесконечное количество раз. Сделай так, чтобы пока изменение темы запушено, кнопка «Start» была не активна (disabled).

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const btnStart = document.querySelector("button[data-start]");
const btnStop = document.querySelector("button[data-stop]");

// console.log(btnStart);
// console.log(btnStop);

let timerId = null;
let isActive = false;

btnStop.disabled = true;

btnStart.addEventListener("click", () => {
  if (!isActive) {
    isActive = true;
    timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
      btnStart.disabled = "true";
      btnStop.removeAttribute("disabled");
    }, 1000);
  }
});

btnStop.addEventListener("click", () => {
  isActive = false;
  clearInterval(timerId);
  btnStart.removeAttribute("disabled");
  btnStop.disabled = true;
});
