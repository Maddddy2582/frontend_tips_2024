export function changeHours(cityData, city, hours, state) {
  const changeTime = document.querySelectorAll(".change-time");
  const timeForcast = Array.from(changeTime).map(
    (element) => element.textContent
  );
  changeTempValues(cityData, city);
  const changeTempClass = document.querySelectorAll(".tempValue");
  const cloudTemp = Array.from(changeTempClass).map(
    (element) => element.textContent
  );
  //console.log(hours);
  console.log(state);
  let summa;
  for (let i = 0, currentTime = Number(hours); i < timeForcast.length; i++) {
    if (state === "AM") {
      summa = changeStateAm(currentTime, timeForcast, changeTime, state, i);
      currentTime = summa;
    } else {
      summa = changeStatePm(currentTime, timeForcast, changeTime, state, i);
      currentTime = summa;
    }
    for (let j = 0; j < 5; j++) {
      let [cloudTempData] = cloudTemp[j].split("\u00B0");
      cloudTempData = Number(cloudTempData);
      changeimg(cloudTempData, j);
    }
  }
}

function changeStatePm(currentTime, timeForcast, changeTime, state, i) {
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
  return currentTime;
}

function changeStateAm(currentTime, timeForcast, changeTime, state, i) {
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
    timeForcast[i] = `1AM`;
    currentTime = 1;
    state = "AM";
    changeTime[i].textContent = timeForcast[i];
  }
  return currentTime;
}

function changeTempValues(cityData, city) {
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

function changeimg(cloudTempData, j) {
  if (cloudTempData > 23 && cloudTempData < 29) {
    document.querySelectorAll(".cloud-img")[j].src =
      "../../docs/assets/Images/HTML & CSS/Weather Icons/cloudyIcon.svg";
  } else if (cloudTempData <= 18) {
    document.querySelectorAll(".cloud-img")[j].src =
      "../../docs/assets/Images/HTML & CSS/Weather Icons/rainyIconBlack.svg";
  } else if (cloudTempData > 18 && cloudTempData <= 22) {
    document.querySelectorAll(".cloud-img")[j].src =
      "../../docs/assets/Images/HTML & CSS/Weather Icons/windyIcon.svg";
  } else {
    document.querySelectorAll(".cloud-img")[j].src =
      "../../docs/assets/Images/HTML & CSS/Weather Icons/sunnyIcon.svg";
  }
}
