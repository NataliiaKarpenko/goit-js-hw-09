import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputDateTimePicker = document.querySelector('#datetime-picker');
const startBtnRef = document.querySelector('button[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');

startBtnRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notify.warning('Please, choose a date in the future.');
      selectedDates[0] = new Date();
    } else {
      startBtnRef.disabled = false;
      startBtnRef.addEventListener('click', timer.start);
    }
  },
};

const timer = {
  intervalId: null,

  start() {
    startBtnRef.disabled = true;
    const startTime = new Date(inputDateTimePicker.value).getTime();

    this.intervalId = setInterval(
      () => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime;

        if (deltaTime <= 0) {
          timer.stop();

          return;
        }
        const { days, hours, minutes, seconds } = convertMs(deltaTime);

        daysRef.innerHTML = days;
        hoursRef.innerHTML = hours;
        minutesRef.innerHTML = minutes;
        secondsRef.innerHTML = seconds;
      },

      1000
    );
  },
  stop() {
    clearInterval(this.intervalId);
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

flatpickr(inputDateTimePicker, options);
