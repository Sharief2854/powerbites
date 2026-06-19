// import React, { useState } from "react";
// import {
//   Box,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   Typography,
//   Paper,
//   Stepper,
//   Step,
//   StepLabel,
//   Grid,
//   Divider,
//   Chip,
//   IconButton,
//   Button,
//   Tooltip,
//   Collapse,
//   TableHead,
// } from "@mui/material";

// const ExpandMoreIcon = () => <span style={{ fontSize: "10px", marginLeft: "4px" }}>▼</span>;
// const ExpandLessIcon = () => <span style={{ fontSize: "10px", marginLeft: "4px" }}>▲</span>;

// const steps = [
//   "order placed",
//   "preparing order",
//   "Prepared",
//   "order shipped",
//   "Out for Delivery",
//   "order delivered",
// ];

// const getStatusStep = (status) => {
//   switch (status) {
//     case "order placed": return 0;
//     case "preparing order": return 1;
//     case "Order Prepared": return 2;
//     case "order shipped": return 3;
//     case "Out for Delivery": return 4;
//     case "order delivered": return 5;
//     default: return 0;
//   }
// };

// const isCancellable = (status) => {
//   return status === "Order Placed" || status === "Order Preparing";
// };



// function OrderList() {
//   const [expandedOrders, setExpandedOrders] = useState([]);

//   const toggleOrderExpand = (orderId) => {
//     setExpandedOrders((prev) =>
//       prev.includes(orderId)
//         ? prev.filter((id) => id !== orderId)
//         : [...prev, orderId]
//     );
//   };

//   const orders =[
//   {
//     "_id": "6852e5f8g3h5i67j8k9l0123",
//     "customer": "6852a1b4c9f1a23d4e5f6789",
//     "products": [
//       {
//         "product": {
//           "_id": "6852b2c5d0e2b34e5f6a7890",
//           "name": "Wireless Headphones"
//         },
//         "price": 1200,
//         "discount": 20,
//         "discounted_price": 960,
//         "coupon": { "title": "HEADPHONE20" },
//         "offer": "Buy 2 Get 1 Free",
//         "image": "https://example.com/images/headphone.jpg",
//         "quantity": 3
//       }
//     ],
//     "total": 3600,
//     "paymentID": "PAY_123456789",
//     "final_price": 2880,
//     "orderStatus": "order placed",
//     "address": {
//       "_id": "6852d4e7f2a4d56f7b8c9012",
//       "fullName": "Rahul Sharma",
//       "mobile": "9876543210",
//       "house": "Flat 302, Sai Residency",
//       "street": "MG Road",
//       "city": "Mumbai",
//       "state": "Maharashtra",
//       "pincode": "400001",
//       "country": "India"
//     }
//   },
//   {
//     "_id": "6852e5f8g3h5i67j8k9l0124",
//     "customer": "6852a1b4c9f1a23d4e5f6790",
//     "products": [
//       {
//         "product": {
//           "_id": "6852b2c5d0e2b34e5f6a7891",
//           "name": "Gaming Mouse"
//         },
//         "price": 800,
//         "discount": 10,
//         "discounted_price": 720,
//         "coupon": { "title": "MOUSE10" },
//         "offer": "Buy 1 Get 1 Free",
//         "image": "https://example.com/images/mouse.jpg",
//         "quantity": 2
//       }
//     ],
//     "total": 1600,
//     "paymentID": "PAY_123456790",
//     "final_price": 1440,
//     "orderStatus": "preparing order",
//     "address": {
//       "_id": "6852d4e7f2a4d56f7b8c9013",
//       "fullName": "Priya Patel",
//       "mobile": "9876543211",
//       "house": "A-12 Green Park",
//       "street": "Link Road",
//       "city": "Pune",
//       "state": "Maharashtra",
//       "pincode": "411001",
//       "country": "India"
//     }
//   },
//   {
//     "_id": "6852e5f8g3h5i67j8k9l0125",
//     "customer": "6852a1b4c9f1a23d4e5f6791",
//     "products": [
//       {
//         "product": {
//           "_id": "6852b2c5d0e2b34e5f6a7892",
//           "name": "Mechanical Keyboard"
//         },
//         "price": 2500,
//         "discount": 15,
//         "discounted_price": 2125,
//         "coupon": { "title": "KEYBOARD15" },
//         "offer": "Flat 15% Off",
//         "image": "https://example.com/images/keyboard.jpg",
//         "quantity": 1
//       }
//     ],
//     "total": 2500,
//     "paymentID": "PAY_123456791",
//     "final_price": 2125,
//     "orderStatus": "order shipped",
//     "address": {
//       "_id": "6852d4e7f2a4d56f7b8c9014",
//       "fullName": "Amit Verma",
//       "mobile": "9876543212",
//       "house": "22 Lotus Heights",
//       "street": "Ring Road",
//       "city": "Delhi",
//       "state": "Delhi",
//       "pincode": "110001",
//       "country": "India"
//     }
//   },
//   {
//     "_id": "6852e5f8g3h5i67j8k9l0126",
//     "customer": "6852a1b4c9f1a23d4e5f6792",
//     "products": [
//       {
//         "product": {
//           "_id": "6852b2c5d0e2b34e5f6a7893",
//           "name": "Smart Watch"
//         },
//         "price": 5000,
//         "discount": 25,
//         "discounted_price": 3750,
//         "coupon": { "title": "WATCH25" },
//         "offer": "Festival Sale",
//         "image": "https://example.com/images/watch.jpg",
//         "quantity": 1
//       },
//       {
//         "product": {
//           "_id": "6852b2c5d0e2b34e5f6a7894",
//           "name": "Bluetooth Speaker"
//         },
//         "price": 2000,
//         "discount": 10,
//         "discounted_price": 1800,
//         "coupon": { "title": "SPEAKER10" },
//         "offer": "Extra 10% Off",
//         "image": "https://example.com/images/speaker.jpg",
//         "quantity": 2
//       }
//     ],
//     "total": 9000,
//     "paymentID": "PAY_123456792",
//     "final_price": 7350,
//     "orderStatus": "order delivered",
//     "address": {
//       "_id": "6852d4e7f2a4d56f7b8c9015",
//       "fullName": "Neha Gupta",
//       "mobile": "9876543213",
//       "house": "18 Sunrise Apartment",
//       "street": "Civil Lines",
//       "city": "Jaipur",
//       "state": "Rajasthan",
//       "pincode": "302001",
//       "country": "India"
//     }
//   },
//   {
//     "_id": "6852e5f8g3h5i67j8k9l0127",
//     "customer": "6852a1b4c9f1a23d4e5f6793",
//     "products": [
//       {
//         "product": {
//           "_id": "6852b2c5d0e2b34e5f6a7895",
//           "name": "USB-C Charger"
//         },
//         "price": 1000,
//         "discount": 5,
//         "discounted_price": 950,
//         "coupon": { "title": "CHARGER5" },
//         "offer": "Flat ₹50 Off",
//         "image": "https://example.com/images/charger.jpg",
//         "quantity": 2
//       }
//     ],
//     "total": 2000,
//     "paymentID": "PAY_123456793",
//     "final_price": 1900,
//     "orderStatus": "order cancelled",
//     "address": {
//       "_id": "6852d4e7f2a4d56f7b8c9016",
//       "fullName": "Suresh Kumar",
//       "mobile": "9876543214",
//       "house": "45 Royal Residency",
//       "street": "Station Road",
//       "city": "Ahmedabad",
//       "state": "Gujarat",
//       "pincode": "380001",
//       "country": "India"
//     }
//   }
// ]

