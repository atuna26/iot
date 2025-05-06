import mongoose from "mongoose";

const NewSchema = new mongoose.Schema({
    title:{type:String,required:true},
    shortText: {type:String,required:true},
    text:{type:String,required:true},
    date:{type:Date,default:Date.now},
    imagePath:{type:String},
})

const New = mongoose.model("New",NewSchema)
export default New