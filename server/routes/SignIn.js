require('dotenv').config();
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Patient, Doctor, Administrator } = require("../models");
const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await Patient.findOne({ where: { email } });
        let role = 'patient';

        if (!user) {
            user = await Doctor.findOne({ where: { email } });
            role = 'doctor';
        }

        if (!user) {
            user = await Administrator.findOne({ where: { email } });
            role = 'admin';
        }

        if (!user) {
            return res.status(400).json({ success: false, message: "No user found with this email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Password does not match" });
        }

        const token = jwt.sign(
            {
                role,
                email: user.email,
                emri: user.emri,
                mbiemri: user.mbiemri,
                nrTel: user.nrTel,
            },
            process.env.JWT_SECRET,
            { expiresIn: "30d" }
        );

        res.json({ success: true, token });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || "Server error" });
    }
});

module.exports = router;
