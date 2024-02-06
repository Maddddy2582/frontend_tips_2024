import { updateTopContainerData } from "./dateandtime.js";
import { invalidCityName } from "./invalidCondition.js";

export function topContainer(cityData) {
  const cityInput = document.querySelector(".city-input");
  cityInput.addEventListener("change", (event) => {
    let city = event.target.value;
    city = city.charAt(0).toLowerCase() + city.slice(1);
    if (Object.keys(cityData).includes(city)) {
      document.getElementsByName("city-dropdown")[0].placeholder =
        "select City!!!";
      updateTopContainerData(cityData, city);
    } else {
      invalidCityName(cityData, city);
    }
  });
}

// function invalidCityName(cityData, city) {
//   invalidCityName();
//   // alert("Invalid City");
//   // document.getElementById("tempid").innerText = "---";
//   // document.getElementById("farenid").innerText = "---";
//   // document.getElementById("humidityid").innerText = "---";
//   // document.getElementById("precipitationid").innerText = "---";
//   // document.getElementById("time").innerText = "--:--";
//   // document.getElementById("sec").innerText = " ";
//   // document.getElementById("datejs").innerText = "__-__-__";
//   // document.querySelector(".hourly-info").style.visibility = "hidden";
// }
