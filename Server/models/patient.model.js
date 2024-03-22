const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    patientID: {
      type: Number,
      required: true,
      unique: true
    },
    diagnosisID: {
      type: [Number],
      required: false
    },
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;