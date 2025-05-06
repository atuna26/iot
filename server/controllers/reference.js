import Reference from "../modules/Reference.js";

export const deleteReference = async (req,res) => {
    try {
        const { id } = req.params;
        const referenceResponse = await Reference.findByIdAndDelete(id);
        if (!referenceResponse) return res.status(404).json({ message: "Reference not found" });
        res.status(200).json({ message: "Reference deleted successfully" });
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

export const newReference = async (req,res)=> {
    try{
        const {title} = req.body;
        const image =  req.file ? req.file.filename : null;
        const newReference = await Reference.create({
            title,
            imagePath: image
        })
        res.status(201).json(newReference);
    }catch(err){
        res.status(500).json({err:err.message})
    }
}

export const getReferenceList = async (req, res) => {
    try {
        const referenceList = await Reference.find().sort({ date: -1 });
        res.status(200).json(referenceList);
    } catch (err) {
        res.status(500).json({ err: err.message })
    }
}

