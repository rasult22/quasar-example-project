// Access file system from browser


const express = require('express')
const app = express()


app.use(express.static(`${__dirname}/public/`))