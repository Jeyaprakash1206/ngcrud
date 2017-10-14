const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const personDetails = new Schema({
    Name: String,
    position: String
});

module.exports = mongoose.model('person', personDetails, 'PersonDetails');