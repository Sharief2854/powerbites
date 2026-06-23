const ordersModel = require("../../Model/orderModel");

//getting analytics for admin for a week month and year
async function analyticsPeriod(req,res) {
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
            data:orders
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
async function analyticSpecific(req,res) {
   try {

        const { year, month } = req.query;

        // Validation 1: Year is required
        if (!year) {
            return res.status(400).json({
                success: false,
                message: "Year is required"
            });
        }

        // Validation 2: Year must be a valid number
        if (isNaN(year)) {
            return res.status(400).json({
                success: false,
                message: "Year must be a valid number"
            });
        }

        // Validation 3: Year should be 4 digits
        if (year.length !== 4) {
            return res.status(400).json({
                success: false,
                message: "Year must be a 4-digit value"
            });
        }

        // Validation 4: Month validation (if provided)
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

        // Month + Year Search
        if (year && month) {

            startDate = new Date(Number(year), Number(month) - 1, 1);

            endDate = new Date(Number(year), Number(month), 1);

        }
        // Year Search
        else {

            startDate = new Date(Number(year), 0, 1);

            endDate = new Date(Number(year) + 1, 0, 1);

        }

        const orders = await ordersModel.find({
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        });

        // No orders found
        if (orders.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No orders found for the selected period"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Analytics fetched successfully",
            totalOrders: orders.length,
            period: {
                year,
                month: month || null
            },
            data: orders
        });

    } catch (error) {

        console.error("Analytics Error:", error);

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

        const orders = await ordersModel.find({
            createdAt: {
                $gte: startDate,
                $lt: endDate
            }
        });

        const productSales = {};

        orders.forEach(order => {

            order.products.forEach(item => {

                const productId = item.product.toString();

                if (!productSales[productId]) {
                    productSales[productId] = 0;
                }

                productSales[productId] += item.quantity;

            });

        });

        const sortedProducts = Object.entries(productSales)
            .sort((a, b) => b[1] - a[1]);

        if (sortedProducts.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No product sales found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Top selling products fetched successfully",
            data: sortedProducts
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });

    }
}



module.exports={analyticsPeriod,analyticSpecific,topSellingProducts}