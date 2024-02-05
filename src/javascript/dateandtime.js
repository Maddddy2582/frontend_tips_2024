import { updateWeatherElements } from "./forecast.js";
import { updateWeatherForecast } from "./prediction.js";

export function updateTopContainerData(cityData, city) {
  let absoluteTime = new Date().toLocaleString("en-US", {
    timeZone: cityData[city].timeZone,
  });
  let [date, time] = absoluteTime.split(", ");
  let [currenttime, state] = time.split(" ");
  let [hours, min, sec] = currenttime.split(":");
  document.getElementById("time").innerText = hours + ":";
  document.querySelector(".minutes").innerText = min;

  document.getElementById("datejs").innerText = date.replaceAll("/", "-");
  document.querySelector(".hourly-info").style.visibility = "visible";
  updateSeconds(cityData, city);
  //   updateMinutes(cityData, city);
  updateMainImage(city);
  updateState(state);
  updateWeatherElements(cityData, city);
  updateWeatherForecast(cityData, city, hours, state);
  setInterval(() => updateSeconds(cityData, city), 1000);
  //console.log((document.querySelector(".minutes").innerText = "madav"));
  //setInterval(() => updateMinutes(cityData, city), 6000);
}

export function updateSeconds(cityData, city) {
  let absoluteTime = new Date().toLocaleString("en-US", {
    timeZone: cityData[city].timeZone,
  });
  let [date, time] = absoluteTime.split(", ");
  let [currenttime, state] = time.split(" ");
  let [hours, min, sec] = currenttime.split(":");
  document.getElementById("sec").innerText = sec;
  if (sec == 0) {
    let absoluteTime = new Date().toLocaleString("en-US", {
      timeZone: cityData[city].timeZone,
    });
    let [date, time] = absoluteTime.split(", ");
    let [currenttime, state] = time.split(" ");
    let [hours, min, sec] = currenttime.split(":");
    //document.getElementById("sec").innerText = ":" + sec;
    document.querySelector(".minutes").innerText = min;
  }
}

// export function updateMinutes(cityData, city) {
//   let absoluteTime = new Date().toLocaleString("en-US", {
//     timeZone: cityData[city].timeZone,
//   });
//   let [date, time] = absoluteTime.split(", ");
//   let [currenttime, state] = time.split(" ");
//   let [hours, min, sec] = currenttime.split(":");
//   //document.getElementById("sec").innerText = ":" + sec;
//   document.getElementById("time").innerText = hours + ":" + min;
// }

function updateMainImage(city) {
  document.getElementById("city-img").src =
    "../../docs/assets/Images/HTML & CSS/Icons for cities/" + city + ".svg";
}

function updateState(state) {
  if (state === "PM") {
    document.getElementById("state-img").src =
      "../../docs/assets/Images/HTML & CSS/General Images & Icons/pmState.svg";
  } else {
    document.getElementById("state-img").src =
      "../../docs/assets/Images/HTML & CSS/General Images & Icons/amState.svg";
  }
}
