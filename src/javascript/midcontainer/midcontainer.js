let cardNum;
const mainCityContainer = document.querySelector(".main-city-container");

export function midContainer(cityData) {
  hidebutton();

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
  const sunnyIconClass = document.getElementById("sunny-icon-class");
  sunnyIconClass.addEventListener("click", function () {
    hidebutton();
    sunnyIconClass.classList.add("border-bottom");
    snowyIconClass.classList.remove("border-bottom");
    rainyIconClass.classList.remove("border-bottom");
    cloningCards("sunny", sunnycities, cityData);
    document.querySelector(".city-card-container").style.animation =
      "wipe-enter 1s";

    document.querySelector(".cities-counter").disabled = true;
  });

  //---------------------------SNOWY CITIES--------------------------------
  const snowyIconClass = document.getElementById("snowy-icon-class");
  snowyIconClass.addEventListener("click", function () {
    hidebutton();
    sunnyIconClass.classList.remove("border-bottom");
    snowyIconClass.classList.add("border-bottom");
    rainyIconClass.classList.remove("border-bottom");
    cloningCards("snowflake", snowycities, cityData);
    document.querySelector(".city-card-container").style.animation =
      "wipe-enter 1s";
    document.querySelector(".cities-counter").disabled = true;
  });

  //--------------RAINY CITIES-------------------------------------------------
  const rainyIconClass = document.getElementById("rainy-icon-class");
  rainyIconClass.addEventListener("click", function () {
    showbutton();
    sunnyIconClass.classList.remove("border-bottom");
    snowyIconClass.classList.remove("border-bottom");
    rainyIconClass.classList.add("border-bottom");
    let counterValue = document.querySelector(".cities-counter").value;
    document.querySelector(".cities-counter").disabled = false;

    cloningCards("rainy", rainycities.slice(0, counterValue), cityData);

    let numberOfCities = document.querySelector(".cities-counter");
    numberOfCities.addEventListener("change", (f) => {
      showbutton();
      document.querySelector(".city-card-container").style.animation = "none";
      cardNum = f.target.value;
      cloningCards("rainy", rainycities.slice(0, cardNum), cityData);
    });
  });
  document.querySelector("#leftbutton").addEventListener("click", function () {
    document.querySelector(".main-city-container").scrollLeft -= 260;
  });
  document.querySelector("#rightbutton").addEventListener("click", function () {
    document.querySelector(".main-city-container").scrollLeft += 260;
  });
}
//---------------------------------------------------------
function hidebutton() {
  document.querySelector("#leftbutton").style.visibility = "hidden";
  document.querySelector("#rightbutton").style.visibility = "hidden";
}

function showbutton() {
  let counterValue = document.querySelector(".cities-counter");
  if (counterValue.value > 5) {
    document.querySelector("#leftbutton").style.visibility = "visible";
    document.querySelector("#rightbutton").style.visibility = "visible";
    document.querySelector(".main-city-container").scrollLeft += 310;
  } else {
    document.querySelector("#leftbutton").style.visibility = "hidden";
    document.querySelector("#rightbutton").style.visibility = "hidden";
  }
}
function setTime(liveTime, nodeList, j) {
  let [date, time] = liveTime.split(", ");
  nodeList[j].querySelector(".card-city-time").textContent = `${time}`;
  return date;
}

function cloningCards(sunny, selectedCityArray, cityData) {
  mainCityContainer.innerHTML = "";
  selectedCityArray.forEach(function (city) {
    const html = `
    <div class="city-card-container" style = "background-image: url('../../../docs/assets/Images/HTML & CSS/Icons for cities/${city}.svg');">
      <div class="card-city-name">${city}</div>
      <div class="card-city-icon">
        <img
          src="../../docs/assets/Images/HTML & CSS/Weather Icons/${sunny}Icon.svg"
          alt="sunnyicon"
        /><span id="card-city-temp">${cityData[city].temperature}</span>
      </div>
      <div class="card-city-time">10:00AM</div>
      <div class="card-city-date">2-MAR-2020</div>
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
