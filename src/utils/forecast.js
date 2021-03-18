const request = require('postman-request')

const ACCESS_KEY = 'e1b9f134114aa0db64f9b71fb2aeda4e'


// let query = 'Waterloo'




//function takes in the address query and a callback FUNCTION
const forecast = (lat,long, callback)=>{
    
    const url = 'http://api.weatherstack.com/current?access_key='+ ACCESS_KEY+'&query='+lat+','+long
    //this is the async part..
    request({url:url, json:true}, (error, {body})=>{
        if(error){
            callback('Unable to connect',undefined)
        }
        else if(body.error){
            callback('unable to find location',undefined)
        }
        else{
            const data = body.current
            callback(undefined,`It is currently ${data.temperature} degrees out. There is a ${data.precip}% chance of rain`)
        }
    })
}


module.exports = forecast