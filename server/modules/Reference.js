import mongoose from "mongoose";

const ReferenceSchema = new mongoose.Schema({
    title: { type: String},
    imagePath: { type: String },
    date: { type: Date, default: Date.now }

})

const Reference = mongoose.model("Reference",ReferenceSchema)
export default Reference