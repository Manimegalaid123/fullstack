const Student = require("../models/studentModel");

// CREATE STUDENT
exports.createStudent = async (req, res) => {
  try {
    const { name, rollNo, grade, school } = req.body;

    const existingStudent = await Student.findOne({
      rollNo,
      school,
    });

    if (existingStudent) {
      return res.status(400).json({
        message: "Student with this roll number already exists in this school",
      });
    }

    const student = await Student.create({
      name,
      rollNo,
      grade,
      school,
    });

    res.status(201).json({
      message: "Student created successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL STUDENTS
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ school: 1, rollNo: 1 });

    res.status(200).json({
      count: students.length,
      data: students,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE STUDENT
exports.updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, rollNo, grade } = req.body;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        message: "Student not found",
      });
    }

    // If roll number is changing, check conflict
    if (rollNo && rollNo !== student.rollNo) {
      const duplicate = await Student.findOne({
        rollNo,
        school: student.school,
        _id: { $ne: id },
      });

      if (duplicate) {
        return res.status(400).json({
          message: "Roll number already exists in this school",
        });
      }
    }

    student.name = name || student.name;
    student.rollNo = rollNo || student.rollNo;
    student.grade = grade || student.grade;

    await student.save();

    res.status(200).json({
      message: "Student updated successfully",
      data: student,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

