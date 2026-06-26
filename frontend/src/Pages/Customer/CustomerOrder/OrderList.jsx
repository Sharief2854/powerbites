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
//   Snackbar,
//   Alert as MuiAlert,
// } from "@mui/material";
// import Grid from "@mui/material/Grid";
// import api from "../../../api/axiosConfig";
// import { useDispatch, useSelector } from "react-redux";
// import { getCustomerOrder } from "../../../Redux/Slices/CustomerSlice/CustomerOrderSlice";
// import { useNavigate } from "react-router-dom";

// const ExpandMoreIcon = () => <span style={{ fontSize: "10px", marginLeft: "4px" }}>▼</span>;
// const ExpandLessIcon = () => <span style={{ fontSize: "10px", marginLeft: "4px" }}>▲</span>;

// const STEPS = [
//   "order placed",
//   "preparing order",
//   "order shipped",
//   "order delivered",
// ];

// const getStatusStep = (status) => {
//   switch (status?.toLowerCase()) {
//     case "order placed": return 0;
//     case "preparing order": return 1;
//     case "order shipped": return 2;
//     case "order delivered": return 3;
//     default: return 0;
//   }
// };

// const isCancellable = (status) => {
//   const lowerStatus = status?.toLowerCase();
//   return lowerStatus === "order placed" || lowerStatus === "preparing order";
// };

// function OrderList() {
//   const dispatch = useDispatch();
//   const orders = useSelector((state) => state.customerOrder.orderlist) || [];
  
//   const [loading, setLoading] = useState(true);
//   const [expandedOrders, setExpandedOrders] = useState([]);
//   const [ratingDialogOpen, setRatingDialogOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const navigate = useNavigate();
//   // Snackbar Alert Central Context State
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success", // Can be: 'success' | 'error' | 'info' | 'warning'
//   });

//   const triggerSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   useEffect(() => {
//     async function fetchOrders() {
//       try {
//         setLoading(true);
//         const response = await api.get("/orders/getOrders");
//         const response2 = await api.delete(`/orderStatus/customerCancelling/${orderid}`)
        
//         const fallbackOrdersArray = response.data?.orders || (Array.isArray(response.data) ? response.data : []);
//         dispatch(getCustomerOrder(fallbackOrdersArray));
        
//         // Show silent notification fallback on empty results vs load confirmation
//         if (fallbackOrdersArray.length > 0) {
//           triggerSnackbar("Order history synchronized successfully!", "success");
//         }
//       } catch (err) {
//         console.error("Error fetching order history:", err);
//         triggerSnackbar("Failed to sync historical orders list.", "error");
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchOrders();
//   }, [dispatch]);

//   const toggleOrderExpand = (orderId) => {
//     setExpandedOrders((prev) =>
//       prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
//     );
//   };

//   const handleOpenRating = (product) => {
//     navigate(`/customer/reviews/${product._id}`)
//     //setSelectedProduct(product);
//     //setRatingDialogOpen(true);
//   };

//   const handleCloseRating = () => {
//     setRatingDialogOpen(false);
//     setSelectedProduct(null);
//   };

//   const handleSubmitRating = () => {
//     handleCloseRating();
//     triggerSnackbar("Thank you! Your product rating was submitted.", "success");
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "70vh", gap: 2 }}>
//         <CircularProgress size={38} thickness={4} sx={{ color: "#4f46e5" }} />
//         <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>Loading your orders...</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: { xs: 1.5, sm: 2, md: 4 }, maxWidth: "1100px", margin: "0 auto", minHeight: "100vh" }}>
//       <Typography variant="h5" sx={{ mb: 3, fontWeight: 800, color: "#111827", letterSpacing: "-0.5px" }}>
//         Order History
//       </Typography>

//       {orders.length === 0 ? (
//         <Box sx={{ p: 8, textAlign: "center", maxWidth: 400, margin: "0 auto", minHeight: "40vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
//           <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#1f2937" }}>No Orders Found</Typography>
//           <Typography variant="body2" color="text.secondary">Looks like you haven't placed any orders yet.</Typography>
//         </Box>
//       ) : (
//         orders.map((order) => {
//           const isExpanded = expandedOrders.includes(order._id);
//           const hasMultipleProducts = order.products?.length > 1;
//           const firstProduct = order.products?.[0];
//           const remainingProducts = order.products?.slice(1) || [];

//           if (!firstProduct) return null;

//           const isCancelled = order.orderStatus?.toLowerCase() === "order cancelled";

