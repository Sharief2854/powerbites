


async function setCart(req,res){
    try {

        let body = req.body;

        if(!body){
            return res.status(400).json({
                message:"All fields are required"
            })
        };

        let cart = await cartModel.create(body);

        if(!cart){
            return res.status(400).json({
                message:"Something went wrong"
            })
        }
        res.status(200).json({
            message:" Added to Cart successfully"
        })

        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
        
    }
}



module.exports = setCart;