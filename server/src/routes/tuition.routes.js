import { Router } from "express";
import {
  createTuition,
  deleteTuition,
  getTuition,
  listMyTuitions,
  listTuitions,
  updateTuition,
} from "../controllers/tuition.controller.js";
import { applyToTuition, listTuitionApplications } from "../controllers/application.controller.js";
import { optionalAuth, requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import { ROLES } from "../constants.js";

const router = Router();

router.get("/", optionalAuth, listTuitions);
router.get("/mine", requireAuth, requireRole(ROLES.PARENT, ROLES.ADMIN), listMyTuitions);
router.get("/:id", getTuition);
router.post("/", requireAuth, requireRole(ROLES.PARENT, ROLES.ADMIN), createTuition);
router.patch("/:id", requireAuth, requireRole(ROLES.PARENT, ROLES.ADMIN), updateTuition);
router.delete("/:id", requireAuth, requireRole(ROLES.PARENT, ROLES.ADMIN), deleteTuition);

router.post("/:id/applications", requireAuth, requireRole(ROLES.TEACHER), applyToTuition);
router.get(
  "/:id/applications",
  requireAuth,
  requireRole(ROLES.PARENT, ROLES.ADMIN),
  listTuitionApplications,
);

export default router;
