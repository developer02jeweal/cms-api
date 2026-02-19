const Program = require("../models/Program");

/* ================= CREATE ================= */
exports.createProgram = async (req, res) => {
  try {
    let { name, code, description, category, currentVersion } = req.body;

    // ===============================
    // Basic validation
    // ===============================

    if (!name || !code) {
      return res.status(400).json({
        success: false,
        message: "Name and Code are required",
      });
    }

    // Trim + normalize
    name = name.trim();
    code = code.trim().toUpperCase();

    // ===============================
    // Check duplicate (safe way)
    // ===============================

     const exists = await Program.findOne({
      code,
      isDeleted: false,
    });
    if (exists) {
      return res.status(409).json({
        success: false,
        message: "Program code already exists",
      });
    }

    // ===============================
    // Sanitize payload
    // ===============================

    const payload = {
      name,
      code,
      description: description?.trim() || "",
      category: category?.trim() || "",
      currentVersion: currentVersion?.trim() || "",
    };

    // ===============================
    // Create
    // ===============================

    const program = await Program.create(payload);

    return res.status(201).json({
      success: true,
      data: program,
    });

  } catch (err) {
    console.error("Create Program Error:", err);

    // Handle Mongo duplicate fallback
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Duplicate program code",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


/* ================= READ ALL ================= */
exports.getPrograms = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  const query = { isDeleted: false };

  if (search) {
    query.$text = { $search: search };
  }

  const programs = await Program.find(query)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const total = await Program.countDocuments(query);

  res.json({
    success: true,
    total,
    page: parseInt(page),
    limit: parseInt(limit),
    data: programs,
  });
};

/* ================= READ BY ID ================= */
exports.getProgramById = async (req, res) => {
  const program = await Program.findById(req.params.id);

  if (!program || program.isDeleted) {
    return res.status(404).json({
      success: false,
      message: "Program not found",
    });
  }

  res.json({
    success: true,
    data: program,
  });
};

/* ================= UPDATE ================= */
exports.updateProgram = async (req, res) => {
  const program = await Program.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    success: true,
    data: program,
  });
};

/* ================= DELETE (SOFT) ================= */
exports.deleteProgram = async (req, res) => {
  await Program.findByIdAndUpdate(req.params.id, {
    isDeleted: true,
  });

  res.json({
    success: true,
    message: "Program soft deleted",
  });
};
