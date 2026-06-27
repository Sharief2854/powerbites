const ordersModel = require("../../Model/orderModel");
const userModel = require("../../Model/userModel");

//getting analytics for admin for a week month and year
async function analyticsPeriod(req, res) {
    try {

        const { period } = req.params;

        const validPeriods = ["week", "month", "year"];

        if (!validPeriods.includes(period)) {
            return res.status(400).json({
                success: false,
                message: "Invalid period. Use week, month, or year"
            });
        }

        let startDate = new Date();

        if (period === "week") {
            startDate.setDate(startDate.getDate() - 7);
        } else if (period === "month") {
            startDate.setMonth(startDate.getMonth() - 1);
        } else if (period === "year") {
            startDate.setFullYear(startDate.getFullYear() - 1);
        }

        let orders = await ordersModel.find({
            createdAt: { $gte: startDate }
        });


        orders = orders.filter(order =>
            order.products && order.products.length > 0
        );

        const totalOrders = orders.length;

        const totalRevenue = orders.reduce((sum, order) => {
            return sum + (order.final_price || 0);
        }, 0);

        const customerSet = new Set();

        orders.forEach(order => {
            if (order.customer) {
                customerSet.add(order.customer.toString());
            }
        });

        const totalCustomers = customerSet.size;

        let totalProductsSold = 0;

        orders.forEach(order => {
            order.products.forEach(product => {
                totalProductsSold += product.quantity || 0;
            });
        });

        return res.status(200).json({
            success: true,
            message: `${period} analytics fetched successfully`,
            analytics: {
                totalOrders,
                totalRevenue,
                totalCustomers,
                totalProductsSold
            },
            data: orders
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

//getting analytics for admin for a specific year and month
async function analyticSpecific(req, res) {
    try {

        const { year, month } = req.query;

        // Year Validation
        if (!year) {
            return res.status(400).json({
                success: false,
                message: "Year is required"
            });
        }

        if (isNaN(year)) {
            return res.status(400).json({
                success: false,
                message: "Year must be a valid number"
            });
        }

        if (year.length !== 4) {
            return res.status(400).json({
                success: false,
                message: "Year must be 4 digits"
            });
        }

        // Month Validation
        if (month) {

            if (isNaN(month)) {
                return res.status(400).json({
                    success: false,
                    message: "Month must be a valid number"
                });
            }

            if (Number(month) < 1 || Number(month) > 12) {
                return res.status(400).json({
                    success: false,
                    message: "Month must be between 1 and 12"
                });
            }

        }

        let startDate;
        let endDate;

        // Month + Year
        if (month) {

            startDate = new Date(Number(year), Number(month) - 1, 1);

            endDate = new Date(Number(year), Number(month), 1);

        }

        // Entire Year
        else {

            startDate = new Date(Number(year), 0, 1);

            endDate = new Date(Number(year) + 1, 0, 1);

        }

        // Fetch Orders
        const orders = await ordersModel.find({
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        }).populate("customer", "name email");

        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for selected period"
            });
        }


        const totalOrders = orders.length;

        const totalRevenue = orders.reduce((sum, order) => {
            return sum + (order.final_price || 0);
        }, 0);

        let totalProductsSold = 0;

        orders.forEach(order => {
            order.products.forEach(product => {
                totalProductsSold += product.quantity || 0;
            });
        });

        const customerSet = new Set();

        orders.forEach(order => {
            if (order.customer) {
                customerSet.add(order.customer._id.toString());
            }
        });

        const totalCustomers = customerSet.size;

        let totalPlaced = 0;
        let totalPreparing = 0;
        let totalShipping = 0;
        let totalCancelled = 0;

        orders.forEach(order => {

            if (order.orderStatus === "order placed") {
                totalPlaced++;
            }

            else if (order.orderStatus === "preparing order") {
                totalPreparing++;
            }

            else if (order.orderStatus === "order shipped") {
                totalShipping++;
            }

            else if (order.orderStatus === "order cancelled") {
                totalCancelled++;
            }

        });

       

        const orderData = orders.map(order => ({
            _id: order._id,
            customerName: order.customer ? order.customer.name : null,
            customerEmail: order.customer ? order.customer.email : null,
            createdAt: order.createdAt,
            orderStatus: order.orderStatus,
            final_price: order.final_price
        }));


        return res.status(200).json({

            success: true,

            message: "Specific month analytics and transaction records retrieved successfully.",

            analytics: {

                totalRevenue,

                totalCustomers,

                totalOrders,

                totalProductsSold,

                totalPlaced,

                totalPreparing,

                totalShipping,

                totalCancelled

            },

            data: orderData

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

            error: error.message

        });

    }
}

//getting most sold product in week month and year
async function topSellingProducts(req, res) {
    try {

        const { year, month } = req.query;

        // Year Validation
        if (!year) {
            return res.status(400).json({
                success: false,
                message: "Year is required"
            });
        }

        if (isNaN(year)) {
            return res.status(400).json({
                success: false,
                message: "Year must be a valid number"
            });
        }

        if (year.length !== 4) {
            return res.status(400).json({
                success: false,
                message: "Year must be a 4 digit number"
            });
        }

        let startDate;
        let endDate;

        if (month) {

            if (isNaN(month)) {
                return res.status(400).json({
                    success: false,
                    message: "Month must be a valid number"
                });
            }

            if (Number(month) < 1 || Number(month) > 12) {
                return res.status(400).json({
                    success: false,
                    message: "Month must be between 1 and 12"
                });
            }

            startDate = new Date(Number(year), Number(month) - 1, 1);

            endDate = new Date(Number(year), Number(month), 1);

        } else {

            startDate = new Date(Number(year), 0, 1);

            endDate = new Date(Number(year) + 1, 0, 1);

        }

        const products = await ordersModel.aggregate([

            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },

            {
                $unwind: "$products"
            },

            {
                $group: {
                    _id: "$products.product",
                    totalQuantitySold: {
                        $sum: "$products.quantity"
                    }
                }
            },

            {
                $sort: {
                    totalQuantitySold: -1
                }
            },

            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },

            {
                $unwind: "$productDetails"
            },

            {
                $project: {
                    _id: 0,
                    productId: "$productDetails._id",
                    productName: "$productDetails.name",
                    totalQuantitySold: 1
                }
            }

        ]);

        if (products.length === 0) {

            return res.status(404).json({
                success: false,
                message: "No product sales found"
            });

        }

        return res.status(200).json({

            success: true,

            message: "Top selling products compiled successfully.",

            data: products

        });

    }

    catch (error) {

        console.error(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error",

            error: error.message

        });

    }
}

