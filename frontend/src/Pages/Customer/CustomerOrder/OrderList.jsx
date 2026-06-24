
// import React, { useState, useEffect } from "react";
// import {
//   Box,
//   Table,
//   TableCell,
//   TableContainer,
//   Typography,
//   Paper,
//   Stepper,
//   Step,
//   StepLabel,
//   Divider,
//   Chip,
//   IconButton,
//   Button,
//   Tooltip,
//   TableHead,
//   TableRow,
//   Collapse,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   CircularProgress,
//   Alert,
// } from "@mui/material";
// import Grid from "@mui/material/Grid"; // Using updated MUI Grid configuration style
// import api from "../../../api/axiosConfig";
// import { useDispatch } from "react-redux";
// import { getCustomerOrder } from "../../../Redux/Slices/CustomerSlice/CustomerOrderSlice";

// const ExpandMoreIcon = () => <span style={{ fontSize: "10px", marginLeft: "4px" }}>▼</span>;
// const ExpandLessIcon = () => <span style={{ fontSize: "10px", marginLeft: "4px" }}>▲</span>;

// const STEPS = [
//   "order placed",
//   "preparing order",
//   "Prepared",
//   "order shipped",
//   "Out for Delivery",
//   "order delivered",
// ];

// const getStatusStep = (status) => {
//   switch (status?.toLowerCase()) {
//     case "order placed": return 0;
//     case "preparing order": return 1;
//     case "order prepared": return 2;
//     case "order shipped": return 3;
//     case "out for delivery": return 4;
//     case "order delivered": return 5;
//     default: return 0;
//   }
// };

// const isCancellable = (status) => {
//   const lowerStatus = status?.toLowerCase();
//   return lowerStatus === "order placed" || lowerStatus === "preparing order";
// };

// function OrderList() {
//   //const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [expandedOrders, setExpandedOrders] = useState([]);
//   const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const orders = useSelector((state) => state.customerOrder.orderlist);
//   const dispatch = useDispatch();


//   // Fetch orders securely on component mount
//   useEffect(() => {
//     async function fetchOrders() {
//       try {
//         setLoading(true);
//         const response = await api.get("/orders/getOrders");
//         // Ensure we fall back safely if data is structure atypical
//         console.log("Customer Order List",response.data);
//         dispatch(getCustomerOrder(response.data.orders))
//         setOrders(Array.isArray(response.data) ? response.data : response.data.orders || []);
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching order history:", err);
//         setError("Failed to retrieve order history. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchOrders();
//   }, []);

//   const toggleOrderExpand = (orderId) => {
//     setExpandedOrders((prev) =>
//       prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
//     );
//   };

//   const handleOpenRating = (product) => {
//     setSelectedProduct(product);
//     setRatingDialogOpen(true);
//   };

//   const handleCloseRating = () => {
//     setRatingDialogOpen(false);
//     setSelectedProduct(null);
//   };

//   // Loading Screen Layout
//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "80vh", gap: 2 }}>
//         <CircularProgress size={40} thickness={4} sx={{ color: "#4f46e5" }} />
//         <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Loading your orders...</Typography>
//       </Box>
//     );
//   }

//   // Error Screen Layout
//   if (error) {
//     return (
//       <Box sx={{ p: 4, maxWidth: 600, margin: "0 auto" }}>
//         <Alert severity="error" variant="standard" sx={{ borderRadius: 3, fontWeight: 500 }}>
//           {error}
//         </Alert>
//       </Box>
//     );
//   }

//   // Empty State Layout
//   if (orders.length === 0) {
//     return (
//       <Box sx={{ p: 8, textAlign: "center", maxWidth: 400, margin: "0 auto" }}>
//         <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1f2937" }}>No Orders Yet</Typography>
//         <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Looks like you haven't placed any orders yet.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 }, maxWidth: "1100px", margin: "0 auto", minHeight: "100vh" }}>
//       <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>
//         Order History
//       </Typography>

//       {orders.map((order) => {
//         const isExpanded = expandedOrders.includes(order._id);
//         const hasMultipleProducts = order.products?.length > 1;
//         const firstProduct = order.products?.[0];
//         const remainingProducts = order.products?.slice(1) || [];

//         if (!firstProduct) return null; // Safe guard against empty items edge-case

