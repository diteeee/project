const express = require('express');
const router = express.Router();
const { Lecture, Lecturer } = require('../models');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/permission'); 

// create (insertimi ne tabelen lectures)
router.post("/", auth, checkRole(["admin"]), async (req, res) => {
    try {
        const { emri, lecturerId } = req.body;

        console.log("Received lecturerId:", lecturerId); // Debug log

        const lecturer = await Lecturer.findOne({
            where: {
                lecturerID: lecturerId
            }
        });

        if (!lecturer) {
            return res.status(400).json({ error: 'Lecturer not found!' });
        }

        const newDep = await Lecture.create({
            emri,
            lecturerIDdep: lecturer.lecturerID
        });

        res.json(newDep);
    } catch (error) {
        console.error('Error creating lecture:', error);
        res.status(500).json({ error: 'Failed to create lecture' });
    }
});

// update (manipulo me te dhena ne tabelen lectures)
router.put("/:lectureID", auth, checkRole(["admin"]), async (req, res) => {
    try{
        const { emri } = req.body;
        const lectureID = req.params.lectureID;

        await Lecture.update(
            { emri },
            { where: { lectureID: lectureID } }
        );

        res.status(200).json({ message: 'Lecture updated successfully!' });
    }catch(error){
        console.error('Error updating lecture:', error);
        res.status(500).json({ error: 'Failed to update lecture' });
    }
});


// read (me i pa kejt deps ne tabelen lectures)
router.get('/', async (req, res) => {
    const allDeps = await Lecture.findAll();
    res.json(allDeps);
});


// delete (fshirja e nje departamenti sipas ID te tij)
router.delete("/:lectureID", auth, checkRole(["admin"]), async (req, res) => {
    try{
        const lectureID = req.params.lectureID;

        const lecture = await Lecture.findOne({
            where: {
                lectureID: lectureID
            }
        });

        if(!lecture){
            return res.status(404).json({error: 'Departamenti nuk ekziston!'});
        }

        await lecture.destroy();

        res.status(200).json({message: 'Lecture deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting lecture:', error);
        res.status(500).json({error: 'Failed to delete lecture'});
    }
});

module.exports = router;