let cityData;
(async () => {
  const data = await fetch('../../docs/assets/Images/HTML & CSS/files/data.json')
  cityData = await data.json()
})()

function dropdown (imgid, newimg) 
{
  document.getElementById(imgid).src = '../../docs/assets/Images/HTML & CSS/Icons for cities/' + newimg + '.svg'
  document.getElementById('tempid').innerText = `${(cityData[newimg].temperature)}`
  const [celciusVal, celciusSymbol] = cityData[newimg].temperature.split('\u00B0')
  document.getElementById('farenid').innerText = (celciusVal * 1.8 + 32).toFixed(1) + ' F'
  document.getElementById('humidityid').innerText = `${(cityData[newimg].humidity)}`
  document.getElementById('precipitationid').innerText = `${(cityData[newimg].precipitation)}`
  const [date, time] = cityData[newimg].dateAndTime.split(', ')
  document.getElementById('datejs').innerText = date.replaceAll('/', '-')
  const [currenttime, state] = time.split(' ')
  const [hr, min, sec] = currenttime.split(':')
  document.getElementById('time').innerText = hr + ':' + min
  document.getElementById('sec').innerText = ':' + sec
  if (state === 'PM') 
  {
    document.getElementById('state-img').src = '../../docs/assets/Images/HTML & CSS/General Images & Icons/pmState.svg'
  } else 
  {
    document.getElementById('state-img').src = '../../docs/assets/Images/HTML & CSS/General Images & Icons/amState.svg'
  }

  const changeTime= document.querySelectorAll('.change-time')
  const timeForcast= Array.from(changeTime).map((element) => element.textContent)
  for (let i = 0, currentTime = hr; i < timeForcast.length; i++) 
  {
    if (state == 'AM') 
    {
      if (currentTime < 11) 
      {
        currentTime++
        timeForcast[i] = currentTime + 'AM'
        changeTime[i].textContent = timeForcast[i]
      } 
      else if (currentTime == 11)
      {
        currentTime++
        timeForcast[i] = currentTime + 'PM'
        state = 'PM'
        changeTime[i].textContent = timeForcast[i]
      } 
      else if (currentTime == 12)
      {
        timeForcast[i] = 1 + 'AM'
        currentTime = 1
        state = 'AM'
        changeTime[i].textContent = timeForcast[i]
      }
    } 
    else 
    {
      if (currentTime < 11) 
      {
        currentTime++
        timeForcast[i] = currentTime + 'PM'
        changeTime[i].textContent = timeForcast[i]
      } 
      else if (currentTime == 11) 
      {
        currentTime++
        timeForcast[i] = currentTime + 'AM'
        state = 'AM'
        changeTime[i].textContent = timeForcast[i]
      } 
      else if (currentTime == 12) 
      {
        timeForcast[i] = 1 + 'PM'
        currentTime = 1
        state = 'PM'
        changeTime[i].textContent = timeForcast[i]
      }
    }
  } 
}
