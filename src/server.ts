import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./modules/index.routes";

dotenv.config();

const app = express();


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
