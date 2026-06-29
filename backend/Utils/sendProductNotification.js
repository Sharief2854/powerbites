

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

//       c
//         <html>
//         <body>
//             <h2>🛍️ New Product Added</h2>

//             ${imageTag}

//             <h3>${product.name}</h3>

//             <p><strong>Price:</strong> ₹${product.price}</p>

//             <p><strong>Stock:</strong> ${product.stock}</p>

// //     <!-- Product -->
// //     <tr>
// //       <td style="background:#ffffff;padding:28px 32px;text-align:center;">
// //         <span style="display:inline-block;background:#dcfce7;color:#15803d;font-size:12px;font-weight:500;padding:4px 14px;border-radius:999px;margin-bottom:16px;">
// //           🎉 New Product Available
// //         </span>

// //         ${imageTag}

// //         <h2 style="font-size:20px;font-weight:600;color:#111827;margin:0 0 8px;">
// //           ${product.name}
// //         </h2>
// //         <p style="font-size:14px;color:#6b7280;line-height:1.6;margin:0 0 16px;">
// //           ${product.description}
// //         </p>

// //         <div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:16px;">
// //           <span style="font-size:28px;font-weight:700;color:#dc2626;">
// //             ₹${product.price}
// //           </span>
// //           <span style="background:#fef2f2;color:#b91c1c;font-size:12px;padding:3px 10px;border-radius:999px;font-weight:500;">
// //             ${product.discount || 0}% off
// //           </span>
// //         </div>

// //         <p style="font-size:13px;color:#6b7280;margin:0 0 20px;">
// //           <strong style="color:#374151;">Stock Available:</strong> ${product.stock}
// //         </p>

// //         <a href="http://localhost:5173/product/${product._id}"
// //           style="display:inline-block;background:#16a34a;color:#ffffff;font-size:14px;font-weight:600;padding:12px 32px;border-radius:8px;text-decoration:none;letter-spacing:0.3px;">
// //           Shop Now
// //         </a>
// //       </td>
// //     </tr>

// //     <!-- Divider -->
// //     <tr>
// //       <td style="height:1px;background:#f1f5f9;"></td>
// //     </tr>

// //     <!-- Contact -->
// //     <tr>
// //       <td style="background:#f8fafc;padding:20px 32px;">
// //         <h3 style="font-size:14px;font-weight:600;margin:0 0 12px;color:#374151;">
// //           Contact Us
// //         </h3>
// //         <p style="font-size:13px;color:#6b7280;margin:4px 0;">📧 ${company.email}</p>
// //         <p style="font-size:13px;color:#6b7280;margin:4px 0;">📞 ${company.phone}</p>
// //         <p style="font-size:13px;color:#6b7280;margin:4px 0;">👤 Founder: ${company.founder}</p>
// //       </td>
// //     </tr>

// //     <!-- Social -->
// //     <tr>
// //       <td style="background:#ffffff;padding:16px 32px;text-align:center;border-top:1px solid #f1f5f9;">
// //         <a href="${company.socialMedia?.facebook || '#'}"
// //           style="display:inline-block;font-size:13px;color:#6b7280;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:6px 14px;text-decoration:none;margin:4px;">
// //           Facebook
// //         </a>
// //         <a href="${company.socialMedia?.instagram || '#'}"
// //           style="display:inline-block;font-size:13px;color:#6b7280;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:6px 14px;text-decoration:none;margin:4px;">
// //           Instagram
// //         </a>
// //         <a href="${company.socialMedia?.linkedin || '#'}"
// //           style="display:inline-block;font-size:13px;color:#6b7280;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:6px 14px;text-decoration:none;margin:4px;">
// //           LinkedIn
// //         </a>
// //         <a href="${company.socialMedia?.youtube || '#'}"
// //           style="display:inline-block;font-size:13px;color:#6b7280;background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:6px 14px;text-decoration:none;margin:4px;">
// //           YouTube
// //         </a>
// //       </td>
// //     </tr>

