import { Router } from "express";
import {
  getMyProfile,
  getTeacherById,
  listTeachers,
  upsertMyProfile,
} from "../controllers/teacher.controller.js";
import { requireAuth, requireRole } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { ROLES } from "../constants.js";

const router = Router();

router.get("/", listTeachers);
router.get("/me", requireAuth, requireRole(ROLES.TEACHER), getMyProfile);
router.put(
  "/me",
  requireAuth,
  requireRole(ROLES.TEACHER),
  upload.single("avatar"),
  upsertMyProfile,
);
router.get("/:userId", getTeacherById);

export default router;
