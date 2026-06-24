const express = require("express");
const router = express.Router();

const { createReview, getAllReviews } = require("../../Controllers/review/review");

router.post("/addreview", createReview);
router.get("/allreviews", getAllReviews);

module.exports = router;