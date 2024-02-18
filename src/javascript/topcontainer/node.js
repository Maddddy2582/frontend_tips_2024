let cityData;
let city;
(async () => {
  const data = await fetch(
    "../../docs/assets/Images/HTML & CSS/files/data.json"
  );
  cityData = await data.json();
  topContainer();
  midcontainer();
})();

/**
 *
 * @param imgid
 * @param city
 */
function topContainer() {
  const cityInput = document.querySelector(".city-input");
  cityInput.addEventListener("change", (e) => {
    city = e.target.value;
    console.log(city);
    if (Object.keys(cityData).includes(city)) {
      updatedTime();
    } else {
      resetTime();
    }
  });
}

function changeTempValues() {
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

function changeState(state1) {
  if (state1 === "PM") {
    document.getElementById("state-img").src =
      "../../docs/assets/Images/HTML & CSS/General Images & Icons/pmState.svg";
  } else {
    document.getElementById("state-img").src =
      "../../docs/assets/Images/HTML & CSS/General Images & Icons/amState.svg";
  }
}

function changeMainImage(city) {
  document.getElementById("city-img").src =
    "../../docs/assets/Images/HTML & CSS/Icons for cities/" + city + ".svg";
}

function changeFourValues(city) {
  document.getElementById("tempid").innerText = `${cityData[city].temperature}`;
  const [celciusVal] = cityData[city].temperature.split("\u00B0");
  document.getElementById("farenid").innerText =
    (celciusVal * 1.8 + 32).toFixed(1) + " F";
  document.getElementById(
    "humidityid"
  ).innerText = `${cityData[city].humidity}`;
  document.getElementById(
    "precipitationid"
  ).innerText = `${cityData[city].precipitation}`;
}

function hours(hr, state1) {
  const changeTime = document.querySelectorAll(".change-time");
  const timeForcast = Array.from(changeTime).map(
    (element) => element.textContent
  );
  for (let i = 0, currentTime = hr; i < timeForcast.length; i++) {
    if (state1 === "AM") {
      if (currentTime < 11) {
        currentTime++;
        timeForcast[i] = currentTime + "AM";
        changeTime[i].textContent = timeForcast[i];
      } else if (currentTime === "11") {
        currentTime++;
        timeForcast[i] = currentTime + "PM";
        state = "PM";
        changeTime[i].textContent = timeForcast[i];
      } else if (currentTime === "12") {
        timeForcast[i] = 1 + "AM";
        currentTime = 1;
        state1 = "AM";
        changeTime[i].textContent = timeForcast[i];
      }
    } else {
      if (currentTime < 11) {
        currentTime++;
        timeForcast[i] = currentTime + "PM";
        changeTime[i].textContent = timeForcast[i];
      } else if (currentTime === "11") {
        currentTime++;
        timeForcast[i] = currentTime + "AM";
        state1 = "AM";
        changeTime[i].textContent = timeForcast[i];
      } else if (currentTime === "12") {
        timeForcast[i] = 1 + "PM";
        currentTime = 1;
        state1 = "PM";
        changeTime[i].textContent = timeForcast[i];
      }
    }
  }
}

//----------------------------------------------------------------------------------------------------------------------------
function updatedTime() {
  const absoluteTime = new Date().toLocaleString("en-US", {
    timeZone: cityData[city].timeZone,
  });

  const [date, time] = absoluteTime.split(", ");
  document.getElementById("datejs").innerText = date.replaceAll("/", "-");
  let [currenttime, state] = time.split(" ");
  const [hr, min, sec] = currenttime.split(":");
  document.getElementById("time").innerText = hr + ":" + min;
  document.getElementById("sec").innerText = ":" + sec;
  document.querySelector(".hourly-info").style.visibility = "visible";

  changeTempValues();
  changeState(state);
  changeMainImage(city);
  changeFourValues(city);
  hours(hr, state);

  const changeTempClass = document.querySelectorAll(".tempValue");
  const cloudTemp = Array.from(changeTempClass).map(
    (element) => element.textContent
  );
  for (let j = 0; j < 5; j++) {
    let [cloudTempData] = cloudTemp[j].split("\u00B0");
    cloudTempData = Number(cloudTempData);
    changeimg(cloudTempData, j);
  }
  function changeimg(changingValue, j) {
    if (changingValue > 23 && changingValue < 29) {
      document.querySelectorAll(".cloud-img")[j].src =
        "../../docs/assets/Images/HTML & CSS/Weather Icons/cloudyIcon.svg";
    } else if (changingValue <= 18) {
      document.querySelectorAll(".cloud-img")[j].src =
        "../../docs/assets/Images/HTML & CSS/Weather Icons/rainyIconBlack.svg";
    } else if (changingValue > 18 && changingValue <= 22) {
      document.querySelectorAll(".cloud-img")[j].src =
        "../../docs/assets/Images/HTML & CSS/Weather Icons/windyIcon.svg";
    } else {
      document.querySelectorAll(".cloud-img")[j].src =
        "../../docs/assets/Images/HTML & CSS/Weather Icons/sunnyIcon.svg";
    }
  }
  setTimeout(updatedTime, 1000);
}
function resetTime() {
  alert("Invalid City");
  document.getElementById("tempid").innerText = "---";
  document.getElementById("farenid").innerText = "---";
  document.getElementById("humidityid").innerText = "---";
  document.getElementById("precipitationid").innerText = "---";
  document.getElementById("time").innerText = "--:--";
  document.getElementById("sec").innerText = " ";
  document.getElementById("datejs").innerText = "__-__-__";
  document.querySelector(".hourly-info").style.visibility = "hidden";
}

let cardNum;
function midcontainer() {
  const numberOfCities = document.querySelector(".cities-counter");
  numberOfCities.addEventListener("change", (f) => {
    cardNum = f.target.value;
    cardClone(cardNum);
  });
}

function cardClone() {
  const mainCityContainer = document.querySelector(".main-city-container");
  const cardContainer = document.querySelector(".card-container");
  while (mainCityContainer.firstChild) {
    mainCityContainer.removeChild(mainCityContainer.firstChild);
  }
  for (let i = 0; i < Number(cardNum); i++) {
    const cloneCard = cardContainer.cloneNode(true);
    mainCityContainer.appendChild(cloneCard);
  }
}
