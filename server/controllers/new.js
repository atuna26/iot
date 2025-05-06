import New from "../modules/New.js"
import path, { format } from "path"
import multer from "multer"

export const newNew = async(req,res)=>{
    try{
        const image =  req.file ? req.file.filename : null;
        const newResponse = await New.create({
            title:req.body.title,
            shortText:req.body.shortText,
            text:req.body.text,
            imagePath:image,
        })
        res.status(201).json(newResponse)
    }catch(err){
        res.status(500).json({err:err.message})
    }
}

export const getNewList = async (req,res)=>{
    try{
        const newList = await New.find().sort({date:-1});
        res.status(200).json(newList);
         
    }catch(err){
        res.status(500).json({err:err.message})
    }
}

export const getNew = async (req,res)=>{
    try{
        const {id} = req.params;
        const newResponse = await New.findById(id);
        res.status(200).json(newResponse);
    }catch(err){
        res.status(500).json({err:err.message})
    }
}

export const deleteNew = async (req,res)=>{
    try{
        const {id} = req.params;
        const newResponse = await New.findByIdAndDelete(id);
        if(!newResponse) return res.status(404).json({message:"New not found"});
        res.status(200).json({message:"New deleted successfully"});
    }catch(err){
        res.status(500).json({err:err.message})
    }
}

