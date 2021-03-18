

console.log('Client side js is loaded')


const getWeather = (searchLocation,resultLocation,resultForecast)=>{
    
    resultLocation.textContent = 'Searching . . .'
    
    fetch('http://localhost:3000/weather?address='+searchLocation).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                resultLocation.textContent = data.error
            }
            resultLocation.textContent = data.location
            resultForecast.textContent = data.forecast

        })
    })
}
//app.js get created end point API then this fetches it..but why
//fetch is client side .. request is server side


const weatherForm = document.querySelector('form')
const userInput = document.querySelector('input')
const resultLocation = document.querySelector('#message-1')
const resultForecast = document.querySelector('#message-2')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = userInput.value
    getWeather(location, resultLocation,resultForecast)
})
