let cardNum;

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

  //   function setTime(anycity, k) {
  //     console.log(anycity, k);
  //     let liveTime = new Date().toLocaleString("en-US", {
  //       timeZone: cityData[anycity[k]].timeZone,
  //     });
  //     let [date, time] = liveTime.split(", ");
  //     return date, time;
  //   }
  //----------------------SUNNY CITIES---------------------------------------------
  const sunnyIconClass = document.getElementById("sunny-icon-class");
  sunnyIconClass.addEventListener("click", function () {
    hidebutton();
    sunnyIconClass.classList.add("border-bottom");
    snowyIconClass.classList.remove("border-bottom");
    rainyIconClass.classList.remove("border-bottom");
    const mainCityContainer = document.querySelector(".main-city-container");
    let cardContainer = document.querySelector(".city-card-container");
    while (mainCityContainer.firstChild) {
      mainCityContainer.removeChild(mainCityContainer.firstChild);
    }
    for (let i = 0; i < sunnycities.length; i++) {
      const cloneCard = cardContainer.cloneNode(true);
      mainCityContainer.appendChild(cloneCard);
    }
    let nodeList = document.querySelectorAll(".city-card-container");
    for (let j = 0; j < sunnycities.length; j++) {
      //   setTime(sunnycities, j);
      let liveTime = new Date().toLocaleString("en-US", {
        timeZone: cityData[sunnycities[j]].timeZone,
      });
      let [date, time] = liveTime.split(", ");
      //setInterval(setTime,1000)
      nodeList[j].querySelector(".card-city-time").textContent = `${time}`;
      nodeList[j].querySelector(".card-city-date").textContent = `${date}`;
      nodeList[
        j
      ].style.backgroundImage = `url('../../docs/assets/Images/HTML & CSS/Icons for cities/${sunnycities[j]}.svg')`;
      nodeList[j].querySelector(
        ".card-city-name"
      ).textContent = `${sunnycities[j]}`;
      nodeList[j].querySelector(".card-city-icon").src =
        "../../docs/assets/Images/HTML & CSS/Weather Icons/sunnyIcon.svg";
      nodeList[j].querySelector("#card-city-temp").textContent = `${
        cityData[sunnycities[j]].temperature
      }`;
      nodeList[j].querySelector(".card-city-humidity").textContent = `${
        cityData[sunnycities[j]].humidity
      }`;
      nodeList[j].querySelector(".card-city-precipitation").textContent = `${
        cityData[sunnycities[j]].precipitation
      }`;
    }
    document.querySelector(".cities-counter").disabled = true;
  });

  //---------------------------SNOWY CITIES--------------------------------
  const snowyIconClass = document.getElementById("snowy-icon-class");
  snowyIconClass.addEventListener("click", function () {
    hidebutton();
    sunnyIconClass.classList.remove("border-bottom");
    snowyIconClass.classList.add("border-bottom");
    rainyIconClass.classList.remove("border-bottom");
    let counterValue = document.querySelector(".cities-counter");
    counterValue.place = 2;
    const mainCityContainer = document.querySelector(".main-city-container");
    let cardContainer = document.querySelector(".city-card-container");
    while (mainCityContainer.firstChild) {
      mainCityContainer.removeChild(mainCityContainer.firstChild);
    }
    for (let i = 0; i < snowycities.length; i++) {
      const cloneCard = cardContainer.cloneNode(true);
      mainCityContainer.appendChild(cloneCard);
    }

    let nodeList = document.querySelectorAll(".city-card-container");

    for (let j = 0; j < snowycities.length; j++) {
      nodeList[
        j
      ].style.backgroundImage = `url('../../docs/assets/Images/HTML & CSS/Icons for cities/${snowycities[j]}.svg')`;
      nodeList[j].querySelector(
        ".card-city-name"
      ).textContent = `${snowycities[j]}`;
      nodeList[j].querySelector(".card-city-icon").src =
        "../../docs/assets/Images/HTML & CSS/Weather Icons/snowflakeIcon.svg";
      nodeList[j].querySelector("#card-city-temp").textContent = `${
        cityData[snowycities[j]].temperature
      }`;
      const [date, time] = cityData[snowycities[j]].dateAndTime.split(", ");
      nodeList[j].querySelector(".card-city-time").textContent = `${time}`;
      console.log(document.querySelector(".card-city-time").textContent);
      nodeList[j].querySelector(".card-city-date").textContent = `${date}`;
      nodeList[j].querySelector(".card-city-humidity").textContent = `${
        cityData[snowycities[j]].humidity
      }`;
      nodeList[j].querySelector(".card-city-precipitation").textContent = `${
        cityData[snowycities[j]].precipitation
      }`;
    }
    document.querySelector(".cities-counter").disabled = true;
  });

  //--------------RAINY CITIES-------------------------------------------------

  const rainyIconClass = document.getElementById("rainy-icon-class");
  rainyIconClass.addEventListener("click", function () {
    showbutton();
    sunnyIconClass.classList.remove("border-bottom");
    snowyIconClass.classList.remove("border-bottom");
    rainyIconClass.classList.add("border-bottom");
    let counterValue = document.querySelector(".cities-counter");
    console.log(counterValue.value);

    document.querySelector(".cities-counter").disabled = false;
    const mainCityContainer = document.querySelector(".main-city-container");
    let cardContainer = document.querySelector(".city-card-container");
    while (mainCityContainer.firstChild) {
      mainCityContainer.removeChild(mainCityContainer.firstChild);
    }
    for (let i = 0; i < counterValue.value; i++) {
      const cloneCard = cardContainer.cloneNode(true);
      mainCityContainer.appendChild(cloneCard);
    }

    let nodeList = document.querySelectorAll(".city-card-container");

    for (let j = 0; j < counterValue.value; j++) {
      console.log(rainycities[j]);
      nodeList[
        j
      ].style.backgroundImage = `url('../../docs/assets/Images/HTML & CSS/Icons for cities/${rainycities[j]}.svg')`;
      nodeList[j].querySelector(".card-city-icon").src =
        "../../docs/assets/Images/HTML & CSS/Weather Icons/rainyIcon.svg";
      nodeList[j].querySelector(
        ".card-city-name"
      ).textContent = `${rainycities[j]}`;
      nodeList[j].querySelector("#card-city-temp").textContent = `${
        cityData[rainycities[j]].temperature
      }`;
      const [date, time] = cityData[rainycities[j]].dateAndTime.split(", ");
      nodeList[j].querySelector(".card-city-time").textContent = `${time}`;
      nodeList[j].querySelector(".card-city-date").textContent = `${date}`;
      nodeList[j].querySelector(".card-city-humidity").textContent = `${
        cityData[rainycities[j]].humidity
      }`;
      nodeList[j].querySelector(".card-city-precipitation").textContent = `${
        cityData[rainycities[j]].precipitation
      }`;
    }
    let numberOfCities = document.querySelector(".cities-counter");
    numberOfCities.addEventListener("change", (f) => {
      showbutton();
      cardNum = f.target.value;
      const mainCityContainer = document.querySelector(".main-city-container");
      let cardContainer = document.querySelector(".city-card-container");
      while (mainCityContainer.firstChild) {
        mainCityContainer.removeChild(mainCityContainer.firstChild);
      }
      for (let i = 0; i < cardNum; i++) {
        const cloneCard = cardContainer.cloneNode(true);
        mainCityContainer.appendChild(cloneCard);
      }

      let nodeList = document.querySelectorAll(".city-card-container");
      console.log(rainycities.length);
      for (let j = 0; j < cardNum; j++) {
        console.log(nodeList[j]);
        nodeList[
          j
        ].style.backgroundImage = `url('../../docs/assets/Images/HTML & CSS/Icons for cities/${rainycities[j]}.svg')`;
        nodeList[j].querySelector(
          ".card-city-name"
        ).textContent = `${rainycities[j]}`;
        nodeList[j].querySelector(".card-city-icon").src =
          "../../docs/assets/Images/HTML & CSS/Weather Icons/rainyIcon.svg";
        nodeList[j].querySelector("#card-city-temp").textContent = `${
          cityData[rainycities[j]].temperature
        }`;
        const [date, time] = cityData[rainycities[j]].dateAndTime.split(", ");
        nodeList[j].querySelector(".card-city-time").textContent = `${time}`;
        nodeList[j].querySelector(".card-city-date").textContent = `${date}`;
        nodeList[j].querySelector(".card-city-humidity").textContent = `${
          cityData[rainycities[j]].humidity
        }`;
        nodeList[j].querySelector(".card-city-precipitation").textContent = `${
          cityData[rainycities[j]].precipitation
        }`;
      }
    });
  });
  document.querySelector("#leftbutton").addEventListener("click", function () {
    document.querySelector(".main-city-container").scrollLeft -= 150;
  });
  document.querySelector("#rightbutton").addEventListener("click", function () {
    document.querySelector(".main-city-container").scrollLeft += 150;
  });
}

function hidebutton() {
  document.querySelector("#leftbutton").style.visibility = "hidden";
  document.querySelector("#rightbutton").style.visibility = "hidden";
}

function showbutton() {
  let counterValue = document.querySelector(".cities-counter");
  if (counterValue.value > 4) {
    document.querySelector("#leftbutton").style.visibility = "visible";
    document.querySelector("#rightbutton").style.visibility = "visible";
  } else {
    document.querySelector("#leftbutton").style.visibility = "hidden";
    document.querySelector("#rightbutton").style.visibility = "hidden";
  }
}
