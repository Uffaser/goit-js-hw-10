import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
    timepicker: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('button[data-start]'),
    timer: document.querySelector('.js-timer'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

function disable() {
    refs.startBtn.disabled = true;
    refs.startBtn.classList.add('disable');
    refs.startBtn.classList.remove('enable');
}

function enable() {
    refs.startBtn.disabled = false;
    refs.startBtn.classList.add('enable');
    refs.startBtn.classList.remove('disable');
}

disable();

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= new Date()) {
            iziToast.error({
                title: '',
                message: 'Please choose a date in the future',
                position: 'topRight',
            });

            disable();
        } else {
            userSelectedDate = selectDate.selectedDates[0];
            console.log(userSelectedDate);

            enable();
        }
    },
};

refs.startBtn.addEventListener('click', () => {
    timerValue.start();
});

const timerValue = {
    intervalID: null,
    isActive: false,
    diff: 0,

    start() {
        if (this.isActive) return;
        disable();
        refs.timepicker.disabled = true;

        this.intervalID = setInterval(() => {
            this.isActive = true;

            const currentTime = new Date();
            this.diff = userSelectedDate - currentTime;

            const result = convertMs(this.diff);
            addLeadingZero(result);
            if (result.seconds === -1) {
                refs.days.textContent = '00';
                refs.hours.textContent = '00';
                refs.minutes.textContent = '00';
                refs.seconds.textContent = '00';
            }

            if (this.diff <= 0) {
                clearInterval(this.intervalID);

                this.isActive = false;
                refs.timepicker.disabled = false;
            }
        }, 1000);
    },
};

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
    refs.days.textContent = value.days.toString().padStart(2, 0);
    refs.hours.textContent = value.hours.toString().padStart(2, 0);
    refs.minutes.textContent = value.minutes.toString().padStart(2, 0);
    refs.seconds.textContent = value.seconds.toString().padStart(2, 0);
}

const selectDate = flatpickr('#datetime-picker', options);
