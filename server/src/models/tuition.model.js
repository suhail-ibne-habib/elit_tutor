import mongoose from "mongoose";
import { ROLES, TUITION_STATUS, TUITION_TYPE } from "../constants.js";

const tuitionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: Object.values(TUITION_TYPE),
      default: TUITION_TYPE.HOME,
    },
    classLevel: {
      type: String,
      required: true,
      trim: true,
    },
    subjects: {
      type: [String],
      default: [],
    },
    detail: {
      type: String,
      default: "",
    },
    area: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    daysPerWeek: {
      type: Number,
      default: 4,
    },
    schedule: {
      type: String,
      default: "",
    },
    studentGender: {
      type: String,
      default: "",
    },
    tutorGenderPreference: {
      type: String,
      default: "any",
    },
    status: {
      type: String,
      enum: Object.values(TUITION_STATUS),
      default: TUITION_STATUS.OPEN,
      index: true,
    },
    postedBy: {
      type: String,
      required: true,
      index: true,
    },
    postedByRole: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.PARENT],
      required: true,
    },
  },
  { timestamps: true },
);

tuitionSchema.index({ title: 1, area: 1, status: 1 });

export const Tuition = mongoose.models.Tuition || mongoose.model("Tuition", tuitionSchema);
