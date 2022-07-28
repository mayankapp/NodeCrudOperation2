const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true},
    team_name: { type: String, required: true},
    players: { type: Number, required: true},
    address: { type: String, required: true},
});

module.exports = mongoose.model('team', teamSchema);