//           return (
//             <Paper
//               key={order._id}
//               elevation={0}
//               sx={{
//                 mb: 4,
//                 borderRadius: 4,
//                 border: "1px solid #e5e7eb",
//                 boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.04)",
//                 overflow: "hidden",
//                 bgcolor: "#fff",
//               }}
//             >
//               {/* META HEADER BLOCK */}
//               <Box sx={{ p: 2.5, bgcolor: "#f8fafc", display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", gap: 2, borderBottom: "1px solid #e5e7eb" }}>
//                 <Box sx={{ display: "flex", gap: { xs: 2.5, sm: 4 }, flexWrap: "wrap", width: { xs: "100%", sm: "auto" } }}>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Order ID</Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827", fontFamily: "monospace" }}>{order._id}</Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Date Placed</Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
//                       {order.createdAt ? order.createdAt.split("T")[0] : "N/A"}
//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Total Price</Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 700, color: "#4f46e5" }}>₹{(order.final_price || order.total || 0).toLocaleString()}</Typography>
//                   </Box>
//                 </Box>

//                 <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: { xs: "100%", sm: "auto" }, justifyContent: { xs: "space-between", sm: "flex-end" } }}>
//                   <Chip
//                     label={order.orderStatus || "order placed"}
//                     size="small"
//                     color={order.orderStatus?.toLowerCase() === "order delivered" ? "success" : isCancelled ? "error" : "primary"}
//                     sx={{ fontWeight: 700, borderRadius: 2, textTransform: "capitalize", px: 1 }}
//                   />
//                   <Box sx={{ display: "flex", gap: 1 }}>
//                     <Tooltip title="Chat with support">
//                       <IconButton size="small" onClick={() => triggerSnackbar(`Connecting with support for order ${order._id.slice(-6)}...`, "info")} sx={{ border: "1px solid #e5e7eb", bgcolor: "#fff", "&:hover": { bgcolor: "#f1f5f9" } }}>💬</IconButton>
//                     </Tooltip>
//                     {isCancellable(order.orderStatus) && (
//                       <Button size="small" variant="outlined" color="error" onClick={() => triggerSnackbar("Order cancellation requested.", "warning")} sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2, px: 2 }}>
//                         Cancel Order
//                       </Button>
//                     )}
//                   </Box>
//                 </Box>
//               </Box>

//               {/* TRACKING STEPPER OR CANCELLATION BLOCK */}
//               {isCancelled ? (
//                 <Box sx={{ p: 2.5, bgcolor: "#fef2f2", borderBottom: "1px solid #fee2e2" }}>
//                   <Typography variant="body2" sx={{ color: "#991b1b", fontWeight: 700 }}>
//                     ✕ Order Cancelled by {order.cancelledBy || "system"}
//                   </Typography>
//                   {order.cancelReason && (
//                     <Typography variant="caption" sx={{ color: "#bd2c2c", display: "block", mt: 0.5 }}>
//                       <strong>Reason:</strong> {order.cancelReason}
//                     </Typography>
//                   )}
//                 </Box>
//               ) : (
//                 <>
//                   <Box sx={{ p: 4, width: "100%", overflowX: "auto", bgcolor: "#fff" }}>
//                     <Box sx={{ minWidth: 720 }}>
//                       <Stepper activeStep={getStatusStep(order.orderStatus)} alternativeLabel>
//                         {STEPS.map((label) => (
//                           <Step key={label}>
//                             <StepLabel sx={{ "& .MuiStepLabel-label": { fontSize: "0.75rem", textTransform: "capitalize", fontWeight: 500, mt: 1 } }}>{label}</StepLabel>
//                           </Step>
//                         ))}
//                       </Stepper>
//                     </Box>
//                   </Box>
//                   <Divider />
//                 </>
//               )}

//               {/* PRODUCT DATA CONTAINER */}
//               <Box sx={{ p: { xs: 2, sm: 3 } }}>
//                 <TableContainer component={Paper} variant="outlined" sx={{ border: "1px solid #e5e7eb", borderRadius: 3, overflow: "hidden", boxShadow: "none" }}>
                  
//                   {/* Desktop header matrix */}
//                   <Box sx={{ display: { xs: "none", md: "block" } }}>
//                     <Table sx={{ tableLayout: "fixed" }} size="small">
//                       <TableHead sx={{ bgcolor: "#fafafa" }}>
//                         <TableRow>
//                           <TableCell sx={{ fontWeight: 700, color: "#475569", width: "12%", py: 1.5 }}>Item</TableCell>
//                           <TableCell sx={{ fontWeight: 700, color: "#475569", width: "48%", py: 1.5 }}>Product Details</TableCell>
//                           <TableCell align="right" sx={{ fontWeight: 700, color: "#475569", width: "18%", py: 1.5 }}>Price Summary</TableCell>
//                           <TableCell align="right" sx={{ fontWeight: 700, color: "#475569", width: "22%", py: 1.5 }}>
//                             {hasMultipleProducts ? (
//                               <Button
//                                 size="small"
//                                 variant="text"
//                                 endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                                 onClick={() => toggleOrderExpand(order._id)}
//                                 sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.8rem", color: "#4f46e5", p: 0, "&:hover": { bgcolor: "transparent", textDecoration: "underline" } }}
//                               >
//                                 {isExpanded ? "Hide Items" : `+${remainingProducts.length} More Items`}
//                               </Button>
//                             ) : (
//                               "Action"
//                             )}
//                           </TableCell>
//                         </TableRow>
//                       </TableHead>
//                     </Table>
//                   </Box>

