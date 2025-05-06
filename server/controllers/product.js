import Product from "../modules/Product.js";
import fs from "fs"


export const newProduct = async (req,res)=>{
    try{
        const images = req.files.map((file) => {
            const imagePath = `${file.filename}`;
            return imagePath;
        }
        );

        const product = await Product.create({
            name:req.body.name,
            code:req.body.code,
            describe:req.body.describe,
            imagePath:images,
            type:req.body.type,
        })
        res.status(201).json(product)
    }catch(err){
        console.log(err)
        res.status(500).json({err:err.message})
    }
}

export const getProductList = async (req,res)=>{
    try{
        console.log("err")
        const productList = await Product.find().sort({date:-1});
        res.status(200).json(productList);
    }catch(err){
        console.log(err)
        res.status(500).json({err:err.message})
    }
}

export const getProduct = async (req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({err:err.message})
    }
}

export const getCompareProduct = async (req,res) => {
    try{
        const ids = req.params.id.split(",");
        const products = await Product.find({code:{$in:ids}});
        res.status(200).json(products);
    }catch(err){
        res.status(500).json({err:err.message})
    }
}

export const deleteProduct = async (req,res)=>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({err:err.message})
    }
}