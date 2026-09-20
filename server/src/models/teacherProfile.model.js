import mongoose from "mongoose";

const teacherProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    bio: {
      type: String,
      default: "",
      trim: true,
    },
    subjects: {
      type: [String],
      default: [],
    },
    classes: {
      type: [String],
      default: [],
    },
    areas: {
      type: [String],
      default: [],
    },
    expectedSalary: {
      type: Number,
      default: 0,
    },
    experienceYears: {
      type: Number,
      default: 0,
    },
    education: {
      type: String,
      default: "",
    },
    availability: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      enum: ["male", "female", "other", ""],
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    avatar: {
      type: String,
      default: "",
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const TeacherProfile =
  mongoose.models.TeacherProfile || mongoose.model("TeacherProfile", teacherProfileSchema);