//   return (
//     <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 }, maxWidth: 1000, margin: "0 auto", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
//       <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "#111827", px: { xs: 1, sm: 0 } }}>
//         Order History
//       </Typography>

//       {orders.map((order) => {
//         const isExpanded = expandedOrders.includes(order._id);
//         const hasMultipleProducts = order.products.length > 1;
//         const firstProduct = order.products[0];
//         const remainingProducts = order.products.slice(1);

//         // Calculate pricing variables for the first product row
//         const firstProductPrice = (firstProduct.price, firstProduct.discount, firstProduct.quantity,firstProduct.discounted_price,firstProduct.coupon.title,firstProduct.offer);

//         return (
//           <Paper
//             key={order._id}
//             elevation={0}
//             sx={{
//               mb: 3,
//               borderRadius: { xs: 3, sm: 4 },
//               border: "1px solid #646567",
//               boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.01)",
//               overflow: "hidden",
//               bgcolor: "#fff"
//             }}
//           >
//             {/* META HEADER BLOCK */}
//             <Box sx={{ p: 2.5, bgcolor: "#69b0f3", display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 2 }}>
//               <Box sx={{ display: "flex", gap: { xs: 2.5, sm: 4 }, flexWrap: "wrap", width: { xs: "100%", sm: "auto" } }}>
//                 <Box sx={{ minWidth: { xs: "40%", sm: "auto" } }}>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                     Order ID
//                   </Typography>
//                   <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>{order._id}</Typography>
//                 </Box>
//                 <Box sx={{ minWidth: { xs: "40%", sm: "auto" } }}>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                     Date Placed
//                   </Typography>
//                   <Typography variant="body2" sx={{ fontWeight: 500, color: "#374151" }}>{order.orderDate}</Typography>
//                 </Box>
//                 <Box>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>
//                     Final Price
//                   </Typography>
//                   <Typography variant="body2" sx={{ fontWeight: 700, color: "#2563eb" }}>₹{order.final_price.toLocaleString()}</Typography>
//                 </Box>
//               </Box>

