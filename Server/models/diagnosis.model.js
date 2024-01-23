const mongoose = require('mongoose');


const diagnosisSchema = new mongoose.Schema({
    diagnosisID: {
        type: Number,
        required: true,
    },
    diagnosisImage: {
        type: [Object],
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