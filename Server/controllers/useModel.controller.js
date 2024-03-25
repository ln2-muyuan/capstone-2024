


exports.handleUseModel = async function (req, res) {
    const model = req.body.model
    const diagnosisID = req.body.diagnosisID;
    const tag = req.body.tag;
    console.log("Model: ", model);
    console.log("DiagnosisID: ", diagnosisID);
    console.log("Tag: ", tag);

    res.send("Model used successfully");

}

