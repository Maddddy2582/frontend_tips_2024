let cardNum;
function midcontainer()
{
    const summa = document.querySelector('.city-input')
    summa.addEventListener('change',(g)=>{
    city=g.target.value
    })
    let sunnycities= [];
    let snowycities= [];
    let rainycities= [];
    let sunnycitiesTemp= [];
    let snowycitiesPrecep= [];
    let rainyCitiesHumidity= [];

    for (let city in cityData)

    {
        let [celciusVal] = cityData[city].temperature.split('\u00B0')
        let [humidityVal]= cityData[city].humidity.split('%')
        let [precepVal]= cityData[city].precipitation.split('%')
        if(celciusVal>29 && humidityVal<50 && precepVal>=50)
        {
            sunnycities.push(city)
            sunnycitiesTemp.push(celciusVal)
        }
        else if((celciusVal>20 && celciusVal<28)&& humidityVal>50 && precepVal<50)
        {
            snowycities.push(city)
            snowycitiesPrecep.push(precepVal)
        }
        else if(celciusVal<20 && humidityVal>=50)
        {
            rainycities.push(city)
            rainyCitiesHumidity.push(humidityVal)

        }
    }

    sunnycities.sort((a, b) => b - a);
    
    snowycities.sort((a, b) => b - a);
    rainycities.sort((a, b) => parseInt(cityData[b].humidity) - parseInt(cityData[a].humidity));
    console.log(rainycities)

    const sunnyIconClass= document.getElementById('sunny-icon-class')
    sunnyIconClass.addEventListener('click',function()
    {
        const mainCityContainer= document.querySelector('.main-city-container')
        const cardContainer= document.querySelector('.card-container')
        while(mainCityContainer.firstChild)
        {
            mainCityContainer.removeChild(mainCityContainer.firstChild)
        }
        for(let i=0;i<sunnycities.length;i++)
        {
            const cloneCard= cardContainer.cloneNode(true)
            mainCityContainer.appendChild(cloneCard)
        }





        const nodeList= document.querySelectorAll(".card-container");
        
        for(let j=0;j<sunnycities.length;j++)
        {
        nodeList[j].style.backgroundImage= `url('../../docs/assets/Images/HTML & CSS/Icons for cities/${sunnycities[j]}.svg')`
        nodeList[j].querySelector('.item1').textContent=`${sunnycities[j]}`
        nodeList[j].querySelector('#sunnyid').textContent=`${cityData[sunnycities[j]].temperature}`
        const [date, time] = (cityData[sunnycities[j]].dateAndTime).split(', ')
        nodeList[j].querySelector('.item3').textContent=`${time}`
        console.log(document.querySelector('.item3').textContent);
        nodeList[j].querySelector('.item4').textContent=`${date}`
        nodeList[j].querySelector('#humid').textContent=`${cityData[sunnycities[j]].humidity}`
        nodeList[j].querySelector('#precepid').textContent=`${cityData[sunnycities[j]].precipitation}`
        }



    });

    const snowyIconClass= document.getElementById('snowy-icon-class')
    snowyIconClass.addEventListener('click',function()
    {
        const mainCityContainer= document.querySelector('.main-city-container')
        const cardContainer= document.querySelector('.card-container')
        while(mainCityContainer.firstChild)
        {
            mainCityContainer.removeChild(mainCityContainer.firstChild)
        }
        for(let i=0;i<snowycities.length;i++)
        {
            const cloneCard= cardContainer.cloneNode(true)
            mainCityContainer.appendChild(cloneCard)
        }
    });

    const rainyIconClass= document.getElementById('rainy-icon-class')
    rainyIconClass.addEventListener('click',function()
    {
        const mainCityContainer= document.querySelector('.main-city-container')
        const cardContainer= document.querySelector('.card-container')
        while(mainCityContainer.firstChild)
        {
            mainCityContainer.removeChild(mainCityContainer.firstChild)
        }
        for(let i=0;i<rainycities.length;i++)
        {
            const cloneCard= cardContainer.cloneNode(true)
            mainCityContainer.appendChild(cloneCard)
        }
    });

    const numberOfCities= document.querySelector('.cities-counter')
  numberOfCities.addEventListener('change',(f)=>{
    cardNum= f.target.value
    cardClone(cardNum);
  })
    function  cardClone()
    {
        const mainCityContainer= document.querySelector('.main-city-container')
        const cardContainer= document.querySelector('.card-container')
        while(mainCityContainer.firstChild)
        {
            mainCityContainer.removeChild(mainCityContainer.firstChild)
        }
        for(let i=0;i<Number(cardNum);i++)
        {
            const cloneCard= cardContainer.cloneNode(true)
            mainCityContainer.appendChild(cloneCard)
        }
    }
}   



    




