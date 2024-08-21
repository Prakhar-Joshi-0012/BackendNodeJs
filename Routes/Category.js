const mongoose = require('mongoose')
const express = require('express')

const router = express.Router()
router.use(express.json())
const Category = require('../Database/Models/Category')

const createCategory = async(req, res) =>{
    try{
        const {
            Name, 
            Image,
            Desc,
            TaxApp,
            Tax,
            TaxType,
            SubCategories,
            Items,
        } = req.body
        const nCategory = await new Category({
            "Name": Name,
            "Image": Image,
            "Desc": Desc, 
            "TaxApp": TaxApp,
            "Tax": Tax,
            "TaxType": TaxType,
            "Items": Items,
            "SubCategories": SubCategories,
        }).save()
        return res.status(200).json({
            "Message": `Successfully created ${nCategory.Name} having id ${nCategory._id}`
        })
    }catch(err){
        return res.status(422).json(err)
    }
}

const getAll = async(req, res) =>{
    try{
        const Categories = await Category.find({});
        if (!Categories){
            return res.status(400).json({
                "Message": `No Categories Found`
            })
        }
        return res.status(200).json({
            "Message": "Following Categories are present",
            Categories
        })
    }catch(err){
        res.status(422).json(err)
    }
}

const getById = async (req, res) =>{
    try{
        const category_id = req.params.id
        const reqCatogory = await Category.find({"_id": category_id})
        if (!reqCatogory){
            return res.status(400).json({
                "Message": 'No category present of requested id',
            })
        }
        return res.status(200).json({
            "Message": "Category Found",
            reqCatogory
        })
    }catch(err){
        return res.status(422).json({
            "err": err
        })
    }
}
const update = async(req, res) =>{
    try{
        const category_id = req.params.id
        var updateObject = {}
        for (const key in req.body){
            if (req.body[key] != undefined){
                updateObject[key] = req.body[key]
            }
        }
        console.log(updateObject)
        try{
        await Category.findOneAndUpdate({"_id": category_id}, {$set: updateObject}, {new: true})
        }catch(err){
            console.log(err)
        }
        return res.status(200).json({
            "Message": "Successfully updated the object"
        })
    }catch(err){
        return res.status(422)
    }
}

const getAllSubCategories = async(req, res) => {
    try{
        const category_id = req.params.id
        console.log(category_id)
        const reqCategory = await Category.findOne({"_id": category_id})
        if (!reqCategory){
            return res.status(400).json({
                "Message": 'No category present of requested id',
            })
        }
        const SubCategories = reqCategory["SubCategories"]
        return res.status(200).json({
            "Message": "Following Subcategories are present",
            SubCategories
        })
        
    }catch(err){
        return res.status(422)
    }
}
const getAllItems = async(req, res) => {
    try{
        const category_id = req.params.id
        console.log(category_id)
        const reqCategory = await Category.findOne({"_id": category_id})
        if (!reqCategory){
            return res.status(400).json({
                "Message": 'No category present of requested id',
            })
        }
        const Items = reqCategory["Items"]
        return res.status(200).json({
            "Message": "Following Items are present",
            Items
        })
        
    }catch(err){
        return res.status(422)
    }
}
router.post("/Add", createCategory)
router.get("/FetchAll", getAll)
router.get("/Fetch/:id", getById)
router.patch("/Update/:id", update)
router.get("/FetchAllSubCategories/:id", getAllSubCategories)
router.get("/FetchAllItems/:id", getAllItems)
module.exports = router