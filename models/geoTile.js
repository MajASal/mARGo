const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Tile = new Schema({
    epsg: {
        type: Number,
        require : true,
    },
    filename: {
        type: String,
        require: true,
        unique: true
    },
    offset_x: {
        type: Number,
        require : true,
    },
    offset_y: {
        type: Number, require : true,
    },
    size_x:{
        type: Number, require : true,
    },
    size_y: {
        type: Number, require : true,
    },
    type: {
        type: String, require: true,
    },
    x_sw: {
        type: Number, require : true,
    },
    y_sw: {
        type: Number, require : true,
    }
})
const geoTile = mongoose.model('margos',Tile)
module.exports = geoTile