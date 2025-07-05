import { Router } from "express";

import AuthUserRoutes from "./auth/auth.routes";
import TicketRoutes from "./tickets/ticket.routes";

const routes = Router();

routes.use("/auth", AuthUserRoutes);
routes.use("/tickets", TicketRoutes);

export default routes;
