let cityData;
let city;
(async () => {
  const data = await fetch('../../docs/assets/Images/HTML & CSS/files/data.json')
  cityData = await data.json()
  topContainer()
  midcontainer()
})()

/**
 *
 * @param imgid
 * @param city
 */







