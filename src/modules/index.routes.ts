import { Router } from "express";

import AuthUserRoutes from "./auth/user/auth.routes";

const routes = Router();

routes.use("/auth", AuthUserRoutes);

export default routes;
