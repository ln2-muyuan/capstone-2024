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
        type: [String],
        required: false
    },
    diagnosisImageResNetTotalMask: {
        type: String,
        required: false
    },
    diagnosisImageUNetTotalMask: {
        type: String,
        required: false
    },
    diagnosisImageTransUNetTotalMask: {
        type: String,
        required: false
    },
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;