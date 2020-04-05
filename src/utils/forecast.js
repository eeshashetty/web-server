request = require('request')

const forecast = (latitude,longitude, callback) => {
    const url = "https://api.darksky.net/forecast/5a9b4c4ca2d9d1be87d46161a49a58aa/"+latitude+','+longitude+"?units=si"

    request({url, json: true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to service!', undefined)
        } 
        else if (body.error) {
            callback('Unable to find location',undefined) 
        }else {
            callback(undefined, {
                temperature: body.currently.temperature,
                precipitation: body.currently.precipProbability,
            })
        }
    })
}

module.exports = forecast
