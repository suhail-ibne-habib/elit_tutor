import { Router } from "express";
import {
  listMyApplications,
  updateApplicationStatus,
} from "../controllers/application.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import { ROLES } from "../constants.js";

const router = Router();

router.get("/me", requireAuth, requireRole(ROLES.TEACHER), listMyApplications);
router.patch("/:id", requireAuth, requireRole(ROLES.PARENT, ROLES.ADMIN), updateApplicationStatus);

export default router;
