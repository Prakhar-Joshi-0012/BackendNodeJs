const mongoose = require('mongoose')

const ItemSchema = new mongoose.Schema({
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
    BaseAmount: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    Discount: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
    TotalAmount: {
        type: mongoose.Schema.Types.Number,
        required: true,
    },
})

const Item = new mongoose.model('Items', ItemSchema)
module.exports = Item