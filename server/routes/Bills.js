const express = require('express');
const router = express.Router();
const { Bill, Patient, Hospital, Service, BillSherbimi } = require('../models');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/permission'); 

// create (insertimi ne tabelen bills)
router.post("/", auth, checkRole(["admin"]), async (req, res) => {
    try{
        const { sherbimi, data, totali, patientName, hospitalName } = req.body;

        const hospital = await Hospital.findOne({
            where: {
                emri: hospitalName
            }
        });

        if(!hospital){
            return res.status(400).json({ error: 'Hospital not found!' });
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

        const newBill = await Bill.create({
            data,
            totali,
            patientNrPersonal: patient.nrPersonal,
            hospitalNrRegjistrimit: hospital.nrRegjistrimit
        });

        const billSherbimiPromises = [];
        for(const serviceData of sherbimi){
            const { emri: serviceName, cmimi: servicePrice } = serviceData;

            let service = await Service.findOne({ where: { emri: serviceName } });
            if(!service){
                service = await Service.create({ emri: serviceName, cmimi: servicePrice });
            }

            billSherbimiPromises.push(BillSherbimi.create({
                billID: newBill.billID,
                serviceID: service.serviceID,
                quantity: 1
            }));
        }

        await Promise.all(billSherbimiPromises);

        res.json(newBill);
    }catch(error){
        console.error('Error creating bill:', error);
        res.status(500).json({ error: 'Failed to create bill' });
    }
});


// read (me i pa edhe rows te billit po edhe emrin e pacientit edhe tspitalit)
router.get("/", auth, checkRole(["admin"]), async (req, res) => {
    try {
        const bills = await Bill.findAll({
            include: [
                {
                    model: Patient,
                    attributes: ['emri', 'mbiemri']
                },
                {
                    model: Hospital,
                    attributes: ['emri']
                },
                {
                    model: Service,
                    as: 'sherbimi',
                    through: { attributes: [] },
                    attributes: ['emri', 'cmimi']
                }
            ]
        });
        res.json(bills);
    }catch(error){
        console.error('Error fetching bills:', error);
        res.status(500).json({ error: 'Failed to fetch bills' });
    }
});


// update (manipulo me te dhena ne tabelen bills)
router.put("/:billID", auth, checkRole(["admin"]), async (req, res) => {
    try{
        const {data,totali} = req.body;
        const billID = req.params.billID;

        const bill = await Bill.findOne({
            where: {
                billID: billID
            }
        });

        if(!bill){
            return res.status(404).json({error: 'Fatura nuk ekziston!'});
        }

        await Bill.update(
            {data,totali},
            {where: {
                billID: billID
            }}
        );

        res.status(200).json({message: 'Bill updated successfully!'});
    }
    catch(error){
        console.error('Error updating bill:', error);
        res.status(500).json({error: 'Failed to update bill'});
    }
});


// delete (fshirja e nje fature sipas ID se saj)
router.delete("/:billID", auth, checkRole(["admin"]), async (req, res) => {
    try{
        const billID = req.params.billID;

        const bill = await Bill.findOne({
            where: {
                billID: billID
            }
        });

        if(!bill){
            return res.status(404).json({error: 'Fatura nuk ekziston!'});
        }

        await bill.destroy();

        res.status(200).json({message: 'Bill deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting bill:', error);
        res.status(500).json({error: 'Failed to delete bill'});
    }
});

module.exports = router;