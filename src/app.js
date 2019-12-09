const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicFileDir = path.join(__dirname, "../public/")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

const port = process.env.PORT || 3000

app.set('view engine', 'hbs')
app.set('views', viewsPath)

app.use(express.static(publicFileDir))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Sagar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "Sagar"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: "This is help message",
        name: "Sagar",
        title: "Help Page"
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You Have To Must Enter Address"
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        res.send({
            error: "You Have To Provide Location"
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page', {
        errorMessage: "Help Data not found",
        name: "Sagar",
        title: "404"
    })
})

app.get('*', (req, res) => {
    res.render('404page', {
        errorMessage: "Page You Have Requested is not Found",
        name: "Sagar",
        title: "404"

    })
})

app.listen(port,()=>{
    console.log("server is run on port "+port)
})
