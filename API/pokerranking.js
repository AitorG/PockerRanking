'use strict'
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const config = require('./config')
const mongoose = require('mongoose')

mongoose.connect(config.database)

let app = express()
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(require('./middlewares/allowCrossDomain'))

app.use('/auth', require('./routes/authroutes'))
app.use('/user', require('./routes/userroutes'))

app.use(require('./middlewares/errorHandler'))
app.listen(config.port)
console.log(`Poker Ranking running in http://localhost:${config.port}`)
