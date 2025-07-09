import express from "express";
import cors from "cors";
import routes from "./modules/index.routes";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(cookieParser());

export default app;
