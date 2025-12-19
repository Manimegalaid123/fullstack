const express = require("express");
const router = express.Router();

const {
  createStudent,
  getAllStudents,
  updateStudent,
} = require("../controllers/studentController");

router.post("/", createStudent);
router.get("/", getAllStudents);
router.put("/:id", updateStudent);

module.exports = router;
