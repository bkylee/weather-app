function getData (location){ 
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=c74387e34986c811c7cffc7d4d5db861`, {mode:'cors'})
    .then((response)=>{
        return response.json();
    })
    .catch((err) =>{
        //prompt user to enter a location 
    })
};

const weatherData = (location)=>{
    let data = getData(location);
    let main = data.weather.main;
    let description = data.weather.description;
    let currentTemp = data.main.temp;
    let humidity = data.main.humidity;
    let feelsLike = data.main.feels_like;

    return{
        main,
        description,
        currentTemp,
        humidity,
        feelsLike
    };
};