//               <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "space-between", sm: "flex-end" }, pt: { xs: 1, sm: 0 }, borderTop: { xs: "1px solid #f1f5f9", sm: "none" } }}>
//                 <Chip
//                   label={order.orderStatus}
//                   size="small"
//                   color={order.orderStatus === "order delivered" ? "success" : order.status === "Order Placed" ? "default" : "primary"}
//                   sx={{ fontWeight: 600, borderRadius: 1.5, px: 0.5 }}
//                 />
//                 <Box sx={{ display: "flex", gap: 1.5 }}>
//                   <Tooltip title="Chat with support">
//                     <IconButton size="small" color="primary" onClick={() => alert(`Support: ${order._id}`)} sx={{ border: "1px solid #e5e7eb", bgcolor: "#fff", "&:hover": { bgcolor: "#f3f4f6" } }}>
//                       💬
//                     </IconButton>
//                   </Tooltip>
//                   {isCancellable(order.status) && (
//                     <Button size="small" variant="outlined" color="error" onClick={() => alert(`Cancel: ${order._id}`)} sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2, height: 32 }}>
//                       Cancel
//                     </Button>
//                   )}
//                 </Box>
//               </Box>
//             </Box>

//             <Divider />

//             {/* TRACKING STEPPER */}
//             <Box sx={{ p: 3, width: "100%", overflowX: "auto" }}>
//               <Box sx={{ minWidth: 680 }}>
//                 <Stepper activeStep={getStatusStep(order.status)} alternativeLabel>
//                   {steps.map((label) => (
//                     <Step key={label}>
//                       <StepLabel sx={{ "& .MuiStepLabel-label": { fontSize: "0.72rem", mt: 0.5, fontWeight: 500 } }}>
//                         {label}
//                       </StepLabel>
//                     </Step>
//                   ))}
//                 </Stepper>
//               </Box>
//             </Box>

//             <Divider />

//             {/* RESPONSIVE FLUID PRODUCT SECTION */}
//             <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
//               <TableContainer component={Paper} variant="outlined" sx={{ border: "1px solid #e5e7eb", overflow: "hidden" }}>
                
//                 {/* Desktop View Headings */}
//                 <Box sx={{ display: { xs: "none", md: "block" } }}>
//                   <Table sx={{ tableLayout: "fixed" }} size="small">
//                     <TableHead sx={{ bgcolor: "#f8fafc" }}>
//                       <TableRow>
//                         <TableCell sx={{ fontWeight: 700, color: "#475569", width: "12%" }}>Item</TableCell>
//                         <TableCell sx={{ fontWeight: 700, color: "#475569", width: "48%" }}>Product Details</TableCell>
//                         <TableCell align="right" sx={{ fontWeight: 700, color: "#475569", width: "18%" }}>Price Summary</TableCell>
//                         <TableCell align="right" sx={{ fontWeight: 700, color: "#475569", width: "22%" }}>Action</TableCell>
//                       </TableRow>
//                     </TableHead>
//                   </Table>
//                 </Box>

//                 <Box>
//                   {/* Primary Product Layout Block */}
//                   <Box 
//                     sx={{ 
//                       display: "flex", 
//                       flexDirection: { xs: "column", md: "row" },
//                       alignItems: { xs: "flex-start", md: "center" },
//                       p: 2, 
//                       gap: { xs: 1.5, md: 0 },
//                       transition: "background-color 0.2s ease",
//                       "&:hover": { bgcolor: "#f8fafc" }
//                     }}
//                   >
//                     <Box sx={{ width: { xs: "100%", md: "12%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                       <Box component="img" src={firstProduct.image} alt={firstProduct.product.name} sx={{ width: 48, height: 48, borderRadius: 2, border: "1px solid #e2e8f0", objectFit: "cover" }} />
                      
//                       {/* Mobile Pricing Flag */}
//                       <Box sx={{ display: { xs: "block", md: "none" }, textAlign: "right" }}>
//                         <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#10b981" }}>
//                           ₹{firstProductPrice.discounnted_price}
//                         </Typography>
//                         {firstProductPrice.discount && (
//                           <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
//                             ₹{firstProductPrice.price.toLocaleString()}
//                           </Typography>
//                         )}
//                       </Box>
//                     </Box>

