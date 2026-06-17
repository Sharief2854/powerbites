const express = require("express");
const router = express.Router();

const {getAllReviews } = require("../../Controllers/review/review");

router.get("/", getAllReviews);

module.exports = router;