//         return (
//           <Paper
//             key={order._id}
//             elevation={0}
//             sx={{
//               mb: 4,
//               borderRadius: 4,
//               border: "1px solid #e5e7eb",
//               boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.05), 0px 20px 25px -5px rgba(0, 0, 0, 0.02)",
//               overflow: "hidden",
//               bgcolor: "#fff",
//             }}
//           >
//             {/* META HEADER BLOCK */}
//             <Box sx={{ p: 2.5, bgcolor: "#f8fafc", display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 2, borderBottom: "1px solid #e5e7eb" }}>
//               <Box sx={{ display: "flex", gap: { xs: 2.5, sm: 4 }, flexWrap: "wrap", width: { xs: "100%", sm: "auto" } }}>
//                 <Box>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Order ID</Typography>
//                   <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontFamily: "monospace" }}>{order._id}</Typography>
//                 </Box>
//                 <Box>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Date Placed</Typography>
//                   <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>{order.createdAt.split("T")[0] || "N/A"}</Typography>
//                 </Box>
//                 <Box>
//                   <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Total Price</Typography>
//                   <Typography variant="body2" sx={{ fontWeight: 700, color: "#4f46e5" }}>₹{order.final_price?.toLocaleString() || order.total?.toLocaleString()}</Typography>
//                 </Box>
//               </Box>

//               <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "space-between", sm: "flex-end" } }}>
//                 <Chip
//                   label={order.orderStatus}
//                   size="small"
//                   color={order.orderStatus?.toLowerCase() === "order delivered" ? "success" : order.orderStatus?.toLowerCase() === "order cancelled" ? "error" : "primary"}
//                   sx={{ fontWeight: 700, borderRadius: 2, textTransform: "capitalize", px: 1 }}
//                 />
//                 <Box sx={{ display: "flex", gap: 1 }}>
//                   <Tooltip title="Chat with support">
//                     <IconButton size="small" onClick={() => alert(`Support: ${order._id}`)} sx={{ border: "1px solid #e5e7eb", bgcolor: "#fff", "&:hover": { bgcolor: "#f1f5f9" } }}>💬</IconButton>
//                   </Tooltip>
//                   {isCancellable(order.orderStatus) && (
//                     <Button size="small" variant="outlined" color="error" onClick={() => alert(`Cancel: ${order._id}`)} sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2, px: 2 }}>
//                       Cancel Order
//                     </Button>
//                   )}
//                 </Box>
//               </Box>
//             </Box>

//             {/* TRACKING STEPPER */}
//             {order.orderStatus?.toLowerCase() !== "order cancelled" && (
//               <>
//                 <Box sx={{ p: 4, width: "100%", overflowX: "auto", bgcolor: "#fff" }}>
//                   <Box sx={{ minWidth: 720 }}>
//                     <Stepper activeStep={getStatusStep(order.orderStatus)} alternativeLabel>
//                       {STEPS.map((label) => (
//                         <Step key={label}>
//                           <StepLabel sx={{ "& .MuiStepLabel-label": { fontSize: "0.75rem", textTransform: "capitalize", fontWeight: 500, mt: 1 } }}>{label}</StepLabel>
//                         </Step>
//                       ))}
//                     </Stepper>
//                   </Box>
//                 </Box>
//                 <Divider />
//               </>
//             )}

//             {/* PRODUCT SECTION */}
//             <Box sx={{ p: { xs: 2, sm: 3 } }}>
//               <TableContainer component={Paper} variant="outlined" sx={{ border: "1px solid #e5e7eb", borderRadius: 3, overflow: "hidden", boxShadow: "none" }}>
                
//                 {/* Desktop Header */}
//                 <Box sx={{ display: { xs: "none", md: "block" } }}>
//                   <Table sx={{ tableLayout: "fixed" }} size="small">
//                     <TableHead sx={{ bgcolor: "#fafafa" }}>
//                       <TableRow>
//                         <TableCell sx={{ fontWeight: 700, color: "#475569", width: "12%", py: 1.5 }}>Item</TableCell>
//                         <TableCell sx={{ fontWeight: 700, color: "#475569", width: "48%", py: 1.5 }}>Product Details</TableCell>
//                         <TableCell align="right" sx={{ fontWeight: 700, color: "#475569", width: "18%", py: 1.5 }}>Price Summary</TableCell>
//                         <TableCell align="right" sx={{ fontWeight: 700, color: "#475569", width: "22%", py: 1.5 }}>
//                           {hasMultipleProducts ? (
//                             <Button
//                               size="small"
//                               variant="text"
//                               endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                               onClick={() => toggleOrderExpand(order._id)}
//                               sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.8rem", color: "#4f46e5", p: 0, "&:hover": { bgcolor: "transparent", textDecoration: "underline" } }}
//                             >
//                               {isExpanded ? "Hide Items" : `+${remainingProducts.length} More Items`}
//                             </Button>
//                           ) : (
//                             "Action"
//                           )}
//                         </TableCell>
//                       </TableRow>
//                     </TableHead>
//                   </Table>
//                 </Box>

