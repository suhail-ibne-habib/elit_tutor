import { Tuition } from "../models/tuition.model.js";
import { APPROVAL_STATUS, ROLES, TUITION_STATUS } from "../constants.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const STAFF_ROLES = new Set([ROLES.ADMIN, ROLES.EDITOR]);

const toSubjects = (value) =>
  Array.isArray(value)
    ? value
    : String(value || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

const buildTuitionPayload = (body) => {
  const subjects = toSubjects(body.subjects);
  const classLevel = String(body.classLevel || "").trim();
  const title =
    String(body.title || "").trim() ||
    [classLevel, subjects.join(", ")].filter(Boolean).join(" — ") ||
    "Tuition request";

  return {
    title,
    type: body.type || "home",
    classLevel,
    subjects,
    detail: body.detail || "",
    requesterName: body.requesterName || "Guardian",
    requesterPhone: body.requesterPhone,
    requesterEmail: body.requesterEmail || "",
    area: body.area,
    salary: Number(body.salary),
    daysPerWeek: body.daysPerWeek ? Number(body.daysPerWeek) : 4,
    schedule: body.schedule || "",
    studentGender: body.studentGender || "",
    tutorGenderPreference: body.tutorGender || body.tutorGenderPreference || "any",
    status: body.status || TUITION_STATUS.OPEN,
  };
};

const canManageTuition = (user) => STAFF_ROLES.has(user?.role);

const applyQueryFilters = (filter, query) => {
  const { q, area, type } = query;
  if (area) filter.area = new RegExp(String(area), "i");
  if (type) filter.type = type;
  if (q) {
    const search = new RegExp(String(q), "i");
    filter.$or = [
      { title: search },
      { detail: search },
      { area: search },
      { classLevel: search },
      { subjects: search },
      { requesterName: search },
    ];
  }
};

export const listPublicTuitions = asyncHandler(async (req, res) => {
  const filter = {
    status: TUITION_STATUS.OPEN,
    approvalStatus: APPROVAL_STATUS.APPROVED,
  };

  applyQueryFilters(filter, req.query);

  const tuitions = await Tuition.find(filter).sort({ publishedAt: -1, createdAt: -1 });
  res.json(new ApiResponse(200, tuitions, "Approved tuitions fetched"));
});

export const listDashboardTuitions = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.approvalStatus) {
    filter.approvalStatus = req.query.approvalStatus;
  }
  if (req.query.status) {
    filter.status = req.query.status;
  }

  applyQueryFilters(filter, req.query);

  const tuitions = await Tuition.find(filter).sort({ createdAt: -1 });
  res.json(new ApiResponse(200, tuitions, "Dashboard tuitions fetched"));
});

export const getTuition = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);
  if (!tuition) throw new ApiError(404, "Tuition not found");

  const isStaff = STAFF_ROLES.has(req.user?.role);
  if (!isStaff && tuition.approvalStatus !== APPROVAL_STATUS.APPROVED) {
    throw new ApiError(404, "Tuition not found");
  }

  res.json(new ApiResponse(200, tuition, "Tuition fetched"));
});

export const createPublicRequest = asyncHandler(async (req, res) => {
  const { classLevel, area, salary, requesterPhone, subjects } = req.body;
  if (!classLevel || toSubjects(subjects).length === 0 || !area || salary == null || !requesterPhone) {
    throw new ApiError(400, "Class, subjects, location, salary, and contact number are required.");
  }

  const tuition = await Tuition.create({
    ...buildTuitionPayload(req.body),
    approvalStatus: APPROVAL_STATUS.PENDING,
  });

  res.status(201).json(new ApiResponse(201, tuition, "Tuition request submitted for review"));
});

export const createAdminTuition = asyncHandler(async (req, res) => {
  const { classLevel, area, salary, requesterPhone, subjects } = req.body;
  if (!classLevel || toSubjects(subjects).length === 0 || !area || salary == null || !requesterPhone) {
    throw new ApiError(400, "Class, subjects, location, salary, and contact number are required.");
  }

  const now = new Date();
  const tuition = await Tuition.create({
    ...buildTuitionPayload(req.body),
    approvalStatus: APPROVAL_STATUS.APPROVED,
    approvedBy: req.user.id,
    approvedAt: now,
    publishedAt: now,
    postedBy: req.user.id,
    postedByRole: req.user.role,
  });

  res.status(201).json(new ApiResponse(201, tuition, "Tuition published"));
});

export const updateTuition = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);
  if (!tuition) throw new ApiError(404, "Tuition not found");
  if (!canManageTuition(req.user)) {
    throw new ApiError(403, "You do not have permission to update this tuition.");
  }

  const payload = buildTuitionPayload({ ...tuition.toObject(), ...req.body });
  if (req.body.status) payload.status = req.body.status;

  const updated = await Tuition.findByIdAndUpdate(req.params.id, payload, { new: true });
  res.json(new ApiResponse(200, updated, "Tuition updated"));
});

export const updateApprovalStatus = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);
  if (!tuition) throw new ApiError(404, "Tuition not found");
  if (!canManageTuition(req.user)) {
    throw new ApiError(403, "You do not have permission to approve this tuition.");
  }

  const approvalStatus = String(req.body.approvalStatus || "");
  if (!Object.values(APPROVAL_STATUS).includes(approvalStatus)) {
    throw new ApiError(400, "Invalid approval status.");
  }

  tuition.approvalStatus = approvalStatus;
  tuition.approvedBy = approvalStatus === APPROVAL_STATUS.APPROVED ? req.user.id : "";
  tuition.approvedAt = approvalStatus === APPROVAL_STATUS.APPROVED ? new Date() : null;
  tuition.publishedAt = approvalStatus === APPROVAL_STATUS.APPROVED ? new Date() : null;

  if (approvalStatus !== APPROVAL_STATUS.APPROVED) {
    tuition.status = TUITION_STATUS.OPEN;
  }

  await tuition.save();

  res.json(new ApiResponse(200, tuition, `Tuition ${approvalStatus}`));
});

export const deleteTuition = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id);
  if (!tuition) throw new ApiError(404, "Tuition not found");
  if (!canManageTuition(req.user)) {
    throw new ApiError(403, "You do not have permission to delete this tuition.");
  }

  await tuition.deleteOne();
  res.json(new ApiResponse(200, null, "Tuition deleted"));
});
