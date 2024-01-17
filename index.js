const inputRef = document.querySelector('.search-bar input');
const mainTempRef = document.querySelector('.container .temperature span');
const locationNameRef = document.querySelector('.location .place');
const conditionRef = document.querySelector('.container .condition');
const conditionIconRef = document.querySelector('.condition-icon img');
const windRef = document.querySelector('.weather-info .wind p span');
const precipRef = document.querySelector('.weather-info .precip p span');
const buttonRef = document.querySelector('.search-button .fa-solid');
const minTempRef = document.querySelector('.range .min span');
const maxTempRef = document.querySelector('.range .max span');
const backgroundRef = document.querySelector('.background').style;

inputRef.focus();

buttonRef.addEventListener('click',function(e){
    fetchData(inputRef.value);
    fetchRiseSet(inputRef.value);
})

function fetchData(location){
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=710e2ae221244dda8f8184053232912&q=${location}&days=10&aqi=yes&alerts=yes`)
        .then(res => res.json())
        // .then(check => console.log(check))
        .then(data => updateDetail(data))
        .catch(e => console.log(e))
}

function updateDetail(data){
    const mainTemp = data.current.temp_c;
    const locationName = data.location.name;
    const conditionIcon = data.current.condition.icon;
    const condition = data.current.condition.text;
    const wind = data.current.wind_kph;
    const precip = data.current.humidity;
    const maxtemp = data.forecast.forecastday[0].day.maxtemp_c;
    const mintemp = data.forecast.forecastday[0].day.mintemp_c;

    mainTempRef.innerText = mainTemp;
    locationNameRef.innerText = locationName;
    conditionIconRef.src = conditionIcon;
    conditionRef.innerText = condition;
    windRef.innerText = wind;
    precipRef.innerText = precip;
    minTempRef.innerText = mintemp;
    maxTempRef.innerText = maxtemp; 
    if(data.current.is_day === 1){
        backgroundRef.backgroundImage = 'url("Images/day.jpg")';
    }else{
        backgroundRef.backgroundImage = 'url("Images/Night.jpg")';
    }
    // console.log(backgroundRef.style.backgroundImage);

}

// Creating and updating Sunrise & Sunset data

const sunriseTimeRef = document.querySelector('.sunrise .time');
const sunsetTimeRef = document.querySelector('.sunset .time');

function fetchRiseSet(location){
    fetch(`https://api.weatherapi.com/v1/astronomy.json?key=710e2ae221244dda8f8184053232912&q=${location}&dt=2024-01-17`)
        .then(res => res.json())
        // .then(check => console.log(check.location.localtime))
        .then(data => updateOtherDets(data))
        .catch(e=>console.log(e))
}

function updateOtherDets(data){
    const rise = data.astronomy.astro.sunrise;
    const set = data.astronomy.astro.sunset;

    sunriseTimeRef.innerText = rise;
    sunsetTimeRef.innerText = set;
}