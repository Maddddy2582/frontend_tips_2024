/**
 *
 * @param cityData
 * @param city
 * @param hours
 * @param state
 */
export function updateWeatherForecast (cityData, city, hours, state) {
  const changeTime = document.querySelectorAll(".change-time");
  const timeForcast = Array.from(changeTime).map(
    (element) => element.textContent
  );
  changeTempValues(cityData, city);
  const changeTempClass = document.querySelectorAll(".tempValue");
  const cloudTemp = Array.from(changeTempClass).map(
    (element) => element.textContent
  );
  let changeTimeState, states;
  for (let i = 0, currentTime = Number(hours); i < timeForcast.length; i++) {
    if (state === "AM") {
      [changeTimeState, states] = updateStateAm(
        currentTime,
        timeForcast,
        changeTime,
        state,
        i
      );
      currentTime = changeTimeState;
      state = states;
    } else {
      [changeTimeState, states] = updateStatePm(
        currentTime,
        timeForcast,
        changeTime,
        state,
        i
      );
      currentTime = changeTimeState;
      state = states;
    }
    for (let j = 0; j < 5; j++) {
      let [cloudTempData] = cloudTemp[j].split("\u00B0");
      cloudTempData = Number(cloudTempData);
      changeimg(cloudTempData, j);
    }
  }
}

/**
 *
 * @param currentTime
 * @param timeForcast
 * @param changeTime
 * @param state
 * @param i
 */
function updateStatePm (currentTime, timeForcast, changeTime, state, i) {
  if (currentTime < 11) {
    currentTime++;
    timeForcast[i] = currentTime + "PM";
    changeTime[i].textContent = timeForcast[i];
  } else if (currentTime === 11) {
    currentTime++;
    timeForcast[i] = currentTime + "AM";
    state = "AM";
    changeTime[i].textContent = timeForcast[i];
  } else if (currentTime === 12) {
    timeForcast[i] = "1PM";
    currentTime = 1;
    state = "PM";
    changeTime[i].textContent = timeForcast[i];
  }
  return [currentTime, state];
}

/**
 *
 * @param currentTime
 * @param timeForcast
 * @param changeTime
 * @param state
 * @param i
 */
function updateStateAm (currentTime, timeForcast, changeTime, state, i) {
  if (currentTime < 11) {
    currentTime++;
    timeForcast[i] = currentTime + "AM";
    changeTime[i].textContent = timeForcast[i];
  } else if (currentTime === 11) {
    currentTime++;
    timeForcast[i] = currentTime + "PM";
    state = "PM";
    changeTime[i].textContent = timeForcast[i];
  } else if (currentTime === 12) {
    timeForcast[i] = "1AM";
    currentTime = 1;
    state = "AM";
    changeTime[i].textContent = timeForcast[i];
  }
  return [currentTime, state];
}

/**
 *
 * @param cityData
 * @param city
 */
function changeTempValues (cityData, city) {
  document.getElementById(
    "change-temp-now"
  ).innerText = `${cityData[city].temperature}`;
  document.getElementById(
    "change-temp1"
  ).innerText = `${cityData[city].nextFiveHrs[0]}`;
  document.getElementById(
    "change-temp2"
  ).innerText = `${cityData[city].nextFiveHrs[1]}`;
  document.getElementById(
    "change-temp3"
  ).innerText = `${cityData[city].nextFiveHrs[2]}`;
  document.getElementById(
    "change-temp4"
  ).innerText = `${cityData[city].nextFiveHrs[3]}`;
}

/**
 *
 * @param cloudTempData
 */
function isCloudy (cloudTempData) {
  return cloudTempData > 23 && cloudTempData < 29;
}

/**
 *
 * @param cloudTempData
 */
function isRainy (cloudTempData) {
  return cloudTempData <= 18;
}

/**
 *
 * @param cloudTempData
 */
function isWindy (cloudTempData) {
  return cloudTempData > 18 && cloudTempData <= 22;
}

/**
 *
 * @param cloudTempData
 */
function isSunny (cloudTempData) {
  return cloudTempData > 29;
}

/**
 *
 * @param cloudTempData
 * @param j
 */
function changeimg (cloudTempData, j) {
  if (isCloudy(cloudTempData)) {
    document.querySelectorAll(".cloud-img")[j].src =
      "../../docs/assets/Images/HTML & CSS/Weather Icons/cloudyIcon.svg";
  }
  if (isRainy(cloudTempData)) {
    document.querySelectorAll(".cloud-img")[j].src =
      "../../docs/assets/Images/HTML & CSS/Weather Icons/rainyIconBlack.svg";
  }
  if (isWindy(cloudTempData)) {
    document.querySelectorAll(".cloud-img")[j].src =
      "../../docs/assets/Images/HTML & CSS/Weather Icons/windyIcon.svg";
  }
  if (isSunny(cloudTempData)) {
    document.querySelectorAll(".cloud-img")[j].src =
      "../../docs/assets/Images/HTML & CSS/Weather Icons/sunnyIcon.svg";
  }
}
