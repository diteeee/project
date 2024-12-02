const express = require('express');
const router = express.Router();
const { Department, Doctor, Patient, Staff, Room, Appointment, Administrator } = require('../models');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/permission'); 

//get departments in a hospital
router.get('/:nrRegjistrimit/departments', async (req, res) => {
    try{
        const { nrRegjistrimit } = req.params;
        const departments = await Department.findAll({ where: { hospitalNrRegjistrimit: nrRegjistrimit } });
        res.json(departments);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

//get doctors by a hospital's department
router.get('/:nrRegjistrimit/departments/:departmentID/doctors', auth, checkRole(["admin", "patient", "doctor", "guest"]), async (req, res) => {
    try{
        const { nrRegjistrimit, departmentID } = req.params;
        
        const department = await Department.findOne({
            where: {
                departmentID: departmentID,
                hospitalNrRegjistrimit: nrRegjistrimit
            }
        }); 
        if(!department){
            return res.status(404).json({ error: 'Department not found in the hospital' });
        }
        const doctors = await Doctor.findAll({
            where: {
                depID: departmentID
            }
        });

        if (req.user.role === "admin") {
            // If the user is an admin, return the full data
            return res.json(doctors);
        } else {
            const limitedDoctors = doctors.map(doctor => ({
                emri: doctor.emri,
                mbiemri: doctor.mbiemri,
                nrTel: doctor.nrTel,
                specializimi: doctor.specializimi,
                nrPersonal: doctor.nrPersonal // THINK ABOUT THIS QYSH ME DO IT OTHERWISE SE BOOK APPOINTMENTS SPO BOJN PA TO
            }));
            return res.json(limitedDoctors);
        }

        res.json(doctors);
    }catch(err){
        console.error('Error fetching doctors:', err);
        res.status(500).json({ error: 'Failed to fetch doctors' });
    }
});

//get patients in a hospital
router.get('/:nrRegjistrimit/patients', auth, checkRole(["admin"]), async (req, res) => {
    try{
        const { nrRegjistrimit } = req.params;
        const patients = await Patient.findAll({ where: { hospitalNrRegjistrimit: nrRegjistrimit } });
        res.json(patients);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});

//get staff from a hospital's department
router.get('/:nrRegjistrimit/departments/:departmentID/staffs', auth, checkRole(["admin"]), async (req, res) => {
    try{
        const { nrRegjistrimit, departmentID } = req.params;
        
        const department = await Department.findOne({
            where: {
                departmentID: departmentID,
                hospitalNrRegjistrimit: nrRegjistrimit
            }
        });
        if(!department){
            return res.status(404).json({ error: 'Department not found in the hospital' });
        }

        const staff = await Staff.findAll({
            where: {
                depID: departmentID
            }
        });

        res.json(staff);
    }catch(err){
        console.error('Error fetching staff member:', err);
        res.status(500).json({ error: 'Failed to fetch staff member' });
    }
});


//get admins in a hospital
router.get('/:nrRegjistrimit/administrators', auth, checkRole(["admin"]), async (req, res) => {
    try{
        const { nrRegjistrimit } = req.params;
        const admins = await Administrator.findAll({ where: { hospitalNrRegjistrimit: nrRegjistrimit } });
        res.json(admins);
    }catch(err){
        res.status(500).json({ error: err.message });
    }
});


// Get rooms in a department
router.get('/:nrRegjistrimit/departments/:departmentID/rooms', auth, checkRole(["admin"]), async (req, res) => {
    try{
        const { nrRegjistrimit, departmentID } = req.params;

        const department = await Department.findOne({
            where: {
                departmentID: departmentID,
                hospitalNrRegjistrimit: nrRegjistrimit
            }
        });

        if(!department){
            return res.status(404).json({ error: 'Department not found in the hospital' });
        }

        const rooms = await Room.findAll({where: { depID: departmentID } });
        
        res.json(rooms);
    }catch(err){
        console.error('Error fetching rooms:', err);
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
});

//appointments
router.get('/:nrRegjistrimit/departments/:departmentID/appointments', auth, checkRole(["admin"]), async (req, res) => {
    try {
        const { nrRegjistrimit, departmentID } = req.params;

        const department = await Department.findOne({
            where: {
                departmentID: departmentID,
                hospitalNrRegjistrimit: nrRegjistrimit
            }
        });

        if (!department) {
            return res.status(404).json({ error: 'Department not found in the hospital' });
        }

        const appointments = await Appointment.findAll({
            include: [
                { model: Patient, attributes: ['emri'] ['mbiemri'] },
                { model: Doctor, attributes: ['emri'] ['mbiemri'] },
            ]
        });

        res.json(appointments);
    } catch (err) {
        console.error('Error fetching appointments:', err);
        res.status(500).json({ error: 'Failed to fetch appointments' });
    }
});

module.exports = router;