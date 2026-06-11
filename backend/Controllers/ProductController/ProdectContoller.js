

const ProductModel = require("../../model/ProductModel")
const multer = require("../../config/multer")

async function allProduct(req,res) {
   
    try{
    let allProductdata= await ProductModel.find({role:"admin"})
    res.status(200).json({
        message:"All Products",
        data:allProductdata
    })
    }
    catch(err){
        res.status(500).json({
            message:"server problem"
        })
    }
    
    
}

async function addProduct(req,res) {
  
    try{
     let body = req.body
     console.log(req.file,"file")
     console.log(body,"body")

    console.log(req.files);

     if(req.files && req.files.length > 0){
         body.photo = req.files.map(file => file.filename);
      }
     let Product= await ProductModel.create(body)
     if(!Product){
        return
        res.status(400).json({
            message:"product not found"
        })
     }
    res.send(Product)

    }
    catch(err){
     res.status(500).json({
      message:"server problem"
     })
    }

    
} 
async function updateProduct(req,res) {
    try{
        let id = req.params.id
        let body = req.body

        if(!updateProduct){
            return res.status(400).json({
                message:"product not found"
            })
        }
     let updatedProduct = await ProductModel.findByIdAndUpdate(id,body,{new:true})
       res.status(200).json({
        data:updatedProduct,
        message:"product updated successfully"
       })
    }
    catch(err){
        res.status(500).json({
            message:"server problem"
        })
    }
    
}

async function deleteProduct(req,res) {
    
   try{
     let id = req.params.id
     if(!id){
        return
        res.send.status(404)({
            message:" please given id"
        })
     }
    let data = await ProductModel.findByIdAndDelete(id)
    res.status(200).json({
          message:"Product successful delete",
    })
    console.log(result)
   }
   catch(error){
  res.status(500).json({
    message:"server error",err,data
  })
   }

}

module.exports = {addProduct,updateProduct, deleteProduct,allProduct}

