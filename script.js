

const btn = document.querySelector("#btn");
const backBtn = document.querySelector(".go_back");
const notFound = document.querySelector(".loc_notFound");
const masterInput = document.querySelector(".master-input");

const flag = document.querySelector(".flag");


const locationAccess = document.querySelector(".location-access");
const visibleContainer = document.querySelector(".visible");
const cityName = document.querySelector(".cityname");
const temprature = document.querySelector(".temp");
const showText = document.querySelector(".show-text");


const humidit = document.querySelector(".humid");
const windSpeed = document.querySelector(".wind_kph");
const clouds = document.querySelector(".cloud");

const inputField = document.querySelector("#input_field");
const searchBtn = document.querySelector("#search_bar");







async function getData(latitude, longitude){
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=3ece69ae65b744d693c73416241208&q=${latitude},${longitude}&aqi=yes`);

    return await response.json();
};

function updateFlag(result){
    let countryName = result.location.country;
    let countryCode = countryList[countryName];
    let newCountryCode = countryCode.split(' ').join('');
    let newSrc = `https://flagsapi.com/${newCountryCode}/flat/64.png`;
    flag.src = newSrc;
};


function hideUnwanted(){
    locationAccess.classList.add("hide");
    visibleContainer.classList.remove("hide");
};

function updateInfo(result){

    hideUnwanted();
    cityName.innerText = `${result.location.name}`;
    temprature.innerText = `${Math.floor(result.current.temp_c)}°C`;
    showText.innerText = `${result.current.condition.text}`;
    humidit.innerText = `${result.current.humidity}%`;
    windSpeed.innerText = `${result.current.wind_kph} km/h`;
    clouds.innerText = `${result.current.cloud}%`;
    
}

async function gotLocation(position){
    const result = await getData(position.coords.latitude, position.coords.longitude);
    console.log(result);
    updateInfo(result);
    updateFlag(result);

    

}

function failedToGet(){
    notFound.classList.remove("hide");
    masterInput.classList.add("hide");
    locationAccess.classList.add("hide");
    visibleContainer.classList.add("hide");
}

btn.addEventListener('click', async ()=>{
    
    navigator.geolocation.getCurrentPosition(gotLocation, failedToGet);
});


searchBtn.addEventListener('click', async ()=>{
    const cityName = inputField.value;
        const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=3ece69ae65b744d693c73416241208&q=${cityName}&aqi=yes`);
    // console.log(data);
        if(data.status === 200){
            const report = await data.json();
            console.log(report);
            hideUnwanted();
            updateInfo(report);
            updateFlag(report);
        }
        else{
            failedToGet();
            inputField.value = "";
        }
    

    
})


backBtn.addEventListener('click', ()=>{
    notFound.classList.add("hide");
    masterInput.classList.remove("hide");
    locationAccess.classList.remove("hide");
})





