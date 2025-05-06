import Event from "../modules/Event.js";

export const newEvent = async (req,res)=>{
    try {
        const {title,eventDate} = req.body;
        const event = await Event.create({title:title,eventDate:eventDate});
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({error:error.message})
    }
}
export const getEventList = async (req,res)=>{
    try{
        const event = await Event.find({})
        res.status(200).json(event);
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

export const deleteEvent = async (req,res)=>{
    try{
        const {id} = req.params;
        const event = await Event.findByIdAndDelete(id);
        if(!event) return res.status(404).json({message:"Event not found"});
        res.status(200).json({message:"Event deleted successfully"});
    }catch(err){
        res.status(500).json({error:err.message})
    }
}