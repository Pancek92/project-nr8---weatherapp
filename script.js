const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

//wielkimi literami zapisuje zmienne stałe
// budowane linku

const API_LINK = "https://api.openweathermap.org/data/2.5/weather?q="
const API_KEY = '&appid=c88067d0e68fc466ca925846954e2d1a'
const API_UNITS = '&units=metric'

// tworzenie funkcji

const getWeather = () => {
    const city = input.value
    const URL = API_LINK + city + API_KEY + API_UNITS

    axios.get(URL).then(res => {
        console.log(res)
        const temp = res.data.main.temp
        const hum = res.data.main.humidity
        const status = Object.assign({}, ...res.data.weather)

        if(status.id >= 200 && status.id < 300 ) {
            photo.setAttribute('src', './img/thunderstorm.png')
        } else if (status.id >= 300 && status.id < 400) {
            photo.setAttribute('src', './img/drizlle.png')
        } else if (status.id >= 400 && status.id < 500 ) {
            photo.setAttribute('src', './img/rain.png')
        } else if (status.id >= 500 && status.id < 600 ) {
            photo.setAttribute('src', './img/ice.png')
        } else if (status.id >= 600 && status.id < 700 ) {
            photo.setAttribute('src', './img/snow.png')
        } else if (status.id >= 700 && status.id < 800 ) {
            photo.setAttribute('src', './img/fog.png')
        } else if (status.id = 800 ) {
            photo.setAttribute('src', './img/sun.png')
        } else if (status.id >= 800 && status.id < 804 ) {
            photo.setAttribute('src', './img/cloud.png')
        } else {
            photo.setAttribute('src', './img/unknown.png')
        }
        
        warning.textContent = ''
        input.value = ''

        cityName.textContent = res.data.name
        temperature.textContent = Math.floor(temp) + '°C'
        humidity.textContent = hum + '%'
        weather.textContent = status.description


    }).catch(() => warning.textContent = 'Wpisz poprawną nazwę miasta')
}

getWeather()
button.addEventListener('click', getWeather)
button.addEventListener('keyup:enter', getWeather)

const enterKeyCheck = e => {
    if(e.key === 'Enter') {
    getWeather()
    }
}
input.addEventListener('keyup', enterKeyCheck)