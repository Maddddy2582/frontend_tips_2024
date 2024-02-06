import { updateTopContainerData } from "./dateandtime.js";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

/**
 *
 * @param cityData
 * @param city
 */
export function invalidCityName (cityData, city) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.querySelector(".city-input").style.visibility = "hidden";

  btnCloseModal.addEventListener("click", function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    document.querySelector(".city-input").style.visibility = "visible";
    document.querySelector(".city-input").value = "Anadyr";
    updateTopContainerData(cityData, city);
  });
}
