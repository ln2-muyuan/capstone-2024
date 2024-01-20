const mongoose = require('mongoose');

const diagnosisSchema = new mongoose.Schema({
    diagnosisID: {
        type: Number,
        required: true,
        unique: false
    },
    tag: {
        type: String,
        required: true,
        unique: false
    },
    diagnosisImage: {
        type: [Buffer],
        required: false
    },
    diagnosisImageResNet: {
        type: String,
        required: false
    },
    diagnosisImageUNet: {
        type: String,
        required: false
    },
    diagnosisImageTransUNet: {
        type: String,
        required: false
    },
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;