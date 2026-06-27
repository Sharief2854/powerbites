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

async function createReview(req,res){
    try{
        
        const{
            productId,
            orderId,
            review,
            rating
        }=req.body;
        console.log(req.body);

        // if(!productId || !orderId || !review || !rating){
        //     return res.status(400).json({
        //         success:false,
        //         message:"All fields are required"
        //     });

        //     }
            const reviewData = await ReviewModel.create({
                productId,
                orderId,
                review,
                rating
            });
            console.log(reviewData);
            return res.status(201).json({
                success:true,
                message:"Review created successfully",
                data: reviewData
            });

            }catch(error){
                return res.status(500).json({
                    success:false,
                    message:error.message
                });
            }
        }
        

async function getFiveStarReviews(req, res) {
  try {
    const reviews = await ReviewModel.find({rating: Number(5)})
      .populate("productId")
      .populate("orderId");

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
module.exports = {
  getAllReviews,createReview, getFiveStarReviews
};
