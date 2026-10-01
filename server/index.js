import "./src/loadEnv.js";
import connectDB from "./src/db/connection.js";
import { mongoClient } from "./src/lib/auth.js";
import { User } from "./src/models/user.model.js";
import { auth } from "./src/lib/auth.js";
import app from "./src/app.js";

const port = Number(process.env.PORT) || 8000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});

async function start() {
  await connectDB();
  await mongoClient.connect();
  await ensureAdminUser();
}

start().catch((error) => {
  console.error("Failed to connect to database", error);
});

async function ensureAdminUser() {
  const email = String(process.env.ADMIN_EMAIL || process.env.ADMIN_EMAILS || "")
    .split(",")[0]
    ?.trim()
    .toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || "").trim();

  if (!email || !password) {
    console.warn("Admin seed skipped because ADMIN_EMAIL or ADMIN_PASSWORD is missing.");
    return;
  }

  const existing = await User.findOne({ email });
  if (existing) {
    if (existing.role !== "admin") {
      existing.role = "admin";
      await existing.save();
    }
    return;
  }

  await auth.api.signUpEmail({
    body: {
      name: "Suhail Admin",
      email,
      password,
    },
    headers: new Headers({
      host: new URL(process.env.BETTER_AUTH_URL || `http://localhost:${port}`).host,
    }),
  });
}
