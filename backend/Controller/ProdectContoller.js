
const ProductModel = require("../model/ProductModel")

async function addProduct(req,res) {
  
    try{
     let body = req.body   
     let Product= await ProductModel.create(body)
     
    res.send(Product)

    }
    catch(err){
     res.status(500).json({
      message:"server problem"
     })
    }

    
} 
module.exports = addProduct