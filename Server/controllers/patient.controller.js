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
        // check whether it is already in the list
        if (patient.diagnosisID.includes(diagnosisID)) {
            return res.status(400).send("Diagnosis already added to the patient");
        }
        patient.diagnosisID.push(...diagnosisID);
        await patient.save();
    }
    catch (err) {
        console.log(err);
        res.send("Patient update failed");
    }
}