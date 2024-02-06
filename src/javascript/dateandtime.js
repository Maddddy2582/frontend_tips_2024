import { updateWeatherElements } from "./forecast.js";
import { updateWeatherForecast } from "./prediction.js";
let intervalTime;

export function updateTopContainerData(cityData, city) {
  let absoluteTime = new Date().toLocaleString("en-US", {
    timeZone: cityData[city].timeZone,
  });
  let [date, time] = absoluteTime.split(", ");
  let [currenttime, state] = time.split(" ");
  let [hours, min, sec] = currenttime.split(":");
  let [month, day, year] = date.split("/");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Aug",
    "Oct",
    "Nov",
    "Dec",
  ];

  document.getElementById("sec").innerText = ":" + sec;
  document.getElementById("time").innerText = hours + ":" + min + ":";
  document.getElementById("sec").innerText = sec;
  document.getElementById("datejs").innerText =
    day + "-" + months[month - 1] + "-" + year;
  document.querySelector(".hourly-info").style.visibility = "visible";

  updateMainImage(city);
  updateState(state);
  updateWeatherElements(cityData, city);
  updateWeatherForecast(cityData, city, hours, state);
  clearInterval(intervalTime);
  intervalTime = setInterval(
    () => updateTopContainerData(cityData, city),
    1000
  );
}

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
