import messageModel from "../models/message.js";

export const getMessages = async(req, res) => {
    try {
        const messages = await messageModel.find();
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: "Error fetching messages" });
    }
};

export const sendMessages = async(req, res) => {
    const message = new messageModel({
        sender: req.body.sender,
        receiver: req.body.receiver,
        content: req.body.content,
    });
    try {
        const newMessage = await message.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteMessage = async(req, res) => {
    try {
        await messageModel.deleteMany();
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ error: "Error deleting messages" });
    }
};