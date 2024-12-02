const express = require('express');
const multer = require('multer');
const path = require('path');
const { Hospital } = require('../models');
const router = express.Router();
const hospitalRelationsRouter = require('./HospitalRelations');
router.use('/', hospitalRelationsRouter);
const auth = require('../middleware/auth');
const checkRole = require('../middleware/permission'); 

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  }),
});

router.post("/", upload.single('img'), auth, checkRole(["admin"]), async (req, res) => {
  try {
    const { emri, adresa, nrTel } = req.body;
    const imageUrl = req.file ? req.file.path : '';

    const existingHospital = await Hospital.findOne({ where: { emri } });

    if (existingHospital) {
      return res.status(400).json({ error: 'Hospital with the same name already exists' });
    }

    const hospital = new Hospital({ emri, adresa, nrTel, imageUrl });
    await hospital.save();
    res.status(201).json({ message: 'Hospital created successfully' });
  } catch (error) {
    console.error('Error creating hospital:', error.message);
    res.status(500).json({ error: 'Failed to create hospital' });
  }
});

// Read (fetch all hospitals)
router.get('/', async (req, res) => {
  try {
    const allHospitals = await Hospital.findAll();
    res.json(allHospitals);
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({ error: 'Failed to fetch hospitals' });
  }
});

// Update (update hospital data)
router.put("/:nrRegjistrimit", upload.single('img'), auth, checkRole(["admin"]), async (req, res) => {
  try {
    const { emri, adresa, nrTel } = req.body;
    const nrRegjistrimit = req.params.nrRegjistrimit;

    const hospital = await Hospital.findOne({
      where: { nrRegjistrimit }
    });

    if (!hospital) {
      return res.status(404).json({ error: 'Hospital does not exist' });
    }

    const imageUrl = req.file ? req.file.path : hospital.imageUrl;

    await Hospital.update(
      { emri,adresa,nrTel,imageUrl },
      { where: { nrRegjistrimit } }
    );

    res.status(200).json({ message: 'Hospital updated successfully!' });
  } catch (error) {
    console.error('Error updating hospital:', error);
    res.status(500).json({ error: 'Failed to update hospital' });
  }
});

// Delete (delete a hospital)
router.delete("/:nrRegjistrimit", auth, checkRole(["admin"]), async (req, res) => {
  try {
    const nrRegjistrimit = req.params.nrRegjistrimit;

    const hospital = await Hospital.findOne({
      where: { nrRegjistrimit }
    });

    if (!hospital) {
      return res.status(404).json({ error: 'Hospital does not exist' });
    }

    await hospital.destroy();

    res.status(200).json({ message: 'Hospital deleted successfully!' });
  } catch (error) {
    console.error('Error deleting hospital:', error);
    res.status(500).json({ error: 'Failed to delete hospital' });
  }
});

module.exports = router;