//                 {/* Mobile Header Toggle */}
//                 {hasMultipleProducts && (
//                   <Box sx={{ display: { xs: "block", md: "none" }, p: 1.5, bgcolor: "#fafafa", borderBottom: "1px solid #e5e7eb", textAlign: "right" }}>
//                     <Button
//                       size="small"
//                       variant="outlined"
//                       endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                       onClick={() => toggleOrderExpand(order._id)}
//                       sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem", borderRadius: "8px", px: 2 }}
//                     >
//                       {isExpanded ? "Hide Items" : `+${remainingProducts.length} More Items`}
//                     </Button>
//                   </Box>
//                 )}

//                 <Box>
//                   {/* First Product Layout Row */}
//                   <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, p: 2.5, transition: "background-color 0.2s ease", "&:hover": { bgcolor: "#fdfdfd" } }}>
//                     <Box sx={{ width: { xs: "100%", md: "12%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                       <Box component="img" src={firstProduct.image || "https://placehold.co/48x48.png"} alt={firstProduct.product?.name} sx={{ width: 56, height: 56, borderRadius: 2, border: "1px solid #e2e8f0", objectFit: "cover" }} />
//                       <Box sx={{ display: { xs: "block", md: "none" }, textAlign: "right" }}>
//                         <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
//                           ₹{(firstProduct.discounted_price * firstProduct.quantity).toLocaleString()}
//                         </Typography>
//                         {firstProduct.discount > 0 && (
//                           <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}>
//                             ₹{(firstProduct.price * firstProduct.quantity).toLocaleString()}
//                           </Typography>
//                         )}
//                       </Box>
//                     </Box>

//                     <Box sx={{ width: { xs: "100%", md: "48%" }, pr: { md: 2 }, mt: { xs: 1.5, md: 0 } }}>
//                       <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>{firstProduct.product?.name}</Typography>
//                       <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, fontWeight: 500 }}>
//                         Qty: {firstProduct.quantity} • Rate: ₹{firstProduct.price?.toLocaleString()}
//                       </Typography>

//                       <Box sx={{ display: "flex", gap: 0.5, mt: 1, flexWrap: "wrap", alignItems: "center" }}>
//                         {firstProduct.discount > 0 && (
//                           <Chip label={`${firstProduct.discount}% OFF`} size="small" variant="outlined" color="success" sx={{ height: 18, fontSize: "0.65rem", fontWeight: 700, borderRadius: 1 }} />
//                         )}
//                         {firstProduct.coupon?.title && (
//                           <Chip label={`Coupon: ${firstProduct.coupon.title}`} size="small" variant="outlined" sx={{ height: 18, fontSize: "0.65rem", fontWeight: 600, borderRadius: 1, borderStyle: "dashed", borderColor: "#6366f1", color: "#4f46e5" }} />
//                         )}
//                         {firstProduct.offer && (
//                           <Typography variant="caption" sx={{ fontSize: "0.65rem", color: "#b45309", fontWeight: 700, ml: 0.5 }}>
//                             🔥 {firstProduct.offer}
//                           </Typography>
//                         )}
//                       </Box>
//                     </Box>

//                     <Box sx={{ width: { xs: "100%", md: "18%" }, display: { xs: "none", md: "block" }, textAlign: "right", pr: 3 }}>
//                       <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
//                         ₹{(firstProduct.discounted_price * firstProduct.quantity).toLocaleString()}
//                       </Typography>
//                       {firstProduct.discount > 0 && (
//                         <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block", mt: 0.5 }}>
//                           ₹{(firstProduct.price * firstProduct.quantity).toLocaleString()}
//                         </Typography>
//                       )}
//                     </Box>

//                     <Box sx={{ width: { xs: "100%", md: "22%" }, display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, pt: { xs: 2, md: 0 } }}>
//                       <Button
//                         size="small"
//                         variant="contained"
//                         disableElevation
//                         fullWidth={{ xs: true, md: false }}
//                         onClick={() => handleOpenRating(firstProduct.product)}
//                         sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.75rem", borderRadius: "8px", px: 2.5, py: 0.75, bgcolor: "#efeeff", color: "#4f46e5", "&:hover": { bgcolor: "#e0ddff" } }}
//                       >
//                         Give Rating
//                       </Button>
//                     </Box>
//                   </Box>
      
