const express = require('express');
const router = express.Router();
const { Service } = require('../models');


// create (insertimi ne tabelen bills)
router.post("/", async (req,res) => {
    try{
        const {emri,cmimi} = req.body;

        const service = await Service.findOne({
            where: {
              emri: emri
            }
          });

        if(service){
            return res.status(400).json({error: 'Service exists!'});
        }

        const newService= await Service.create(req.body);
        res.json(newService);
    }
    catch(error){
        console.error('Error creating service:', error);
        res.status(500).json({error: 'Failed to create service'});
    }
});

// read (me i pa edhe rows te billit po edhe emrin e pacientit edhe tspitalit)
router.get('/', async (req, res) => {
    const allServices = await Service.findAll();
    res.json(allServices);
});

// update (manipulo me te dhena ne tabelen bills)
router.put("/:emri", async (req, res) => {
    try{
        const {cmimi} = req.body;

        const emri = req.params.emri;
        const service = await Service.findOne({
            where: {
                emri: emri
            }
        });

        if(!service){
            return res.status(404).json({error: 'Sherbimi nuk ekziston!'});
        }

        await Service.update(
            {cmimi},
            {where: {
                emri: emri
            }}
        );

        res.status(200).json({message: 'Service updated successfully!'});
    }
    catch(error){
        console.error('Error updating service:', error);
        res.status(500).json({error: 'Failed to update service'});
    }
});


// delete (fshirja e nje fature sipas ID se saj)
router.delete("/:emri", async (req, res) => {
    try{
        const emri = req.params.emri;

        const service = await Service.findOne({
            where: {
                emri: emri
            }
        });

        if(!service){
            return res.status(404).json({error: 'Sherbimi nuk ekziston!'});
        }

        await service.destroy();

        res.status(200).json({message: 'Service deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting service:', error);
        res.status(500).json({error: 'Failed to service bill'});
    }
});

module.exports = router;