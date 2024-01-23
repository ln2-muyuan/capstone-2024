const Diagnosis = require("../models/diagnosis.model");
const User = require("../models/user.model");

exports.addDiagnosis = async function (req, res) {
    let diagnosis = new Diagnosis({
            diagnosisID: req.body.diagnosisID,
            diagnosisImage: req.body.diagnosisImage
        }
    );
    try {
        const existingDiagnosis = await Diagnosis.findOne({ diagnosisID: req.body.diagnosisID });
        if (!existingDiagnosis) {
            await diagnosis.save();
            console.log("Server: successfully saved diagnosis");
            res.send("Diagnosis created successfully");
        }
        else {
            // check whether tag has already been added
            for (let i = 0; i < existingDiagnosis.diagnosisImage.length; i++) {
                if (existingDiagnosis.diagnosisImage[i].tag === req.body.diagnosisImage.tag) {
                    return res.status(400).send("The tag has already been added");
                }
            }
            // 这里不用existingDiagnosis.diagnosisImage.push(...req.body.diagnosisImage);
            existingDiagnosis.diagnosisImage.push(req.body.diagnosisImage);
            // 记得保存！！！
            await existingDiagnosis.save();
            console.log("Server: successfully added diagnosisImage");
            res.send("DiagnosisImage added successfully");
        }

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

