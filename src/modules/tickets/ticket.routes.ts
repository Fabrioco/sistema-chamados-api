import { Router } from "express";

import TicketController from "./ticket.controller";

const router = Router();

router.post("/", TicketController.create);
router.get("/", TicketController.findAll);
router.get("/:id", TicketController.findUniqueById);
router.get("/user/:id", TicketController.findUniqueByUserId);
router.put("/:id", TicketController.update);
router.delete("/:id", TicketController.delete);

export default router;
