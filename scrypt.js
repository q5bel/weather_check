const apiKey = "";
const apiUrl = "http://api.weatherapi.com/v1/current.json?&aqi=no&q="

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl+ city + "&key=" +apiKey);
    let data = await response.json();

    console.log(data);
    if (response.status == 400){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else{
        document.querySelector(".city").innerHTML = data.location.name;
        document.querySelector(".temp").innerHTML = Math.round(data.current.temp_c) + "°C";
        document.querySelector(".humidity").innerHTML = data.current.humidity + "%";
        document.querySelector(".wind").innerHTML = data.current.wind_kph + " км/ч";

        if (data.current.condition.code == 1000){
            weatherIcon.src = "images/clear.svg";
        }
        else if(data.current.condition.code == 1003 || data.current.condition.code == 1006){
            weatherIcon.src = "images/cloudy.svg";
        }
        else if(data.current.condition.code == 1030 || data.current.condition.code == 1135){
            weatherIcon.src = "images/mist.svg";
        }
        else if(data.current.condition.code == 1183){
            weatherIcon.src = "images/rain.svg";
        }
        else if(data.current.condition.code == 1213){
            weatherIcon.src = "images/snow.svg";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }


}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})
searchBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchBtn.click(); // Имитирует нажатие на кнопку
    }
});