//                   {/* Dropdown Expanded Rows */}
//                   {hasMultipleProducts && (
//                     <Collapse in={isExpanded} timeout="auto" unmountOnExit>
//                       <Box sx={{ bgcolor: "#fafafa", borderTop: "1px dashed #e5e7eb" }}>
//                         {remainingProducts.map((item) => (
//                           <Box key={item.product?._id} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, p: 2.5, borderBottom: "1px solid #f1f5f9", "&:last-child": { borderBottom: "none" } }}>
//                             <Box sx={{ width: { xs: "100%", md: "12%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                               <Box component="img" src={item.image || "https://placehold.co/48x48.png"} alt={item.product?.name} sx={{ width: 50, height: 50, borderRadius: 2, border: "1px solid #e2e8f0", objectFit: "cover" }} />
//                               <Box sx={{ display: { xs: "block", md: "none" }, textAlign: "right" }}>
//                                 <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
//                                   ₹{(item.discounted_price * item.quantity).toLocaleString()}
//                                 </Typography>
//                                 {item.discount > 0 && (
//                                   <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}>
//                                     ₹{(item.price * item.quantity).toLocaleString()}
//                                   </Typography>
//                                 )}
//                               </Box>
//                             </Box>

//                             <Box sx={{ width: { xs: "100%", md: "48%" }, pr: { md: 2 }, mt: { xs: 1.5, md: 0 } }}>
//                               <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>{item.product?.name}</Typography>
//                               <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
//                                 Qty: {item.quantity} • Rate: ₹{item.price?.toLocaleString()}
//                               </Typography>

//                               <Box sx={{ display: "flex", gap: 0.5, mt: 1, flexWrap: "wrap", alignItems: "center" }}>
//                                 {item.discount > 0 && (
//                                   <Chip label={`${item.discount}% OFF`} size="small" variant="outlined" color="success" sx={{ height: 16, fontSize: "0.6rem", borderRadius: 1 }} />
//                                 )}
//                                 {item.coupon?.title && (
//                                   <Chip label={`Coupon: ${item.coupon.title}`} size="small" variant="outlined" sx={{ height: 16, fontSize: "0.6rem", borderRadius: 1, borderStyle: "dashed", borderColor: "#6366f1", color: "#4f46e5" }} />
//                                 )}
//                                {/* Mention items off string parameters directly if applied here */}
//                                 {item.offer && (
//                                   <Typography variant="caption" sx={{ fontSize: "0.6rem", color: "#b45309", fontWeight: 600, ml: 0.5 }}>
//                                     🔥 {item.offer}
//                                   </Typography>
//                                 )}
//                               </Box>
//                             </Box>

//                             <Box sx={{ width: { xs: "100%", md: "18%" }, display: { xs: "none", md: "block" }, textAlign: "right", pr: 3 }}>
//                               <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
//                                 ₹{(item.discounted_price * item.quantity).toLocaleString()}
//                               </Typography>
//                               {item.discount > 0 && (
//                                 <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block", mt: 0.5 }}>
//                                   ₹{(item.price * item.quantity).toLocaleString()}
//                                 </Typography>
//                               )}
//                             </Box>

//                             <Box sx={{ width: { xs: "100%", md: "22%" }, display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, pt: { xs: 2, md: 0 } }}>
//                               <Button
//                                 size="small"
//                                 variant="contained"
//                                 disableElevation
//                                 fullWidth={{ xs: true, md: false }}
//                                 onClick={() => handleOpenRating(item.product)}
//                                 sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.75rem", borderRadius: "8px", px: 2.5, py: 0.75, bgcolor: "#efeeff", color: "#4f46e5", "&:hover": { bgcolor: "#e0ddff" } }}
//                               >
//                                 Give Rating
//                               </Button>
//                             </Box>
//                           </Box>
//                         ))}
//                       </Box>
//                     </Collapse>
//                   )}
//                 </Box>
//               </TableContainer>

