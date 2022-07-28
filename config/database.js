const mongoose = require('mongoose');

const url = () => {
    mongoose.connect("mongodb://localhost:27017/node_crud");
};

module.exports = url;