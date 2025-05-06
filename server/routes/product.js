import express from "express";
import { newProduct, getProductList, getProduct,deleteProduct,getCompareProduct } from "../controllers/product.js";
import multer from "multer";
import path from "path";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
const storage = multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,"uploads/")
    },
    filename: function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage:storage})

router.post("/new-product", upload.array("images", 10), newProduct); 
router.get("/product-list", getProductList);
router.get("/product-list/compare/:id", getCompareProduct);
router.get("/:id", getProduct);
router.delete("/delete-product/:id",verifyToken,deleteProduct);


export default router;