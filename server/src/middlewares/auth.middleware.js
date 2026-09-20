import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import { ApiError } from "../utils/ApiError.js";

export const requireAuth = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session?.user) {
      throw new ApiError(401, "Please sign in to continue.");
    }

    req.session = session.session;
    req.user = session.user;
    next();
  } catch (error) {
    next(error.statusCode ? error : new ApiError(401, "Please sign in to continue."));
  }
};

export const optionalAuth = async (req, _res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });
    req.user = session?.user || null;
  } catch {
    req.user = null;
  }
  next();
};

export const requireRole = (...roles) => (req, _res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    next(new ApiError(403, "You do not have permission to do that."));
    return;
  }
  next();
};
