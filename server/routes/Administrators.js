const express = require('express');
const router = express.Router();
const { Administrator, Hospital } = require('../models');
const bcrypt = require("bcrypt");
const auth = require('../middleware/auth');
const checkRole = require('../middleware/permission'); 

// create (insertimi ne tabelen admins)
router.post("/", auth, checkRole(["admin"]), async (req, res) => {
    try {
        const { emri, mbiemri, nrPersonal, datelindja, adresa, nrTel, email, password, hospitalNrRegjistrimit } = req.body;

        const admin = await Administrator.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if (admin) {
            return res.status(400).json({ error: 'This ID is already assigned to an administrator.' });
        }

        const adminEmail = await Administrator.findOne({
            where: { email: email }
        });

        if (adminEmail && adminEmail.nrPersonal !== nrPersonal) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        const hospital = await Hospital.findOne({
            where: {
                nrRegjistrimit: hospitalNrRegjistrimit
            }
        });

        if (!hospital) {
            return res.status(400).json({ error: 'Hospital not found!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Administrator.create({
            emri,
            mbiemri,
            nrPersonal,
            datelindja,
            adresa,
            nrTel,
            email,
            password: hashedPassword,
            hospitalNrRegjistrimit: hospital.nrRegjistrimit,
        });

        res.json(newAdmin);
    }
    catch (error) {
        console.error('Error creating administrator:', error);
        res.status(500).json({ error: error.message || 'Failed to create administrator' });
    }
});



// read (me i pa rows ne tabelen admins)
router.get('/', auth, checkRole(["admin"]), async (req, res) => {
    const allAdmins = await Administrator.findAll();
    res.json(allAdmins);
});

// Get admin details by personal number
router.get('/:nrPersonal', auth, checkRole(["admin"]), async (req, res) => {
    try {
        const { nrPersonal } = req.params;
        const admin = await Administrator.findOne({
            where: { nrPersonal: nrPersonal },
            attributes: ['emri', 'mbiemri'],
        });

        if (!admin) {
            return res.status(404).json({ error: 'Administrator not found!' });
        }

        res.json(admin);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// update (manipulo me te dhena ne tabelen admins)
router.put("/:nrPersonal", auth, checkRole(["admin"]), async (req, res) => {
    try {
        const { emri, mbiemri, datelindja, adresa, nrTel, email, password } = req.body;
        const nrPersonal = req.params.nrPersonal;

        const admin = await Administrator.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if (!admin) {
            return res.status(404).json({ error: 'Administratori nuk ekziston!' });
        }

        const adminEmail = await Administrator.findOne({
            where: { email: email }
        });

        if (adminEmail && adminEmail.nrPersonal !== nrPersonal) {
            return res.status(400).json({ error: 'Email is already in use.' });
        }

        const updatedData = {
            emri,
            mbiemri,
            datelindja,
            adresa,
            nrTel,
            email,
        };

        if (password && !isHashedPassword(password)) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        } else {
            updatedData.password = admin.password;
        }

        await Administrator.update(updatedData, {
            where: { nrPersonal }
        });

        res.status(200).json({ message: 'Administrator updated successfully!' });
    }
    catch (error) {
        console.error('Error updating administrator:', error);
        res.status(500).json({ error: 'Failed to update administrator' });
    }
});

const isHashedPassword = (password) => {
    return /^(\$2[aby]\$)/.test(password);
};


// delete (fshirja e nje admini sipas nrPersonal te tij)
router.delete("/:nrPersonal", auth, checkRole(["admin"]), async (req, res) => {
    try {
        const nrPersonal = req.params.nrPersonal;

        const admin = await Administrator.findOne({
            where: {
                nrPersonal: nrPersonal
            }
        });

        if (!admin) {
            return res.status(404).json({ error: 'Administratori nuk ekziston!' });
        }

        await admin.destroy();

        res.status(200).json({ message: 'Administrator deleted successfully!' });
    }
    catch (error) {
        console.error('Error deleting administrator:', error);
        res.status(500).json({ error: 'Failed to delete administrator' });
    }
});

module.exports = router;