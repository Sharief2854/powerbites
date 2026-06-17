
const nodemailer = require("nodemailer");
const UserModel = require("../Model/userModel");

const imagePaths = require("../Controllers/ProductController/Produrcts");
const upload = require("../config/multerConfig");
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

async function sendProductNotification(product) {
    try {
        const customers = await UserModel.find(
            { role: "customer" },
            { email: 1, _id: 0 }
        );

        const emails = customers.map((user) => user.email)

        if (emails.length === 0) {
            console.log("No customer emails found");
            return;
        }


        let imageUrl = "";

        if (product.image && product.image.length > 0) {
            imageUrl = product.image[0];
        }

        console.log("Image URL:", imageUrl);



        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>New Product Added</title>
        </head>
        <body style="font-family: Arial, sans-serif; padding:20px;">

            <h2 style="color:#28a745;">🛍️ New Product Added</h2>

            ${imageUrl ? `
                <img
                    src="${imageUrl}"
                    alt="${product.name}"
                    width="250"
                    style="border-radius:10px; border:1px solid #ddd; margin-bottom:15px; display:block;"
                />
            ` : ""}

            <h3>${product.name}</h3>
            <p>Category:</strong> ${product.category || "N/A"}</p>
            <p>Price:</strong> ₹${product.price}</p>
            <p>Discount:</strong> ${product.discount || 0}%</p>
            <p>Rating:</strong> ${product.rating || 0}</p>
            <p>${product.description || ""}</p>
            <br>

            
                href="${process.env.FRONTEND_URL || "http://localhost:3000"}"
                style="
                    background:#28a745;
                    color:white;
                    padding:12px 20px;
                    text-decoration:none;
                    border-radius:5px;
                    display:inline-block;
                "
            >
                View Product
            </a>

        </body>
        </html>
        `;

        const mailOptions = {
            from: process.env.EMAIL,
            // to: process.env.EMAIL, 
            // Admin (primary)
            to: "hippargechandu@gmail.com",
            // bcc: emails,                  
            subject: `🛍️ New Product Added - ${product.name}`,
            html,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully. Message ID:", info.messageId);

    } catch (err) {
        console.error("Email Error:", err);
    }
}

module.exports = sendProductNotification;