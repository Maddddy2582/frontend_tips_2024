export function updateWeatherElements(cityData, city) {
  const [celciusVal] = cityData[city].temperature.split("\u00B0");
  document.getElementById("tempid").innerText = `${cityData[city].temperature}`;
  document.getElementById("farenid").innerText =
    (celciusVal * 1.8 + 32).toFixed(0) + "\u00B0" + "F";
  document.getElementById(
    "humidityid"
  ).innerText = `${cityData[city].humidity}`;
  document.getElementById(
    "precipitationid"
  ).innerText = `${cityData[city].precipitation}`;
}
