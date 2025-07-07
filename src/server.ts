import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./modules/index.routes";
import app from "./app";

dotenv.config();

const server = express();

server.use(app)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
