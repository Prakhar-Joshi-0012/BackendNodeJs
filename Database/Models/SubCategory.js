const mongoose = require('mongoose')
const Items = require('./Items')

const SubCategorySchema = new mongoose.Schema({
    Name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    Image:{
        type: mongoose.Schema.Types.String,
        required: true,
    },
    Desc:{
        type: mongoose.Schema.Types.String,
        required: true,
    },
    TaxApp: {
        type: mongoose.Schema.Types.Boolean,
        required: true,
    },
    Tax: {
        type: mongoose.Schema.Types.Number,
        required: true,
        default: 0,
    },
    Items: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Items
        }
    }]
})

const SubCategory= new mongoose.model('SubCategory', SubCategorySchema)
module.exports = SubCategory