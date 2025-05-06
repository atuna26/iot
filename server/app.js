import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import { fileURLToPath } from 'url';
import authRoutes from "./routes/auth.js"
import eventRoutes from "./routes/event.js"
import newRoutes from "./routes/new.js"
import productRoutes from "./routes/product.js"
import referenceRoutes from "./routes/reference.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

app.use("/uploads", express.static(path.join(__dirname, "uploads")))

app.use("/auth", authRoutes)
app.use("/event",eventRoutes)
app.use("/new",newRoutes)
app.use("/product",productRoutes)
app.use("/reference",referenceRoutes)

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URL).then(()=>{
    app.listen(PORT,()=>{
        console.log("server is running",PORT);
    });
}).catch((err)=>{
    console.log(err)
})