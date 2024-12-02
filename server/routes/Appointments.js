const express = require('express');
const router = express.Router();
const { Appointment, Patient, Doctor, Department, Hospital } = require('../models');
const moment = require('moment-timezone');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/permission'); 
const { Op } = require('sequelize');
const { Sequelize } = require('sequelize');

// Get appointments for the current year grouped by month
const getAppointmentsByMonth = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      attributes: [
        [Sequelize.fn('MONTH', Sequelize.col('data')), 'month'],
        [Sequelize.fn('COUNT', Sequelize.col('appointmentID')), 'appointmentCount'],
      ],
      where: {
        data: {
          [Op.gte]: moment().startOf('year').toDate(),  // start of this year
          [Op.lte]: moment().endOf('year').toDate(),    // end of this year
        },
      },
      group: [Sequelize.fn('MONTH', Sequelize.col('data'))],
      order: [[Sequelize.fn('MONTH', Sequelize.col('data')), 'ASC']],
    });

    res.json(appointments);  // send the data to the frontend
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve appointments' });
  }
};

router.get('/monthly', getAppointmentsByMonth);

// create (insertimi ne tabelen appointments)
router.post("/", async (req,res) => {
    try{
        const {appointmentID,data,ora,patientName,doctorName,hospitalName,departmentName} = req.body;

        const hospital = await Hospital.findOne({
            where: {
              emri: hospitalName
            }
        });
      
        if(!hospital){
            return res.status(400).json({ error: 'Hospital not found!' });
        }
      
        const department = await Department.findOne({
            where: {
                emri: departmentName,
                hospitalNrRegjistrimit: hospital.nrRegjistrimit
            }
        });
      
        if(!department){
            return res.status(400).json({ error: 'Department not found in this hospital!' });
        }

        const [patientFirstName, patientLastName] = patientName.split(' ');
        const patient = await Patient.findOne({
            where: {
                emri: patientFirstName,
                mbiemri: patientLastName,
                hospitalNrRegjistrimit: hospital.nrRegjistrimit
            }
        });

        if(!patient){
            return res.status(400).json({ error: 'Patient not found!' });
        }

        const [doctorFirstName, doctorLastName] = doctorName.split(' ');
        const doctor = await Doctor.findOne({
            where: {
                emri: doctorFirstName,
                mbiemri: doctorLastName,
                depID: department.departmentID
            }
        });

        if(!doctor){
            return res.status(400).json({ error: 'Doctor not found!' });
        }

        const newAppointment = await Appointment.create({
            appointmentID,
            data,
            ora,
            patientNrPersonal: patient.nrPersonal,
            doctorNrPersonal: doctor.nrPersonal,
            departmentID: department.departmentID,
          });
        res.json(newAppointment);
    }
    catch(error){
        console.error('Error creating appointment:', error);
        res.status(500).json({error: 'Failed to create appointment'});
    }
});


// read (me i pa rows ne tabelen appointments (per dashboard))
router.get('/', auth, checkRole(["admin"]), async (req, res) => {
    try{
      const { date, departmentID } = req.query;
      
      let whereCondition = {};
      if(date){
        whereCondition.data = date;
      }
      if(departmentID){
        whereCondition.departmentID = departmentID;
      }
  
      const appointments = await Appointment.findAll({
        where: whereCondition,
        include: [
          { model: Patient, attributes: ['emri', 'mbiemri'] },
          { model: Doctor, attributes: ['emri', 'mbiemri'] },
          { model: Department, attributes: ['emri'] }
        ]
      });
  
      res.json(appointments);
    }catch(error){
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'An error occurred while fetching appointments' });
    }
});

router.get("/availability", async (req, res) => {
    try{
        const { date, doctor } = req.query;

        if(!date || !doctor){
            return res.status(400).json({ error: 'Date and doctor parameters are required' });
        }

        const existingAppointments = await Appointment.findAll({
            where: { data: date, doctorNrPersonal: doctor },
            attributes: ['ora'],
            raw: true
        });

        const startTime = moment.tz(`${date}T08:00:00`, 'Europe/Tirane');
        const endTime = moment.tz(`${date}T16:30:00`, 'Europe/Tirane');

        const timeSlotInterval = 30; // 30 minutes

        const availableTimeSlots = [];

        let currentTime = startTime.clone();

        while(currentTime.isSameOrBefore(endTime)){
            const formattedTime = currentTime.format('HH:mm');

            const isAvailable = !existingAppointments.find(appt => appt.ora === formattedTime);

            if(isAvailable){
                availableTimeSlots.push(formattedTime);
            }

            currentTime.add(timeSlotInterval, 'minutes');
        }

        res.json({ date, doctor, availableTimeSlots });
    }catch(error){
        console.error('Error fetching available time slots:', error);
        res.status(500).json({ error: 'An error occurred while fetching available time slots' });
    }
});


// update (manipulo me te dhena ne tabelen appointments)
router.put("/:appointmentID", auth, checkRole(["admin"]), async (req, res) => {
    try{
        const {data,ora} = req.body;
        const appointmentID = req.params.appointmentID;

        const appointment = await Appointment.findOne({
            where: {
                appointmentID: appointmentID
            }
        });

        if(!appointment){
            return res.status(404).json({error: 'Termini nuk ekziston!'});
        }

        await Appointment.update(
            {data,ora},
            {where: {
                appointmentID: appointmentID
            }}
        );

        res.status(200).json({message: 'Termini updated successfully!'});
    }
    catch(error){
        console.error('Error updating appointment:', error);
        res.status(500).json({error: 'Failed to update appointment'});
    }
});


// delete (fshirja e nje termini sipas ID te tij)
router.delete("/:appointmentID", auth, checkRole(["admin"]), async (req, res) => {
    try{
        const appointmentID = req.params.appointmentID;

        const appointment = await Appointment.findOne({
            where: {
                appointmentID: appointmentID
            }
        });

        if(!appointment){
            return res.status(404).json({error: 'Termini nuk ekziston!'});
        }

        await appointment.destroy();

        res.status(200).json({message: 'Appointment deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting appointment:', error);
        res.status(500).json({error: 'Failed to delete appointment'});
    }
});

module.exports = router;