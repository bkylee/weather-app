let location = null;
let dataJson = null;
let weatherOb = {};

const weatherData = (data)=>{
    let main = data.weather[0].main;
    let description = data.weather[0].description;
    let currentTemp = Math.round(data.main.temp - 272.15);
    let humidity = data.main.humidity;
    let feelsLike = Math.round(data.main.feels_like - 272.15);
    return{
        main,
        description,
        currentTemp,
        humidity,
        feelsLike
    };
};

const clearMain = ()=>{
    while(main.children.length>0){
        main.removeChild(main.lastChild);
    };
};

const showCity = ()=>{
    const city = document.createElement('h1');
    city.setAttribute('id','city');
    city.textContent = location.toUpperCase();
    main.appendChild(city);
};

const showMain = () => {
    const weatherMain = document.createElement('div');
    weatherMain.setAttribute('id','main');
    weatherMain.textContent = `Forecast: ${weatherOb.main}`;
    main.appendChild(weatherMain);
    const weatherDesc = document.createElement('div');
    weatherDesc.setAttribute('id','desc');
    weatherDesc.textContent = weatherOb.description;
    weatherMain.appendChild(weatherDesc);
};

const showCurrenTemp = ()=>{
    const weatherCT = document.createElement('div');
    weatherCT.setAttribute('id','CT');
    weatherCT.textContent = `Current Temperature: ${weatherOb.currentTemp}`;
    main.appendChild(weatherCT);
};

const showHumidity = ()=>{
    const weatherHum = document.createElement('div');
    weatherHum.setAttribute('id','humidity');
    weatherHum.textContent = `Humidity: ${weatherOb.humidity}`;
    main.appendChild(weatherHum);
};

const showFeelsLike = ()=>{
    const weatherFL = document.createElement('div');
    weatherFL.setAttribute('id','feelsLike');
    weatherFL.textContent = `Feels like: ${weatherOb.feelsLike}`;
    main.appendChild(weatherFL);
};

const handleError = response =>{
    if(!response.ok){
        throw Error(response.statusText);
    } else {
        return response.json();
    }
};

const searchWrapper = document.createElement('div');
searchWrapper.setAttribute('id','searchWrap');
document.body.appendChild(searchWrapper);

const search = document.createElement('button');
search.setAttribute('type','button');
search.setAttribute('id','search');
search.textContent = "Search";
searchWrapper.appendChild(search);

const searchI = document.createElement('input');
searchI.setAttribute('type','text');
searchI.setAttribute('id','searchI');
searchWrapper.appendChild(searchI);

const main = document.createElement('div');
main.setAttribute('id','wrapper');
document.body.appendChild(main);

search.addEventListener('click',()=>{
    const input = document.querySelector('#searchI').value;
    if (input.toUpperCase() === location){
        return;
    };
    location = input;
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=c74387e34986c811c7cffc7d4d5db861`;
    fetch(URL, {mode:'cors'})
    .then(handleError)
        .then(post=>{
            dataJson = post;
            weatherOb = weatherData(dataJson);
            clearMain();
            showCity();
            showMain();
            showCurrenTemp();
            showHumidity();
            showFeelsLike();
        })
    .catch(err=>{
        const msg = document.createElement('h2');
        msg.textContent = "Oops! Please enter a city!";
        clearMain();
        main.appendChild(msg);
    })
});