//                   {/* Mobile header view metric switch */}
//                   {hasMultipleProducts && (
//                     <Box sx={{ display: { xs: "block", md: "none" }, p: 1.5, bgcolor: "#fafafa", borderBottom: "1px solid #e5e7eb", textAlign: "right" }}>
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
//                         onClick={() => toggleOrderExpand(order._id)}
//                         sx={{ textTransform: "none", fontWeight: 600, fontSize: "0.75rem", borderRadius: "8px", px: 2 }}
//                       >
//                         {isExpanded ? "Hide Items" : `+${remainingProducts.length} More Items`}
//                       </Button>
//                     </Box>
//                   )}

//                   <Box>
//                     {/* Primary item presentation row */}
//                     <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, p: 2.5, transition: "background-color 0.2s ease", "&:hover": { bgcolor: "#fdfdfd" } }}>
//                       <Box sx={{ width: { xs: "100%", md: "12%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                         <Box component="img" src={firstProduct.image || "https://placehold.co/48x48.png"} alt="product thumbnail" sx={{ width: 56, height: 56, borderRadius: 2, border: "1px solid #e2e8f0", objectFit: "cover" }} />
//                         <Box sx={{ display: { xs: "block", md: "none" }, textAlign: "right" }}>
//                           <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
//                             ₹{((firstProduct.discounted_price || firstProduct.price) * firstProduct.quantity).toLocaleString()}
//                           </Typography>
//                           {firstProduct.discount > 0 && (
//                             <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}>
//                               ₹{(firstProduct.price * firstProduct.quantity).toLocaleString()}
//                             </Typography>
//                           )}
//                         </Box>
//                       </Box>

//                       <Box sx={{ width: { xs: "100%", md: "48%" }, pr: { md: 2 }, mt: { xs: 1.5, md: 0 } }}>
//                         <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
//                           {firstProduct.product?.name || "Product Item Details"}
//                         </Typography>
//                         <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5, fontWeight: 500 }}>
//                           Qty: {firstProduct.quantity} • Rate: ₹{(firstProduct.price || 0).toLocaleString()}
//                         </Typography>

//                         <Box sx={{ display: "flex", gap: 0.5, mt: 1, flexWrap: "wrap", alignItems: "center" }}>
//                           {firstProduct.discount > 0 && (
//                             <Chip label={`${firstProduct.discount}% OFF`} size="small" variant="outlined" color="success" sx={{ height: 18, fontSize: "0.65rem", fontWeight: 700, borderRadius: 1 }} />
//                           )}
//                           {firstProduct.offer && typeof firstProduct.offer === "string" && (
//                             <Typography variant="caption" sx={{ fontSize: "0.65rem", color: "#b45309", fontWeight: 700, ml: 0.5 }}>
//                               🔥 Special Offer Applied
//                             </Typography>
//                           )}
//                         </Box>
//                       </Box>

//                       <Box sx={{ width: { xs: "100%", md: "18%" }, display: { xs: "none", md: "block" }, textAlign: "right", pr: 3 }}>
//                         <Typography variant="body2" sx={{ fontWeight: 700, color: "#111827" }}>
//                           ₹{((firstProduct.discounted_price || firstProduct.price) * firstProduct.quantity).toLocaleString()}
//                         </Typography>
//                         {firstProduct.discount > 0 && (
//                           <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block", mt: 0.5 }}>
//                             ₹{(firstProduct.price * firstProduct.quantity).toLocaleString()}
//                           </Typography>
//                         )}
//                       </Box>

//                       <Box sx={{ width: { xs: "100%", md: "22%" }, display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, pt: { xs: 2, md: 0 } }}>
//                         <Button
//                           size="small"
//                           variant="contained"
//                           disableElevation
//                           fullWidth={{ xs: true, md: false }}
//                           onClick={() => handleOpenRating(firstProduct.product)}
//                           sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.75rem", borderRadius: "8px", px: 2.5, py: 0.75, bgcolor: "#efeeff", color: "#4f46e5", "&:hover": { bgcolor: "#e0ddff" } }}
//                         >
//                           Give Rating
//                         </Button>
//                       </Box>
//                     </Box>

