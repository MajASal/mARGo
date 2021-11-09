const routes = require("./routes/app")
const mongoose = require('mongoose')
require('dotenv').config()
const adminRouter = require('./routes/adminRoute')
 
const express = require('express')
const app = express()
app.use('/api', routes)
app.use('/admin', adminRouter)

const PORT = process.env.PORT || 8080

const run = async () => {
    mongoose.connect(process.env.mongoose_URI, {
      useNewUrlParser: true, useUnifiedTopology: true })
    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}!`)
    })
  }
  
  run()