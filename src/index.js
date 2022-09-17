let location = 'toronto';
let dataJson = null;
let weatherOb = {};

// .then((response)=>{
    //     return response.json();
    // });
    // .then((response)=>{
    //     return weatherData(response);
    // });
    // .catch((err) =>{
    //    console.log(err);
    // });

function weatherData(data){
    let main = data.weather[0].main;
    let description = data.weather[0].description;
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
    .then(response=>{
        response.json()
        .then(post=>{
            dataJson = post;
            weatherOb = weatherData(dataJson);
        });
    });
});

function clearMain(){
    while(main.children.length>0){
        main.removeChild(main.lastChild);
    };
};

function showCity(){
    const city = document.createElement('h1');
    city.textContent = location.toUpperCase();
}

function showMain(){
    const weatherMain = document.createElement('div');
    weatherMain.setAttribute('id','main');
    weatherMain.textContent = weatherOb.main;
    main.appendChild(weatherMain);
};







