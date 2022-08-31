const link = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "b5fbbf4ff3721a2c8898fa230dd60c6b";
const search = document.querySelector('#search');
const root = document.querySelector('#weather');
const btnSubmit = document.querySelector('#btnSearch');

let store = {
    city: "Киев",
    temp: 0,
    feels: 0,
    country:"UA",
    description: "про погоду"
}

const getProducts = async () => {
    const response = await fetch(`${link}q=${store.city}&appid=${apiKey}`);
    const data = await response.json();

    const {
        main: {temp, feels_like: feelsLike},
        sys: {country},
        weather: {description}
    } = data;

      console.log(data)

      store = {
        ...store,           //Три точки стоит потому что перед температурой у нас был city?
        temp,
        feelsLike,
        country,
        description
     };
     renderComponent();

    };

getProducts();


const rebuild = () => {
const { city, temp, country, feelsLike } = store;
    return `
    <div class="info">location: <span id="Region">${city}</span></div>
    <div class="info">Country: <span id="cloudy-Kharkiv">${country}</span></div>
    <div class="info">Air temperature: <span id="temperature-Kharkiv">${parseInt(temp - 273)}</span> °C</div>
    <div class="info">Feels like: <span id="wiatr-Kharkiv">${parseInt(feelsLike - 273)} </span> °C</div>
    
    `
}

const renderComponent = () => {
    root.innerHTML = rebuild();
};


const handleInput = (event) => {
    store = {
        ...store,
        city: event.target.value,
    }
}

const handleSubmit = (event) => {
    event.preventDefault();

    getProducts();
}

btnSubmit.addEventListener('click', handleSubmit)
search.addEventListener('input', handleInput);

getProducts();
