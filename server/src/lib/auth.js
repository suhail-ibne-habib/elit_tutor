import "../loadEnv.js";
import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";
import { ROLES } from "../constants.js";

const mongoClient = new MongoClient(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
  ...(process.env.FORCE_IPV4_DNS === "true" ? { family: 4 } : {}),
});

const authDb = mongoClient.db(process.env.DB_NAME);

const adminEmail = String(process.env.ADMIN_EMAIL || process.env.ADMIN_EMAILS || "")
  .split(",")[0]
  ?.trim()
  .toLowerCase();

export { mongoClient };

export const auth = betterAuth({
  database: mongodbAdapter(authDb, { client: mongoClient }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin && origin !== "*"),
  plugins: [
    admin({
      adminRoles: [ROLES.ADMIN],
      defaultRole: ROLES.VIEWER,
    }),
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: ROLES.VIEWER,
        input: true,
      },
      phone: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  databaseHooks: {
    user: {
      create: {
        before: async (user) => {
          const email = String(user.email || "").toLowerCase();
          const requestedRole = String(user.role || ROLES.VIEWER);
          const role =
            email && adminEmail && email === adminEmail
              ? ROLES.ADMIN
              : requestedRole === ROLES.ADMIN
                ? ROLES.VIEWER
                : requestedRole || ROLES.VIEWER;

          return {
            data: {
              ...user,
              role,
            },
          };
        },
      },
    },
  },
});