//               {/* FOOTER PANELS */}
//               <Box sx={{ mt: 2.5, bgcolor: "#f8fafc", borderRadius: 3, p: 2.5, border: "1px solid #e5e7eb" }}>
//                 <Grid container spacing={3}>
//                   <Grid size={{ xs: 12, sm: 7 }}>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: "block", mb: 0.5, letterSpacing: "0.5px" }}>DELIVERY DESTINATION</Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 500, color: "#4b5563", lineHeight: 1.5 }}>
//                       {order.shippingAddress ? ` ${order.shippingAddress.label}, ${order.shippingAddress.street}, ${order.shippingAddress.city}, ${order.shippingAddress.state} - ${order.shippingAddress.pincode}, ${order.shippingAddress.country}` : "No address specified"}
//                     </Typography>
//                   </Grid>
//                   <Grid size={{ xs: 12, sm: 5 }}>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: "block", mb: 0.5, letterSpacing: "0.5px" }}>TRANSACTION METHOD</Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827", fontFamily: "monospace" }}>{order.paymentID || "N/A"}</Typography>
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Box>
//           </Paper>
//         );
//       })}

//       {/* RATING DIALOG POPUP */}
//       <Dialog open={ratingDialogOpen} onClose={handleCloseRating} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
//         <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>Product Rating</DialogTitle>
//         <DialogContent dividers sx={{ borderColor: "#f1f5f9" }}>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
//             How would you rate your experience with this item?
//           </Typography>
//           <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
//             {selectedProduct?.name}
//           </Typography>
//           <Box sx={{ mt: 2.5, py: 3, textAlign: "center", bgcolor: "#f8fafc", borderRadius: 3, border: "1px dashed #e2e8f0" }}>
//             <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>[ Rating Stars Component Placeholder ]</Typography>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 2.5, gap: 1 }}>
//           <Button onClick={handleCloseRating} color="inherit" sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}>Cancel</Button>
//           <Button onClick={handleCloseRating} variant="contained" disableElevation sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2, bgcolor: "#4f46e5", "&:hover": { bgcolor: "#4338ca" } }}>Submit Rating</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default OrderList;


import React, { useState, useEffect } from "react";
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
  CircularProgress,
  Snackbar,
  Alert as MuiAlert,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import api from "../../../api/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrder } from "../../../Redux/Slices/CustomerSlice/CustomerOrderSlice";

const ExpandMoreIcon = () => <span style={{ fontSize: "10px", marginLeft: "4px" }}>▼</span>;
const ExpandLessIcon = () => <span style={{ fontSize: "10px", marginLeft: "4px" }}>▲</span>;

const STEPS = [
  "order placed",
  "preparing order",
  "order shipped",
  "order delivered",
];

const getStatusStep = (status) => {
  switch (status?.toLowerCase()) {
    case "order placed": return 0;
    case "preparing order": return 1;
    case "order shipped": return 2;
    case "order delivered": return 3;
    default: return 0;
  }
};

const isCancellable = (status) => {
  const lowerStatus = status?.toLowerCase();
  return lowerStatus === "order placed" || lowerStatus === "preparing order";
};

