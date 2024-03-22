const upload = require('../config/storageConfig');

const { execSync } = require('child_process');

exports.handleUpload = function(req, res) {



  upload.single('file') (req, res, (err) => {

    const email = req.body.email;

    console.log("Uploading")


    execSync(`python ../data-process/preprocess/unzip_to_png.py ${email}`);
    
    console.log("Uploaded successfully")



    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({ message: 'File uploaded successfully' });
  });
};



