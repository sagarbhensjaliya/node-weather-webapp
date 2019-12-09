const request = require('request')

const forecast = (longitude,latitude,callback) => {
    const url = "https://api.darksky.net/forecast/fbca63842e8b8ecb6ea7df8507d30ab8/"+ longitude + "," + latitude
    request({ url, json: true},(error,{ body })=>{
        if (error) {
            callback("Unable to connect weather service",undefined)
        } else if(body.error) {
            callback(undefined,"Invalid Location")
        } else {
            callback(undefined,body.daily.data[0].summary+".This is currently temperature is "+ body.currently.temperature +",there is " + body.currently.precipProbability +"% probability of rain.")
        }
    })
}

module.exports = forecast