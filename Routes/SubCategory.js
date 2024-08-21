const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
router.use(express.json())
const Category = require('../Database/Models/Category')
const SubCategory = require('../Database/Models/SubCategory')

const createSubCategory = async(req, res) =>{
    try{
        var {
            Name, 
            Image,
            Desc,
            TaxApp,
            Tax,
            Items,
        } = req.body
        const eCategory = await Category.findOne({"_id": req.params.id})
        if (!TaxApp){
            TaxApp = eCategory["TaxApp"]
        }
        if (!Tax){
            Tax = eCategory["Tax"]
        }
        const nSubCategory = await new SubCategory({
            "Name": Name,
            "Image": Image,
            "Desc": Desc, 
            "TaxApp": TaxApp,
            "Tax": Tax,
            "Items": Items,
        }).save()
        await eCategory.SubCategories.push({"_id": nSubCategory._id})
        eCategory.save()
        return res.status(200).json({
            "Message": `Successfully created ${nSubCategory.Name} having id ${nSubCategory._id}`
        })
    }catch(err){
        return res.status(422).json(err)
    }
}

const getAll = async(req, res) =>{
    try{
        const SubCategories = await SubCategory.find({});
        if (!SubCategories){
            return res.status(400).json({
                "Message": `No Categories Found`
            })
        }
        return res.status(200).json({
            "Message": "Following Sub-Categories are present",
            SubCategories
        })
    }catch(err){
        res.status(422).json(err)
    }
}

const getById = async (req, res) =>{
    try{
        const subcategory_id = req.params.id
        const reqSubCatogory = await SubCategory.find({"_id": subcategory_id})
        if (!reqSubCatogory){
            return res.status(400).json({
                "Message": 'No Subcategory present of requested id',
            })
        }
        return res.status(200).json({
            "Message": "SubCategory Found",
            reqSubCatogory
        })
    }catch(err){
        return res.status(422)
    }
}

const update = async(req, res) =>{
    try{
        const subcategory_id = req.params.id
        var updateObject = {}
        for (const key in req.body){
            if (req.body[key] != undefined){
                updateObject[key] = req.body[key]
            }
        }
        console.log(updateObject)
        try{
        await SubCategory.findOneAndUpdate({"_id": subcategory_id}, {$set: updateObject}, {new: true})
        }catch(err){
            console.log(err)
        }
        return res.status(200).json({
            "Message": "Successfully updated the SubCategory"
        })
    }catch(err){
        return res.status(422)
    }
}

const getAllItems = async(req, res) => {
    try{
        const subcategory_id = req.params.id
        const reqSubCategory = await SubCategory.findOne({"_id": subcategory_id})
        if (!reqSubCategory){
            return res.status(400).json({
                "Message": 'No category present of requested id',
            })
        }
        const Items = reqSubCategory["Items"]
        return res.status(200).json({
            "Message": "Following Items are present",
            Items
        })
        
    }catch(err){
        return res.status(422)
    }
}
router.post("/Add/:id", createSubCategory)
router.get("/FetchAll", getAll)
router.get("/Fetch/:id", getById)
router.patch("/Update/:id", update)
router.get("/FetchAllItems/:id", getAllItems)
module.exports = router