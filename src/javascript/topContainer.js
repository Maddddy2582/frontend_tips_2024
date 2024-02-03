import { updatedTime } from "./dateandtime.js";
import { openModal } from "./invalidContition.js";

export function topContainer(cityData) {
  const cityInput = document.querySelector(".city-input");
  cityInput.addEventListener("change", (event) => {
    let city = event.target.value;
    if (Object.keys(cityData).includes(city)) {
      //clearInterval(madav);
      updatedTime(cityData, city);
    } else {
      resetTime(cityData, city);
    }
  });
}

function resetTime(cityData, city) {
  openModal();
  // alert("Invalid City");
  // document.getElementById("tempid").innerText = "---";
  // document.getElementById("farenid").innerText = "---";
  // document.getElementById("humidityid").innerText = "---";
  // document.getElementById("precipitationid").innerText = "---";
  // document.getElementById("time").innerText = "--:--";
  // document.getElementById("sec").innerText = " ";
  // document.getElementById("datejs").innerText = "__-__-__";
  // document.querySelector(".hourly-info").style.visibility = "hidden";
}
