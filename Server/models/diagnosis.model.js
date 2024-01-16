const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
    diagnosisID: {
        type: Number,
        required: true,
        unique: true
    },
    diagnosisImage: {
        type: String,
        required: true
    },
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;