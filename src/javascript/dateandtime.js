import { changeFourValues } from "./forecast.js";
import { changeHours } from "./prediction.js";

export function updatedTime(cityData, city) {
  let absoluteTime = new Date().toLocaleString("en-US", {
    timeZone: cityData[city].timeZone,
  });
  let [date, time] = absoluteTime.split(", ");
  let [currenttime, state] = time.split(" ");
  let [hours, min, sec] = currenttime.split(":");

  document.getElementById("datejs").innerText = date.replaceAll("/", "-");
  document.querySelector(".hourly-info").style.visibility = "visible";
  updatesecond(cityData, city);
  changeMainImage(city);
  changeState(state);
  changeFourValues(cityData, city);
  changeHours(cityData, city, hours, state);
  setInterval(() => updatesecond(cityData, city), 1000);
}

export function updatesecond(cityData, city) {
  let absoluteTime = new Date().toLocaleString("en-US", {
    timeZone: cityData[city].timeZone,
  });
  let [date, time] = absoluteTime.split(", ");
  let [currenttime, state] = time.split(" ");
  let [hours, min, sec] = currenttime.split(":");
  document.getElementById("sec").innerText = ":" + sec;
}

export function updateminute(cityData, city) {
  let absoluteTime = new Date().toLocaleString("en-US", {
    timeZone: cityData[city].timeZone,
  });
  let [date, time] = absoluteTime.split(", ");
  let [currenttime, state] = time.split(" ");
  let [hours, min, sec] = currenttime.split(":");
  document.getElementById("sec").innerText = ":" + sec;
  document.getElementById("time").innerText = hours + ":" + min;
}

function changeMainImage(city) {
  document.getElementById("city-img").src =
    "../../docs/assets/Images/HTML & CSS/Icons for cities/" + city + ".svg";
}

function changeState(state) {
  if (state === "PM") {
    document.getElementById("state-img").src =
      "../../docs/assets/Images/HTML & CSS/General Images & Icons/pmState.svg";
  } else {
    document.getElementById("state-img").src =
      "../../docs/assets/Images/HTML & CSS/General Images & Icons/amState.svg";
  }
}
