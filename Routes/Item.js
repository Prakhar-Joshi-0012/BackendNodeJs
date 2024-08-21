const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
router.use(express.json())
const Item = require('../Database/Models/Items')
const SubCategory = require('../Database/Models/SubCategory')
const Category = require('../Database/Models/Category')

const createItem = async(req, res) =>{
    try{
        var {
            Name, 
            Image,
            Desc,
            TaxApp,
            Tax,
            BaseAmount,
            Discount,
            TotalAmount
        } = req.body
        const eCategory = await Category.findOne({"_id": req.params.catid})
        const eSubCategory = await SubCategory.findOne({"_id": req.params.subcatid})
        const nItem = await new Item({
            "Name": Name,
            "Image": Image,
            "Desc": Desc, 
            "TaxApp": TaxApp,
            "Tax": Tax,
            "BaseAmount": BaseAmount,
            "Discount": Discount,
            "TotalAmount": TotalAmount
        }).save()
        await eCategory.Items.push({"_id": nItem._id})
        await eSubCategory.Items.push({"_id": nItem._id})
        eCategory.save()
        eSubCategory.save()
        return res.status(200).json({
            "Message": `Successfully created ${nItem.Name} having id ${nItem._id}`
        })
    }catch(err){
        return res.status(422).json(err)
    }
}

const getAll = async(req, res) =>{
    try{
        const Items = await Item.find({});
        if (!Items){
            return res.status(400).json({
                "Message": `No Categories Found`
            })
        }
        return res.status(200).json({
            "Message": "Following Sub-Categories are present",
            Items
        })
    }catch(err){
        res.status(422).json(err)
    }
}

const getById = async (req, res) =>{
    try{
        const item_id = req.params.id
        const reqItem = await Item.find({"_id": item_id})
        if (!reqItem){
            return res.status(400).json({
                "Message": 'No Item present of requested id',
            })
        }
        return res.status(200).json({
            "Message": "Item Found",
            reqItem
        })
    }catch(err){
        return res.status(422)
    }
}

const getByName = async (req, res) =>{
    try{
        const item_name = req.params.name
        const reqItem = await Item.find({"Name": item_name})
        if (!reqItem){
            return res.status(400).json({
                "Message": 'No Item present of requested id',
            })
        }
        return res.status(200).json({
            "Message": "Item Found",
            reqItem
        })
    }catch(err){
        return res.status(422)
    }
}


const update = async(req, res) =>{
    try{
        const item_id = req.params.id
        var updateObject = {}
        for (const key in req.body){
            if (req.body[key] != undefined){
                updateObject[key] = req.body[key]
            }
        }
        console.log(updateObject)
        try{
        await Item.findOneAndUpdate({"_id": item_id}, {$set: updateObject}, {new: true})
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

router.post("/Add/:id", createItem)
router.get("/FetchAll", getAll)
router.get("/Fetch/:id", getById)
router.get("/Search/:name", getByName)
router.patch("/Update/:id", update)
module.exports = router