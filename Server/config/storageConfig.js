const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const email = req.body.email;
    // console.log(email);
    // const folderPath = `uploads/${email}`;
    // if (!fs.existsSync
    //   (folderPath)) {
    //   fs.mkdirSync(folderPath, { recursive: true });
    // }
    const folderPath = `uploads/`;
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (ext !== '.zip') {
      return cb(new Error('Only ZIP files are allowed'));
    }
    cb(null, true);
  }
});

module.exports = upload;