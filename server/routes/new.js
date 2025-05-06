import express from "express"
import multer from "multer"
import path from "path"
import { verifyToken } from "../middleware/auth.js"
import { newNew,getNew,getNewList,deleteNew } from "../controllers/new.js"

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"uploads/")
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage:storage})
const router = express.Router();

router.post("/new-new",verifyToken,upload.single("image"),newNew);
router.get("/new-list",getNewList);
router.get("/new/:id",getNew);

router.delete("/delete-new/:id",verifyToken,deleteNew);
export default router;