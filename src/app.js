const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

app.set('views', viewsDirectoryPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsDirectoryPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Eesha Shetty',
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Eesha Shetty',
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'You must provide an address'
        })
    } else
    {   const address = req.query.address
        geocode(address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            res.send({ 
                error: error
            })        
        } else {
        
        forecast(latitude, longitude, (error, {temperature, precipitation} = {}) => {
            if (error) {
                res.send({ 
                    error: error
                })   
            }
            res.send({
                forecast: 'It is currently '+temperature+' degrees with a '+precipitation+'% chance of rainfall.',
                location: location
            })
          })
        }
    })
    
        
    }
})

app.get('/products', (req, res) => {
    if(!req.query.search){
        res.send({
            error: 'You must provide a search term'
        })
    }
    else
   { console.log(req.query.search)
    res.send({
        products:[]
    })}
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: "hellu there",
        code: 101,
        title: 'Help',
        name: 'Eesha Shetty'
    })
})

// app.get('/help/*', (req,res) => {
//     res.render('helpnotfound', {
//         title: 'Help Article Not Found',
//         name: 'Eesha Shetty'
//     })
// })

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        name: 'Eesha Shetty'
    })
})

app.listen(port, () => {
    console.log('Server is up on 3000')
})