const upload = require('../config/storageConfig');
const fs = require('fs');
const User = require('../models/user.model');
const Patient = require('../models/patient.model');
const Diagnosis = require('../models/diagnosis.model');

const { execSync } = require('child_process');
const { constrainedMemory } = require('process');
const { type } = require('os');

exports.handleUpload = function(req, res) {

 
  upload.single('file') (req, res, async (err) => {

    // 上传文件
    console.log("Uploading")
    execSync('python ../data-process/preprocess/unzip_to_png.py');
    execSync('python ../data-process/preprocess/base64_converter.py');
    console.log("Uploaded successfully")
 


    // 更新用户数据
    const email = req.body.email;
    
    const user = await User.findOne( {email: email} )

    const data = fs.readFileSync('tempdata/add_patient_to_user.json', 'utf8'); // 从 JSON 文件中读取数据
    const patientID = JSON.parse(data).patientID; 
    console.log(patientID)


    // 检查用户有没有添加过这个病人
    if (!user.patientsID.includes(patientID)) {
      user.patientsID.push(patientID);
      await user.save();
      console.log("Server: successfully saved patientID");
    }
   
  


    // 添加病人数据
    const diagnosisID = JSON.parse(data).diagnosisID;
    console.log(diagnosisID)
    
    try {
      const existingPatient = await Patient.findOne({ patientID: patientID });
      if (!existingPatient) {
        let patient = new Patient({
          patientID: patientID,
          diagnosisID: diagnosisID
        });
        await patient.save();
        console.log("Server: successfully saved patient");
      }
    }
    catch (err) {
      console.log(err);
      res.send("Patient creation failed");
    }

    const ImageElement = { tag: "T1XX", image: ["afaasd123fdf"]}

    let diagnosis = new Diagnosis({
      diagnosisID: diagnosisID,
      diagnosisImage: ImageElement
    });

    try {
      const existingDiagnosis = await Diagnosis.findOne({ diagnosisID: diagnosisID });
      if (!existingDiagnosis) {
        await diagnosis.save();
        console.log("Server: successfully saved diagnosis");
      }
      else {
        for (let i = 0; i < existingDiagnosis.diagnosisImage.length; i++) {
          if (existingDiagnosis.diagnosisImage[i].tag === ImageElement.tag) {
            console.log("The tag has already been added");
          }
        }
        // 这里不用existingDiagnosis.diagnosisImage.push(...req.body.diagnosisImage);
        existingDiagnosis.diagnosisImage.push(ImageElement);
        // 记得保存！！！
        await existingDiagnosis.save();
        console.log("Server: successfully added diagnosisImage");
        
      }
    }
    catch (err) {
      console.log(err);
      res.send("Diagnosis creation failed");
    }











    


    // 在上传后删除文件夹
    // fs.rm('tempdata', { recursive: true }, (err) => {
    //   if (err) {
    //     console.log(err);
    //     return res.status(400).send({ message: err.message });
    //   }
    //   console.log('tempdata deleted');
    // });


    if (err) {
      return res.status(400).send({ message: err.message });
    }
    res.status(200).send({ message: 'File uploaded successfully' });
  });



 
 


};



