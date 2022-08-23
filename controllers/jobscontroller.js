const Job = require("../models/job");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createJob = catchAsync(async (req, res, next) => {
  const { company, position } = req.body;

  const newJob = await Job.create({
    company,
    position,
    createdBy: req.user.userId,
  });

  res.status(201).json({
    newJob,
  });
});
const getAllJobs = catchAsync(async (req, res, next) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");

  res.status(201).json({
    jobs,
    count: jobs.length,
  });
});
const getJob = catchAsync(async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Job.findOne({ _id: jobId, createdBy: userId });

  if (!job) {
    return next(new AppError("job not found", 404));
  }

  res.status(200).json({
    job,
  });
});

const updateJob = catchAsync(async (req, res, next) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req;

  if (company == "" || position == "") {
    return next(new AppError("company or position field cannot be empty", 404));
  }

  const jobUpdate = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!jobUpdate) {
    return next(new AppError("job not found", 404));
  }

  res.status(200).json({
    jobUpdate,
  });
});
const deleteJob = catchAsync(async (req, res, next) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const jobUpdate = await Job.findByIdAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  if (!jobUpdate) {
    return next(new AppError("job not found", 404));
  }

  res.status(200).json({
    jmessage: "job successfully deleted",
  });
});

module.exports = {
  createJob,
  getAllJobs,
  getJob,
  updateJob,
  deleteJob,
};
