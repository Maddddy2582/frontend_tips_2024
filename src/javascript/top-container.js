import { updateTopContainerData } from "./dateandtime.js";
import { invalidCityName } from "./invalid-condition.js";

/**
 *
 * @param cityData
 */
export function topContainer(cityData) {
  const cityInput = document.querySelector(".city-input");
  cityInput.addEventListener("change", (event) => {
    let city = event.target.value;
    city = city.charAt(0).toLowerCase() + city.slice(1);
    if (Object.keys(cityData).includes(city)) {
      document.getElementsByName("citydropdown")[0].placeholder =
        "select City!!!";
      updateTopContainerData(cityData, city);
    } else {
      city = "anadyr";
      invalidCityName(cityData, city);
    }
  });
}
