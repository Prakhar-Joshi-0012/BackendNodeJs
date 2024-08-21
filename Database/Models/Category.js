const mongoose = require('mongoose')
const SubCategory = require('./SubCategory')


const CategorySchema = new mongoose.Schema({
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
    TaxType: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    SubCategories: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: SubCategory,
        }
    }],
    Items: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: SubCategory,
        }
    }]
})

const Category= new mongoose.model('Category', CategorySchema)
module.exports = Category