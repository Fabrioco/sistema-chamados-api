import { Router } from "express";

import AuthUserRoutes from "./auth/auth.routes";

const routes = Router();

routes.use("/auth", AuthUserRoutes);

export default routes;
