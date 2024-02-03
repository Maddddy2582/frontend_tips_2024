"use strict";
import { topContainer } from "./topContainer.js";

const loadCitiesDetails = async () => {
  const data = await fetch(
    "../../docs/assets/Images/HTML & CSS/files/data.json"
  );
  const cityData = await data.json();
  topContainer(cityData);
};
loadCitiesDetails();
