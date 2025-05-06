import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    name:{type:String,required:true},
    code:{type:String,required:true,unique:true},
    describe:{type:String,required:true},
    type:{type:String,required:true},
    imagePath: [{type:String}],
    date:{type:Date,default:Date.now}
})

const Product = mongoose.model("Product",ProductSchema)
export default Product