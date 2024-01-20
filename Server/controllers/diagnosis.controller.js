const Diagnosis = require("../models/diagnosis.model");

exports.addDiagnosis = async function (req, res) {
    let diagnosis = new Diagnosis({
            diagnosisID: req.body.diagnosisID,
            tag: req.body.tag,
            diagnosisImage: req.body.diagnosisImage
        }
    );
    try {
        const diagnosis = await Diagnosis.findOne({ diagnosisID: req.body.diagnosisID });
        diagnosis.diagnosisImage.push(...req.body.diagnosisImage);
        await diagnosis.save();
        console.log("Server: successfully saved diagnosis");
        res.send("Diagnosis created successfully");
    }
    catch (err) {
        console.log(err);
        res.send("Diagnosis creation failed");
    }
}


exports.getDiagnosis = async function (req, res) {
    const diagnosisID = req.query.diagnosisID;
    try {
        const diagnosis = await Diagnosis.findOne( {diagnosisID: diagnosisID} )
        if (!diagnosis) {
            return res.status(400).send("Diagnosis not found");
        }
        res.send(diagnosis);
    }
    catch (err) {
        console.log(err);
        res.send("Diagnosis retrieval failed");
    }
}
