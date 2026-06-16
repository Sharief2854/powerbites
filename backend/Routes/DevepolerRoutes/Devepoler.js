const express = require("express");
const {getDeveloperById, updateDeveloper} = require("../../Controllers/DevepolerModel/DevepolerModel");
const upload = require("../../config/multerConfig");
const router = express.Router();

router.get("/", getDeveloperById);
//router.post("/", getDeveloperBydetails);
router.put("/updateddeveloper/:id",upload.single("image"),updateDeveloper);

module.exports = router;
