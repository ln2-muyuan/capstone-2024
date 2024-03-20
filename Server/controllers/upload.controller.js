const upload = require('../config/storageConfig');

exports.handleUpload = function(req, res) {
  upload.single('file')(req, res, (err) => {

    const email = req.body.email;


    if (err) {
      return res.status(400).send({ message: err.message });
    }

    res.status(200).send({ message: 'File uploaded successfully' });
  });
};



