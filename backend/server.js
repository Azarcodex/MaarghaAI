import "./config/env_config.js";

import express from "express";
import cors from "cors";

import chatRoutes from "./routes/chatRouter.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
