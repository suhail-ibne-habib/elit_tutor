import { Application } from "../models/application.model.js";
import { TeacherProfile } from "../models/teacherProfile.model.js";
import { Tuition } from "../models/tuition.model.js";
import { APPLICATION_STATUS, ROLES, TUITION_STATUS } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const canReviewApplications = (user, tuition) =>
  user.role === ROLES.ADMIN || tuition.postedBy === user.id;

export const applyToTuition = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);
  if (!tuition) throw new ApiError(404, "Tuition not found");
  if (tuition.status !== TUITION_STATUS.OPEN) {
    throw new ApiError(400, "This tuition is no longer open for applications.");
  }

  const profile = await TeacherProfile.findOne({ userId: req.user.id });
  if (!profile) {
    throw new ApiError(400, "Create your teacher profile before applying.");
  }

  const existing = await Application.findOne({
    tuition: tuition._id,
    teacherId: req.user.id,
  });
  if (existing) throw new ApiError(409, "You already applied to this tuition.");

  const application = await Application.create({
    tuition: tuition._id,
    teacherId: req.user.id,
    profile: profile._id,
    coverNote: req.body.coverNote || "",
    expectedSalary: req.body.expectedSalary ? Number(req.body.expectedSalary) : profile.expectedSalary,
  });

  res.status(201).json(new ApiResponse(201, application, "Application submitted"));
});

export const listTuitionApplications = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);
  if (!tuition) throw new ApiError(404, "Tuition not found");
  if (!canReviewApplications(req.user, tuition)) {
    throw new ApiError(403, "Only the poster or an admin can view applications.");
  }

  const applications = await Application.find({ tuition: tuition._id })
    .populate("profile")
    .sort({ createdAt: -1 });

  res.json(new ApiResponse(200, applications, "Applications fetched"));
});

export const listMyApplications = asyncHandler(async (req, res) => {
  const applications = await Application.find({ teacherId: req.user.id })
    .populate("tuition")
    .sort({ createdAt: -1 });
  res.json(new ApiResponse(200, applications, "Your applications"));
});

export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const application = await Application.findById(req.params.id).populate("tuition");
  if (!application) throw new ApiError(404, "Application not found");
  if (!canReviewApplications(req.user, application.tuition)) {
    throw new ApiError(403, "Only the poster or an admin can update applications.");
  }

  const status = req.body.status;
  if (!Object.values(APPLICATION_STATUS).includes(status)) {
    throw new ApiError(400, "Invalid application status.");
  }

  application.status = status;
  await application.save();

  if (status === APPLICATION_STATUS.ACCEPTED) {
    await Tuition.findByIdAndUpdate(application.tuition._id, { status: TUITION_STATUS.FILLED });
  }

  res.json(new ApiResponse(200, application, "Application updated"));
});