//getting least sold produt in a week month and year
// Getting least selling products
async function leastSellingProducts(req, res) {
    try {

        const { year, month } = req.query;

        // Year validation
        if (!year) {
            return res.status(400).json({
                success: false,
                message: "Year is required"
            });
        }

        if (isNaN(year)) {
            return res.status(400).json({
                success: false,
                message: "Year must be a valid number"
            });
        }

        let startDate;
        let endDate;

        // Month validation
        if (month) {

            if (isNaN(month)) {
                return res.status(400).json({
                    success: false,
                    message: "Month must be a valid number"
                });
            }

            if (Number(month) < 1 || Number(month) > 12) {
                return res.status(400).json({
                    success: false,
                    message: "Month must be between 1 and 12"
                });
            }

            startDate = new Date(Number(year), Number(month) - 1, 1);
            endDate = new Date(Number(year), Number(month), 1);

        } else {

            startDate = new Date(Number(year), 0, 1);
            endDate = new Date(Number(year) + 1, 0, 1);

        }

        const leastSellingProducts = await ordersModel.aggregate([

            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lt: endDate
                    },
                    orderStatus: {
                        $ne: "order cancelled"
                    }
                }
            },

            {
                $unwind: "$products"
            },

            {
                $group: {
                    _id: "$products.product",
                    totalQuantitySold: {
                        $sum: "$products.quantity"
                    }
                }
            },

            {
                $lookup: {
                    from: "products",
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },

            {
                $unwind: "$productDetails"
            },

            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    productName: "$productDetails.name",
                    totalQuantitySold: 1
                }
            },

            {
                $sort: {
                    totalQuantitySold: 1
                }
            }

        ]);

        if (leastSellingProducts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No product sales found for the selected period"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Least selling products compiled successfully.",
            data: leastSellingProducts
        });

    } catch (error) {

        console.error("Least Selling Products Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });

    }
}

