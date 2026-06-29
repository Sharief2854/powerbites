// const nodemailer = require("nodemailer");
// const transporter = require("../config/emailConfig");
// const UserModel = require("../Model/userModel");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD
//     }
// });

// async function sendProductNotification(product) {
//     try {
//         // Get all customers
//         const customers = await UserModel.find(
//             { role: "customer" },
//             { email: 1 }
//         );

//         const emails = customers.map(user => user.email);
//         if (emails.length === 0) {
//             console.log("No customer emails found");
//             return;
//         }
//         const imageUrl =
//             `https://7f8a-2409-40f4-xxxx.ngrok-free.app/${product.image[0].replace(/\\/g, "/")}`;

//         console.log("Image URL:", imageUrl);
//         // Email Templat
//         const baseUrl = process.env.API_BASE_URL || "http://localhost:5000";
//         const frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";

//         const imagePath = (product.image && product.image.length > 0) ? product.image[0].replace(/\\/g, "/") : "placeholder.png";
//         const imageUrl = `${baseUrl}/${imagePath}`;

//         console.log(`Sending product notification for: ${product.name}`);
//         const html = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="UTF-8">
//             <title>New Product Added</title>
//         </head>
//         <body style="font-family: Arial, sans-serif;">
//             <h2>🛍️ New Product Added</h2>

//             <img 
//                 src="${imageUrl}" 
//                 alt="${product.name}" 
//                 width="250"
//                 style="border-radius:10px;"
//             />

//             <h3>${product.name}</h3>
//             <p>Category: ${product.category || "N/A"}</p>
//             <p>Price: ₹${product.price}</p>
//             <p>Discount: ${product.discount || 0}%</p>
//             <p>Rating: ${product.rating || 0}</p>
//             <p>${product.description}</p>

//             <br>

//             <a 
//                 href="http://localhost:3000"
//                 href="${frontendUrl}"
//                 style="
//                     background:#28a745;
//                     color:white;
//                     padding:10px 20px;
//                     text-decoration:none;
//                     border-radius:5px;
//                 "
//             >
//                 View Product
//             </a>
//         </body>
//         </html>
//         `;

//         await transporter.sendMail({
//             from: process.env.EMAIL,

//             // Send to all customers
//             // bcc: emails,

//             // Testing
//             to: "hippargechandu@gmail.com",
//             to: process.env.EMAIL, // Primary recipient is the store admin
//             bcc: emails,           // Customers are blind-copied for privacy
//             subject: `🛍️ New Product Added - ${product.name}`,

//             html
//         });

//         console.log("Email sent successfully");
//     }
//     catch (err) {
//         console.log("Email Error:", err.message);
//     }
// }

// module.exports = sendProductNotification;


// const nodemailer = require("nodemailer");
// const UserModel = require("../Model/userModel");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//     },
// });

// async function sendProductNotification(product) {
//     try {
//         // Get all customers
//         const customers = await UserModel.find(
//             { role: "customer" },
//             { email: 1, _id: 0 }
//         );

//         const emails = customers
//             .map((user) => user.email)
//             .filter(Boolean);

//         if (emails.length === 0) {
//             console.log("No customer emails found");
//             return;
//         }

//         // Product Image URL
//         let imageUrl = "";
//         console.log("Image URL:", imageUrl);

//         if (
//             product.image &&
//             Array.isArray(product.image) &&
//             product.image.length > 0
//         ) {
//             imageUrl = `${process.env.BASE_URL}/${product.image[0].replace(
//                 /\\/g,
//                 "/"
//             )}`;
//         }

//         console.log("Image URL:", imageUrl);

//         const html = `
//         <!DOCTYPE html>
//         <html>
//         <head>
//             <meta charset="UTF-8">
//             <title>New Product Added</title>
//         </head>
//         <body style="font-family: Arial, sans-serif; padding:20px;">

//             <h2 style="color:#28a745;">
//                 🛍️ New Product Added
//             </h2>

//             ${
//                 imageUrl
//                     ? `
//                 <img
//                     src="${imageUrl}"
//                     alt="${product.name}"
//                     width="250"
//                     style="
//                         border-radius:10px;
//                         border:1px solid #ddd;
//                         margin-bottom:15px;
//                     "
//                 />
//             `
//                     : ""
//             }

//             <h3>${product.name}</h3>

//             <p>
//                 <strong>Category:</strong>
//                 ${product.category || "N/A"}
//             </p>

//             <p>
//                 <strong>Price:</strong>
//                 ₹${product.price}
//             </p>

//             <p>
//                 <strong>Discount:</strong>
//                 ${product.discount || 0}%
//             </p>

//             <p>
//                 <strong>Rating:</strong>
//                 ${product.rating || 0}
//             </p>

//             <p>
//                 ${product.description || ""}
//             </p>

//             <br>

//             <a
//                 href="http://localhost:3000"
//                 style="
//                     background:#28a745;
//                     color:white;
//                     padding:12px 20px;
//                     text-decoration:none;
//                     border-radius:5px;
//                     display:inline-block;
//                 "
//             >
//                 View Product
//             </a>

//         </body>
//         </html>
//         `;

//         const mailOptions = {
//             from: process.env.EMAIL,

//             // Send to all customers
//             // bcc: emails,

//             // Optional receiver for testing
//             to: "hippargechandu@gmail.com",
//             //@gmail.com",

//             subject: `🛍️ New Product Added - ${product.name}`,
//             html,
//         };

//         const info = await transporter.sendMail(mailOptions);

//         console.log("Email sent successfully");
//         console.log("Message ID:", info.messageId);
//     } catch (err) {
//         console.error("Email Error:", err);
//     }
// }

// module.exports = sendProductNotification;


















const nodemailer = require("nodemailer");
const UserModel = require("../Model/userModel");
const imagePath = require("../Controllers/ProductController/Produrcts")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
});

async function sendProductNotification(product) {
    try {

        const customers = await UserModel.find(
            { role: "customer" },
            { email: 1, _id: 0 }
        );

        const emails = customers
            .map(user => user.email)
            

        let imagePath = "";

        if (product.image && product.image.length > 0) {
            imagePath = product.image[0];
        }

        // console.log("Image URL:", imageUrl);
console.log("Product Image:", product.image);
console.log("Email Image URL:", imagePath);
        const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <title>New Product Added</title>
        </head>
        <body style="font-family: Arial, sans-serif; padding:20px;">

            <h2 style="color:#28a745;">
                🛍️ New Product Added
            </h2>

            ${
                imagePath
                    ? `
                    <img
                        src="${imagePath}"
                        alt="${product.name}"
                        width="250",height:auto
                        style="
                            border-radius:10px;
                            border:1px solid #ddd;
                            margin-bottom:15px;
                        "
                    />
                `
                    : ""
            }

            <h3>${product.name}</h3>

            <p><strong>Category:</strong> ${product.category || "N/A"}</p>

            <p><strong>Price:</strong> ₹${product.price}</p>

            <p><strong>Discount:</strong> ${product.discount || 0}%</p>

            <p><strong>Rating:</strong> ${product.rating || 0}</p>

            <p>${product.description || ""}</p>

            
           
        </body>
        </html>
        `;

        const mailOptions = {
            from: process.env.EMAIL,

            // Test email
            to: "hippargechandu@gmail.com",

            // Production
            // to: process.env.EMAIL,
            // bcc: emails,

            subject: `🛍️ New Product Added - ${product.name}`,

            html: html
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent successfully");
        console.log("Message ID:", info.messageId);

    } catch (err) {
        console.error("Email Error:", err);
    }
}

module.exports = sendProductNotification;