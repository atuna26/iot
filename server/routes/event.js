import express from "express"
import { newEvent,getEventList,deleteEvent } from "../controllers/event.js"
import {verifyToken} from "../middleware/auth.js"

const router = express.Router();

router.post("/new-event",verifyToken,newEvent)
router.get("/event-list",getEventList)
router.delete("/delete-event/:id",verifyToken,deleteEvent)

export default router