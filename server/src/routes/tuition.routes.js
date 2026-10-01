import { Router } from "express";
import {
  createAdminTuition,
  createPublicRequest,
  deleteTuition,
  getTuition,
  listDashboardTuitions,
  listPublicTuitions,
  updateApprovalStatus,
  updateTuition,
} from "../controllers/tuition.controller.js";
import { optionalAuth, requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import { ROLES } from "../constants.js";

const router = Router();

router.get("/", optionalAuth, listPublicTuitions);
router.get("/dashboard", requireAuth, requireRole(ROLES.ADMIN, ROLES.EDITOR), listDashboardTuitions);
router.post("/requests", createPublicRequest);
router.get("/:id", getTuition);
router.post("/", requireAuth, requireRole(ROLES.ADMIN), createAdminTuition);
router.patch("/:id", requireAuth, requireRole(ROLES.ADMIN, ROLES.EDITOR), updateTuition);
router.patch("/:id/approval", requireAuth, requireRole(ROLES.ADMIN, ROLES.EDITOR), updateApprovalStatus);
router.delete("/:id", requireAuth, requireRole(ROLES.ADMIN, ROLES.EDITOR), deleteTuition);

export default router;
