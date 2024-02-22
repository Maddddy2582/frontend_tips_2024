const offBtn = document.querySelector(".off-btn");
const frontLed = document.querySelector(".zone-front");
const backLed = document.querySelector(".zone-back");
const leftLed = document.querySelector(".zone-left");
const rightLed = document.querySelector(".zone-right");
const zoneSec = document.querySelector(".zone-seconds");
const seconds = document.querySelector(".seconds");
const minutes = document.querySelector(".minutes");
const checkBox = document.querySelector("#mode-selector");
const totalTimer = document.querySelector(".total-timer");
const zoneSlider = document.querySelector(".zone-slider");
const radioBtns = document.querySelector(".radio-btns");
const resetBtn = document.querySelector(".reset-btn");
const hidden = document.querySelectorAll(".hidden");
const rdBtns = document.querySelectorAll(".btn");
const allLed = document.querySelectorAll(".led");
let priority = [frontLed, backLed, rightLed, leftLed];
let zoneprior;
let radioclicked;
let clickedTarget;
let zoneTimer = [1, 1, 1, 1];
let zoneSet;
let displaySecond;
let defaultSeconds = 2;
let ledGlowTime;

class Sprinkler {
  runSprinkler(priority, zoneTimer) {
    zoneSet = [...new Set(priority)];
    if (priority.length != zoneSet.length) {
      alert("You have given the same order for multiple zones");
      this.reset();
    } else {
      priority.forEach((element, index) => {
        ledGlowTime = setTimeout(
          () => {
            element.style.background = "#00FF00";
            setTimeout(() => {
              element.style.backgroundColor = "#FFFFFF";
            }, zoneTimer[index] * 1000);
          },
          zoneTimer.slice(0, index).reduce((acc, val) => acc + val, 0) * 1000
        );
      });
    }
  }

  runtime(zoneTimer) {
    seconds.textContent = "01";
    const timeElapsed = setInterval(() => {
      if (Number(defaultSeconds) < 60) {
        displaySecond = String(defaultSeconds).padStart(2, "0");
        seconds.textContent = displaySecond;
        Number(defaultSeconds);
        defaultSeconds++;
      } else if (Number(defaultSeconds) == 60) {
        minutes.textContent = "01:";
        seconds.textContent = "00";
      }
    }, 1000);

    setTimeout(
      () => {
        clearInterval(timeElapsed);
        setTimeout(() => {
          this.reset();
        }, 1000);
      },
      zoneTimer.reduce((acc, val) => acc + val, 0) * 1000 - 1000
    );
  }

  reset() {
    allLed.forEach((element) => {
      element.style.backgroundColor = "white";
    });
    rdBtns.forEach((element) => {
      element.checked = false;
    });
    checkBox.checked = false;
    zoneSlider.value = 0;
    totalTimer.textContent = "00:00";
  }
}

const sprinklerUser = new Sprinkler();

offBtn.addEventListener("click", function () {
  if (offBtn.textContent == "ON") {
    offBtn.textContent = "OFF";
    resetBtn.style.opacity = "100";
    hidden.forEach((element) => {
      element.style.opacity = "100";
    });
  } else {
    offBtn.textContent = "ON";
    resetBtn.style.opacity = "0";
    hidden.forEach((element) => {
      element.style.opacity = "0";
    });
    rdBtns.forEach((element) => {});
    sprinklerUser.reset();
  }
});

radioBtns.addEventListener("click", function (e) {
  radioclicked = e.target.getAttribute("id");
  clickedTarget = document.querySelector(".zone-" + radioclicked);
});

zoneSlider.addEventListener("click", function () {
  priority[zoneSlider.value - 1] = clickedTarget;
});

zoneSec.addEventListener("change", function () {
  zoneTimer[zoneSlider.value - 1] = Number(zoneSec.value);
  zoneSec.value = "";
});

checkBox.addEventListener("click", function () {
  sprinklerUser.runSprinkler(priority, zoneTimer);
  sprinklerUser.runtime(zoneTimer);
  rdBtns.forEach((element) => {
    element.checked = false;
  });
  zoneSlider.value = 0;
});

