import express from "express";
import { generateReply } from "../services/geminiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const reply = await generateReply(message);

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
