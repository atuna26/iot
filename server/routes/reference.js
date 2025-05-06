import express from 'express';
import { newReference,getReferenceList, deleteReference} from '../controllers/reference.js';
import { verifyToken } from '../middleware/auth.js';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"uploads");
    },
    filename: function(req,file,cb){
        const ext = path.extname(file.originalname);
        cb(null,Date.now()+ext);
    }
});

const upload = multer({storage});

const router = express.Router();

router.post("/new-reference", verifyToken, upload.single("image"), newReference);
router.get("/reference-list", getReferenceList);
router.delete("/delete-reference/:id", verifyToken, deleteReference);

export default router;