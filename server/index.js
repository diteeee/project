require('dotenv').config();
const express = require("express");
const app = express();
const cors = require('cors');
const path = require('path');

app.use(express.json());
app.use(cors());
const jwt = require("jsonwebtoken");

const db = require('./models');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routers
const patientRouter = require('./routes/Patients');
app.use("/patients", patientRouter);

const doctorRouter = require('./routes/Doctors');
app.use("/doctors", doctorRouter);

const hospitalRouter = require('./routes/Hospitals');
app.use("/hospitals", hospitalRouter);

const staffRouter = require('./routes/Staff');
app.use("/staff", staffRouter);

const departmentRouter = require('./routes/Departments');
app.use("/departments", departmentRouter);

const roomRouter = require('./routes/Rooms');
app.use("/rooms", roomRouter);

const appointmentRouter = require('./routes/Appointments');
app.use("/appointments", appointmentRouter);

const prescriptionRouter = require('./routes/prescriptions');
app.use("/prescriptions", prescriptionRouter);

const billRouter = require('./routes/Bills');
app.use("/bills", billRouter);

const adminRouter = require('./routes/Administrators');
app.use("/administrators", adminRouter);

const serviceRouter = require('./routes/Services');
app.use("/services", serviceRouter);

const lecturerRouter = require('./routes/Lecturers');
app.use("/lecturers", lecturerRouter);

const lectureRouter = require('./routes/Lectures');
app.use("/lectures", lectureRouter);

const teamRouter = require('./routes/Teams');
app.use("/teams", teamRouter);

const playerRouter = require('./routes/Players');
app.use("/players", playerRouter);

const hospitalRelationsRouter = require('./routes/HospitalRelations');
app.use("/hospitalRelations", hospitalRelationsRouter);

const signInRouter = require('./routes/SignIn');
app.use("/signIn", signInRouter);

db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("server running on port 3001");
        console.log('JWT_SECRET:', process.env.JWT_SECRET);
    });
});