// //     <!-- Footer -->
// //     <tr>
// //       <td style="background:#1e293b;color:#64748b;text-align:center;padding:14px 32px;font-size:12px;">
// //         © ${new Date().getFullYear()} ${company.companyName} · All rights reserved
// //       </td>
// //     </tr>

// //   </table>

// // </td>
// // </tr>
// // </table>

// // </body>
// //           </html>
// //          `;








         const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>New Product Launch</title>
</head>

<body style="margin:0;padding:0;background:#eef2f7;font-family:Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 0;">
<tr>
<td align="center">

<table width="650" cellpadding="0" cellspacing="0"
style="
background:#ffffff;
border-radius:12px;
overflow:hidden;
border:1px solid #e5e7eb;
">

<!-- Header -->
<tr>
<td align="center"
style="
background:#0f172a;
padding:35px;
">

<img
src="${company.companyImage}"
width="90"
style="border-radius:12px;"
/>

<h1 style="
color:#ffffff;
margin-top:15px;
font-size:28px;
">
${company.companyName}
</h1>

<p style="
color:#cbd5e1;
font-size:14px;
margin:0;
">
${company.companyDescription}
</p>

</td>
</tr>

<!-- Product Image -->
<tr>
<td align="center" style="padding:30px;">

<h2 style="
color:#16a34a;
margin-bottom:20px;
">
🎉 New Product Launch
</h2>

${imageTag}

<h2 style="
font-size:26px;
color:#111827;
margin-top:20px;
">
${product.name}
</h2>

<p style="
color:#6b7280;
font-size:15px;
line-height:1.8;
padding:0 30px;
">
${product.description}
</p>

</td>
</tr>

<!-- Price Box -->
<tr>
<td align="center">

<table width="85%"
style="
background:#f8fafc;
border:1px solid #e2e8f0;
border-radius:10px;
"
cellpadding="15">

<tr>

<td align="center">
<h3 style="
margin:0;
color:#dc2626;
font-size:30px;
">
₹${product.price}
</h3>

<p style="margin:8px 0;">
Discount: <b>${product.discount || 0}%</b>
</p>

<p style="margin:8px 0;">
Stock: <b>${product.stock}</b>
</p>
</td>

</tr>

</table>

</td>
</tr>

<!-- Button -->
<tr>
<td align="center" style="padding:35px;">

<a
href="https://yourdomain.com/product/${product._id}"
style="
background:#16a34a;
color:white;
padding:14px 35px;
text-decoration:none;
border-radius:8px;
font-size:16px;
font-weight:bold;
display:inline-block;
">
🛒 Shop Now
</a>

</td>
</tr>

<!-- Contact -->
<tr>
<td style="
background:#f8fafc;
padding:25px 40px;
">

<h3 style="color:#111827;">
Contact Information
</h3>

<p>📧 ${company.email}</p>
<p>📞 ${company.phone}</p>
<p>👨 Founder: ${company.founder}</p>

</td>
</tr>

<!-- Social -->
<tr>
<td align="center" style="padding:25px;">

<a href="${company.socialMedia?.facebook || '#'}">
Facebook
</a>

&nbsp;&nbsp;|&nbsp;&nbsp;

<a href="${company.socialMedia?.instagram || '#'}">
Instagram
</a>

&nbsp;&nbsp;|&nbsp;&nbsp;

<a href="${company.socialMedia?.linkedin || '#'}">
LinkedIn
</a>

&nbsp;&nbsp;|&nbsp;&nbsp;

<a href="${company.socialMedia?.youtube || '#'}">
YouTube
</a>

</td>
</tr>

<!-- Footer -->
<tr>
<td align="center"
style="
background:#0f172a;
color:#94a3b8;
padding:20px;
font-size:13px;
">

© ${new Date().getFullYear()}
${company.companyName}

</td>
</tr>

</table>

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


// const customerEmails = customers.map(user => user.email);

//         if (customerEmails.length === 0) {
//             console.log("No customers found");
//             return;
//         }

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

