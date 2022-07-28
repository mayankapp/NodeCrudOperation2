const express = require('express');

const router = express.Router();

const teamModel = require('../models/team');


// get All the Team Record
router.get('/', async (req, res) => {
    const allTeam = await teamModel.find().exec();
    res.status(200).send(allTeam);
});

// Create a Team
router.post('/create', async (req, res) => {
    await teamModel.create(req.body);
    return res.status(201).send("Team Created successfully!!");
});

// Update the Team Record
router.patch('/update/:id', async (req, res) => {
    const id = req.params.id;
    await teamModel.findByIdAndUpdate(id, req.body);
    res.status(200).send("Team Record Updated successfully!!");
});

// Delete the Team Record
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    await teamModel.findByIdAndDelete(id);
    res.status(200).send("Team Deleted successfully");
});

module.exports = router;