const path = require('path');
const multer = require('multer');

// create storage
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
    // console.log(
    //   `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    // );
  },
});

// create a filter
const multerFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // console.log(file.mimetype + ' -something');
  const mimetype = fileTypes.test(file.mimetype);

  // console.log(mimetype, extname, ' -something534');

  if (mimetype && extname) {
    // console.log('somethins is possible');
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

// create upload middleware
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// export upload middleware
module.exports = {
  uploadPics: upload.single('pics'),
  sendFilePath: (req, res) => {
    // console.log(req.file);
    res.send(`/${req.file.path}`);
  },
};
