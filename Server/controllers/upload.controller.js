const upload = require('../config/storageConfig');

const { execSync } = require('child_process');
const { exec } = require('child_process');

exports.handleUpload = function(req, res) {
  upload.single('file')(req, res, (err) => {

    const email = req.body.email;

    console.log("Uploading")


    // get python index.py's return value
    const result = execSync(
      'python ../data-process/preprocess/unzip_to_png.py'
    ).toString();
    
    console.log("Uploaded successfully")

    console.log(result);

    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({ message: 'File uploaded successfully' });
  });
};