//                     {/* Secondary list collapsible container block */}
//                     {hasMultipleProducts && (
//                       <Collapse in={isExpanded} timeout="auto" unmountOnExit>
//                         <Box sx={{ bgcolor: "#fafafa", borderTop: "1px dashed #e5e7eb" }}>
//                           {remainingProducts.map((item, idx) => (
//                             <Box key={item.product?._id || idx} sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, p: 2.5, borderBottom: "1px solid #f1f5f9", "&:last-child": { borderBottom: "none" } }}>
//                               <Box sx={{ width: { xs: "100%", md: "12%" }, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                                 <Box component="img" src={item.image || "https://placehold.co/48x48.png"} alt="product variant thumbnail" sx={{ width: 50, height: 50, borderRadius: 2, border: "1px solid #e2e8f0", objectFit: "cover" }} />
//                                 <Box sx={{ display: { xs: "block", md: "none" }, textAlign: "right" }}>
//                                   <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#111827" }}>
//                                     ₹{((item.discounted_price || item.price) * item.quantity).toLocaleString()}
//                                   </Typography>
//                                   {item.discount > 0 && (
//                                     <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block" }}>
//                                       ₹{(item.price * item.quantity).toLocaleString()}
//                                     </Typography>
//                                   )}
//                                 </Box>
//                               </Box>

//                               <Box sx={{ width: { xs: "100%", md: "48%" }, pr: { md: 2 }, mt: { xs: 1.5, md: 0 } }}>
//                                 <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>{item.product?.name || "Product Item Details"}</Typography>
//                                 <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
//                                   Qty: {item.quantity} • Rate: ₹{(item.price || 0).toLocaleString()}
//                                 </Typography>

//                                 <Box sx={{ display: "flex", gap: 0.5, mt: 1, flexWrap: "wrap", alignItems: "center" }}>
//                                   {item.discount > 0 && (
//                                     <Chip label={`${item.discount}% OFF`} size="small" variant="outlined" color="success" sx={{ height: 16, fontSize: "0.6rem", borderRadius: 1 }} />
//                                   )}
//                                 </Box>
//                               </Box>

//                               <Box sx={{ width: { xs: "100%", md: "18%" }, display: { xs: "none", md: "block" }, textAlign: "right", pr: 3 }}>
//                                 <Typography variant="body2" sx={{ fontWeight: 600, color: "#374151" }}>
//                                   ₹{((item.discounted_price || item.price) * item.quantity).toLocaleString()}
//                                 </Typography>
//                                 {item.discount > 0 && (
//                                   <Typography variant="caption" sx={{ textDecoration: "line-through", color: "text.secondary", display: "block", mt: 0.5 }}>
//                                     ₹{(item.price * item.quantity).toLocaleString()}
//                                   </Typography>
//                                 )}
//                               </Box>

//                               <Box sx={{ width: { xs: "100%", md: "22%" }, display: "flex", justifyContent: { xs: "flex-start", md: "flex-end" }, pt: { xs: 2, md: 0 } }}>
//                                 <Button
//                                   size="small"
//                                   variant="contained"
//                                   disableElevation
//                                   fullWidth={{ xs: true, md: false }}
//                                   onClick={() => handleOpenRating(item.product)}
//                                   sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.75rem", borderRadius: "8px", px: 2.5, py: 0.75, bgcolor: "#efeeff", color: "#4f46e5", "&:hover": { bgcolor: "#e0ddff" } }}
//                                 >
//                                   Give Rating
//                                 </Button>
//                               </Box>
//                             </Box>
//                           ))}
//                         </Box>
//                       </Collapse>
//                     )}
//                   </Box>
//                 </TableContainer>

//                 {/* FOOTER BLOCKS FOR SHIPPED META ADDRESS DATA */}
//                 <Box sx={{ mt: 2.5, bgcolor: "#f8fafc", borderRadius: 3, p: 2.5, border: "1px solid #e5e7eb" }}>
//                   <Grid container spacing={3}>
//                     <Grid size={{ xs: 12, sm: 7 }}>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: "block", mb: 0.5, letterSpacing: "0.5px" }}>DELIVERY DESTINATION</Typography>
//                       <Typography variant="body2" sx={{ fontWeight: 500, color: "#4b5563", lineHeight: 1.5 }}>
//                         {order.shippingAddress 
//                           ? `${order.shippingAddress.label || ""}: ${order.shippingAddress.street || ""}, ${order.shippingAddress.city || ""}, ${order.shippingAddress.state || ""} - ${order.shippingAddress.pincode || ""}, ${order.shippingAddress.country || ""}`
//                           : "No address specified"}
//                       </Typography>
//                     </Grid>
//                     <Grid size={{ xs: 12, sm: 5 }}>
//                       <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: "block", mb: 0.5, letterSpacing: "0.5px" }}>TRANSACTION METHOD</Typography>
//                       <Typography variant="body2" sx={{ fontWeight: 600, color: "#111827", fontFamily: "monospace" }}>{order.paymentID || "N/A"}</Typography>
//                     </Grid>
//                   </Grid>
//                 </Box>
//               </Box>
//             </Paper>
//           );
//         })
//       )}

