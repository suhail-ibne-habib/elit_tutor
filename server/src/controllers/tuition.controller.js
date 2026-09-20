import { Tuition } from "../models/tuition.model.js";
import { User } from "../models/user.model.js";
import { ROLES, TUITION_STATUS } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const canManageTuition = (user, tuition) =>
  user.role === ROLES.ADMIN || tuition.postedBy === user.id;

const tuitionPayload = (body, user) => ({
  title: body.title,
  type: body.type,
  classLevel: body.classLevel,
  subjects: Array.isArray(body.subjects)
    ? body.subjects
    : String(body.subjects || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
  detail: body.detail,
  area: body.area,
  salary: Number(body.salary),
  daysPerWeek: body.daysPerWeek ? Number(body.daysPerWeek) : 4,
  schedule: body.schedule,
  studentGender: body.studentGender,
  tutorGenderPreference: body.tutorGenderPreference || "any",
  postedBy: user.id,
  postedByRole: user.role === ROLES.ADMIN ? ROLES.ADMIN : ROLES.PARENT,
});

export const listTuitions = asyncHandler(async (req, res) => {
  const { q, area, status, type } = req.query;
  const filter = {};

  if (status) {
    filter.status = status;
  } else if (req.user?.role !== ROLES.ADMIN) {
    filter.status = TUITION_STATUS.OPEN;
  }

  if (area) filter.area = new RegExp(area, "i");
  if (type) filter.type = type;
  if (q) {
    const search = new RegExp(String(q), "i");
    filter.$or = [
      { title: search },
      { detail: search },
      { area: search },
      { classLevel: search },
      { subjects: search },
    ];
  }

  const tuitions = await Tuition.find(filter).sort({ createdAt: -1 });
  res.json(new ApiResponse(200, tuitions, "Tuitions fetched"));
});

export const getTuition = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);
  if (!tuition) throw new ApiError(404, "Tuition not found");

  const poster = await User.findById(tuition.postedBy).select("name email role");
  res.json(new ApiResponse(200, { tuition, poster }, "Tuition fetched"));
});

export const createTuition = asyncHandler(async (req, res) => {
  const { title, classLevel, area, salary } = req.body;
  if (!title || !classLevel || !area || salary == null) {
    throw new ApiError(400, "Title, class, area, and salary are required.");
  }

  const tuition = await Tuition.create(tuitionPayload(req.body, req.user));
  res.status(201).json(new ApiResponse(201, tuition, "Tuition posted"));
});

export const updateTuition = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);
  if (!tuition) throw new ApiError(404, "Tuition not found");
  if (!canManageTuition(req.user, tuition)) {
    throw new ApiError(403, "You can only update your own tuition posts.");
  }

  const payload = tuitionPayload({ ...tuition.toObject(), ...req.body }, req.user);
  delete payload.postedBy;
  delete payload.postedByRole;
  if (req.body.status) payload.status = req.body.status;

  const updated = await Tuition.findByIdAndUpdate(req.params.id, payload, { new: true });
  res.json(new ApiResponse(200, updated, "Tuition updated"));
});

export const deleteTuition = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);
  if (!tuition) throw new ApiError(404, "Tuition not found");
  if (!canManageTuition(req.user, tuition)) {
    throw new ApiError(403, "You can only delete your own tuition posts.");
  }

  await tuition.deleteOne();
  res.json(new ApiResponse(200, null, "Tuition deleted"));
});

export const listMyTuitions = asyncHandler(async (req, res) => {
  const filter = req.user.role === ROLES.ADMIN ? {} : { postedBy: req.user.id };
  const tuitions = await Tuition.find(filter).sort({ createdAt: -1 });
  res.json(new ApiResponse(200, tuitions, "Your tuition posts"));
});
