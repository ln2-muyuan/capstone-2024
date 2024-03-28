const upload = require('../config/storageConfig');
const fs = require('fs');
const User = require('../models/user.model');
const Patient = require('../models/patient.model');
const Diagnosis = require('../models/diagnosis.model');
const path = require('path');

const { execSync } = require('child_process');


exports.handleUpload = function(req, res) {

 
  upload.single('file') (req, res, async (err) => {

    // 上传文件
    console.log("Uploading")
    execSync('python unzip_to_png.py', {cwd: '../Data-process/preprocess/'});
    execSync('python base64_converter.py', {cwd: '../Data-process/preprocess/'});
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






    // 添加诊断数据
    const folderPath = path.join('tempdata/original-base64', patientID.toString(), diagnosisID.toString());
    console.log(folderPath)
    fs.readdir(folderPath, async (err, files) => {
      if (err) {
        console.error('Error reading folder:', err);
        res.send('Diagnosis creation failed');
        return;
      }

    
      for (let i = 0; i < files.length; i++) {
        const filename = files[i];
        console.log(filename)
        const filePath = path.join(folderPath, filename);
        console.log(filePath)
        const filecontent = []
        fs.readdir(filePath, (err, files) => {
          if (err) {
            console.error('Error reading folder:', err);
            return;
          }
          files.forEach(file => {
            const content = fs.readFileSync(path.join(filePath, file), 'utf8');
            filecontent.push(content);
          });
        });

        const imageElements = {
          tag: filename,
          image: filecontent
        };


        let diagnosis = new Diagnosis({
          diagnosisID: diagnosisID,
          diagnosisImage: imageElements
        });
      
        try {
          const existingDiagnosis = await Diagnosis.findOne({ diagnosisID: diagnosisID });
          if (!existingDiagnosis) {
            await diagnosis.save();
            console.log('Server: successfully saved diagnosis');
          } else {
            let push = true
            for (let i = 0; i < existingDiagnosis.diagnosisImage.length; i++) {
              if (existingDiagnosis.diagnosisImage[i].tag === imageElements.tag) {
                console.log('Tag ' + imageElements.tag + ' already exists');
                push = false;
                break;
              }
            }
            if (push) {
              existingDiagnosis.diagnosisImage.push(imageElements);
              await existingDiagnosis.save();
              console.log('Server: successfully added diagnosisImage');
            }
          }
        } catch (err) {
          console.log(err);
          res.send('Diagnosis creation failed');
        }
      }
    });









    





    if (err) {
      return res.status(400).send({ message: err.message });
    }
    res.status(200).send({ message: 'File uploaded successfully' });


  });



 
 


};



