import { Router } from "express";

import AuthUserRoutes from "./auth/auth.routes";
import TicketRoutes from "./tickets/ticket.routes";
import middlewares from "../commons/middlewares";

const routes = Router();

routes.use("/auth", AuthUserRoutes);
routes.use("/tickets", middlewares.auth, TicketRoutes);

export default routes;
