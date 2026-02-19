const mongoose = require("mongoose");

const programSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    code: {
      type: String,
      required: true,
      uppercase: true,
    },

    description: String,

    category: {
      type: String,
      enum: ["ERP", "CMS", "HR", "ACCOUNTING", "CUSTOM"],
      default: "CUSTOM",
    },

    currentVersion: {
      type: String,
      default: "1.0.0",
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

programSchema.index({ name: "text", description: "text" });

module.exports = mongoose.model("Program", programSchema);
