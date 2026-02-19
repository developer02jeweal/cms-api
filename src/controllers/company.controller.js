const Company = require("../models/Company");

/* ================= CREATE ================= */
exports.createCompany = async (req, res) => {
  try {
    const payload = { ...req.body };
    delete payload._id;  // 🔥 กัน client ส่ง _id มา

    const company = await Company.create(payload);

    res.status(201).json({
      success: true,
      data: company,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


/* ================= READ ALL ================= */
exports.getCompanies = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const query = { isDeleted: false };

  if (search) {
    query.$text = { $search: search };
  }

  const companies = await Company.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Company.countDocuments(query);

  res.json({
    success: true,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    data: companies,
  });
};

/* ================= READ BY ID ================= */
exports.getCompanyById = async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company || company.isDeleted) {
    return res.status(404).json({
      success: false,
      message: "Company not found",
    });
  }

  res.json({
    success: true,
    data: company,
  });
};

/* ================= UPDATE ================= */
exports.updateCompany = async (req, res) => {
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    success: true,
    data: company,
  });
};

/* ================= DELETE (SOFT) ================= */
exports.deleteCompany = async (req, res) => {
  await Company.findByIdAndUpdate(req.params.id, {
    isDeleted: true,
  });

  res.json({
    success: true,
    message: "Company soft deleted",
  });
};
