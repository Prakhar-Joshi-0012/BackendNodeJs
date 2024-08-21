const mongoose = require('mongoose')
const DBurl = process.env.url

const connectdb = async() =>{
    try{
        const connect = await mongoose.connect(DBurl, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 10000,
        })
        console.log('Server Connected to Database')
    }catch(err){
        console.log(`Error: ${err}`)
    }
}
module.exports = connectdb