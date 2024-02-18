let countries = [];
const bottomCardContainer = document.querySelector(".bottom-cards-container");
const continentNameArrow = document.querySelector(".continent-arrow");
const tempNameArrow = document.querySelector(".temp-arrow");
const sortArrow = document.querySelector(".sort-arrow");
const sortTempArrow = document.querySelector(".sort-temp-arrow");
let currentTempValue = true;
let arrow = 0;

export function bottomContainer(cityData) {
  //Getting continents name
  const continents = [
    ...new Set(
      Object.values(cityData)
        .map((key) => key.timeZone.split("/")[0])
        .sort()
    ),
  ];
  clickContinent(cityData, continents);
  clickTemperature(cityData, continents);
  allContinentCities(cityData, continents, currentTempValue);
}

function allContinentCities(cityData, continents, currentTempValue) {
  function sortCities(cityData, currentTempValue) {
    const sortTemp = (a, b) =>
      currentTempValue
        ? parseInt(cityData[a].temperature) - parseInt(cityData[b].temperature)
        : parseInt(cityData[b].temperature) - parseInt(cityData[a].temperature);
    return sortTemp;
  }
  countries = [];
  continents.forEach((element) => {
    countries.push(
      Object.keys(cityData)
        .filter((key) =>
          cityData[key].timeZone.split("/")[0].startsWith(element)
        )
        .sort(sortCities(cityData, currentTempValue))
    );
  });
  const totalCountries = countries.flat();
  displayCards(cityData, totalCountries);
}

function clickContinent(cityData, continents) {
  continentNameArrow.addEventListener("click", function () {
    continents.reverse();
    if (arrow == 0) {
      arrow = 1;
    } else {
      arrow = 0;
    }
    let arrowName = arrow ? "Down" : "Up";
    sortArrow.src = `../../docs/assets/Images/HTML & CSS/General Images & Icons/arrow${arrowName}.svg`;
    allContinentCities(cityData, continents, currentTempValue);
  });
}

function clickTemperature(cityData, continents) {
  tempNameArrow.addEventListener("click", function () {
    currentTempValue = currentTempValue ? false : true;

    if (arrow == 0) {
      arrow = 1;
    } else {
      arrow = 0;
    }
    let arrowName = arrow ? "Down" : "Up";
    sortTempArrow.src = `../../docs/assets/Images/HTML & CSS/General Images & Icons/arrow${arrowName}.svg`;
    allContinentCities(cityData, continents, currentTempValue);
  });
}

function displayCards(cityData, totalCountries) {
  bottomCardContainer.innerHTML = " ";
  totalCountries.slice(0, 12).forEach((element) => {
    const HTML = `<div class="bottom-cards">
        <div class="continent-name">${
          cityData[element].timeZone.split("/")[0]
        }</div>
        <div class="city-temperature">${cityData[element].temperature}</div>
        <div class="city-name-time">${cityData[element].cityName}</div>
        <div class="city-humidity">
          <img
            src="../../docs/assets/Images/HTML & CSS/Weather Icons/humidityIcon.svg"
            alt="image"
            height="20px"
            width="20px"
          />
          ${cityData[element].humidity}
        </div>
      </div>
        `;
    bottomCardContainer.insertAdjacentHTML("beforeend", HTML);
  });
}
