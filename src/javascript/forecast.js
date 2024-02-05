export function updateWeatherElements(cityData, city) {
  const [celciusVal] = cityData[city].temperature.split("\u00B0");
  document.getElementById("tempid").innerText = `${cityData[city].temperature}`;
  document.getElementById("farenid").innerText =
    (celciusVal * 1.8 + 32).toFixed(1) + " F";
  document.getElementById(
    "humidityid"
  ).innerText = `${cityData[city].humidity}`;
  document.getElementById(
    "precipitationid"
  ).innerText = `${cityData[city].precipitation}`;
}