//getting topselling product
async function bestSellingProduct(req, res) {
    try {
        const topProduct = await ordersModel.aggregate([
            { $unwind: "$products" },
            {
                $group: {
                    _id: "$products.product",
                    totalQuantity: { $sum: "$products.quantity" },
                    productName: { $first: "$products.product.name" }, // Assuming product name is directly accessible or can be populated later
                    productImage: { $first: "$products.image" }
                }
            },
            { $sort: { totalQuantity: -1 } },
            { $limit: 1 },
            {
                $lookup: {
                    from: "products", // The collection name for products
                    localField: "_id",
                    foreignField: "_id",
                    as: "productDetails"
                }
            },
            { $unwind: "$productDetails" },
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    productName: "$productDetails.name",
                    productImage: "$productDetails.images", // Adjust based on your product schema
                    totalQuantitySold: "$totalQuantity"
                }
            }
        ]);

        if (topProduct.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No top selling product found."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Top selling product fetched successfully.",
            data: topProduct[0]
        });

    } catch (error) {
        console.error("Error fetching top selling product:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

//getting total customers
async function totalCustomers(req, res) {
    try {
        const totalCustomers = await userModel.countDocuments({ role: "customer" });
        if (!totalCustomers) {
            return res.status(404).json({
                success: false,
                message: "No customers found"
            });
        }


        return res.status(200).json({
            success: true,
            message: "Total customers fetched successfully",
            totalCustomers
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });


    }
}

//getting total oders
async function totalOrders(req, res) {
    try {
        const totalOrders = await ordersModel.countDocuments();
        if (!totalOrders) {

            return res.status(404).json({
                success: false,
                message: "No orders found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Total orders fetched successfully",
            totalOrders
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }

}

//total products sold
async function totalProductsSold(req, res) {
    try {
        const result = await ordersModel.aggregate([
            {
                $unwind: "$products"
            },
            {
                $group: {
                    _id: null,
                    totalQuantity: { $sum: "$products.quantity" }
                }
            }
        ]);

        const totalSold = result.length > 0 ? result[0].totalQuantity : 0;

        return res.status(200).json({
            success: true,
            message: "Total products sold fetched successfully",
            totalProductsSold: totalSold
        });

    } catch (error) {
        console.error("Error fetching total products sold:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

//order status summary
async function orderStatusSummary(req, res) {
    try {
        const { year, month } = req.query;
        if (!year) {
            return res.status(400).json({
                success: false,
                message: "Year is required"
            });
        }
        let startDate;
        let endDate;
        if (month) {
            if (
                month < 1 ||
                month > 12

            ) {
                return res.status(400).json({
                    success: false,
                    message: "Month must be between 1 and 12"
                });
            }
            startDate = new Date(year, month - 1, 1);
            endDate = new Date(year, month, 1);
        } else {
            startDate = new Date(year, 0, 1);
            endDate = new Date(Number(year) + 1, 0, 1);
        }

        const orderStatusCounts = await ordersModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lt: endDate
                    }
                }
            },
            {
                $group: {
                    _id: "$orderStatus",
                    count: { $sum: 1 }
                }
            }
        ]);

        const summary = {
            "order placed": 0,
            "preparing order": 0,
            "order shipped": 0,
            "order delivered": 0,
            "order cancelled": 0
        };

        orderStatusCounts.forEach(item => {
            summary[item._id] = item.count;
        });

        return res.status(200).json({
            success: true,
            message: "Order status summary fetched successfully",
            summary
        });
    } catch (error) {
        console.error("Error fetching order status summary:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}

//getting total cancelled orders
async function cancelledOrdersAnalytics(req, res) {
    try {

        const { year, month } = req.query;

        // Year validation
        if (!year) {
            return res.status(400).json({
                success: false,
                message: "Year is required"
            });
        }

        if (isNaN(year)) {
            return res.status(400).json({
                success: false,
                message: "Year must be a valid number"
            });
        }

        let startDate;
        let endDate;

        // Month validation (optional)
        if (month) {

            if (isNaN(month)) {
                return res.status(400).json({
                    success: false,
                    message: "Month must be a valid number"
                });
            }

            if (Number(month) < 1 || Number(month) > 12) {
                return res.status(400).json({
                    success: false,
                    message: "Month must be between 1 and 12"
                });
            }

            startDate = new Date(Number(year), Number(month) - 1, 1);
            endDate = new Date(Number(year), Number(month), 1);

        } else {

            startDate = new Date(Number(year), 0, 1);
            endDate = new Date(Number(year) + 1, 0, 1);

        }

        const totalCancelledOrders = await ordersModel.countDocuments({
            orderStatus: "order cancelled",
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        });

        return res.status(200).json({
            success: true,
            message: "Cancelled orders analytics fetched successfully",
            period: {
                year,
                month: month || null
            },
            totalCancelledOrders
        });

    } catch (error) {

        console.error("Cancelled Orders Analytics Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });

    }
}

//getting top customer
async function topCustomer(req, res) {
    try {
        const { year, month } = req.query;
        if (!year) {
            return res.status(400).json({
                success: false,
                message: "Year is required"
            });
        }

        let startDate;
        let endDate;

        if (month) {
            if (month < 1 || month > 12) {
                return res.status(400).json({
                    success: false,
                    message: "Month must be between 1 and 12"
                });
            }
            startDate = new Date(year, month - 1, 1);
            endDate = new Date(year, month, 1);
        } else {
            startDate = new Date(year, 0, 1);
            endDate = new Date(Number(year) + 1, 0, 1);
        }

        const topCustomer = await ordersModel.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lt: endDate
                    },
                     orderStatus: { $ne: "order cancelled" }
                }
            },
            {
                $group: {
                    _id: "$customer",
                    totalOrders: { $sum: 1 },
                    totalAmountSpent: { $sum: "$final_price" }
                }
            },
            { $sort: { totalAmountSpent: -1 } },
            { $limit: 1 },
            {
                $lookup: {
                    from: "users", // The collection name for users
                    localField: "_id",
                    foreignField: "_id",
                    as: "customerDetails"
                }
            },
            { $unwind: "$customerDetails" },
            {
                $project: {
                    _id: 0,
                    customerId: "$_id",
                    customerName: "$customerDetails.name",
                    customerEmail: "$customerDetails.email",
                    totalOrders: 1,
                    totalAmountSpent: 1
                }
            }
        ]);

        if (topCustomer.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No top customer found for the specified period."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Top customer fetched successfully.",
            data: topCustomer[0]
        });

    } catch (error) {
        console.error("Error fetching top customer:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
}


module.exports = {
     analyticsPeriod, 
     analyticSpecific, 
     topSellingProducts, 
     leastSellingProducts, 
     bestSellingProduct, 
     totalCustomers, 
     totalOrders, 
     totalProductsSold, 
     orderStatusSummary, 
     cancelledOrdersAnalytics,
     topCustomer
    }
