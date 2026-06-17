const mongoose = require("mongoose");

const ReviewModel = require("../../Model/reviewModel");

async function getAllReviews(req, res) {
  try {
    const reviews = await ReviewModel.find()
      .populate("productId")
      .populate("orderId");

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

module.exports = {
  getAllReviews
};
