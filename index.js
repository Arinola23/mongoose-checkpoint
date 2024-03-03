const express = require('express');
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 4400
const connect = require('./config/db.js')
const {urlencoded} = require('body-parser')

connect()
const app = express()
app.use(express.json())
app.use(urlencoded({extended: false}))

app.use('/', require('./routers/routes.js'))
app.use('/update', require('./routers/routesfood.js'))
app.use('/del', require('./routers/deleteName.js'))
app.use('/chained', require('./routers/chained.js'))

app.listen(PORT, ()=> {
console.log(`server is running on ${PORT}`)
})

