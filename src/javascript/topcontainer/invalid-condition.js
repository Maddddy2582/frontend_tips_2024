import { updateTopContainerData } from "./dateandtime.js";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");

/**
 *
 * @param cityData
 * @param city
 */
export function invalidCityName(cityData, city) {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
  document.querySelector(".city-input").disabled = true;
  const closeModal = document.querySelector(".overlay");
  closeModal.addEventListener("click", function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    document.querySelector(".city-input").disabled = false;
    document.querySelector(".city-input").value = "Anadyr";
    updateTopContainerData(cityData, city);
  });

  btnCloseModal.addEventListener("click", function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
    document.querySelector(".city-input").disabled = false;
    document.querySelector(".city-input").value = "Anadyr";
    updateTopContainerData(cityData, city);
  });
}
