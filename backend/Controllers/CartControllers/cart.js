const cartModel = require("../../Model/cartModel");



async function setCart(req,res){
    try {

        let body = req.body;

        if(!body){
            return res.status(400).json({
                message:"All fields are required"
            })
        };

        // let total = body.quantity * body.price;
        // body.total = total;

       


        let existingItem = await cartModel.findOneAndUpdate({product:body.product,customer:body.customer}, { $inc: { quantity: body.quantity } }, { returnDocument: 'after' })

        if(existingItem){
            return res.status(200).json({
                message:"Item Added to existing item",
                existingItem
            })
        }

        let cartItem = await cartModel.create(body);

        if(!cartItem){
            return res.status(400).json({
                message:"Something went wrong"
            })
        }
        res.status(200).json({
            message:" Added to Cart successfully",
            cartItem


        })

        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
        
    }
}

async function deleteItem(req,res){
    try{

        let id = req.params.id;

        let existing = await cartModel.findByIdAndDelete(id);

        if(!existing){
            return res.status(400).json({
                message:"Item not found"
            })
        }

        res.status(200).json({
            message:"Item deleted successfully"
        })

    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })

    }

}

async function setQuantity(req,res){
    try{

        let cartId = req.params.id;
        let body = req.body;

        if(!body){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        if(body.quantity == 0){
             await cartModel.findByIdAndDelete(cartId);
             return res.status(400).json({
                message:"Item deleted successfully"
            })
        }
        let product = await cartModel.findById(cartId).populate("product");

        if(!product){
            return res.status(400).json({
                message:"Item not found"
            })
        }

        
     product.quantity = body.quantity
     product.total = product.quantity * product.price
     product.save()

     res.status(200).json({
        message:"Quantity updated successfully",product
     })


        
        }
        catch(err){
            res.status(500).json({
                message:"Internal Server Error",
                error:err.message
            })
        }
        }

async function getCart(req,res){
    try{   

        let userId = req.userId;
        let cart = await cartModel.find({customer:userId});

        if(!cart){
            return res.status(400).json({
                message:"No items found"
            })
        }
        res.status(200).json({
            message:"Items fetched successfully",
            cart
        })


     }
     catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
     }
}



module.exports ={setCart,deleteItem,setQuantity,getCart};