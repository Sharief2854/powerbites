const multer = require('multer');
const path = require('path');

// console.log("Multer config loaded");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("Destination middleware called");
    cb(null, 'upload/');
  },

  filename: (req,file,cb) =>{
    console.log("File received:", file.originalname);
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
})
const upload = multer({storage})

module.exports = upload;


// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "upload/");
//   },

//   filename: function (req, file, cb) {
//     const fileName =
//       Date.now() + path.extname(file.originalname);

//     cb(null, fileName);
//   },
// });

// module.exports = multer({ storage });
