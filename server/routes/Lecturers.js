const express = require('express');
const { Lecturer, Lecture } = require('../models');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/permission'); 
const multer = require('multer');

const upload = multer();

router.post("/", auth, checkRole(["admin"]), upload.none(), async (req, res) => {
  try {
    const { emri, department, email } = req.body;
    console.log("Received data:", req.body);

    const existingLecturer = await Lecturer.findOne({ where: { emri } });

    if (existingLecturer) {
      return res.status(400).json({ error: 'Lecturer with the same name already exists' });
    }

    const lecturer = await Lecturer.create({ emri, department, email });
    res.status(201).json({ message: 'Lecturer created successfully' });
  } catch (error) {
    console.error('Error creating lecturer:', error.message);
    res.status(500).json({ error: 'Failed to create lecturer' });
  }
});


// Read (fetch all lecturers)
router.get('/', async (req, res) => {
  try {
    const allLecturers = await Lecturer.findAll();
    res.json(allLecturers);
  } catch (error) {
    console.error('Error fetching lecturers:', error);
    res.status(500).json({ error: 'Failed to fetch lecturers' });
  }
});

router.get('/:lecturerID/lectures', async (req, res) => {
  try{
      const { lecturerID } = req.params;
      const lectures = await Lecture.findAll({ where: { lecturerIDdep: lecturerID } });
      res.json(lectures);
  }catch(err){
      res.status(500).json({ error: err.message });
  }
});

// Update (update lecturer data)
router.put("/:lecturerID", auth, checkRole(["admin"]), upload.none(), async (req, res) => {
  try {
    const { emri, department, email } = req.body;
    const lecturerID = req.params.lecturerID;

    const lecturer = await Lecturer.findOne({
      where: { lecturerID }
    });

    if (!lecturer) {
      return res.status(404).json({ error: 'Lecturer does not exist' });
    }

    await Lecturer.update(
      { emri,department,email },
      { where: { lecturerID } }
    );

    res.status(200).json({ message: 'Lecturer updated successfully!' });
  } catch (error) {
    console.error('Error updating lecturer:', error);
    res.status(500).json({ error: 'Failed to update lecturer' });
  }
});

// Delete (delete a lecturer)
router.delete("/:lecturerID", auth, checkRole(["admin"]), async (req, res) => {
  try {
    const lecturerID = req.params.lecturerID;

    const lecturer = await Lecturer.findOne({
      where: { lecturerID }
    });

    if (!lecturer) {
      return res.status(404).json({ error: 'Lecturer does not exist' });
    }

    await lecturer.destroy();

    res.status(200).json({ message: 'Lecturer deleted successfully!' });
  } catch (error) {
    console.error('Error deleting lecturer:', error);
    res.status(500).json({ error: 'Failed to delete lecturer' });
  }
});

module.exports = router;