var express = require('express');
var router = express.Router();
var userController=require("../controller/userController")
var multer=require('multer')


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

var upload = multer({ storage: storage });

router.post("/register",upload.single('image'),userController.register)

module.exports = router;
