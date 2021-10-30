const { response } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const routes = require("./routes/app")
const app = express()
app.listen(3000,() =>{console.log(`now listening for requests at 3000`)})
app.use(express.static('./public/'))
app.use(express.json())
require('dotenv').config()


app.use('/api', routes)

//connect DB
mongoose.connect(
    process.env.mongoose_URI,
    { useNewUrlParser: true }, (err, client)=>{
        if(err){
            console.log(err) 
        }
        else {
            console.log("Connection to DB is successful...")
        }
})
mongoose.Promise = global.Promise