resetBtn.addEventListener("click", function () {
  clearInterval(ledGlowTime);
  sprinklerUser.reset();
});
//--------------------------------------------- ver1
// class Sprinkler {
//   zoneFrontTime = 0;
//   zoneBackTime = 0;
//   zoneLeftTime = 0;
//   zoneRightTime = 0;

//   constructor(zoneFrontTime, zoneBackTime, zoneLeftTime, zoneRightTime) {
//     this.zoneFrontTime = zoneFrontTime;
//     this.zoneBackTime = zoneBackTime;
//     this.zoneLeftTime = zoneLeftTime;
//     this.zoneRightTime = zoneRightTime;
//   }

//   waterFrontZone() {
//     frontLed.style.backgroundColor = "#00FF00";
//     setTimeout(() => {
//       frontLed.style.backgroundColor = "#FFFFFF";

//       this.waterBackZone();
//     }, this.zoneFrontTime * 1000);
//   }
//   waterBackZone() {
//     backLed.style.backgroundColor = "#00FF00";
//     setTimeout(() => {
//       backLed.style.backgroundColor = "#FFFFFF";

//       this.waterRightZone();
//     }, this.zoneBackTime * 1000);
//   }

//   waterRightZone() {
//     rightLed.style.backgroundColor = "#00FF00";
//     setTimeout(() => {
//       rightLed.style.backgroundColor = "#FFFFFF";

//       this.waterLeftZone();
//     }, this.zoneRightTime * 1000);
//   }

//   waterLeftZone() {
//     leftLed.style.backgroundColor = "#00FF00";

//     setTimeout(() => {
//       leftLed.style.backgroundColor = "#FFFFFF";
//       checkBoxLabel.textContent = "SETUP MODE";
//     }, this.zoneLeftTime * 1000);
//   }

//   totalTime() {
//     const timeElapsed = setInterval(() => {
//       seconds.textContent = defaultSeconds;
//       defaultSeconds++;
//     }, 1000);

//     setTimeout(
//       () => {
//         clearInterval(timeElapsed);
//         seconds.textContent = "00";
//         checkBox.checked = false;
//       },
//       Number(this.zoneFrontTime * 1000) +
//         Number(this.zoneBackTime * 1000) +
//         Number(this.zoneLeftTime * 1000) +
//         Number(this.zoneRightTime * 1000)
//     );
//   }
// }

// const sprinklerUser = new Sprinkler(1, 1, 1, 1);

// radioBack.addEventListener("click", function () {
//   sprinklerUser.zoneFrontTime = zoneSec.value;
//   zoneSec.value = "";
// });

// radioRight.addEventListener("click", function () {
//   sprinklerUser.zoneBackTime = zoneSec.value;
//   zoneSec.value = "";
// });

// radioLeft.addEventListener("click", function () {
//   sprinklerUser.zoneRightTime = zoneSec.value;
//   zoneSec.value = "";
// });

// checkBox.addEventListener("click", function () {
//   checkBoxLabel.textContent = "RUN MODE";
//   sprinklerUser.zoneLeftTime = zoneSec.value;
//   zoneSec.value = "";
//   radioLeft.checked = false;
//   sprinklerUser.waterFrontZone();
//   sprinklerUser.totalTime();
// });

// offBtn.addEventListener("click", function () {
//   offBtn.textContent =
//     offBtn.textContent == "OFF"
//       ? (offBtn.textContent = "ON")
//       : (offBtn.textContent = "OFF");
// });

//-------------------------------------------------------------------------- ver2

// class SprinklerDirection {
//   constructor(time) {
//     this.time = time;
//   }

//   water(duration) {
//     console.log(duration);
//   }
// }

// const front = new SprinklerDirection(1);
// const back = new SprinklerDirection(1);
// const left = new SprinklerDirection(1);
// const right = new SprinklerDirection(1);
// let priority = [];

// zoneSlider.addEventListener("change", function () {
//   zoneprior = zoneSlider.value;
// });

// radioBtns.addEventListener("click", function (e) {
//   const selectedValue = e.target;
//   selectedZoneId = selectedValue.getAttribute("id");
//   priority[zoneprior - 1] = selectedZoneId;
//   console.log(priority);
// });

// zoneSec.addEventListener("change", function () {
//   console.log(selectedZoneId);
//   console.log(zoneSec.value);
//   selectedZoneId.time = zoneSec.value;
//   console.log(front);
// });
