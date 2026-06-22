


async function setDeal(req, res) {
    try {
        const { product, offer,coupon } = req.body;

        const existingProduct = await Product.findById(product);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingOffer = await offerModel.findById(offer);
        if (!existingOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        const existingCoupon = await couponModel.findById(coupon);
        if (!existingCoupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        // Set the offer and coupon for the product
        existingProduct.offer = offer;
        existingProduct.coupon = coupon;
        await existingProduct.save();

       

        res.status(200).json({ message: 'Deal set successfully', product: existingProduct });
    } catch (error) {
        console.error('Error setting deal:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


async function updateDeal(req, res) {
    try {
        const { productId } = req.params;
        const { offer, coupon } = req.body;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const existingOffer = await offerModel.findById(offer);
        if (!existingOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }

        const existingCoupon = await couponModel.findById(coupon);
        if (!existingCoupon) {
            return res.status(404).json({ message: 'Coupon not found' });
        }

        product.offer = offer;
        product.coupon = coupon;
        await product.save();

        res.status(200).json({ message: 'Deal updated successfully', product });
    } catch (error) {
        console.error('Error updating deal:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



async function removeDeal(req,res){
    try{
        const { productId } = req.params;

        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product.offer = null;
        product.coupon = null;
        await product.save();

        res.status(200).json({ message: 'Deal removed successfully', product });

    }
    catch(err){
        res.status(500).json({
            message:""
        })
    }

}

module.exports = {
    setDeal
};