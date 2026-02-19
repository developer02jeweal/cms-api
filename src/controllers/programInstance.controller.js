const ProgramInstance = require("../models/ProgramInstance");
const Company = require("../models/Company");
const Program = require("../models/Program");

/* ================= CREATE ================= */
exports.createInstance = async (req, res) => {
  const { company, program, licenseStart, licenseExpire } =
    req.body;

  const companyExists = await Company.findById(company);
  if (!companyExists) {
    return res.status(400).json({
      success: false,
      message: "Company not found",
    });
  }

  const programExists = await Program.findById(program);
  if (!programExists) {
    return res.status(400).json({
      success: false,
      message: "Program not found",
    });
  }

  if (new Date(licenseExpire) < new Date(licenseStart)) {
    return res.status(400).json({
      success: false,
      message: "License expire must be after start date",
    });
  }

  const instance = await ProgramInstance.create(req.body);

  res.status(201).json({
    success: true,
    data: instance,
  });
};

/* ================= READ ALL ================= */
exports.getInstances = async (req, res) => {
  const instances = await ProgramInstance.find({
    isDeleted: false,
  })
    .populate("company", "companyName companyEmail")
    .populate("program", "name code");

  res.json({
    success: true,
    total: instances.length,
    data: instances,
  });
};

/* ================= READ BY ID ================= */
exports.getInstanceById = async (req, res) => {
  const instance = await ProgramInstance.findById(
    req.params.id
  )
    .populate("company", "companyName companyEmail")
    .populate("program", "name code");

  if (!instance || instance.isDeleted) {
    return res.status(404).json({
      success: false,
      message: "Instance not found",
    });
  }

  res.json({
    success: true,
    data: instance,
  });
};

/* ================= UPDATE ================= */
exports.updateInstance = async (req, res) => {
  const instance = await ProgramInstance.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    success: true,
    data: instance,
  });
};

/* ================= DELETE ================= */
exports.deleteInstance = async (req, res) => {
  await ProgramInstance.findByIdAndUpdate(req.params.id, {
    isDeleted: true,
  });

  res.json({
    success: true,
    message: "Program instance soft deleted",
  });
};
