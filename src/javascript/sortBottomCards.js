import { allContinentCities } from "./bottomContainer.js";

let currentTempValue = true;
const continentNameArrow = document.querySelector(".continent-arrow");
const tempNameArrow = document.querySelector(".temp-arrow");
const sortArrow = document.querySelector(".sort-arrow");
const sortTempArrow = document.querySelector(".sort-temp-arrow");
let contArrow = 0;
let arrow = 0;

export function clickContinent(cityData, continents) {
  continentNameArrow.addEventListener("click", function () {
    continents.reverse();
    if (contArrow == 0) {
      contArrow = 1;
    } else {
      contArrow = 0;
    }
    let arrowName = contArrow ? "Down" : "Up";
    sortArrow.src = `../../docs/assets/Images/HTML & CSS/General Images & Icons/arrow${arrowName}.svg`;
    allContinentCities(cityData, continents, currentTempValue);
  });
}

export function clickTemperature(cityData, continents) {
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
