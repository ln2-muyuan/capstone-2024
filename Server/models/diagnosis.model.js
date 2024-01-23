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
        type: [Object],
        required: false
    },
    diagnosisImageUNetTotalMask: {
        type: [Object],
        required: false
    },
    diagnosisImageTransUNetTotalMask: {
        type: [Object],
        required: false
    },
});

const Diagnosis = mongoose.model('Diagnosis', diagnosisSchema);

module.exports = Diagnosis;