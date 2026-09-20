import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import tuitionRoutes from "./routes/tuition.routes.js";
import teacherRoutes from "./routes/teacher.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import sessionRoutes from "./routes/auth.routes.js";
import { errorHandler, notFound } from "./middlewares/error.middleware.js";

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.includes("*") ? true : allowedOrigins,
    credentials: true,
  }),
);

app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.get("/health", (_req, res) => {
  res.send("OK");
});

app.use("/api/session", sessionRoutes);
app.use("/api/tuitions", tuitionRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/applications", applicationRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
