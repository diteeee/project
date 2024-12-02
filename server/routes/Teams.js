const express = require('express');
const { Team, Player } = require('../models');
const router = express.Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/permission'); 
const multer = require('multer');

const upload = multer();

router.post("/", auth, checkRole(["admin"]), upload.none(), async (req, res) => {
  try {
    const { emri } = req.body;
    console.log("Received data:", req.body);

    const existingTeam = await Team.findOne({ where: { emri } });

    if (existingTeam) {
      return res.status(400).json({ error: 'Team with the same name already exists' });
    }

    const team = await Team.create({ emri });
    res.status(201).json({ message: 'Team created successfully' });
  } catch (error) {
    console.error('Error creating team:', error.message);
    res.status(500).json({ error: 'Failed to create team' });
  }
});


// Read (fetch all teams)
router.get('/', async (req, res) => {
  try {
    const allTeams = await Team.findAll();
    res.json(allTeams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Failed to fetch teams' });
  }
});

router.get('/:teamID/players', async (req, res) => {
  try{
      const { teamID } = req.params;
      const players = await Player.findAll({ where: { teamIDdep: teamID } });
      res.json(players);
  }catch(err){
      res.status(500).json({ error: err.message });
  }
});

// Update (update team data)
router.put("/:teamID", auth, checkRole(["admin"]), upload.none(), async (req, res) => {
  try {
    const { emri } = req.body;
    const teamID = req.params.teamID;

    const team = await Team.findOne({
      where: { teamID }
    });

    if (!team) {
      return res.status(404).json({ error: 'Team does not exist' });
    }

    await Team.update(
      { emri },
      { where: { teamID } }
    );

    res.status(200).json({ message: 'Team updated successfully!' });
  } catch (error) {
    console.error('Error updating team:', error);
    res.status(500).json({ error: 'Failed to update team' });
  }
});

// Delete (delete a team)
router.delete("/:teamID", auth, checkRole(["admin"]), async (req, res) => {
  try {
    const teamID = req.params.teamID;

    const team = await Team.findOne({
      where: { teamID }
    });

    if (!team) {
      return res.status(404).json({ error: 'Team does not exist' });
    }

    await team.destroy();

    res.status(200).json({ message: 'Team deleted successfully!' });
  } catch (error) {
    console.error('Error deleting team:', error);
    res.status(500).json({ error: 'Failed to delete team' });
  }
});

module.exports = router;