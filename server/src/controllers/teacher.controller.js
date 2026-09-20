import { TeacherProfile } from "../models/teacherProfile.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toList = (value) =>
  Array.isArray(value)
    ? value
    : String(value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

export const listTeachers = asyncHandler(async (req, res) => {
  const { q, area, subject } = req.query;
  const filter = { isPublic: true };
  if (area) filter.areas = new RegExp(area, "i");
  if (subject) filter.subjects = new RegExp(subject, "i");
  if (q) {
    filter.$or = [
      { bio: new RegExp(q, "i") },
      { education: new RegExp(q, "i") },
      { subjects: new RegExp(q, "i") },
    ];
  }

  const profiles = await TeacherProfile.find(filter).sort({ updatedAt: -1 });
  const userIds = profiles.map((profile) => profile.userId);
  const users = await User.find({ _id: { $in: userIds } }).select("name email image role");
  const usersById = Object.fromEntries(users.map((user) => [String(user._id), user]));

  const data = profiles.map((profile) => ({
    profile,
    user: usersById[profile.userId] || null,
  }));

  res.json(new ApiResponse(200, data, "Teachers fetched"));
});

export const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await TeacherProfile.findOne({ userId: req.user.id });
  res.json(new ApiResponse(200, { user: req.user, profile }, "Teacher profile"));
});

export const upsertMyProfile = asyncHandler(async (req, res) => {
  const payload = {
    userId: req.user.id,
    bio: req.body.bio ?? "",
    subjects: toList(req.body.subjects),
    classes: toList(req.body.classes),
    areas: toList(req.body.areas),
    expectedSalary: req.body.expectedSalary ? Number(req.body.expectedSalary) : 0,
    experienceYears: req.body.experienceYears ? Number(req.body.experienceYears) : 0,
    education: req.body.education ?? "",
    availability: req.body.availability ?? "",
    gender: req.body.gender ?? "",
    phone: req.body.phone ?? "",
    isPublic: req.body.isPublic !== undefined ? Boolean(req.body.isPublic) : true,
  };

  if (req.file) {
    payload.avatar = `/temp/${req.file.filename}`;
  }

  const profile = await TeacherProfile.findOneAndUpdate({ userId: req.user.id }, payload, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });

  res.json(new ApiResponse(200, profile, "Profile saved"));
});

export const getTeacherById = asyncHandler(async (req, res) => {
  const profile = await TeacherProfile.findOne({
    userId: req.params.userId,
    isPublic: true,
  });
  if (!profile) throw new ApiError(404, "Teacher profile not found");

  const user = await User.findById(req.params.userId).select("name email image role");
  res.json(new ApiResponse(200, { user, profile }, "Teacher profile"));
});
