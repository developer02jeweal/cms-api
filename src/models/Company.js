const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    /* ================= BASIC INFO ================= */

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    companyEmail: {
      type: String,
      required: true,
    },

    contactPerson: {
      type: String,
    },

    country: {
      type: String,
    },

    about: {
      type: String,
    },

    /* ================= STATUS ================= */

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    /* ================= AUDIT ================= */

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

/* ================= INDEX ================= */

companySchema.index({ companyName: "text" });

module.exports = mongoose.model("Company", companySchema);
