//nodemon src/app -e js,hbs  (allows use of handlebars)
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')



const app = express()

//Define paths for Express config
//static html files
const publicDirPath = path.join(__dirname,'../public')
//hbs setup..only needed if changing name of views folder ie templates
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')//partials are like components replace with React?

//setup hbs engine and define views and partails location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory html files
app.use(express.static(publicDirPath))

app.get('/',(req,res)=>{
    //render keyword to server hbs pass dynamic info in object
    res.render('index',{
        title:'Weather app',
        name: 'Sean'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name: 'Sean'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Sean'
    })
})

app.get('/weather', (req,res)=>{
    //req.query will contain what user typed as query in key value pairs parsed to json
    if(!req.query.address){
        return res.send({
            error: 'You must provide a search location'
        })
    }

    geocode(req.query.address,(error,{lat,long,location}={})=>{
        forecast(lat,long,(error,forecastData)=>{
            
            res.send({
                location: location,
                forecast: forecastData
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Sean',
        term: 'Help'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name: 'Sean'
    })
})

//3000 dev server
app.listen(3000, ()=>{
    console.log('server running on port 3000')
})


