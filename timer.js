// TIMER_DEDLINE = new Date(2023, 6, 8, 12, 45);
// const timerEl = document.querySelector(".js-timer-items");

const timer = {
  timerDedline: new Date(2023, 6, 8, 13, 45),
  intervalId: null,
  rootSelector: document.querySelector(".js-timer-items"),
  start() {
    this.intervalId = setInterval(() => {
      const diff = this.timerDedline - Date.now();
      if (diff <= 0) {
        this.stop();
        return;
      }
      this.makeMarkup(this.getTimeComponents(diff));
      this.pritifyMarkup(this.getTimeComponents(diff));
    }, 1000);
  },

  stop() {
    clearInterval(this.intervalId);
  },

  pritifyMarkup(obj) {
    const { days, hours, minutes, seconds } = obj;
    this.rootSelector.querySelector(".js-timer__days").dataset.title =
      this.declensionNum(days, ["день", "дні", "днів"]);
    this.rootSelector.querySelector(".js-timer__hours").dataset.title =
      this.declensionNum(hours, ["година", "години", "годин"]);
    this.rootSelector.querySelector(".js-timer__minutes").dataset.title =
      this.declensionNum(minutes, ["хвилина", "хвилини", "хвилин"]);
    this.rootSelector.querySelector(".js-timer__seconds").dataset.title =
      this.declensionNum(seconds, ["секунда", "секунди", "секунд"]);
  },

  makeMarkup(obj) {
    const { days, hours, minutes, seconds } = obj;
    this.rootSelector.querySelector(".js-timer__days").textContent =
      this.pad(days);
    this.rootSelector.querySelector(".js-timer__hours").textContent =
      this.pad(hours);
    this.rootSelector.querySelector(".js-timer__minutes").textContent =
      this.pad(minutes);
    this.rootSelector.querySelector(".js-timer__seconds").textContent =
      this.pad(seconds);
  },

  getTimeComponents(diff) {
    const days = Math.floor(diff / 1000 / 60 / 60 / 24);
    const hours = Math.floor(diff / 1000 / 60 / 60) % 24;
    const minutes = Math.floor(diff / 1000 / 60) % 60;
    const seconds = Math.floor(diff / 1000) % 60;

    return {
      days,
      hours,
      minutes,
      seconds,
    };
  },

  pad(value) {
    return String(value).padStart(2, 0);
  },

  declensionNum(num, words) {
    return words[
      num % 100 > 4 && num % 100 < 20
        ? 2
        : [2, 0, 1, 1, 1, 2][num % 10 < 5 ? num % 10 : 5]
    ];
  },
};

timer.start();

// Остановка таймера
// setTimeout(() => {
//   timer.stop();
// }, 5000);
// 

// this.declensionNum(days, ['день', 'дні', 'днів']);
// this.declensionNum(hours, ['година', 'години', 'годин']);
// this.declensionNum(minutes, ['хвилина', 'хвилини', 'хвилин']);
// this.declensionNum(seconds, ['секунда', 'секунди', 'секунд']);

// const str = '52';

// console.log(str.padStart(5, 'kl'));
