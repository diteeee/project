const express = require('express');
const router = express.Router();
const { Patient, Hospital, Prescription } = require('../models');
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth');
const checkRole = require('../middleware/permission');

// create (insertimi ne tabelen patients)
router.post("/", async (req, res) => {
    try {
        const { emri, mbiemri, nrPersonal, datelindja, gjinia, adresa, nrTel, email, password, hospitalId } = req.body;

        const patient = await Patient.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if (patient) {
            return res.status(400).json({ error: 'This ID is already assigned to a patient.' });
        }

        const patientEmail = await Patient.findOne({
            where: { email: email }
        });

        if (patientEmail && patientEmail.nrPersonal !== nrPersonal) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        // const doctor = await Doctor.findOne({
        //     where: {
        //         nrPersonal: nrPersonal
        //     }
        // });

        // const staff = await Staff.findOne({
        //     where: {
        //         nrPersonal: nrPersonal
        //     }
        // });

        // if(doctor){
        //     if(doctor.emri !== emri || doctor.mbiemri !== mbiemri){
        //         return res.status(400).json({error: 'Sorry, the provided name and surname do not match our records.'});
        //     }
        // }
        // else if(staff){
        //     if(staff.emri !== emri || staff.mbiemri !== mbiemri){
        //         return res.status(400).json({ error:'Sorry, the provided name and surname do not match our records.'});
        //     }
        // }

        const hospital = await Hospital.findOne({
            where: {
                nrRegjistrimit: hospitalId
            }
        });

        if (!hospital) {
            return res.status(400).json({ error: 'Hospital not found!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPatient = await Patient.create({
            emri,
            mbiemri,
            nrPersonal,
            datelindja,
            gjinia,
            adresa,
            nrTel,
            email,
            password: hashedPassword,
            hospitalNrRegjistrimit: hospital.nrRegjistrimit,
        });

        res.json(newPatient);
    }
    catch (error) {
        console.error('Error creating patient:', error);
        res.status(500).json({ error: 'Failed to create patient' });
    }
});


// read (me i pa rows ne tabelen patients)
router.get('/', auth, checkRole(["admin"]), async (req, res) => {
    const allPatients = await Patient.findAll();
    res.json(allPatients);
});


//get prescriptions by a patient
router.get('/:nrPersonal/prescriptions', async (req, res) => {
    try {
        const { nrPersonal } = req.params;
        const prescriptions = await Prescription.findAll({
            where: { patientNrPersonal: nrPersonal },

        });
        res.json(prescriptions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get patient details by personal number
router.get('/:nrPersonal', auth, checkRole(["admin"]), async (req, res) => {
    try {
        const { nrPersonal } = req.params;
        const patient = await Patient.findOne({
            where: { nrPersonal: nrPersonal },
            attributes: ['emri', 'mbiemri'],
        });

        if (!patient) {
            return res.status(404).json({ error: 'Patient not found!' });
        }

        res.json(patient);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// update (manipulo me te dhena ne tabelen patients)
router.put("/:nrPersonal", auth, checkRole(["admin"]), async (req, res) => {
    try {
        const { emri, mbiemri, datelindja, gjinia, adresa, nrTel, email, password } = req.body;
        const nrPersonal = req.params.nrPersonal;

        const patient = await Patient.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if (!patient) {
            return res.status(404).json({ error: 'Pacienti nuk ekziston!' });
        }

        const patientEmail = await Patient.findOne({
            where: { email: email }
        });

        if (patientEmail && patientEmail.nrPersonal !== nrPersonal) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        const updatedData = {
            emri,
            mbiemri,
            datelindja,
            gjinia,
            adresa,
            nrTel,
            email,
            password,
        };

        if (password && !isHashedPassword(password)) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        } else {
            updatedData.password = patient.password;
        }

        console.log('Incoming password:', password);
        console.log('Existing hashed password:', patient.password);

        await Patient.update(updatedData, {
            where: { nrPersonal }
        });

        res.status(200).json({ message: 'Patient updated successfully!' });
    }
    catch (error) {
        console.error('Error updating patient:', error);
        res.status(500).json({ error: 'Failed to update patient' });
    }
});

const isHashedPassword = (password) => {
    return /^(\$2[aby]\$)/.test(password);
};

// delete (fshirja e nje pacienti sipas nrPersonal te tij)
router.delete("/:nrPersonal", auth, checkRole(["admin"]), async (req, res) => {
    try {
        const nrPersonal = req.params.nrPersonal;

        const patient = await Patient.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if (!patient) {
            return res.status(404).json({ error: 'Pacienti nuk ekziston!' });
        }

        await patient.destroy();

        res.status(200).json({ message: 'Patient deleted successfully!' });
    }
    catch (error) {
        console.error('Error deleting patient:', error);
        res.status(500).json({ error: 'Failed to delete patient' });
    }
});

module.exports = router;