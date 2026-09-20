import mongoose from "mongoose";
import { ROLES } from "../constants.js";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    emailVerified: Boolean,
    image: String,
    role: {
      type: String,
      enum: Object.values(ROLES),
      default: ROLES.PARENT,
    },
    phone: String,
  },
  {
    collection: "user",
    timestamps: true,
    strict: false,
  },
);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
