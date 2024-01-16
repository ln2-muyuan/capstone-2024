const Diagnosis = require("../models/diagnosis.model");

exports.addDiagnosis = async function (req, res) {
    let diagnosis = new Diagnosis({
            diagnosisID: req.body.diagnosisID,
            diagnosisImage: req.body.diagnosisImage
        }
    );
    try {
        const existingDiagnosis = await Diagnosis.findOne({ diagnosisID: req.body.diagnosisID });
        if (existingDiagnosis) {
            return res.status(400).send("Diagnosis already exists");
        }
        await diagnosis.save();
        console.log("Server: successfully saved diagnosis");
        res.send("Diagnosis created successfully");
    }
    catch (err) {
        console.log(err);
        res.send("Diagnosis creation failed");
    }
}
