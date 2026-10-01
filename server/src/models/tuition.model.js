import mongoose from "mongoose";
import { APPROVAL_STATUS, ROLES, TUITION_STATUS, TUITION_TYPE } from "../constants.js";

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
    requesterName: {
      type: String,
      required: true,
      trim: true,
    },
    requesterPhone: {
      type: String,
      required: true,
      trim: true,
    },
    requesterEmail: {
      type: String,
      default: "",
      trim: true,
      lowercase: true,
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
    approvalStatus: {
      type: String,
      enum: Object.values(APPROVAL_STATUS),
      default: APPROVAL_STATUS.PENDING,
      index: true,
    },
    approvedBy: {
      type: String,
      default: "",
    },
    approvedAt: {
      type: Date,
      default: null,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
    postedBy: {
      type: String,
      index: true,
      default: "",
    },
    postedByRole: {
      type: String,
      enum: [ROLES.ADMIN, ROLES.EDITOR, ""],
      default: "",
    },
  },
  { timestamps: true },
);

tuitionSchema.index({ title: 1, area: 1, status: 1, approvalStatus: 1 });

export const Tuition = mongoose.models.Tuition || mongoose.model("Tuition", tuitionSchema);
