const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const programInstanceSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },

    licenseStart: {
      type: Date,
      required: true,
    },

    licenseExpire: {
      type: Date,
      required: true,
    },

    apiUrl: String,
    apiUsername: String,

    apiPassword: {
      type: String,
      select: false,
    },

    status: {
      type: String,
      enum: ["active", "expired", "suspended"],
      default: "active",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: Date,
  },
  { timestamps: true }
);

/* ================= HASH PASSWORD (SAVE) ================= */
programInstanceSchema.pre("save", async function (next) {
  if (!this.isModified("apiPassword")) return next();

  const salt = await bcrypt.genSalt(10);
  this.apiPassword = await bcrypt.hash(this.apiPassword, salt);

  next();
});

/* ================= HASH PASSWORD (UPDATE) ================= */
programInstanceSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();

  if (update.apiPassword) {
    const salt = await bcrypt.genSalt(10);
    update.apiPassword = await bcrypt.hash(update.apiPassword, salt);
    this.setUpdate(update);
  }

  next();
});

/* ================= AUTO EXPIRE (SAVE) ================= */
programInstanceSchema.pre("save", function (next) {
  if (this.licenseExpire < new Date()) {
    this.status = "expired";
  } else {
    this.status = "active";
  }
  next();
});

/* ================= AUTO EXPIRE (QUERY) ================= */
programInstanceSchema.pre(/^find/, function (next) {
  this.where({ isDeleted: false });
  next();
});

module.exports = mongoose.model(
  "ProgramInstance",
  programInstanceSchema
);
