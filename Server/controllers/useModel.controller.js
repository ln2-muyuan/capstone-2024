
const { execSync } = require('child_process');

exports.handleUseModel = async function (req, res) {


    const model = req.body.model
    const patientID = req.body.patientID;
    const diagnosisID = req.body.diagnosisID;
    const tag = req.body.tag;
    const command = `python ../../MED_NNs_Mobile/handle.py ${model} ${patientID} ${diagnosisID} ${tag}`;
    const output = execSync(command);
    console.log(output.toString());

    const command2 = 'python modelResult_to_png.py';
    const options2 = {
        cwd: '../../MED_NNs_Mobile/'
      };
    const output2 = execSync(command2, options2);
    console.log(output2.toString());

    res.send("Model used successfully");

}

