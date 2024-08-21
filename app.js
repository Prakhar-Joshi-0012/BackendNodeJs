const express = require('express')
const app = express()

const CategoryRoutes = require('./Routes/Category')
const SubCategoryRoutes = require('./Routes/SubCategory')
const ItemRoutes = require('./Routes/Item')
app.use("/Category", CategoryRoutes,)
app.use("/SubCategory",SubCategoryRoutes)
app.use("/Items", ItemRoutes)

module.exports = app