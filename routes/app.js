const express = require('express')
const router = express.Router()
const geoTile = require('../models/geoTile')
const assert = require('assert')
const mongo = require('mongodb')
const mongoose = require('mongoose')
const { response } = require('express')



router.post('/', (requests, response) => {
    console.log(requests.body)
    const data = requests.body
    const userLocation = response.json({
        status: 'success',
        latitude: data.lat,
        longitude: data.lons
    })
})

router.get('/getdata/:lat/:long', (req, res) =>{
    var maxDistnace = 1000
    req.params.lat = parseInt(req.params.lat)
    req.params.long = parseInt(req.params.long)
    
    res.send('somethig something' + (req.params.lat - maxDistnace) + req.params.long)
        mongoose.connect(process.env.mongoose_URI, function(err, db) {
            if (err) throw err;
            db.collection("mArGo").find({
                x_sw: { $gt: (req.params.lat - maxDistnace), $lt: (req.params.lat + maxDistnace) },
                y_sw: { $gt: (req.params.long - maxDistnace), $lt: (req.params.long + maxDistnace) }
                
            }).toArray(function(err, result) {
              if (err) throw err
              console.log(result)
              console.log((req.params.lat + maxDistnace))
              db.close()
            })
          })         
})


router.post('/insert', (req, res) =>{
    console.log('i am at the beginning')
    mongoose.connect(process.env.mongoose_URI, (err, db)=>{
        let item = new geoTile ({
            epsg: req.body.epsg,
            filename: req.body.filename,
            offset_y: req.body.offset_y,
            offset_x: req.body.offset_x,
            size_x: req.body.size_x,
            size_y: req.body.size_y,
            type: req.body.type,
            x_sw: req.body.x_sw,
            y_sw: req.body.y_sw,
    
        });
        item.save().then(result =>{
            console.log(result)
        }).catch(err => console.log(err))
        console.log('iam here')
        assert.equal(null, err)
        db.collection('mArGo').insertOne(item, (err, result)=>{
            assert.equal(null, err)
            console.log('item inserted', result)
            
        })
    })
    res.redirect('/')

})

module.exports = router