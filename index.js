c// const API_KEY = "ee937bdefbd0f59c900695a0fdef9b55"

// function handleFormSubmit(event) {
//   event.preventDefault()
//   //handle submit event
//   const input = document.getElementById("city")
//   const value = input.value
//   fetch("http://api.openweathermap.org/data/2.5/weather?q=" + value + `&APPID=${API_KEY}&units=imperial`)
//   .then(response => response.json())
//   .then(responseJSON => {
//     displayCurrentWeather(responseJSON)
//   createChart(responseJSON)
//   })
//   //.then(responseJSON => createChart(responseJSON))
//   fetchFiveDayForecast(value)
  
// }

// function fetchCurrentWeather(city) {
//   //fetch current weather based on city
// }

// function displayCurrentWeather(json) {
//   //render current weather data to the DOM using provided IDs and json from API
//   //currenttemp/ low/ high 
//   const mainData = json.main
//   const temp = document.getElementById('temp')
//   const low = document.getElementById('low')
//   const high = document.getElementById('high')
//   const humidity = document.getElementById('humidity')
//   const cloudCover = document.getElementById('cloudCover')
  
//   temp.innerHTML = mainData.temp
//   low.innerHTML = mainData.temp_min
//   high.innerHTML = mainData.temp_max
//   humidity.innerHTML = mainData.humidity 
//   cloudCover.innerHTML = json.clouds.all 
// }


// function fetchFiveDayForecast(city) {
//   //fetch five day forecast data based on city
//   fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + city + `&APPID=${API_KEY}&units=imperial&cnt=40`)
//   .then(response => response.json())
//   .then(responseJSON => { displayFiveDayForecast(responseJSON)
//   return responseJSON
//   })
//   .then(responseJSON => createChart(responseJSON))
  
  
  
// }

// function displayFiveDayForecast(json) {
//   console.log("getting here!")
 
//   const forcast = json.list
//   const aside = document.querySelector('aside')
//   let counter = 0
//   let lowAverageTemp = 0
//   let highAverageTemp = 0
//   forcast.forEach((eachForecastItem) => {
//     counter ++
//     lowAverageTemp += eachForecastItem.main.temp_min
//     highAverageTemp += eachForecastItem.main.temp_max
//     if( counter === 8){
//       counter = 0
//     const div = document.createElement('div')
//     div.innerHTML = `<p>${eachForecastItem.dt_text}</p>
//     <p>${lowAverageTemp /8}</p> <p>${highAverageTemp /8}</p> `
//     lowAverageTemp = 0
//     highAverageTemp = 0
//     aside.appendChild(div)
//     }
//   })
//   //render five day forecast data to the DOM using provided IDs and json from API
// }

// function createChart(json) {
//   //Bonus: render temperature chart using five day forecast data and ChartJS
//   const ctx = document.getElementById('WeatherChart'). getcontext("2d")
//   const labels = json.list.map((increment) => increment.dt_txt) //dt_txt
//   console.log(labels)
// }

// document.addEventListener('DOMContentLoaded', function() {
//   //add event listener here for form submission
//   document.getElementById('cityForm').addEventListener('submit', handleFormSubmit)
// })
const API_KEY = "7dc427ed599bbc84b1d9402fe4b83ba7"

function handleFormSubmit(event) {
  //handle submit event
  event.preventDefault()
  const input = document.getElementById('city')
  const value = input.value
  fetchCurrentWeather(value)
  fetchFiveDayForecast(value)
}

function fetchCurrentWeather(city) {
  //fetch current weather based on city
  fetch('http://api.openweathermap.org/data/2.5/weather?q=' + city + `&APPID=${API_KEY}&units=imperial`)
    .then(response => response.json())
    .then(responseJSON => displayCurrentWeather(responseJSON))
}

function displayCurrentWeather(json) {
  //render current weather data to the DOM using provided IDs and json from API
  //current temp, low, hi, humidity, cloud cover
  const mainData = json.main
  const temp = document.getElementById('temp')
  const low = document.getElementById('low')
  const high = document.getElementById('high')
  const humidity = document.getElementById('humidity')
  const cloudCover = document.getElementById('cloudCover')
  
  temp.innerHTML = mainData.temp + "°F"
  low.innerHTML = mainData.temp_min + "&#176;F"
  high.innerHTML = mainData.temp_max + "°F"
  humidity.innerHTML = mainData.humidity + '%'
  cloudCover.innerHTML = json.clouds.all + '%'
}

function fetchFiveDayForecast(city) {
  //fetch five day forecast data based on city
  fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + `&APPID=${API_KEY}&units=imperial`)
    .then(response => response.json())
    .then(responseJSON => {
      displayFiveDayForecast(responseJSON)
      createChart(responseJSON)
    })
    // .then((responseJSON) => createChart(responseJSON))
}

function displayFiveDayForecast(json) {
  //render five day forecast data to the DOM using provided IDs and json from API
  console.log(json)
  const forecast = json.list
  const aside = document.querySelector('aside')
  let counter = 0
  let lowAverageTemp = 0
  let highAverageTemp = 0
  
  forecast.forEach((eachForecastItem) => {
    counter++
    lowAverageTemp += eachForecastItem.main.temp_min
    highAverageTemp += eachForecastItem.main.temp_max
    if (counter === 8) {
      counter = 0
      const div = document.createElement('div')
      div.innerHTML = `<p>${eachForecastItem.dt_txt}</p> 
      <p>${Math.floor(lowAverageTemp / 8)}</p> 
      <p>${Math.floor(highAverageTemp / 8)}</p>`
      lowAverageTemp = 0
      highAverageTemp = 0 
      aside.appendChild(div)
    }
  })
}

function createChart(json) {
  //Bonus: render temperature chart using five day forecast data and ChartJS
  const ctx = document.getElementById('WeatherChart').getContext('2d')
  const labels = json.list.map((increment) => increment.dt_txt) //dt_txt
  console.log(labels)
  const data = json.list.map((increment) => increment.main.temp)
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Forecast',
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
})
}

document.addEventListener('DOMContentLoaded', function() {
  //add event listener here for form submission
  document.addEventListener('submit', handleFormSubmit)
})