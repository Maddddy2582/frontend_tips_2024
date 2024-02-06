"use strict";
import { updateTopContainerData } from "./dateandtime.js";
import { topContainer } from "./topContainer.js";

document.addEventListener("DOMContentLoaded", function () {
  const loadCitiesDetails = async () => {
    const data = await fetch(
      "../../docs/assets/Images/HTML & CSS/files/data.json"
    );
    const cityData = await data.json();
    topContainer(cityData);
    dynamicCityOptions(cityData);
    let city = "anadyr";
    document.getElementsByName("city-dropdown")[0].placeholder = "anadyr";
    updateTopContainerData(cityData, city);
  };
  loadCitiesDetails();
});

function dynamicCityOptions(cityData) {
  const cityList = document.getElementById("city-options");
  let cityNameArr = [];
  for (const city in cityData) {
    cityNameArr.push(city);
    cityNameArr.sort();
  }
  for (let index = 0; index < cityNameArr.length; index++) {
    const option = document.createElement("option");
    option.value =
      cityNameArr[index].charAt(0).toUpperCase() + cityNameArr[index].slice(1);
    cityList.appendChild(option);
  }
}
