// Напиши скрипт таймера, который ведёт обратный отсчет до определенной даты. Такой таймер может использоваться в блогах и интернет-магазинах, страницах регистрации событий, во время технического обслуживания и т. д.

// Используй библиотеку flatpickr для того чтобы позволить пользователю кроссбраузерно выбрать конечную дату и время в одном элементе интерфейса.

//

import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from "notiflix"; // Для отображения уведомлений пользователю вместо window.alert() используй библиотеку notiflix.

const btn = document.querySelector("button[data-start]");
btn.setAttribute("disabled", true); // Кнопка «Start» должа быть не активна до тех пор, пока пользователь не выбрал дату в будущем.

const daysEl = document.querySelector("span[data-days]");
const hoursEl = document.querySelector("span[data-hours]");
const minutesEl = document.querySelector("span[data-minutes]");
const secondsEl = document.querySelector("span[data-seconds]");

let selectedDate = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  showMonths: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      // alert("Please choose a date in the future");
      Notiflix.Notify.failure("Please choose a date in the future");
      // Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
      btn.setAttribute("disabled", true);
      return;
    }
    btn.removeAttribute("disabled"); // Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
    selectedDate = selectedDates[0].getTime();
  },
  onChange(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      // alert("Please choose a date in the future");
      Notiflix.Notify.failure("Please choose a date in the future");
      btn.setAttribute("disabled", true);
      return;
    }
    btn.removeAttribute("disabled");
    selectedDate = selectedDates[0].getTime();
  },
};

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  //  В интерфейсе таймера необходимо добавлять 0 если в числе меньше двух символов. Напиши функцию addLeadingZero(value), которая использует метод метод padStart() и перед отрисовкой интефрейса форматируй значение.
  return String(value).padStart(2, "0");
}

btn.addEventListener("click", onClick);

function onClick() {
  // При нажатии на кнопку «Start» начинается отсчет времени до выбранной даты с момента нажатия.
  // При нажатии на кнопку «Start» скрипт должен вычислять раз в секунду сколько времени осталось до указанной даты и обновлять интерфейс таймера, показывая четыре цифры: дни, часы, минуты и секунды в формате xx:xx:xx:xx.
  // Количество дней может состоять из более чем двух цифр.
  btn.setAttribute("disabled", true);
  Notiflix.Notify.success("The timer has been started successfully");

  const timerId = setInterval(() => {
    // const { days, hours, minutes, seconds } = convertMs(
    //   selectedDate - Date.now()
    // );
    const delta = selectedDate - Date.now();
    const deltaTime = convertMs(delta);

    daysEl.textContent = addLeadingZero(deltaTime.days);
    hoursEl.textContent = addLeadingZero(deltaTime.hours);
    minutesEl.textContent = addLeadingZero(deltaTime.minutes);
    secondsEl.textContent = addLeadingZero(deltaTime.seconds);

    if (delta < 1000) {
      // Таймер должен останавливаться когда дошел до конечной даты, то есть 00:00:00:00.
      clearTimeout(timerId);
    }
  }, 1000);
}