function OrderList() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.customerOrder.orderlist) || [];
  
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState([]);
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Snackbar Alert Central Context State
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success", // Can be: 'success' | 'error' | 'info' | 'warning'
  });

  const triggerSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        const response = await api.get("/orders/getOrders");
        
        const fallbackOrdersArray = response.data?.orders || (Array.isArray(response.data) ? response.data : []);
        dispatch(getCustomerOrder(fallbackOrdersArray));
        
        // Show silent notification fallback on empty results vs load confirmation
        if (fallbackOrdersArray.length > 0) {
          triggerSnackbar("Order history synchronized successfully!", "success");
        }
      } catch (err) {
        console.error("Error fetching order history:", err);
        triggerSnackbar("Failed to sync historical orders list.", "error");
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [dispatch]);

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

  const handleSubmitRating = () => {
    handleCloseRating();
    triggerSnackbar("Thank you! Your product rating was submitted.", "success");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "70vh", gap: 2 }}>
        <CircularProgress size={38} thickness={4} sx={{ color: "#4f46e5" }} />
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Loading your orders...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 }, maxWidth: "1100px", margin: "0 auto", minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>
        Order History
      </Typography>

      {orders.length === 0 ? (
        <Box sx={{ p: 8, textAlign: "center", maxWidth: 400, margin: "0 auto", minHeight: "40vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1f2937" }}>No Orders Found</Typography>
          <Typography variant="body2" color="text.secondary">Looks like you haven't placed any orders yet.</Typography>
        </Box>
      ) : (
        orders.map((order) => {
          const isExpanded = expandedOrders.includes(order._id);
          const hasMultipleProducts = order.products?.length > 1;
          const firstProduct = order.products?.[0];
          const remainingProducts = order.products?.slice(1) || [];

          if (!firstProduct) return null;

          const isCancelled = order.orderStatus?.toLowerCase() === "order cancelled";

          return (
            <Paper
              key={order._id}
              elevation={0}
              sx={{
                mb: 4,
                borderRadius: 4,
                border: "1px solid #e5e7eb",
                boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.04)",
                overflow: "hidden",
                bgcolor: "#fff",
              }}
            >
              {/* META HEADER BLOCK */}
              <Box sx={{ p: 2.5, bgcolor: "#f8fafc", display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 2, borderBottom: "1px solid #e5e7eb" }}>
                <Box sx={{ display: "flex", gap: { xs: 2.5, sm: 4 }, flexWrap: "wrap", width: { xs: "100%", sm: "auto" } }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Order ID</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontFamily: "monospace" }}>{order._id}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Date Placed</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
                      {order.createdAt ? order.createdAt.split("T")[0] : "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Total Price</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#4f46e5" }}>₹{(order.final_price || order.total || 0).toLocaleString()}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "space-between", sm: "flex-end" } }}>
                  <Chip
                    label={order.orderStatus || "order placed"}
                    size="small"
                    color={order.orderStatus?.toLowerCase() === "order delivered" ? "success" : isCancelled ? "error" : "primary"}
                    sx={{ fontWeight: 700, borderRadius: 2, textTransform: "capitalize", px: 1 }}
                  />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="Chat with support">
                      <IconButton size="small" onClick={() => triggerSnackbar(`Connecting with support for order ${order._id.slice(-6)}...`, "info")} sx={{ border: "1px solid #e5e7eb", bgcolor: "#fff", "&:hover": { bgcolor: "#f1f5f9" } }}>💬</IconButton>
                    </Tooltip>
                    {isCancellable(order.orderStatus) && (
                      <Button size="small" variant="outlined" color="error" onClick={() => triggerSnackbar("Order cancellation requested.", "warning")} sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2, px: 2 }}>
                        Cancel Order
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* TRACKING STEPPER OR CANCELLATION BLOCK */}
              {isCancelled ? (
                <Box sx={{ p: 2.5, bgcolor: "#fef2f2", borderBottom: "1px solid #fee2e2" }}>
                  <Typography variant="body2" sx={{ color: "#991b1b", fontWeight: 700 }}>
                    ✕ Order Cancelled by {order.cancelledBy || "system"}
                  </Typography>
                  {order.cancelReason && (
                    <Typography variant="caption" sx={{ color: "#bd2c2c", display: "block", mt: 0.5 }}>
                      <strong>Reason:</strong> {order.cancelReason}
                    </Typography>
                  )}
                </Box>
              ) : (
                <>
                  <Box sx={{ p: 4, width: "100%", overflowX: "auto", bgcolor: "#fff" }}>
                    <Box sx={{ minWidth: 720 }}>
                      <Stepper activeStep={getStatusStep(order.orderStatus)} alternativeLabel>
                        {STEPS.map((label) => (
                          <Step key={label}>
                            <StepLabel sx={{ "& .MuiStepLabel-label": { fontSize: "0.75rem", textTransform: "capitalize", fontWeight: 500, mt: 1 } }}>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                    </Box>
                  </Box>
                  <Divider />
                </>
              )}

              {/* PRODUCT DATA CONTAINER */}
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <TableContainer component={Paper} variant="outlined" sx={{ border: "1px solid #e5e7eb", borderRadius: 3, overflow: "hidden", boxShadow: "none" }}>
                  
                  {/* Desktop header matrix */}
                  <Box sx={{ display: { xs: "none", md: "block" } }}>
                    <Table sx={{ tableLayout: "fixed" }} size="small">
                      <TableHead sx={{ bgcolor: "#fafafa" }}>
                        <TableRow>
                          <TableCell sx={{ fontWeight: 700, color: "#475569", width: "12%", py: 1.5 }}>Item</TableCell>
                          <TableCell sx={{ fontWeight: 700, color: "#475569", width: "48%", py: 1.5 }}>Product Details</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700, color: "#475569", width: "18%", py: 1.5 }}>Price Summary</TableCell>
                          <TableCell align="right" sx={{ fontWeight: 700, color: "#475569", width: "22%", py: 1.5 }}>
                            {hasMultipleProducts ? (
                              <Button
                                size="small"
                                variant="text"
                                endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                onClick={() => toggleOrderExpand(order._id)}
                                sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.8rem", color: "#4f46e5", p: 0, "&:hover": { bgcolor: "transparent", textDecoration: "underline" } }}
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

                  {/* Mobile header view metric switch */}
                  {hasMultipleProducts && (
                    <Box sx={{ display: { xs: "block", md: "none" }, p: 1.5, bgcolor: "#fafafa", borderBottom: "1px solid #e5e7eb", textAlign: "right" }}>
                      <Button
                        size="small"
                        variant="outlined"
                        endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        onClick={() => toggleOrderExpand(order._id)}
                        sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem", borderRadius: "8px", px: 2 }}
                      >
                        {isExpanded ? "Hide Items" : `+${remainingProducts.length} More Items`}
                      </Button>
                    </Box>
                  )}

                  <Box>
                    {/* Primary item presentation row */}
                    <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, p: 2.5, transition: "background-color 0.2s ease", "&:hover": { bgcolor: "#fdfdfd" } }}>
                      <Box sx={{ width: { xs: "100%", md: "12%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Box component="img" src={firstProduct.image || "https://placehold.co/48x48.png"} alt="product thumbnail" sx={{ width: 56, height: 56, borderRadius: 2, border: "1px solid #e2e8f0", objectFit: "cover" }} />
                        <Box sx={{ display: { xs: "block", md: "none" }, textAlign: "right" }}>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
                            ₹{((firstProduct.discounted_price || firstProduct.price) * firstProduct.quantity).toLocaleString()}
                          </Typography>
                          {firstProduct.discount > 0 && (
                            <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}>
                              ₹{(firstProduct.price * firstProduct.quantity).toLocaleString()}
                            </Typography>
                          )}
                        </Box>
                      </Box>

                      <Box sx={{ width: { xs: "100%", md: "48%" }, pr: { md: 2 }, mt: { xs: 1.5, md: 0 } }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
                          {firstProduct.product?.name || "Product Item Details"}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, fontWeight: 500 }}>
                          Qty: {firstProduct.quantity} • Rate: ₹{(firstProduct.price || 0).toLocaleString()}
                        </Typography>

                        <Box sx={{ display: "flex", gap: 0.5, mt: 1, flexWrap: "wrap", alignItems: "center" }}>
                          {firstProduct.discount > 0 && (
                            <Chip label={`${firstProduct.discount}% OFF`} size="small" variant="outlined" color="success" sx={{ height: 18, fontSize: "0.65rem", fontWeight: 700, borderRadius: 1 }} />
                          )}
                          {firstProduct.offer && typeof firstProduct.offer === "string" && (
                            <Typography variant="caption" sx={{ fontSize: "0.65rem", color: "#b45309", fontWeight: 700, ml: 0.5 }}>
                              🔥 Special Offer Applied
                            </Typography>
                          )}
                        </Box>
                      </Box>

                      <Box sx={{ width: { xs: "100%", md: "18%" }, display: { xs: "none", md: "block" }, textAlign: "right", pr: 3 }}>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
                          ₹{((firstProduct.discounted_price || firstProduct.price) * firstProduct.quantity).toLocaleString()}
                        </Typography>
                        {firstProduct.discount > 0 && (
                          <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block", mt: 0.5 }}>
                            ₹{(firstProduct.price * firstProduct.quantity).toLocaleString()}
                          </Typography>
                        )}
                      </Box>

                      <Box sx={{ width: { xs: "100%", md: "22%" }, display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, pt: { xs: 2, md: 0 } }}>
                        <Button
                          size="small"
                          variant="contained"
                          disableElevation
                          fullWidth={{ xs: true, md: false }}
                          onClick={() => handleOpenRating(firstProduct.product)}
                          sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.75rem", borderRadius: "8px", px: 2.5, py: 0.75, bgcolor: "#efeeff", color: "#4f46e5", "&:hover": { bgcolor: "#e0ddff" } }}
                        >
                          Give Rating
                        </Button>
                      </Box>
                    </Box>

                    {/* Secondary list collapsible container block */}
                    {hasMultipleProducts && (
                      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                        <Box sx={{ bgcolor: "#fafafa", borderTop: "1px dashed #e5e7eb" }}>
                          {remainingProducts.map((item, idx) => (
                            <Box key={item.product?._id || idx} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, p: 2.5, borderBottom: "1px solid #f1f5f9", "&:last-child": { borderBottom: "none" } }}>
                              <Box sx={{ width: { xs: "100%", md: "12%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                <Box component="img" src={item.image || "https://placehold.co/48x48.png"} alt="product variant thumbnail" sx={{ width: 50, height: 50, borderRadius: 2, border: "1px solid #e2e8f0", objectFit: "cover" }} />
                                <Box sx={{ display: { xs: "block", md: "none" }, textAlign: "right" }}>
                                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
                                    ₹{((item.discounted_price || item.price) * item.quantity).toLocaleString()}
                                  </Typography>
                                  {item.discount > 0 && (
                                    <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}>
                                      ₹{(item.price * item.quantity).toLocaleString()}
                                    </Typography>
                                  )}
                                </Box>
                              </Box>

                              <Box sx={{ width: { xs: "100%", md: "48%" }, pr: { md: 2 }, mt: { xs: 1.5, md: 0 } }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>{item.product?.name || "Product Item Details"}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                                  Qty: {item.quantity} • Rate: ₹{(item.price || 0).toLocaleString()}
                                </Typography>

                                <Box sx={{ display: "flex", gap: 0.5, mt: 1, flexWrap: "wrap", alignItems: "center" }}>
                                  {item.discount > 0 && (
                                    <Chip label={`${item.discount}% OFF`} size="small" variant="outlined" color="success" sx={{ height: 16, fontSize: "0.6rem", borderRadius: 1 }} />
                                  )}
                                </Box>
                              </Box>

                              <Box sx={{ width: { xs: "100%", md: "18%" }, display: { xs: "none", md: "block" }, textAlign: "right", pr: 3 }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
                                  ₹{((item.discounted_price || item.price) * item.quantity).toLocaleString()}
                                </Typography>
                                {item.discount > 0 && (
                                  <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block", mt: 0.5 }}>
                                    ₹{(item.price * item.quantity).toLocaleString()}
                                  </Typography>
                                )}
                              </Box>

                              <Box sx={{ width: { xs: "100%", md: "22%" }, display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, pt: { xs: 2, md: 0 } }}>
                                <Button
                                  size="small"
                                  variant="contained"
                                  disableElevation
                                  fullWidth={{ xs: true, md: false }}
                                  onClick={() => handleOpenRating(item.product)}
                                  sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.75rem", borderRadius: "8px", px: 2.5, py: 0.75, bgcolor: "#efeeff", color: "#4f46e5", "&:hover": { bgcolor: "#e0ddff" } }}
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

                {/* FOOTER BLOCKS FOR SHIPPED META ADDRESS DATA */}
                <Box sx={{ mt: 2.5, bgcolor: "#f8fafc", borderRadius: 3, p: 2.5, border: "1px solid #e5e7eb" }}>
                  <Grid container spacing={3}>
                    <Grid size={{ xs: 12, sm: 7 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: "block", mb: 0.5, letterSpacing: "0.5px" }}>DELIVERY DESTINATION</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500, color: "#4b5563", lineHeight: 1.5 }}>
                        {order.shippingAddress 
                          ? `${order.shippingAddress.label || ""}: ${order.shippingAddress.street || ""}, ${order.shippingAddress.city || ""}, ${order.shippingAddress.state || ""} - ${order.shippingAddress.pincode || ""}, ${order.shippingAddress.country || ""}`
                          : "No address specified"}
                      </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 5 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: "block", mb: 0.5, letterSpacing: "0.5px" }}>TRANSACTION METHOD</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827", fontFamily: "monospace" }}>{order.paymentID || "N/A"}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper>
          );
        })
      )}

      {/* RATING DIALOG MODAL POPUP */}
      <Dialog open={ratingDialogOpen} onClose={handleCloseRating} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>Product Rating</DialogTitle>
        <DialogContent dividers sx={{ borderColor: "#f1f5f9" }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
            How would you rate your experience with this item?
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
            {selectedProduct?.name || "Product Item"}
          </Typography>
          <Box sx={{ mt: 2.5, py: 3, textAlign: "center", bgcolor: "#f8fafc", borderRadius: 3, border: "1px dashed #e2e8f0" }}>
            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>[ Rating Stars Component Placeholder ]</Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button onClick={handleCloseRating} color="inherit" sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}>Cancel</Button>
          <Button onClick={handleSubmitRating} variant="contained" disableElevation sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2, bgcolor: "#4f46e5", "&:hover": { bgcolor: "#4338ca" } }}>Submit Rating</Button>
        </DialogActions>
      </Dialog>

      {/* CENTRAL NOTIFICATION TOAST BAR COMPONENT */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          elevation={4}
          sx={{ borderRadius: 2, fontWeight: 600, px: 2.5 }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default OrderList;