//       {/* RATING DIALOG MODAL POPUP */}
//       <Dialog open={ratingDialogOpen} onClose={handleCloseRating} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
//         <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>Product Rating</DialogTitle>
//         <DialogContent dividers sx={{ borderColor: "#f1f5f9" }}>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
//             How would you rate your experience with this item?
//           </Typography>
//           <Typography variant="subtitle1" sx={{ fontWeight: 700, color: "#111827" }}>
//             {selectedProduct?.name || "Product Item"}
//           </Typography>
//           <Box sx={{ mt: 2.5, py: 3, textAlign: "center", bgcolor: "#f8fafc", borderRadius: 3, border: "1px dashed #e2e8f0" }}>
//             <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500 }}>[ Rating Stars Component Placeholder ]</Typography>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 2.5, gap: 1 }}>
//           <Button onClick={handleCloseRating} color="inherit" sx={{ textTransform: "none", fontWeight: 600, borderRadius: 2 }}>Cancel</Button>
//           <Button onClick={handleSubmitRating} variant="contained" disableElevation sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2, bgcolor: "#4f46e5", "&:hover": { bgcolor: "#4338ca" } }}>Submit Rating</Button>
//         </DialogActions>
//       </Dialog>

//       {/* CENTRAL NOTIFICATION TOAST BAR COMPONENT */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={4000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
//       >
//         <MuiAlert
//           onClose={handleCloseSnackbar}
//           severity={snackbar.severity}
//           variant="filled"
//           elevation={4}
//           sx={{ borderRadius: 2, fontWeight: 600, px: 2.5 }}
//         >
//           {snackbar.message}
//         </MuiAlert>
//       </Snackbar>
//     </Box>
//   );
// }

// export default OrderList;


import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Chip,
  Button,
  Collapse,
  CircularProgress,
  Snackbar,
  Alert as MuiAlert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";
import Grid from "@mui/material/Grid";
import api from "../../../api/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { getCustomerOrder, deleteCustomerOrder } from "../../../Redux/Slices/CustomerSlice/CustomerOrderSlice";
import { useNavigate } from "react-router-dom";