//                     <Box sx={{ width: { xs: "100%", md: "48%" }, pr: { md: 2 } }}>
//                       <Typography variant="body2" sx={{ fontWeight: 600, color: "#0f172a", wordBreak: "break-word" }}>
//                         {firstProduct.product.name}
//                       </Typography>
//                       <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
//                         <Typography variant="caption" color="text.secondary">
//                           Qty: {firstProduct.quantity}  • Rate: ₹{firstProduct.price.toLocaleString()}
//                         </Typography>
//                         {firstProduct.discount > 0 && (
//                           <Chip label={`${firstProduct.discount}% OFF`} size="small" variant="outlined" color="success" sx={{ height: 16, fontSize: "0.65rem", fontWeight: 700, borderRadius: 1 }} />
//                         )}
//                       </Box>
//                     </Box>

//                     {/* Desktop Price Display Panel */}
//                     <Box sx={{ width: { xs: "100%", md: "18%" }, display: { xs: "none", md: "block" }, textAlign: "right", pr: 2 }}>
//                       <Typography variant="body2" sx={{ fontWeight: 700, color: firstProductPrice.discount ? "#10b981" : "#0f172a" }}>
//                         ₹{firstProductPrice.discounnted_price}
//                       </Typography>
//                       {firstProductPrice.discount && (
//                         <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}>
//                           ₹{firstProductPrice.price.toLocaleString()}
//                         </Typography>
//                       )}
//                     </Box>

//                     {/* Action Button Trigger */}
//                     <Box sx={{ width: { xs: "100%", md: "22%" }, display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, pt: { xs: 0.5, md: 0 } }}>
//                       {hasMultipleProducts && (
//                         <Button
//                           size="small"
//                           variant="contained"
//                           disableElevation
//                           fullWidth={{ xs: true, md: false }}
//                           endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                           onClick={() => toggleOrderExpand(order._id)}
//                           sx={{ 
//                             textTransform: "none", fontWeight: 600, fontSize: "0.75rem", borderRadius: "6px",
//                             bgcolor: isExpanded ? "#64748b" : "#e0e7ff", color: isExpanded ? "#fff" : "#4338ca",
//                             "&:hover": { bgcolor: isExpanded ? "#475569" : "#c7d2fe" }, py: { xs: 0.8, md: 0.5 }
//                           }}
//                         >
//                           {isExpanded ? "Hide Items" : `+${remainingProducts.length} More Items`}
//                         </Button>
//                       )}
//                     </Box>
//                   </Box>

//                   {/* Collapsible Dropdown Block */}
//                   {hasMultipleProducts && (
//                     <Collapse in={isExpanded} timeout="auto" unmountOnExit>
//                       <Box sx={{ bgcolor: "#fafafa", borderTop: "1px dashed #e2e8f0" }}>
//                         {remainingProducts.map((product) => {
//                           const productPriceMetrics = (product.price, product.discount, product.quantity,product.discounted_price,product.coupon.title,product.offer);

//                           return (
//                             <Box 
//                               key={product._id}
//                               sx={{ 
//                                 display: "flex", 
//                                 flexDirection: { xs: "column", md: "row" },
//                                 alignItems: { xs: "flex-start", md: "center" },
//                                 p: 2, 
//                                 gap: { xs: 1, md: 0 },
//                                 borderBottom: "1px solid #f1f5f9",
//                                 "&:last-child": { borderBottom: "none" },
//                                 "&:hover": { bgcolor: "#f1f5f9" }
//                               }}
//                             >
//                               <Box sx={{ width: { xs: "100%", md: "12%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                                 <Box component="img" src={product.image} alt={product.product.name} sx={{ width: 44, height: 44, borderRadius: 2, border: "1px solid #e2e8f0", objectFit: "cover" }} />
                                
//                                 {/* Mobile Dynamic Sub-Price Display */}
//                                 <Box sx={{ display: { xs: "block", md: "none" }, textAlign: "right" }}>
//                                   <Typography variant="subtitle2" sx={{ fontWeight: 600, color: "#10b981" }}>
//                                     ₹{productPriceMetrics.discounnted_price}
//                                   </Typography>
//                                   {productPriceMetrics.discount && (
//                                     <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
//                                       ₹{productPriceMetrics.price.toLocaleString()}
//                                     </Typography>
//                                   )}
//                                 </Box>
//                               </Box>

//                               <Box sx={{ width: { xs: "100%", md: "48%" }, pr: { md: 2 } }}>
//                                 <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155", wordBreak: "break-word" }}>{product.name}</Typography>
//                                 <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.2 }}>
//                                   <Typography variant="caption" color="text.secondary">
//                                     Qty: {product.quantity} • Rate: ₹{product.price.toLocaleString()}
//                                   </Typography>
//                                   {product.discount > 0 && (
//                                     <Chip label={`${product.discount}% OFF`} size="small" variant="outlined" color="success" sx={{ height: 14, fontSize: "0.6rem", fontWeight: 700, borderRadius: 0.5 }} />
//                                   )}
//                                 </Box>
//                               </Box>

