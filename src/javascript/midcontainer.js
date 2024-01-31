let cardNum;
function midcontainer()
{

    
    const cityValue = document.querySelector('.city-input')
    cityValue.addEventListener('change',(g)=>{
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
    rainycities.sort((a, b) => parseInt(cityData[b].humidity) - parseInt(cityData[a].humidity));


//----------------------SUNNY CITIES---------------------------------------------
    const sunnyIconClass= document.getElementById('sunny-icon-class')
    sunnyIconClass.addEventListener('click',function()
    {
        sunnyIconClass.classList.add('border-bottom')
        snowyIconClass.classList.remove('border-bottom')
        rainyIconClass.classList.remove('border-bottom')
        //document.querySelector('.card1').style.borderBottom="2px solid skyblue";
        // let counterValue= document.querySelector('.cities-counter')
        // counterValue.value= 3;
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
        let nodeList= document.querySelectorAll(".card-container");
        for(let j=0;j<sunnycities.length;j++)
        {
        nodeList[j].style.backgroundImage= `url('../../docs/assets/Images/HTML & CSS/Icons for cities/${sunnycities[j]}.svg')`
        nodeList[j].querySelector('.item1').textContent=`${sunnycities[j]}`
        nodeList[j].querySelector('#midicon').src = '../../docs/assets/Images/HTML & CSS/Weather Icons/sunnyIcon.svg'
        nodeList[j].querySelector('#sunnyid').textContent=`${cityData[sunnycities[j]].temperature}`
        const [date, time] = (cityData[sunnycities[j]].dateAndTime).split(', ')
        nodeList[j].querySelector('.item3').textContent=`${time}`
        console.log(document.querySelector('.item3').textContent);
        nodeList[j].querySelector('.item4').textContent=`${date}`
        nodeList[j].querySelector('#humid').textContent=`${cityData[sunnycities[j]].humidity}`
        nodeList[j].querySelector('#precepid').textContent=`${cityData[sunnycities[j]].precipitation}`
        }
        document.querySelector('.cities-counter').disabled=true;
    });

//---------------------------SNOWY CITIES--------------------------------    
    const snowyIconClass= document.getElementById('snowy-icon-class')
    snowyIconClass.addEventListener('click',function()
    {
        sunnyIconClass.classList.remove('border-bottom')
        snowyIconClass.classList.add('border-bottom')
        rainyIconClass.classList.remove('border-bottom')
        let counterValue= document.querySelector('.cities-counter')
        counterValue.place = 2;
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

        let nodeList= document.querySelectorAll(".card-container");
        
        for(let j=0;j<snowycities.length;j++)
        {
        nodeList[j].style.backgroundImage= `url('../../docs/assets/Images/HTML & CSS/Icons for cities/${snowycities[j]}.svg')`
        nodeList[j].querySelector('.item1').textContent=`${snowycities[j]}`
        nodeList[j].querySelector('#midicon').src = '../../docs/assets/Images/HTML & CSS/Weather Icons/snowflakeIcon.svg'
        nodeList[j].querySelector('#sunnyid').textContent=`${cityData[snowycities[j]].temperature}`
        const [date, time] = (cityData[snowycities[j]].dateAndTime).split(', ')
        nodeList[j].querySelector('.item3').textContent=`${time}`
        console.log(document.querySelector('.item3').textContent);
        nodeList[j].querySelector('.item4').textContent=`${date}`
        nodeList[j].querySelector('#humid').textContent=`${cityData[snowycities[j]].humidity}`
        nodeList[j].querySelector('#precepid').textContent=`${cityData[snowycities[j]].precipitation}`
        }
        document.querySelector('.cities-counter').disabled=true;
    });

//--------------RAINY CITIES-------------------------------------------------

    const rainyIconClass= document.getElementById('rainy-icon-class')
    rainyIconClass.addEventListener('click',function()
    {
        sunnyIconClass.classList.remove('border-bottom')
        snowyIconClass.classList.remove('border-bottom')
        rainyIconClass.classList.add('border-bottom')
        let counterValue= document.querySelector('.cities-counter')
        
        document.querySelector('.cities-counter').disabled=false;
        const mainCityContainer= document.querySelector('.main-city-container')
        const cardContainer= document.querySelector('.card-container')
        while(mainCityContainer.firstChild)
        {
            mainCityContainer.removeChild(mainCityContainer.firstChild)
        }
        for(let i=0;i<counterValue.value;i++)
        {
            const cloneCard= cardContainer.cloneNode(true)
            mainCityContainer.appendChild(cloneCard)
        }

        let nodeList= document.querySelectorAll(".card-container");
        
        for(let j=0;j<counterValue.value;j++)
        {
        console.log(rainycities[j])
        nodeList[j].style.backgroundImage= `url('../../docs/assets/Images/HTML & CSS/Icons for cities/${rainycities[j]}.svg')`
        nodeList[j].querySelector('#midicon').src = '../../docs/assets/Images/HTML & CSS/Weather Icons/rainyIcon.svg'
        nodeList[j].querySelector('.item1').textContent=`${rainycities[j]}`
        nodeList[j].querySelector('#sunnyid').textContent=`${cityData[rainycities[j]].temperature}`
        const [date, time] = (cityData[rainycities[j]].dateAndTime).split(', ')
        nodeList[j].querySelector('.item3').textContent=`${time}`
        nodeList[j].querySelector('.item4').textContent=`${date}`
        nodeList[j].querySelector('#humid').textContent=`${cityData[rainycities[j]].humidity}`
        nodeList[j].querySelector('#precepid').textContent=`${cityData[rainycities[j]].precipitation}`
        }
        let numberOfCities= document.querySelector('.cities-counter')
        numberOfCities.addEventListener('change',(f)=>{
        cardNum= f.target.value
        const mainCityContainer= document.querySelector('.main-city-container')
        const cardContainer= document.querySelector('.card-container')
        while(mainCityContainer.firstChild)
        {
            mainCityContainer.removeChild(mainCityContainer.firstChild)
        }
        for(let i=0;i<cardNum;i++)
        {
            const cloneCard= cardContainer.cloneNode(true)
            mainCityContainer.appendChild(cloneCard)
        }

        let nodeList= document.querySelectorAll(".card-container");
        
        for(let j=0;j<rainycities.length;j++)
        {
        nodeList[j].style.backgroundImage= `url('../../docs/assets/Images/HTML & CSS/Icons for cities/${rainycities[j]}.svg')`
        nodeList[j].querySelector('.item1').textContent=`${rainycities[j]}`
        nodeList[j].querySelector('#midicon').src = '../../docs/assets/Images/HTML & CSS/Weather Icons/rainyIcon.svg'
        nodeList[j].querySelector('#sunnyid').textContent=`${cityData[rainycities[j]].temperature}`
        const [date, time] = (cityData[rainycities[j]].dateAndTime).split(', ')
        nodeList[j].querySelector('.item3').textContent=`${time}`
        nodeList[j].querySelector('.item4').textContent=`${date}`
        nodeList[j].querySelector('#humid').textContent=`${cityData[rainycities[j]].humidity}`
        nodeList[j].querySelector('#precepid').textContent=`${cityData[rainycities[j]].precipitation}`
        }
    })
    
    });

    document.querySelector('#leftbutton').addEventListener('click',function()
    {
        document.querySelector('.main-city-container').style.position= "relative";
        document.querySelector('.main-city-container').style.right= "50px";
    
    
    
    });

    document.querySelector('#rightbutton').addEventListener('click',function()
    {
        document.querySelector('.main-city-container').style.position= "relative";
        document.querySelector('.main-city-container').style.left= "50px";
    
    
    
    });
}    



    




