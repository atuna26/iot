import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
    title:{type:String,required:true},
    eventDate:{type:Date,required:true},
    date:{type:Date,required:true,default:Date.now}
});

const Event = mongoose.model("Event",EventSchema)
export default Event