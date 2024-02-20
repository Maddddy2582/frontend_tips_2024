const offBtn = document.querySelector(".off-btn");
const frontLed = document.querySelector(".zone-front");
const backLed = document.querySelector(".zone-back");
const leftLed = document.querySelector(".zone-left");
const rightLed = document.querySelector(".zone-right");
const radioFront = document.getElementById("front");
const radioBack = document.getElementById("back");
const radioLeft = document.getElementById("left");
const radioRight = document.getElementById("right");
const zoneSec = document.querySelector(".zone-seconds");
const checkBoxLabel = document.querySelector(".checkbox-label");
const checkBox = document.querySelector("#mode-selector");
const totalTimer = document.querySelector(".total-timer");
const seconds = document.querySelector(".seconds");
let defaultSeconds = 1;

class Sprinkler {
  zoneFrontTime = 0;
  zoneBackTime = 0;
  zoneLeftTime = 0;
  zoneRightTime = 0;

  constructor(zoneFrontTime, zoneBackTime, zoneLeftTime, zoneRightTime) {
    this.zoneFrontTime = zoneFrontTime;
    this.zoneBackTime = zoneBackTime;
    this.zoneLeftTime = zoneLeftTime;
    this.zoneRightTime = zoneRightTime;
  }

  waterFrontZone() {
    frontLed.style.backgroundColor = "#00FF00";
    setTimeout(() => {
      frontLed.style.backgroundColor = "#FFFFFF";

      this.waterBackZone();
    }, this.zoneFrontTime * 1000);
  }
  waterBackZone() {
    backLed.style.backgroundColor = "#00FF00";
    setTimeout(() => {
      backLed.style.backgroundColor = "#FFFFFF";

      this.waterLeftZone();
    }, this.zoneBackTime * 1000);
  }
  waterLeftZone() {
    leftLed.style.backgroundColor = "#00FF00";
    setTimeout(() => {
      leftLed.style.backgroundColor = "#FFFFFF";

      this.waterRightZone();
    }, this.zoneLeftTime * 1000);
  }
  waterRightZone() {
    rightLed.style.backgroundColor = "#00FF00";
    setTimeout(() => {
      rightLed.style.backgroundColor = "#FFFFFF";
      checkBoxLabel.textContent = "SETUP MODE";
      checkBox.value = undefined;
    }, this.zoneRightTime * 1000);
  }

  totalTime() {
    const timeElapsed = setInterval(() => {
      seconds.textContent = defaultSeconds;
      defaultSeconds++;
    }, 1000);

    setTimeout(
      () => {
        clearInterval(timeElapsed);
        seconds.textContent = "00";
      },
      Number(this.zoneFrontTime * 1000) +
        Number(this.zoneBackTime * 1000) +
        Number(this.zoneLeftTime * 1000) +
        Number(this.zoneRightTime * 1000)
    );
  }
}

const sprinklerUser = new Sprinkler(0, 0, 0, 0);

radioBack.addEventListener("click", function () {
  sprinklerUser.zoneFrontTime = zoneSec.value;
  zoneSec.value = "";
});

radioLeft.addEventListener("click", function () {
  sprinklerUser.zoneBackTime = zoneSec.value;
  zoneSec.value = "";
});

radioRight.addEventListener("click", function () {
  sprinklerUser.zoneLeftTime = zoneSec.value;
  zoneSec.value = "";
});

checkBox.addEventListener("click", function () {
  checkBoxLabel.textContent = "RUN MODE";
  sprinklerUser.zoneRightTime = zoneSec.value;
  zoneSec.value = "";
  console.log(sprinklerUser);
  sprinklerUser.waterFrontZone();
  sprinklerUser.totalTime();
});

offBtn.addEventListener("click", function () {
  offBtn.textContent =
    offBtn.textContent == "OFF"
      ? (offBtn.textContent = "ON")
      : (offBtn.textContent = "OFF");
});