//                               {/* Desktop Price Details display section */}
//                               <Box sx={{ width: { xs: "100%", md: "18%" }, display: { xs: "none", md: "block" }, textAlign: "right", pr: 2 }}>
//                                 <Typography variant="body2" sx={{ fontWeight: 600, color: productPriceMetrics.hasDiscount ? "#10b981" : "#334155" }}>
//                                   ₹{productPriceMetrics.discounnted_price}
//                                 </Typography>
//                                 {productPriceMetrics.discount && (
//                                   <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}>
//                                     ₹{productPriceMetrics.discounnted_price.toLocaleString()}
//                                   </Typography>
//                                 )}
//                               </Box>

//                               <Box sx={{ width: { xs: "0%", md: "22%" } }} />
//                             </Box>
//                           );
//                         })}
//                       </Box>
//                     </Collapse>
//                   )}
//                 </Box>
//               </TableContainer>

//               {/* FOOTER METRICS PANELS */}
//               <Box sx={{ mt: 2, bgcolor: "#f8fafc", borderRadius: 3, border: "1px solid #f1f5f9", p: 2 }}>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={7}>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: "block", mb: 0.5, letterSpacing: "0.5px" }}>
//                       DELIVERY DESTINATION
//                     </Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 500, lineHeight: 1.5, color: "#334155" }}>
//                       {order.address.fullName}, {order.address.house}, {order.address.street}, {order.address.city}, {order.address.state}, {order.address.pincode} ,{order.address.country}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={5}>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: "block", mb: 0.5, letterSpacing: "0.5px" }}>
//                       TRANSACTION METHOD
//                     </Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 600, color: "#0f172a" }}>
//                       {order.paymentID}
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Box>
//           </Paper>
//         );
//       })}
//     </Box>
//   );
// }

// export default OrderList;

