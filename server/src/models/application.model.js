import mongoose from "mongoose";
import { APPLICATION_STATUS } from "../constants.js";

const applicationSchema = new mongoose.Schema(
  {
    tuition: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tuition",
      required: true,
    },
    teacherId: {
      type: String,
      required: true,
      index: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TeacherProfile",
    },
    coverNote: {
      type: String,
      default: "",
      trim: true,
    },
    expectedSalary: {
      type: Number,
    },
    status: {
      type: String,
      enum: Object.values(APPLICATION_STATUS),
      default: APPLICATION_STATUS.PENDING,
    },
  },
  { timestamps: true },
);

applicationSchema.index({ tuition: 1, teacherId: 1 }, { unique: true });

export const Application =
  mongoose.models.Application || mongoose.model("Application", applicationSchema);
