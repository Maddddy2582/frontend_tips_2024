import { clickContinent } from "./sortBottomCards";
import { clickTemperature } from "./sortBottomCards";


let countries = [];
const bottomCardContainer = document.querySelector(".bottom-cards-container");

let currentTempValue = true;


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
  console.log(continents)
  continents.forEach((element) => {
    countries.push(
      Object.keys(cityData)
        .filter((key) =>
          cityData[key].timeZone.split("/")[0].startsWith(element)
        )
        .sort(sortCities(cityData, currentTempValue))
    );
  });
  console.log(countries)
  const totalCountries = countries.flat();
  console.log(totalCountries)
  displayCards(cityData, totalCountries);
}



function findTime(cityData,element)
{
  const absoluteTime = new Date().toLocaleString("en-US", {
    timeZone: cityData[element].timeZone,
  });
  const [hr,min]= absoluteTime.split(", ")[1].split(":")
  return (`${hr}:${min}`)
}

function displayCards(cityData, totalCountries) {

  bottomCardContainer.innerHTML = " ";
  totalCountries.slice(0, 12).forEach((element) => {
    const liveTime =findTime(cityData,element)

    const HTML = `<div class="bottom-cards">
        <div class="continent-name">${
          cityData[element].timeZone.split("/")[0]
        }</div>
        <div class="city-temperature">${cityData[element].temperature}</div>
        <div class="city-name-time">${cityData[element].cityName} , ${liveTime}</div>
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






