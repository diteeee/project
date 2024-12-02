const express = require('express');
const router = express.Router();
const { Player, Team } = require('../models');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/permission'); 

// create (insertimi ne tabelen players)
router.post("/", auth, checkRole(["admin"]), async (req, res) => {
    try {
        const { emri,numri,teamId } = req.body;

        console.log("Received teamId:", teamId);

        const team = await Team.findOne({
            where: {
                teamID: teamId
            }
        });

        if (!team) {
            return res.status(400).json({ error: 'Team not found!' });
        }

        const newDep = await Player.create({
            emri,
            numri,
            teamIDdep: team.teamID
        });

        res.json(newDep);
    } catch (error) {
        console.error('Error creating player:', error);
        res.status(500).json({ error: 'Failed to create player' });
    }
});

// update (manipulo me te dhena ne tabelen players)
router.put("/:playerID", auth, checkRole(["admin"]), async (req, res) => {
    try{
        const { emri,numri } = req.body;
        const playerID = req.params.playerID;

        await Player.update(
            { emri,numri },
            { where: { playerID: playerID } }
        );

        res.status(200).json({ message: 'Player updated successfully!' });
    }catch(error){
        console.error('Error updating player:', error);
        res.status(500).json({ error: 'Failed to update player' });
    }
});


// read (me i pa kejt deps ne tabelen players)
router.get('/', async (req, res) => {
    const allDeps = await Player.findAll();
    res.json(allDeps);
});


// delete (fshirja e nje departamenti sipas ID te tij)
router.delete("/:playerID", auth, checkRole(["admin"]), async (req, res) => {
    try{
        const playerID = req.params.playerID;

        const player = await Player.findOne({
            where: {
                playerID: playerID
            }
        });

        if(!player){
            return res.status(404).json({error: 'Departamenti nuk ekziston!'});
        }

        await player.destroy();

        res.status(200).json({message: 'Player deleted successfully!'});
    }
    catch(error){
        console.error('Error deleting player:', error);
        res.status(500).json({error: 'Failed to delete player'});
    }
});

module.exports = router;