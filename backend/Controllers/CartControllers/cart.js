const cartModel = require("../../Model/cartModel");
const couponModel = require("../../Model/couponModel");
const ProductModel = require("../../Model/ProductModel");

async function setCart(req, res) {
    try {
        let body = req.body;

        if (!body) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        let existingItem = await cartModel.findOneAndUpdate(
            { product: body.product, customer: body.customer },
            { $inc: { quantity: body.quantity } },
            { returnDocument: 'after' }
        );

        if (existingItem) {
            return res.status(200).json({
                message: "Item added to existing cart item",
                existingItem
            });
        }

        let product = await ProductModel.findById(body.product);
        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

       body.cartTotal = product.price * body.quantity; // Initialize cartTotal to the product of price and quantity for new items
 

        let cartItem = await cartModel.create(body);

        if (!cartItem) {
            return res.status(400).json({
                message: "Something went wrong"
            });
        }

        res.status(200).json({
            message: "Added to cart successfully",
            cartItem
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        });
    }
}

async function deleteItem(req, res) {
    try {
        let id = req.params.id;
        let existing = await cartModel.findByIdAndDelete(id);

        if (!existing) {
            return res.status(400).json({
                message: "Item not found"
            });
        }

        res.status(200).json({
            message: "Item deleted successfully"
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function setQuantity(req, res) {
    try {
        let cartId = req.params.id;
        let body = req.body;

        if (!body) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (body.quantity == 0) {
            await cartModel.findByIdAndDelete(cartId);
            return res.status(200).json({
                message: "Item deleted successfully"
            });
        }

       

        let cartItem = await cartModel.findByIdAndUpdate(cartId, { quantity: body.quantity }, { new: true }).populate("product");

        let cartTotal = 0;
        const product = cartItem.product;
        if (product) {
            const basePrice = Number(product.price) || 0;
            const discountPercent = Number(product.discount) || 0;
            const priceAfterProductDiscount = discountPercent > 0
                ? basePrice - (basePrice * discountPercent) / 100
                : basePrice;

            cartTotal = priceAfterProductDiscount * cartItem.quantity;
        }

        cartItem.cartTotal = cartTotal;
        await cartItem.save();


        res.status(200).json({
            message: "Quantity updated successfully",
            cartItem
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function getCart(req, res) {
    try {
        let userId = req.userId;
        let cart = await cartModel.find({ customer: userId }).populate("product");

        if (!cart || cart.length === 0) {
            return res.status(400).json({
                message: "No items found"
            });
        }

        res.status(200).json({
            message: "Items fetched successfully",
            cart
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

async function applyCoupon(req, res) {
    try {
        let { couponCode } = req.body;

        if (!couponCode) {
            return res.status(400).json({
                message: "Coupon code is required"
            });
        }

        let coupon = await couponModel.findOne({ code: couponCode });

        if (!coupon) {
            return res.status(404).json({
                message: "Coupon not found"
            });
        }

        let cartItems = await cartModel.find({ customer: req.userId }).populate("product");

        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        const couponId = coupon._id;
        const updatedCartItems = [];

        for (let item of cartItems) {
            item.coupon = couponId;
            await item.save();
            updatedCartItems.push(item);
        }

        

        res.status(200).json({
            message: "Coupon applied to cart successfully",
            coupon,
            cartItems: updatedCartItems
        });
    }
    catch (err) {
        res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });
    }
}

module.exports = { setCart, deleteItem, setQuantity, getCart, applyCoupon };