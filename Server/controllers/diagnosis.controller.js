const Diagnosis = require("../models/diagnosis.model");
const User = require("../models/user.model");

exports.addDiagnosis = async function (req, res) {
    let diagnosis = new Diagnosis({
            diagnosisID: req.body.diagnosisID,
            tag: req.body.tag,
            diagnosisImage: req.body.diagnosisImage
        }
    );
    try {
        const existingDiagnosis = await Diagnosis.findOne({ diagnosisID: req.body.diagnosisID });
        if (!existingDiagnosis) {
            await diagnosis.save();
        }
        else {
            existingDiagnosis.diagnosisImage.push(...req.body.diagnosisImage);
            await existingDiagnosis.save();
        }
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
        console.log("Server: successfully retrieved diagnosis");
        res.send(diagnosis);
    }
    catch (err) {
        console.log(err);
        res.send("Diagnosis retrieval failed");
    }
}

