import express from "express";
const router = express.Router();
import {
    getMessages,
    sendMessages,
    deleteMessage,
} from "../controllers/messageController.js";
// GET all messages
router.get("/message", getMessages);

// POST a new message
router.post("/message", sendMessages);

// DELETE all messages
router.delete("/message", deleteMessage);

export default router;