import React, { useState } from "react";
import {
  Box,
  Table,
  TableCell,
  TableContainer,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
  Chip,
  IconButton,
  Button,
  Tooltip,
  TableHead,
  TableRow,
  Collapse,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import api from "../../../api/axiosConfig";

const ExpandMoreIcon = () => <span style={{ fontSize: "10px", marginLeft: "4px" }}>▼</span>;
const ExpandLessIcon = () => <span style={{ fontSize: "10px", marginLeft: "4px" }}>▲</span>;

const STEPS = [
  "order placed",
  "preparing order",
  "Prepared",
  "order shipped",
  "Out for Delivery",
  "order delivered",
];

const getStatusStep = (status) => {
  switch (status?.toLowerCase()) {
    case "order placed": return 0;
    case "preparing order": return 1;
    case "order prepared": return 2;
    case "order shipped": return 3;
    case "out for delivery": return 4;
    case "order delivered": return 5;
    default: return 0;
  }
};

const isCancellable = (status) => {
  const lowerStatus = status?.toLowerCase();
  return lowerStatus === "order placed" || lowerStatus === "preparing order";
};

function OrderList() {
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  const handleOpenRating = (product) => {
    setSelectedProduct(product);
    setRatingDialogOpen(true);
  };

  const handleCloseRating = () => {
    setRatingDialogOpen(false);
    setSelectedProduct(null);
  };
async function getData() {
  try {
    let response = await api.get("/orders/getOrders")

    console.log("response order done :",response.data);

  } catch (err) {
    console.log("error",err);
  }
}
  getData();

  // Sample Orders Data with full price, offers, coupons, and discount keys included
  const orders = [
    {
      _id: "6852e5f8g3h5i67j8k9l0123",
      customer: "6852a1b4c9f1a23d4e5f6789",
      orderDate: "June 15, 2026",
      products: [
        {
          product: { _id: "6852b2c5d0e2b34e5f6a7890", name: "Wireless Headphones" },
          price: 1200,
          discount: 20,
          discounted_price: 960,
          coupon: { title: "HEADPHONE20" },
          offer: "Buy 2 Get 1 Free",
          image: "https://placehold.co/48x48.png",
          quantity: 3,
        }
      ],
      total: 3600,
      paymentID: "PAY_123456789",
      final_price: 2880,
      orderStatus: "order placed",
      address: {
        fullName: "Rahul Sharma",
        house: "Flat 302, Sai Residency",
        street: "MG Road",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        country: "India",
      },
    },
    {
      _id: "6852e5f8g3h5i67j8k9l0126",
      customer: "6852a1b4c9f1a23d4e5f6792",
      orderDate: "June 12, 2026",
      products: [
        {
          product: { _id: "6852b2c5d0e2b34e5f6a7893", name: "Smart Watch" },
          price: 5000,
          discount: 25,
          discounted_price: 3750,
          coupon: { title: "WATCH25" },
          offer: "Festival Sale",
          image: "https://placehold.co/48x48.png",
          quantity: 1,
        },
        {
          product: { _id: "6852b2c5d0e2b34e5f6a7894", name: "Bluetooth Speaker" },
          price: 2000,
          discount: 10,
          discounted_price: 1800,
          coupon: { title: "SPEAKER10" },
          offer: "Extra 10% Off",
          image: "https://placehold.co/48x48.png",
          quantity: 2,
        },
      ],
      total: 9000,
      paymentID: "PAY_123456792",
      final_price: 7350,
      orderStatus: "order delivered",
      address: {
        fullName: "Neha Gupta",
        house: "18 Sunrise Apartment",
        street: "Civil Lines",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302001",
        country: "India",
      },
    }
  ];

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 }, maxWidth: '100%', margin: "0 auto", minHeight: "100vh", bgcolor: "#f8f9fa" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: "#111827" }}>
        Order History
      </Typography>

      {orders.map((order) => {
        const isExpanded = expandedOrders.includes(order._id);
        const hasMultipleProducts = order.products.length > 1;
        const firstProduct = order.products[0];
        const remainingProducts = order.products.slice(1);

        return (
          <Paper
            key={order._id}
            elevation={0}
            sx={{
              mb: 3,
              borderRadius: { xs: 3, sm: 4 },
              border: "1px solid #4e5667",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.02)",
              overflow: "hidden",
              bgcolor: "#fff",
            }}
          >
            {/* META HEADER BLOCK */}
            <Box sx={{ p: 2.5, bgcolor: "#7cafe2", display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 2 }}>
              <Box sx={{ display: "flex", gap: { xs: 2.5, sm: 4 }, flexWrap: "wrap", width: { xs: "100%", sm: "auto" } }}>
                <Box sx={{ minWidth: { xs: "40%", sm: "auto" } }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase" }}>Order ID</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>{order._id}</Typography>
                </Box>
                <Box sx={{ minWidth: { xs: "40%", sm: "auto" } }}>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase" }}>Date Placed</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: "#374151" }}>{order.orderDate || "N/A"}</Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase" }}>Final Price</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: "#2563eb" }}>₹{order.final_price.toLocaleString()}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "space-between", sm: "flex-end" } }}>
                <Chip
                  label={order.orderStatus}
                  size="small"
                  color={order.orderStatus === "order delivered" ? "success" : order.orderStatus === "order cancelled" ? "error" : "primary"}
                  sx={{ fontWeight: 600, borderRadius: 1.5, textTransform: "capitalize" }}
                />
                <Box sx={{ display: "flex", gap: 1.5 }}>
                  <Tooltip title="Chat with support">
                    <IconButton size="small" onClick={() => alert(`Support: ${order._id}`)} sx={{ border: "1px solid #e5e7eb", bgcolor: "#fff" }}>💬</IconButton>
                  </Tooltip>
                  {isCancellable(order.orderStatus) && (
                    <Button size="small" variant="outlined" color="error" onClick={() => alert(`Cancel: ${order._id}`)} sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}>
                      Cancel
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>

            <Divider />

            {/* TRACKING STEPPER */}
            {order.orderStatus !== "order cancelled" && (
              <>
                <Box sx={{ p: 3, width: "100%", overflowX: "auto" }}>
                  <Box sx={{ minWidth: 680 }}>
                    <Stepper activeStep={getStatusStep(order.orderStatus)} alternativeLabel>
                      {STEPS.map((label) => (
                        <Step key={label}>
                          <StepLabel sx={{ "& .MuiStepLabel-label": { fontSize: "0.72rem", textTransform: "capitalize" } }}>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                </Box>
                <Divider />
              </>
            )}

            {/* PRODUCT SECTION */}
            <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
              <TableContainer component={Paper} variant="outlined" sx={{ border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "none" }}>
                
                {/* Desktop Table Header containing Toggle Logic */}
                <Box sx={{ display: { xs: "none", md: "block" } }}>
                  <Table sx={{ tableLayout: "fixed" }} size="small">
                    <TableHead sx={{ bgcolor: "#f8fafc" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 700, color: "#475569", width: "12%" }}>Item</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: "#475569", width: "48%" }}>Product Details</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, color: "#475569", width: "18%" }}>Price Summary</TableCell>
                        
                        <TableCell align="right" sx={{ fontWeight: 700, color: "#475569", width: "22%" }}>
                          {hasMultipleProducts ? (
                            <Button
                              size="small"
                              variant="text"
                              endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                              onClick={() => toggleOrderExpand(order._id)}
                              sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.8rem", color: "#4338ca", p: 0, "&:hover": { bgcolor: "transparent", textDecoration: "underline" } }}
                            >
                              {isExpanded ? "Hide Items" : `+${remainingProducts.length} More Items`}
                            </Button>
                          ) : (
                            "Action"
                          )}
                        </TableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </Box>

                {/* Mobile View Toggle Button Header */}
                {hasMultipleProducts && (
                  <Box sx={{ display: { xs: "block", md: "none" }, p: 1, bgcolor: "#f8fafc", borderBottom: "1px solid #e5e7eb", textAlign: "right" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      onClick={() => toggleOrderExpand(order._id)}
                      sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem", borderRadius: "6px" }}
                    >
                      {isExpanded ? "Hide Items" : `+${remainingProducts.length} More Items`}
                    </Button>
                  </Box>
                )}

                <Box>
                  {/* First Product Layout Row */}
                  <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, p: 2, transition: "background-color 0.2s ease", "&:hover": { bgcolor: "#f8fafc" } }}>
                    <Box sx={{ width: { xs: "100%", md: "12%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box component="img" src={firstProduct.image} alt={firstProduct.product.name} sx={{ width: 48, height: 48, borderRadius: 2, border: "1px solid #e2e8f0", objectFit: "cover" }} />
                      <Box sx={{ display: { xs: "block", md: "none" }, textAlign: "right" }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: firstProduct.discount > 0 ? "#10b981" : "#0f172a" }}>
                          ₹{(firstProduct.discounted_price * firstProduct.quantity).toLocaleString()}
                        </Typography>
                        {firstProduct.discount > 0 && (
                          <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}>
                            ₹{(firstProduct.price * firstProduct.quantity).toLocaleString()}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    <Box sx={{ width: { xs: "100%", md: "48%" }, pr: { md: 2 }, mt: { xs: 1, md: 0 } }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#0f172a" }}>{firstProduct.product.name}</Typography>
                      
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.2 }}>
                        Qty: {firstProduct.quantity} • Rate: ₹{firstProduct.price.toLocaleString()}
                      </Typography>

                      {/* Display Offers & Coupons dynamically underneath info */}
                      <Box sx={{ display: "flex", gap: 0.5, mt: 0.5, flexWrap: "wrap", alignItems: "center" }}>
                        {firstProduct.discount > 0 && (
                          <Chip label={`${firstProduct.discount}% OFF`} size="small" variant="outlined" color="success" sx={{ height: 16, fontSize: "0.65rem", fontWeight: 700 }} />
                        )}
                        {firstProduct.coupon?.title && (
                          <Chip label={`Coupon: ${firstProduct.coupon.title}`} size="small" variant="outlined" sx={{ height: 16, fontSize: "0.65rem", borderStyle: "dashed", borderColor: "#6366f1", color: "#4f46e5" }} />
                        )}
                        {firstProduct.offer && (
                          <Typography variant="caption" sx={{ fontSize: "0.65rem", color: "#d97706", fontWeight: 600, ml: 0.5 }}>
                            🔥 {firstProduct.offer}
                          </Typography>
                        )}
                      </Box>
                    </Box>

                    {/* Desktop View Original & Discounted Totals */}
                    <Box sx={{ width: { xs: "100%", md: "18%" }, display: { xs: "none", md: "block" }, textAlign: "right", pr: 2 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: firstProduct.discount > 0 ? "#10b981" : "#0f172a" }}>
                        ₹{(firstProduct.discounted_price * firstProduct.quantity).toLocaleString()}
                      </Typography>
                      {firstProduct.discount > 0 && (
                        <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}>
                          ₹{(firstProduct.price * firstProduct.quantity).toLocaleString()}
                        </Typography>
                      )}
                    </Box>

                    {/* Give Rating Action Button */}
                    <Box sx={{ width: { xs: "100%", md: "22%" }, display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, pt: { xs: 1.5, md: 0 } }}>
                      <Button
                        size="small"
                        variant="contained"
                        disableElevation
                        fullWidth={{ xs: true, md: false }}
                        onClick={() => handleOpenRating(firstProduct.product)}
                        sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem", borderRadius: "6px", bgcolor: "#e0e7ff", color: "#4338ca", "&:hover": { bgcolor: "#c7d2fe" } }}
                      >
                        Give Rating
                      </Button>
                    </Box>
                  </Box>

                  {/* Dropdown Items Section */}
                  {hasMultipleProducts && (
                    <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                      <Box sx={{ bgcolor: "#fafafa", borderTop: "1px dashed #e2e8f0" }}>
                        {remainingProducts.map((item) => (
                          <Box key={item.product._id} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, p: 2, borderBottom: "1px solid #f1f5f9", "&:last-child": { borderBottom: "none" } }}>
                            <Box sx={{ width: { xs: "100%", md: "12%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <Box component="img" src={item.image} alt={item.product.name} sx={{ width: 44, height: 44, borderRadius: 2, border: "1px solid #e2e8f0", objectFit: "cover" }} />
                              <Box sx={{ display: { xs: "block", md: "none" }, textAlign: "right" }}>
                                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: item.discount > 0 ? "#10b981" : "#334155" }}>
                                  ₹{(item.discounted_price * item.quantity).toLocaleString()}
                                </Typography>
                                {item.discount > 0 && (
                                  <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}>
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                  </Typography>
                                )}
                              </Box>
                            </Box>

                            <Box sx={{ width: { xs: "100%", md: "48%" }, pr: { md: 2 }, mt: { xs: 1, md: 0 } }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>{item.product.name}</Typography>
                              
                              <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.2 }}>
                                Qty: {item.quantity} • Rate: ₹{item.price.toLocaleString()}
                              </Typography>

                              {/* Dropdown nested pricing targets (Offers/Coupons) */}
                              <Box sx={{ display: "flex", gap: 0.5, mt: 0.5, flexWrap: "wrap", alignItems: "center" }}>
                                {item.discount > 0 && (
                                  <Chip label={`${item.discount}% OFF`} size="small" variant="outlined" color="success" sx={{ height: 14, fontSize: "0.6rem" }} />
                                )}
                                {item.coupon?.title && (
                                  <Chip label={`Coupon: ${item.coupon.title}`} size="small" variant="outlined" sx={{ height: 14, fontSize: "0.6rem", borderStyle: "dashed", borderColor: "#6366f1", color: "#4f46e5" }} />
                                )}
                                {item.offer && (
                                  <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "#d97706", fontWeight: 600, ml: 0.5 }}>
                                    🔥 {item.offer}
                                  </Typography>
                                )}
                              </Box>
                            </Box>

                            <Box sx={{ width: { xs: "100%", md: "18%" }, display: { xs: "none", md: "block" }, textAlign: "right", pr: 2 }}>
                              <Typography variant="body2" sx={{ fontWeight: 600, color: item.discount > 0 ? "#10b981" : "#334155" }}>
                                ₹{(item.discounted_price * item.quantity).toLocaleString()}
                              </Typography>
                              {item.discount > 0 && (
                                <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}>
                                  ₹{(item.price * item.quantity).toLocaleString()}
                                </Typography>
                              )}
                            </Box>

                            {/* Give Rating Action Button inside Dropdown Rows */}
                            <Box sx={{ width: { xs: "100%", md: "22%" }, display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, pt: { xs: 1.5, md: 0 } }}>
                              <Button
                                size="small"
                                variant="contained"
                                disableElevation
                                fullWidth={{ xs: true, md: false }}
                                onClick={() => handleOpenRating(item.product)}
                                sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem", borderRadius: "6px", bgcolor: "#e0e7ff", color: "#4338ca", "&:hover": { bgcolor: "#c7d2fe" } }}
                              >
                                Give Rating
                              </Button>
                            </Box>
                          </Box>
                        ))}
                      </Box>
                    </Collapse>
                  )}
                </Box>
              </TableContainer>

              {/* FOOTER PANELS */}
              <Box sx={{ mt: 2, bgcolor: "#f8fafc", borderRadius: 3, p: 2, border: "1px solid #f1f5f9" }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 7 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: "block", mb: 0.5 }}>DELIVERY DESTINATION</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: "#334155" }}>
                      {`${order.address.fullName}, ${order.address.house}, ${order.address.street}, ${order.address.city}, ${order.address.state} - ${order.address.pincode}, ${order.address.country}`}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 5 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: "block", mb: 0.5 }}>TRANSACTION METHOD</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#0f172a" }}>{order.paymentID}</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Paper>
        );
      })}

      {/* RATING DIALOG POPUP */}
      <Dialog open={ratingDialogOpen} onClose={handleCloseRating} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700, pb: 1 }}>Product Rating</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            How would you rate your experience with this item?
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#0f172a" }}>
            {selectedProduct?.name}
          </Typography>
          <Box sx={{ mt: 2, py: 2, textAlign: "center", bgcolor: "#f8fafc", borderRadius: 2 }}>
            <Typography variant="caption" color="text.secondary">[ Rating Stars Component Placeholder ]</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseRating} color="inherit" sx={{ textTransform: "none", fontWeight: 600 }}>Cancel</Button>
          <Button onClick={handleCloseRating} variant="contained" color="primary" disableElevation sx={{ textTransform: "none", fontWeight: 600 }}>Submit Rating</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default OrderList;
