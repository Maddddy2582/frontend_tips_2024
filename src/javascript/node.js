let cityData;

(async () => {
  const data = await fetch('../../docs/assets/Images/HTML & CSS/files/data.json')
  cityData = await data.json()
})()

/**
 *
 * @param imgid
 * @param newimg
 */

function dropdown (imgid, newimg) 
{
  if(Object.keys(cityData).includes(newimg)){
    function updatedTime(){
      const absoluteTime=new Date().toLocaleString("en-US",{timeZone:cityData[newimg].timeZone})

    document.getElementById(imgid).src = '../../docs/assets/Images/HTML & CSS/Icons for cities/' + newimg + '.svg'
    document.getElementById('tempid').innerText = `${(cityData[newimg].temperature)}`
    const [celciusVal] = cityData[newimg].temperature.split('\u00B0')
    document.getElementById('farenid').innerText = (celciusVal * 1.8 + 32).toFixed(1) + ' F'
    document.getElementById('humidityid').innerText = `${(cityData[newimg].humidity)}`
    document.getElementById('precipitationid').innerText = `${(cityData[newimg].precipitation)}`
    const [date, time] = absoluteTime.split(', ')
    document.getElementById('datejs').innerText = date.replaceAll('/', '-')
    let [currenttime, state] = time.split(' ')
    const [hr, min, sec] = currenttime.split(':')
    document.getElementById('time').innerText = hr + ':' + min
    document.getElementById('sec').innerText = ':' + sec
    document.querySelector('.hourly-info').style.visibility='visible'
    if (state === 'PM') {
      document.getElementById('state-img').src = '../../docs/assets/Images/HTML & CSS/General Images & Icons/pmState.svg'
    } else {
      document.getElementById('state-img').src = '../../docs/assets/Images/HTML & CSS/General Images & Icons/amState.svg'
    }
    const changeTime = document.querySelectorAll('.change-time')
    const timeForcast = Array.from(changeTime).map((element) => element.textContent)
    for (let i = 0, currentTime = hr; i < timeForcast.length; i++) {
      if (state === 'AM') {
        if (currentTime < 11) {
          currentTime++
          timeForcast[i] = currentTime + 'AM'
          changeTime[i].textContent = timeForcast[i]
        } else if (currentTime === '11') {
          currentTime++
          timeForcast[i] = currentTime + 'PM'
          state = 'PM'
          changeTime[i].textContent = timeForcast[i]
        } else if (currentTime === '12') {
          timeForcast[i] = 1 + 'AM'
          currentTime = 1
          state = 'AM'
          changeTime[i].textContent = timeForcast[i]
        }
      } else {
        if (currentTime < 11) {
          currentTime++
          timeForcast[i] = currentTime + 'PM'
          changeTime[i].textContent = timeForcast[i]
        } else if (currentTime === '11') {
          currentTime++
          timeForcast[i] = currentTime + 'AM'
          state = 'AM'
          changeTime[i].textContent = timeForcast[i]
        } else if (currentTime === '12') {
          timeForcast[i] = 1 + 'PM'
          currentTime = 1
          state = 'PM'
          changeTime[i].textContent = timeForcast[i]
        }
      }
    }
    document.getElementById('change-temp-now').innerText = `${(cityData[newimg].temperature)}`
    document.getElementById('change-temp1').innerText = `${(cityData[newimg].nextFiveHrs[0])}`
    document.getElementById('change-temp2').innerText = `${(cityData[newimg].nextFiveHrs[1])}`
    document.getElementById('change-temp3').innerText = `${(cityData[newimg].nextFiveHrs[2])}`
    document.getElementById('change-temp4').innerText = `${(cityData[newimg].nextFiveHrs[3])}`


    const changeTempClass = document.querySelectorAll('.tempValue')
    const cloudTemp = Array.from(changeTempClass).map((element) => element.textContent)
    console.log(cloudTemp)
    for(let j=0;j<5;j++)
    {
      let[cloudTempData]=cloudTemp[j].split('\u00B0')
      cloudTempData=Number(cloudTempData)
      console.log(cloudTempData)
      changeimg(cloudTempData,j)
    }
    function changeimg(changingValue,j)
    {
      if(changingValue>23 && changingValue<29)
      {
        document.querySelectorAll('.cloud-img')[j].src = '../../docs/assets/Images/HTML & CSS/Weather Icons/cloudyIcon.svg'
      }
      else if(changingValue<18)
      {
        document.querySelectorAll('.cloud-img')[j].src = '../../docs/assets/Images/HTML & CSS/Weather Icons/rainyIconBlack.svg'
      }
      else if(changingValue>18 && changingValue<22)
      {
        document.querySelectorAll('.cloud-img')[j].src = '../../docs/assets/Images/HTML & CSS/Weather Icons/windyIcon.svg'
      }
      else
      {
        document.querySelectorAll('.cloud-img')[j].src = '../../docs/assets/Images/HTML & CSS/Weather Icons/sunnyIcon.svg'
      }
    }
    setTimeout(updatedTime,1000)
  }updatedTime()
}
else
{
  alert("Invalid City")
  document.getElementById('tempid').innerText = "---"
  document.getElementById('farenid').innerText = "---"
  document.getElementById('humidityid').innerText = "---"
  document.getElementById('precipitationid').innerText = "---"
  document.getElementById('time').innerText = "--:--"
  document.getElementById('sec').innerText =" "
  document.getElementById('datejs').innerText ="__-__-__"
  document.querySelector('.hourly-info').style.visibility='hidden'
}
}

