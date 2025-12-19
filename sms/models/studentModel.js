const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rollNo: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

/* Compound index */
studentSchema.index({ rollNo: 1, school: 1 }, { unique: true });

module.exports = mongoose.model("Student", studentSchema);
