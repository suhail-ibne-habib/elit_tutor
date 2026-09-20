import "../loadEnv.js";
import { MongoClient } from "mongodb";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { ROLES } from "../constants.js";

const mongoClient = new MongoClient(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 8000,
  connectTimeoutMS: 8000,
  ...(process.env.FORCE_IPV4_DNS === "true" ? { family: 4 } : {}),
});

const authDb = mongoClient.db(process.env.DB_NAME);

const signupRoles = new Set([ROLES.PARENT, ROLES.TEACHER]);
const adminEmails = (process.env.ADMIN_EMAILS || "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export { mongoClient };

export const auth = betterAuth({
  database: mongodbAdapter(authDb, { client: mongoClient }),
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: (process.env.CORS_ORIGIN || "http://localhost:3000")
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin && origin !== "*"),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: ROLES.PARENT,
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
          const requestedRole = String(user.role || ROLES.PARENT);
          const role = adminEmails.includes(email)
            ? ROLES.ADMIN
            : signupRoles.has(requestedRole)
              ? requestedRole
              : ROLES.PARENT;

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
