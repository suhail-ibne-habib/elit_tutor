import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get(
  "/me",
  requireAuth,
  asyncHandler(async (req, res) => {
    res.json(new ApiResponse(200, { user: req.user, session: req.session }, "Current user"));
  }),
);

export default router;
