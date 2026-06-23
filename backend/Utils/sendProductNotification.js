

// const nodemailer = require("nodemailer");
// const UserModel = require("../Model/userModel");
// const path = require("path");

// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//     },
// });



// async function sendProductNotification(product) {
//     try {

//         let attachments = [];
//         let imageTag = "";
//         if (product.image && product.image.length > 0) {
//             const imageName = product.image[0].split("/").pop();
//             const imagePath = path.join(
//                 process.cwd(),
//                 "upload",
//                 imageName
//             );

//             console.log("Image Path:", imagePath);
//             attachments.push({
//                 filename: imageName,
//                 path: imagePath,
//                 cid: "productImage"
//             });

//             imageTag = `
//                 <img
//                     src="cid:productImage"
//                     alt="${product.name}"
//                     width="250"
//                     style="border-radius:10px;border:1px solid #ddd;"
//                 />
//             `;
//         }

//         const html = `
//         <html>
//         <body>

//             <h2>🛍️ New Product Added</h2>

//             ${imageTag}

//             <h3>${product.name}</h3>

//             <p><strong>Price:</strong> ₹${product.price}</p>

//             <p><strong>Stock:</strong> ${product.stock}</p>

//             <p>${product.description || ""}</p>

//         </body>
//         </html>
//         `;

//         const mailOptions = {
//             from: process.env.EMAIL,
//             // to: "hippargechandu@gmail.com",
//             bcc: customerEmails,
//             subject: `🛍️ New Product Added - ${product.name}`,
//             html,
//             attachments
//         };

//         const info = await transporter.sendMail(mailOptions);

//         console.log("Email sent:", info.messageId);

//     } catch (err) {
//         console.error(err);
//     }
// }

// module.exports = sendProductNotification;





const nodemailer = require("nodemailer");
const UserModel = require("../Model/userModel");
const path = require("path");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
});

async function sendProductNotification(product) {
    try {

        // Get all customer emails
        const customers = await UserModel.find(
            { role: "customer" },
            { email: 1, _id: 0 }
        );

        const customerEmails = customers.map(user => user.email);

        let attachments = [];
        let imageTag = "";

        if (product.image && product.image.length > 0) {
            const imageName = product.image[0].split("/").pop();

            const imagePath = path.join(
                process.cwd(),
                "upload",
                imageName
            );

            attachments.push({
                filename: imageName,
                path: imagePath,
                cid: "productImage",
            });

            imageTag = `
                <img
                    src="cid:productImage"
                    alt="${product.name}"
                    width="250"
                    style="border-radius:10px;border:1px solid #ddd;"
                />
            `;
        }

        const html = `
        <html>
        <body>

            <h2>🛍️ New Product Added</h2>

            ${imageTag}

            <h3>${product.name}</h3>

            <p><strong>Price:</strong> ₹${product.price}</p>

            <p><strong>Stock:</strong> ${product.stock}</p>

            <p>${product.description || ""}</p>

        </body>
        </html>
        `;

        const mailOptions = {
            from: process.env.EMAIL,
            bcc: customerEmails,
            subject: `🛍️ New Product Added - ${product.name}`,
            html,
            attachments,
        };

        const info = await transporter.sendMail(mailOptions);

        console.log("Email sent:", info.messageId);

    } catch (err) {
        console.error("Email Error:", err);
    }
}

module.exports = sendProductNotification;