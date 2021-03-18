const request = require('postman-request')

const geocode=(address, callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoicGFyc2VzbmlwIiwiYSI6ImNrbTcybHF0eDA0eXIydXFmeGNrcWpkMTYifQ.Fc2OCAqZA3qH6ZfEHGgQgA'

    request({url:url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to to geo services',undefined )
        }
        else if(body.features.length===0){
            callback('Unable to find location', undefined)
        }
        else{
            callback(undefined,{
                long: body.features[0].geometry.coordinates[0],
                lat : body.features[0].geometry.coordinates[1],
                location: body.features[0].place_name
            })
        }
                
        
    })
}

module.exports=geocode