const ExpandMoreIcon = () => <span style={{ fontSize: "11px", marginLeft: "4px" }}>▼</span>;
const ExpandLessIcon = () => <span style={{ fontSize: "11px", marginLeft: "4px" }}>▲</span>;

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
  const navigate = useNavigate();
  const orders = useSelector((state) => state.customerOrder.orderlist) || [];
  
  const [loading, setLoading] = useState(true);
  const [expandedOrders, setExpandedOrders] = useState([]);
  
  // States for Cancellation Reason Dialog
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const triggerSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  async function fetchOrders() {
    try {
      setLoading(true);
      const response = await api.get("/orders/getOrders");
      const fallbackOrdersArray = response.data?.orders || (Array.isArray(response.data) ? response.data : []);
      dispatch(getCustomerOrder(fallbackOrdersArray));
    } catch (err) {
      console.error("Error fetching order history:", err);
      triggerSnackbar("Failed to sync historical orders list.", "error");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [dispatch]);

  const toggleOrderExpand = (orderId) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]
    );
  };

  // Open the Cancellation prompt modal
  const handleOpenCancelDialog = (orderId) => {
    setOrderToCancel(orderId);
    setCancelDialogOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
    setOrderToCancel(null);
    setCancelReason("");
  };

  // Submit Cancellation with Reason to Backend
  const handleConfirmCancelOrder = async () => {
    if (!cancelReason.trim()) {
      triggerSnackbar("Please provide a reason for cancellation.", "warning");
      return;
    }

    try {
      const response = await api.delete(`/orderStatus/customerCancelling/${orderToCancel}`, {
        data: { reason: cancelReason } // Sending cancel reason payload
      });

      if (response.status === 200 || response.status === 204) {
        // Optimistic UI state adjustment: update client side directly instead of firing fetchOrders()
        const updatedOrdersList = orders.map((o) => {
          if (o._id === orderToCancel) {
            return { 
              ...o, 
              orderStatus: "order cancelled",
              cancelReason: cancelReason,
              cancelledBy: "Customer" 
            };
          }
          return o;
        });
        
        // Update Redux state store
        dispatch(getCustomerOrder(updatedOrdersList));
        triggerSnackbar("Order canceled successfully.", "warning");
        handleCloseCancelDialog();
      }
    } catch (err) {
      console.error("Cancellation routing error:", err);
      triggerSnackbar("Failed to request order cancellation.", "error");
    }
  };

  const handleNavigateToReview = (productId) => {
    if (productId) {
      navigate(`/customer/reviews/${productId}`);
    } else {
      triggerSnackbar("Product ID target is missing.", "error");
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", minHeight: "70vh", gap: 2 }}>
        <CircularProgress size={40} thickness={4} sx={{ color: "#4f46e5" }} />
        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>Syncing account orders...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 5 }, maxWidth: "1200px", margin: "0 auto", minHeight: "100vh" }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 900, color: "#0f172a", letterSpacing: "-0.75px" }}>
        Order Dashboard
      </Typography>

      {orders.length === 0 ? (
        <Paper elevation={0} sx={{ p: 8, textAlign: "center", maxWidth: 500, margin: "40px auto", border: "2px dashed #cbd5e1", borderRadius: 4, bgcolor: "#f8fafc" }}>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#475569" }}>No Orders Tracked</Typography>
          <Typography variant="body2" color="text.secondary">Looks like your transaction history is empty.</Typography>
        </Paper>
      ) : (
        orders.map((order) => {
          const isExpanded = expandedOrders.includes(order._id);
          const productsArray = order.products || [];
          const isCancelled = order.orderStatus?.toLowerCase() === "order cancelled";
          const isDelivered = order.orderStatus?.toLowerCase() === "order delivered";
          const firstProduct = productsArray[0];
          const remainingProducts = productsArray.slice(1);
          
          const showReviewOption = isDelivered || isCancelled;

          if (!firstProduct) return null;

          const firstProductOriginalPrice = firstProduct.price || 0;
          const firstProductFinalPrice = firstProduct.discounted_price || firstProductOriginalPrice;
          const firstProductDiscountAmount = firstProductOriginalPrice - firstProductFinalPrice;

          return (
            <Paper
              key={order._id}
              elevation={0}
              sx={{
                mb: 5,
                borderRadius: 4,
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.02), 0 4px 6px -4px rgba(0,0,0,0.02)",
                overflow: "hidden",
                bgcolor: "#fff",
              }}
            >
              {/* HEADER METADATA PANEL */}
              <Box sx={{ p: 3, bgcolor: "#f8fafc", display: "flex", flexDirection: { xs: "column", md: "row" }, alignItems: { xs: "flex-start", md: "center" }, justifyContent: "space-between", gap: 2, borderBottom: "1px solid #e2e8f0" }}>
                <Box sx={{ display: "flex", gap: { xs: 2.5, sm: 4 }, flexWrap: "wrap" }}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Order ID</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: "#1e293b", fontFamily: "monospace", bgcolor: "#e2e8f0", px: 1, py: 0.5, borderRadius: 1.5 }}>{order._id}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Date Logged</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155" }}>
                      {order.createdAt ? order.createdAt.split("T")[0] : "N/A"}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Grand Total</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 800, color: "#4f46e5" }}>₹{(order.final_price || order.total || 0).toLocaleString()}</Typography>
                  </Box>
                  
                  {order.couponCode && (
                    <Box>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, textTransform: "uppercase", display: "block", mb: 0.5, letterSpacing: "0.5px" }}>Coupon Applied</Typography>
                      <Chip label={order.couponCode} size="small" sx={{ fontWeight: 800, bgcolor: "#fffbeb", color: "#b45309", border: "1px dashed #f59e0b", borderRadius: 1.5 }} />
                    </Box>
                  )}
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, width: { xs: "100%", md: "auto" }, justifyContent: { xs: "space-between", md: "flex-end" } }}>
                  <Chip
                    label={order.orderStatus || "order placed"}
                    size="medium"
                    sx={{
                      fontWeight: 800,
                      borderRadius: 2.5,
                      textTransform: "uppercase",
                      fontSize: "0.72rem",
                      px: 1,
                      bgcolor: isDelivered ? "#dcfce7" : isCancelled ? "#fee2e2" : "#e0e7ff",
                      color: isDelivered ? "#15803d" : isCancelled ? "#991b1b" : "#4338ca",
                    }}
                  />
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {isCancellable(order.orderStatus) && (
                      <Button size="small" variant="contained" color="error" onClick={() => handleOpenCancelDialog(order._id)} sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2, boxShadow: "none", "&:hover": { bgcolor: "#dc2626", boxShadow: "none" } }}>
                        Cancel Order
                      </Button>
                    )}
                  </Box>
                </Box>
              </Box>

              {/* STEPPER TRACKING / CANCELLED REASON DETAILS PANEL */}
              {!isCancelled ? (
                <Box sx={{ p: 4, width: "100%", overflowX: "auto", bgcolor: "#fff" }}>
                  <Box sx={{ minWidth: 720 }}>
                    <Stepper activeStep={getStatusStep(order.orderStatus)} alternativeLabel>
                      {STEPS.map((label) => (
                        <Step key={label}>
                          <StepLabel sx={{ 
                            "& .MuiStepLabel-label": { fontSize: "0.75rem", textTransform: "uppercase", fontWeight: 700, mt: 1 },
                            "& .Mui-active": { color: "#4f46e5 !important" },
                            "& .Mui-completed": { color: "#16a34a !important" }
                          }}>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                </Box>
              ) : (
                <Box sx={{ p: 3, bgcolor: "#fff5f5", borderBottom: "1px solid #fee2e2", display: "flex", flexDirection: "column", gap: 0.5 }}>
                  <Typography variant="body2" sx={{ color: "#c53030", fontWeight: 700 }}>
                    ✕ Order Cancelled By: {order.cancelledBy || "Customer"}
                  </Typography>
                  {order.cancelReason && (
                    <Typography variant="body2" sx={{ color: "#7f1d1d", fontWeight: 500 }}>
                      <strong>Reason for Cancellation:</strong> {order.cancelReason}
                    </Typography>
                  )}
                </Box>
              )}

              {/* TABULAR LAYOUT STRUCTURE */}
              <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0, borderTop: "1px solid #e2e8f0" }}>
                <Table sx={{ minWidth: 650 }} aria-label="product items table">
                  <TableHead sx={{ bgcolor: "#f8fafc" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 800, color: "#475569", width: "12%" }}>Item</TableCell>
                      <TableCell sx={{ fontWeight: 800, color: "#475569", width: "45%" }}>Product Details &amp; Price Breakdown</TableCell>
                      <TableCell align="center" sx={{ fontWeight: 800, color: "#475569", width: "13%" }}>Quantity</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", width: "15%" }}>Total Cost</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: "#475569", width: "15%" }}>
                        {productsArray.length > 1 ? (
                          <Button
                            size="small"
                            variant="text"
                            endIcon={isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            onClick={() => toggleOrderExpand(order._id)}
                            sx={{ textTransform: "none", fontWeight: 800, fontSize: "0.75rem", color: "#4f46e5", p: 0 }}
                          >
                            {isExpanded ? "Hide Items" : `+${remainingProducts.length} Items`}
                          </Button>
                        ) : (
                          "Action"
                        )}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  
                  <TableBody>
                    <TableRow sx={{ "&:hover": { bgcolor: "#fafafa" } }}>
                      <TableCell>
                        <Box component="img" src={firstProduct.image || "https://placehold.co/50x50.png"} alt="thumbnail" sx={{ width: 55, height: 55, borderRadius: 2, border: "1px solid #e2e8f0", objectFit: "cover" }} />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: "#1e293b", mb: 0.5 }}>
                          {firstProduct.product?.name || "Product Item Reference"}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap", mt: 0.5 }}>
                          <Typography variant="caption" sx={{ color: "text.secondary", fontWeight: 500 }}>
                            Base Rate: <span style={{ textDecoration: firstProduct.discount > 0 ? "line-through" : "none", fontWeight: 600 }}>₹{firstProductOriginalPrice.toLocaleString()}</span>
                          </Typography>
                          {firstProduct.discount > 0 && (
                            <>
                              <Chip label={`${firstProduct.discount}% OFF`} size="small" sx={{ height: 18, fontSize: "0.62rem", fontWeight: 800, bgcolor: "#f0fdf4", color: "#16a34a", borderRadius: 1 }} />
                              <Typography variant="caption" sx={{ color: "#16a34a", fontWeight: 700 }}>(Saved ₹{firstProductDiscountAmount.toLocaleString()}/unit)</Typography>
                              <Typography variant="caption" sx={{ color: "#4f46e5", fontWeight: 700 }}>Active Rate: ₹{firstProductFinalPrice.toLocaleString()}</Typography>
                            </>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="center" sx={{ fontWeight: 600, color: "#334155" }}>
                        {firstProduct.quantity}
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                          <Typography variant="body2" sx={{ fontWeight: 800, color: "#0f172a" }}>
                            ₹{(firstProductFinalPrice * firstProduct.quantity).toLocaleString()}
                          </Typography>
                          {firstProduct.discount > 0 && (
                            <Typography variant="caption" sx={{ textDecoration: "line-through", color: "#94a3b8", fontWeight: 500 }}>
                              ₹{(firstProductOriginalPrice * firstProduct.quantity).toLocaleString()}
                            </Typography>
                          )}
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        {showReviewOption && (
                          <Button
                            size="small"
                            variant="contained"
                            disableElevation
                            onClick={() => handleNavigateToReview(firstProduct.product?._id || firstProduct.product)}
                            sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.72rem", bgcolor: "#e0e7ff", color: "#4f46e5", borderRadius: 1.5, "&:hover": { bgcolor: "#c7d2fe" } }}
                          >
                            Give Review
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* COLLAPSED EXPANSION RENDER BLOCK */}
              {productsArray.length > 1 && (
                <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                  <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 0, bgcolor: "#f8fafc", borderTop: "1px dashed #e2e8f0" }}>
                    <Table sx={{ minWidth: 650 }} size="small">
                      <TableBody>
                        {remainingProducts.map((item, index) => {
                          const itemOriginalPrice = item.price || 0;
                          const itemFinalPrice = item.discounted_price || itemOriginalPrice;
                          const itemDiscountAmount = itemOriginalPrice - itemFinalPrice;

                          return (
                            <TableRow key={item._id || index} sx={{ "&:hover": { bgcolor: "#f1f5f9" } }}>
                              <TableCell sx={{ width: "12%", pl: 3 }}>
                                <Box component="img" src={item.image || "https://placehold.co/50x50.png"} alt="thumbnail" sx={{ width: 44, height: 44, borderRadius: 1.5, border: "1px solid #e2e8f0", objectFit: "cover" }} />
                              </TableCell>
                              <TableCell sx={{ width: "45%" }}>
                                <Typography variant="body2" sx={{ fontWeight: 600, color: "#334155", mb: 0.5 }}>
                                  {item.product?.name || "Product Variant Item Asset"}
                                </Typography>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flexWrap: "wrap" }}>
                                  <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                    Base: <span style={{ textDecoration: item.discount > 0 ? "line-through" : "none" }}>₹{itemOriginalPrice.toLocaleString()}</span>
                                  </Typography>
                                  {item.discount > 0 && (
                                    <>
                                      <Chip label={`${item.discount}% OFF`} size="small" sx={{ height: 16, fontSize: "0.58rem", fontWeight: 700, bgcolor: "#f0fdf4", color: "#16a34a", borderRadius: 0.5 }} />
                                      <Typography variant="caption" sx={{ color: "#16a34a", fontSize: "0.72rem" }}>(-₹{itemDiscountAmount.toLocaleString()})</Typography>
                                      <Typography variant="caption" sx={{ color: "#4f46e5", fontWeight: 600 }}>Now: ₹{itemFinalPrice.toLocaleString()}</Typography>
                                    </>
                                  )}
                                </Box>
                              </TableCell>
                              <TableCell align="center" sx={{ width: "13%", fontWeight: 600, color: "#475569" }}>
                                {item.quantity}
                              </TableCell>
                              <TableCell align="right" sx={{ width: "15%" }}>
                                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                                  <Typography variant="body2" sx={{ fontWeight: 700, color: "#1e293b" }}>
                                    ₹{(itemFinalPrice * item.quantity).toLocaleString()}
                                  </Typography>
                                  {item.discount > 0 && (
                                    <Typography variant="caption" sx={{ textDecoration: "line-through", color: "#94a3b8", fontSize: "0.7rem" }}>
                                      ₹{(itemOriginalPrice * item.quantity).toLocaleString()}
                                    </Typography>
                                  )}
                                </Box>
                              </TableCell>
                              <TableCell align="right" sx={{ width: "15%" }}>
                                {showReviewOption && (
                                  <Button
                                    size="small"
                                    variant="contained"
                                    disableElevation
                                    onClick={() => handleNavigateToReview(item.product?._id || item.product)}
                                    sx={{ textTransform: "none", fontWeight: 700, fontSize: "0.7rem", bgcolor: "#e0e7ff", color: "#4f46e5", borderRadius: 1.5, "&:hover": { bgcolor: "#c7d2fe" } }}
                                  >
                                    Give Review
                                  </Button>
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Collapse>
              )}

              {/* SHIPPING & DESTINATION INFO */}
              <Divider />
              <Box sx={{ p: 3, bgcolor: "#fff" }}>
                <Grid container spacing={3}>
                  {order.shippingAddress && (
                    <Grid size={{ xs: 12, sm: 7 }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, display: "block", mb: 0.5, letterSpacing: "0.5px" }}>SHIPPING LOGISTICS LOCATION</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: "#475569", lineHeight: 1.5 }}>
                        {`${order.shippingAddress.label || "Address"}: ${order.shippingAddress.street || ""}, ${order.shippingAddress.city || ""}, ${order.shippingAddress.state || ""} - ${order.shippingAddress.pincode || ""}`}
                      </Typography>
                    </Grid>
                  )}
                  {order.paymentID && (
                    <Grid size={{ xs: 12, sm: 5 }} sx={{ textAlign: { sm: "right" } }}>
                      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, display: "block", mb: 0.5, letterSpacing: "0.5px" }}>TXN TRANSACTION CODE</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: "#0f172a", fontFamily: "monospace" }}>{order.paymentID}</Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </Paper>
          );
        })
      )}

      {/* CANCELLATION REASON INPUT PROMPT DIALOG */}
      <Dialog open={cancelDialogOpen} onClose={handleCloseCancelDialog} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 4, p: 1 } }}>
        <DialogTitle sx={{ fontWeight: 900, pb: 1 }}>Cancel Your Order</DialogTitle>
        <DialogContent dividers sx={{ borderColor: "#f1f5f9" }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Please let us know why you are cancelling this order. This helps us improve our service configuration parameters.
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            placeholder="Type cancellation reason context..."
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            InputProps={{ sx: { borderRadius: 3, fontSize: "0.87rem" } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5, gap: 1 }}>
          <Button onClick={handleCloseCancelDialog} color="inherit" sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2 }}>Keep Order</Button>
          <Button onClick={handleConfirmCancelOrder} variant="contained" color="error" disableElevation sx={{ textTransform: "none", fontWeight: 700, borderRadius: 2 }}>Confirm Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* TOAST SYSTEM */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <MuiAlert onClose={handleCloseSnackbar} severity={snackbar.severity} variant="filled" elevation={6} sx={{ borderRadius: 3, fontWeight: 700, px: 2.5 }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default OrderList;
