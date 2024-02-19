const mainCityContainer = document.querySelector(".main-city-container");
let counterValue = document.querySelector(".cities-counter");

counterValue.value = 3;
export function midContainer(cityData) {
  const sunnyIconClass = document.getElementById("sunny-icon-class");
  const snowyIconClass = document.getElementById("snowy-icon-class");
  const rainyIconClass = document.getElementById("rainy-icon-class");
  hideLeftButton();
  hideRightButton();
  const cityValue = document.querySelector(".city-input");
  cityValue.addEventListener("change", (g) => {
    city = g.target.value;
  });
  let sunnycities = [];
  let snowycities = [];
  let rainycities = [];
  let sunnycitiesTemp = [];
  let snowycitiesPrecep = [];
  let rainyCitiesHumidity = [];
  for (let city in cityData) {
    let [celciusVal] = cityData[city].temperature.split("\u00B0");
    let [humidityVal] = cityData[city].humidity.split("%");
    let [precepVal] = cityData[city].precipitation.split("%");
    if (celciusVal > 29 && humidityVal < 50 && precepVal >= 50) {
      sunnycities.push(city);
      sunnycitiesTemp.push(celciusVal);
    } else if (
      celciusVal > 20 &&
      celciusVal < 28 &&
      humidityVal > 50 &&
      precepVal < 50
    ) {
      snowycities.push(city);
      snowycitiesPrecep.push(precepVal);
    } else if (celciusVal < 20 && humidityVal >= 50) {
      rainycities.push(city);
      rainyCitiesHumidity.push(humidityVal);
    }
  }
  rainycities.sort(
    (a, b) => parseInt(cityData[b].humidity) - parseInt(cityData[a].humidity)
  );

  //----------------------SUNNY CITIES---------------------------------------------

  counterValue.value = 3;
  hideLeftButton();
  hideRightButton();
  sunnyIconClass.classList.add("border-bottom");
  snowyIconClass.classList.remove("border-bottom");
  rainyIconClass.classList.remove("border-bottom");
  cloningCards("sunny", sunnycities, cityData);
  document.querySelector(".cities-counter").disabled = true;

  sunnyIconClass.addEventListener("click", function () {
    counterValue.value = 3;
    hideLeftButton();
    hideRightButton();
    sunnyIconClass.classList.add("border-bottom");
    snowyIconClass.classList.remove("border-bottom");
    rainyIconClass.classList.remove("border-bottom");
    cloningCards("sunny", sunnycities, cityData);
    document.querySelector(".cities-counter").disabled = true;
  });

  //---------------------------SNOWY CITIES--------------------------------

  snowyIconClass.addEventListener("click", function () {
    counterValue.value = 2;
    hideLeftButton();
    hideRightButton();
    sunnyIconClass.classList.remove("border-bottom");
    snowyIconClass.classList.add("border-bottom");
    rainyIconClass.classList.remove("border-bottom");
    cloningCards("snowflake", snowycities, cityData);
    document.querySelector(".cities-counter").disabled = true;
  });

  //--------------RAINY CITIES-------------------------------------------------

  rainyIconClass.addEventListener("click", function () {
    counterValue.value = 3;
    sunnyIconClass.classList.remove("border-bottom");
    snowyIconClass.classList.remove("border-bottom");
    rainyIconClass.classList.add("border-bottom");
    document.querySelector(".cities-counter").disabled = false;
    cloningCards("rainy", rainycities.slice(0, 3), cityData);
    dynamicHidingButtons(mainCityContainer);

    let numberOfCities = document.querySelector(".cities-counter");
    numberOfCities.addEventListener("change", (f) => {
      let cardNum = f.target.value;
      cloningCards(
        "rainy",
        rainycities.slice(0, cardNum),
        cityData,
        "animation:none;"
      );
      if (cardNum > 4) {
        mainCityContainer.scrollLeft += 4000;
      }
      dynamicHidingButtons(mainCityContainer);
    });
  });
  document.querySelector("#leftbutton").addEventListener("click", function () {
    document.querySelector(".main-city-container").scrollLeft -= 268;
    dynamicHidingButtons(mainCityContainer);
  });
  document.querySelector("#rightbutton").addEventListener("click", function () {
    document.querySelector(".main-city-container").scrollLeft += 268;
    dynamicHidingButtons(mainCityContainer);
  });
}
//---------------------------------------------------------
function cloningCards(sunny, selectedCityArray, cityData, anime) {
  // console.log(cityCardContainer);

  mainCityContainer.innerHTML = "";
  selectedCityArray.forEach(function (city, index) {
    if (index === selectedCityArray.length - 1)
      anime = "animation:wipe-enter 1s;";
    let [updateDate, updateTime] = updateDateTime(cityData, city);
    const html = `
    <div class="city-card-container" style = "background-image: url('../../../docs/assets/Images/HTML & CSS/Icons for cities/${city}.svg');${anime}">
      <div class="card-city-name">${city}</div>
      <div class="card-city-icon">
        <img
          src="../../docs/assets/Images/HTML & CSS/Weather Icons/${sunny}Icon.svg"
          alt="sunnyicon"
        /><span id="card-city-temp">${cityData[city].temperature}</span>
      </div>
      <div class="card-city-time">${updateTime}</div>
      <div class="card-city-date">${updateDate}</div>
      <div class="card-city-humidity">
        <img
          src="../../docs/assets/Images/HTML & CSS/Weather Icons/humidityIcon.svg"
          alt="humudityicon"
        />${cityData[city].humidity}
      </div>
      <div class="card-city-precipitation">
        <img
          src="../../docs/assets/Images/HTML & CSS/Weather Icons/precipitationIcon.svg"
          alt="precipitation"
        />${cityData[city].precipitation}
      </div>
    </div>`;
    mainCityContainer.insertAdjacentHTML("beforeend", html);
  });
}
function updateDateTime(cityData, city) {
  const absoluteTime = new Date().toLocaleString("en-US", {
    timeZone: cityData[city].timeZone,
  });
  let [date, time] = absoluteTime.split(", ");
  const [currenttime, state] = time.split(" ");
  const [hours, min, sec] = currenttime.split(":");
  const [month, day, year] = date.split("/");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Aug",
    "Oct",
    "Nov",
    "Dec",
  ];
  date = day + "-" + months[month - 1] + "-" + year;
  const hour = hours + ":" + min + " " + state;
  return [date, hour];
}
function dynamicHidingButtons(mainCityContainer) {
  if (mainCityContainer.scrollWidth > mainCityContainer.clientWidth) {
    if (mainCityContainer.scrollLeft > 0) {
      showLeftButton();
    }
    if (mainCityContainer.scrollLeft === 0) {
      showRightButton();
      hideLeftButton();
    }
    if (
      mainCityContainer.scrollWidth - mainCityContainer.scrollLeft >
      mainCityContainer.clientWidth
    ) {
      showRightButton();
    }
    if (
      mainCityContainer.scrollWidth - mainCityContainer.scrollLeft <
      mainCityContainer.clientWidth
    ) {
      hideRightButton();
    }
  } else {
    hideLeftButton();
    hideRightButton();
  }
}

function showLeftButton() {
  document.querySelector("#leftbutton").style.visibility = "visible";
}

function showRightButton() {
  document.querySelector("#rightbutton").style.visibility = "visible";
}

function hideLeftButton() {
  document.querySelector("#leftbutton").style.visibility = "hidden";
}

function hideRightButton() {
  document.querySelector("#rightbutton").style.visibility = "hidden";
}
