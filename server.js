const app = require('./app')
const http = require('http')
const port = process.env.PORT || 3000
const dotenv = require('dotenv')
dotenv.config()

const server = http.createServer(app)
server.listen(port)

const connectDb = require('./Database/Databaseconn/connect')
connectDb()