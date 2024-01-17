const Patient = require('../models/patient.model');


exports.addPatient = async function (req, res) {
    let patient = new Patient({
            name: req.body.name,
            patientID: req.body.patientID,
            diagnosisID: req.body.diagnosisID
        }
    );
    try {
        const existingPatient = await Patient.findOne({ patientID: req.body.patientID });
        if (existingPatient) {
            return res.status(400).send("Patient already exists");
        }
        await patient.save();
        console.log("Server: successfully saved patient");
        res.send("Patient created successfully");
    }
    catch (err) {
        console.log(err);
        res.send("Patient creation failed");
    }
}

exports.addDiagnosisToPatient = async function (req, res) {
    const patientID = req.body.patientID;
    const diagnosisID = req.body.diagnosisID;
    try {
        const patient = await Patient.findOne( {patientID: patientID} )
        if (!patient) {
            return res.status(400).send("Patient not found");
        }
        
        // check whether diagnosisID already exists in patient.diagnosisID
        for (let i = 0; i < diagnosisID.length; i++) {
            if (patient.diagnosisID.includes(diagnosisID[i])) {
                return res.status(400).send("Diagnosis already exists");
            }
        }
        patient.diagnosisID.push(...diagnosisID);
        await patient.save();
        res.send("Diagnosis added successfully");
    }
    catch (err) {
        console.log(err);
        res.send("Patient update failed");
    }
}

exports.getDiagnosis = async function (req, res) {
    const patientID = req.query.patientID;
    try {
        const patient = await Patient.findOne( {patientID: patientID} )
        if (!patient) {
            return res.status(400).send("Patient not found");
        }
        diagnosisID = patient.diagnosisID;
        res.send(diagnosisID);
    }
    catch (err) {
        console.log(err);
        res.send("Server: Getting diagnosis failed");
    }
}
