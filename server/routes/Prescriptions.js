const express = require('express');
const router = express.Router();
const { Prescription, Patient, Doctor } = require('../models');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/permission');

// create (insertimi ne tabelen prescriptions)
router.post("/", auth, checkRole(["admin"]), async (req,res) => {
    try{
        const {data,diagnoza,ilace,udhezimi,patientNrPersonal,doctorNrPersonal} = req.body;

        const patient = await Patient.findOne({
            where: {
                nrPersonal: patientNrPersonal
            }
        });

        if(!patient){
            return res.status(400).json({error: 'Patient not found!'});
        }

        const doctor = await Doctor.findOne({
            where: {
                nrPersonal: doctorNrPersonal
            }
        });

        if(!doctor){
            return res.status(400).json({error: 'Doctor not found!'});
        }

        const newPrescition = await Prescription.create(req.body);
        res.json(newPrescition);
    }
    catch(error){
        console.error('Error creating prescription:', error);
        res.status(500).json({error: 'Failed to create prescription'});
    }
});


// read (me i pa rows ne tabelen prescriptions)
router.get('/', auth, checkRole(["admin"]), async (req, res) => {
    const allPrescriptions = await Prescription.findAll();
    res.json(allPrescriptions);
});


// update (manipulo me te dhena ne tabelen prescriptions)
router.put("/:prescriptionID", auth, checkRole(["admin"]), async (req, res) => {
    try{
        const {diagnoza,ilace,udhezimi} = req.body;
        const prescriptionID = req.params.prescriptionID;

        const prescription = await Prescription.findOne({
            where: {
                prescriptionID: prescriptionID
            }
        });

        if(!prescription){
            return res.status(404).json({error: 'Raporti nuk ekziston!'});
        }

        await Prescription.update(
            {diagnoza,ilace,udhezimi},
            {where: {
                prescriptionID: prescriptionID
            }}
        );

        res.status(200).json({message: 'Presciption updated successfully!'});
    }
    catch(error){
        console.error('Error updating prescription:', error);
        res.status(500).json({error: 'Failed to update prescription'});
    }
});


// delete (fshirja e nje raporti sipas ID te tij)
router.delete("/:prescriptionID", auth, checkRole(["admin"]), async (req, res) => {
    try{
        const prescriptionID = req.params.prescriptionID;

        const prescription = await Prescription.findOne({
            where: {
                prescriptionID: prescriptionID
            }
        });

        if(!prescription){
            return res.status(404).json({error: 'Raporti nuk ekziston!'});
        }

        await prescription.destroy();

        res.status(200).json({message: 'Prescription deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting prescription:', error);
        res.status(500).json({error: 'Failed to delete prescription'});
    }
});

module.exports = router;