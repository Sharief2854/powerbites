
// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, CardContent, Divider, Stepper, Step, StepLabel, 
//   Avatar, Chip, Stack, Paper, IconButton, TableContainer, Table, 
//   TableHead, TableRow, TableCell, TableBody, Button, Snackbar,
//   Alert as MuiAlert, Dialog, DialogTitle, DialogContent, DialogActions,
//   TextField, CircularProgress
// } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import FastfoodIcon from '@mui/icons-material/Fastfood';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import { useDispatch, useSelector } from 'react-redux';
// import api from '../../../api/axiosConfig';
// import { getOrder } from '../../../Redux/Slices/AdminSlice/OrderListSlice';

// const STATUS_STEPS = ["order placed", "preparing order", "order shipped", "order delivered"];

// const STEP_DETAILS = [
//   { label: 'Order Placed' },
//   { label: 'Preparing Order' },
//   { label: 'Order Shipped' },
//   { label: 'Order Delivered' }
// ];

// export default function OrderRecordsDashboard() {
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [viewMode, setViewMode] = useState('list'); 
//   const [loading, setLoading] = useState(true);
  
//   // Tracks the highlighted tracking index dynamically
//   const [interactiveStepIndex, setInteractiveStepIndex] = useState(-1);

//   // Custom Cancellation Dialog State
//   const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
//   const [cancelReasonInput, setCancelReasonInput] = useState("");
//   const [orderIdToCancel, setOrderIdToCancel] = useState(null);

//   // Toast Snackbar State
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success"
//   });

//   const dispatch = useDispatch();
//   const rawOrderList = useSelector((state) => state.orderlist?.orderlist || []);

//   const triggerSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleCloseSnackbar = (event, reason) => {
//     if (reason === "clickaway") return;
//     setSnackbar((prev) => ({ ...prev, open: false }));
//   };

//   const parseData = (rawOrders) => {
//     if (!Array.isArray(rawOrders)) return [];
//     return rawOrders.map(order => ({
//       _id: order._id,
//       paymentID: order.paymentID || "N/A",
//       orderIdClean: order.paymentID ? `#${order.paymentID.split('_')[1] || order._id.slice(-6)}` : `#${order._id.slice(-6)}`,
//       name: order.customer?.name || "Unknown Customer",
//       email: order.customer?.email || "No email linked",
//       avatarColor: "#3B82F6",
//       orderStatus: order.orderStatus || "order placed",
//       cancelledBy: order.cancelledBy || "system",
//       cancelReason: order.cancelReason || "No explicit reason submitted.",
//       addressObj: {
//         street: order.shippingAddress?.street || "N/A",
//         city: order.shippingAddress?.city || "N/A",
//         state: order.shippingAddress?.state || "N/A",
//         pincode: order.shippingAddress?.pincode || "N/A",
//         country: order.shippingAddress?.country || "India",
//         label: order.shippingAddress?.label || "HOME"
//       },
//       formattedAddress: order.shippingAddress 
//         ? `${order.shippingAddress.street || ''}, ${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''} - ${order.shippingAddress.pincode || ''}`
//         : "No shipping address attached",
//       createdAt: order.createdAt 
//         ? new Date(order.createdAt).toLocaleDateString('en-US', {
//             year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
//           }) 
//         : "N/A",
//       finalPrice: order.final_price || order.total || 0,
//       products: Array.isArray(order.products) ? order.products.map((p, pIndex) => ({
//         id: p._id || `prod-${pIndex}`,
//         name: p.product?.name || "Unknown Item",
//         quantity: p.quantity || 1,
//         price: p.price || 0,
//         discounted_price: p.discounted_price || p.price || 0,
//         category: p.product?.category || "Food Item",
//         image: p.image ? p.image.replace(/\\/g, '/') : ""
//       })) : []
//     }));
//   };

//   const orders = parseData(rawOrderList);
//   const activeOrder = orders.find(o => o._id === selectedOrderId) || orders[0];
//   const isCurrentlyCancelled = activeOrder?.orderStatus?.toLowerCase() === "order cancelled";

//   useEffect(() => {
//     async function fetchFromBackend() {
//       try {
//         setLoading(true);
//         const response = await api.get("/orders/admin/getAllOrders"); 
//         const backendOrders = response.data.orders || response.data || [];
//         console.log("Backend fetch response:", backendOrders);
//         dispatch(getOrder(backendOrders));
//       } catch (err) {
//         console.error("Backend connection fetch error:", err);
//         triggerSnackbar("Failed to download historical logistics data.", "error");
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchFromBackend();
//   }, [dispatch]);

//   // Synchronizes the step visualization automatically with the active backend status
//   useEffect(() => {
//     if (activeOrder && !isCurrentlyCancelled) {
//       const backendStepIndex = STATUS_STEPS.indexOf(activeOrder.orderStatus?.toLowerCase());
//       setInteractiveStepIndex(backendStepIndex !== -1 ? backendStepIndex : 0);
//     } else {
//       setInteractiveStepIndex(-1);
//     }
//   }, [selectedOrderId, activeOrder, isCurrentlyCancelled]);

//   const handleOpenCancelDialog = (orderId) => {
//     setOrderIdToCancel(orderId);
//     setCancelReasonInput("");
//     setCancelDialogOpen(true);
//   };

//   const handleCloseCancelDialog = () => {
//     setCancelDialogOpen(false);
//     setOrderIdToCancel(null);
//     setCancelReasonInput("");
//   };

//   const handleConfirmCancelOrder = async () => {
//     if (!cancelReasonInput.trim()) {
//       triggerSnackbar("Please write a cancellation reason first.", "warning");
//       return;
//     }

//     try {
//       await api.post(`/orderStatus/adminCancelling/${orderIdToCancel}`, {
//         reason: cancelReasonInput.trim()
//       });

//       const updatedList = rawOrderList.map(order => 
//         order._id === orderIdToCancel ? { 
//           ...order, 
//           orderStatus: "order cancelled", 
//           cancelledBy: "admin",
//           cancelReason: cancelReasonInput.trim(),
//           cancelledAt: new Date() 
//         } : order
//       );
      
//       dispatch(getOrder(updatedList));
//       handleCloseCancelDialog();
//       triggerSnackbar("Order terminated successfully.", "success");
//     } catch (err) {
//       console.error("Failed to cancel order:", err);
//       triggerSnackbar("Error processing cancellation request.", "error");
//     }
//   };

//   const handleUpdateStatus = async (orderId, nextStatus, stepIndex) => {
//     try {
//       await api.post(`/orderStatus/updateStatus/${orderId}`, {
//         status: nextStatus
//       });

//       const updatedList = rawOrderList.map(order => 
//         order._id === orderId ? { ...order, orderStatus: nextStatus } : order
//       );
//       dispatch(getOrder(updatedList));
//       setInteractiveStepIndex(stepIndex);
//       triggerSnackbar(`Order workflow shifted to "${nextStatus}".`, "success");
//     } catch (err) {
//       console.error("Backend updates sync failure error:", err);
//       triggerSnackbar("Error executing status state transition update.", "error");
//     }
//   };

//   const handleStepperStepClick = (orderId, stepIndex) => {
//     const targetStatus = STATUS_STEPS[stepIndex];
//     handleUpdateStatus(orderId, targetStatus, stepIndex);
//   };

//   const getStatusChipColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case 'order delivered': return 'success';
//       case 'order shipped': return 'info';
//       case 'preparing order': return 'warning';
//       case 'order cancelled': return 'error';
//       default: return 'primary';
//     }
//   };

//   if (loading) return <Box sx={{ p: 6, textAlign: 'center' }}><CircularProgress size={30} /></Box>;
//   if (orders.length === 0) return <Box sx={{ p: 6, textAlign: 'center' }}><Typography variant="subtitle1" color="text.secondary">No transactional data collections present inside system routing logs.</Typography></Box>;

//   return (
//     <Box sx={{ p: { xs: 2, sm: 3, md: 5 }, bgcolor: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
//       {viewMode === 'list' ? (
        
//         // ================= PAGE 1: OVERVIEW TABLE =================
//         <Box>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
//             <Box>
//               <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em' }}>
//                 Master Enterprise Logistics Dashboard
//               </Typography>
//               <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
//                 Monitoring total ledger pipeline containing ({orders.length}) total indices safely routed.
//               </Typography>
//             </Box>
//           </Box>
          
//           <TableContainer 
//             component={Paper} 
//             elevation={0}
//             variant="outlined" 
//             sx={{ borderRadius: '16px', borderColor: '#E2E8F0', overflowX: 'auto', bgcolor: '#FFFFFF' }}
//           >
//             <Table sx={{ minWidth: 900 }}>
//               <TableHead sx={{ bgcolor: '#F1F5F9' }}>
//                 <TableRow>
//                   <TableCell sx={{ color: '#475569', fontWeight: 700 }}>Order Ref Mapping</TableCell>
//                   <TableCell sx={{ color: '#475569', fontWeight: 700 }}>User Identity</TableCell>
//                   <TableCell sx={{ color: '#475569', fontWeight: 700 }}>System Registration Timestamp</TableCell>
//                   <TableCell sx={{ color: '#475569', fontWeight: 700 }}>Current Node Status</TableCell>
//                   <TableCell sx={{ color: '#475569', fontWeight: 700 }}>Settled Value</TableCell>
//                   <TableCell align="center" sx={{ color: '#475569', fontWeight: 700 }}>Inspect</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {orders.map((order) => (
//                   <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#F8FAFC' } }}>
//                     <TableCell>
//                       <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#94A3B8', display: 'block' }}>
//                         ID: {order._id}
//                       </Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Box display="flex" alignItems="center" gap={1.5}>
//                         <Avatar sx={{ bgcolor: '#EFF6FF', color: '#3B82F6', width: 36, height: 36, fontSize: '14px', fontWeight: 700 }}>
//                           {order.name.charAt(0).toUpperCase()}
//                         </Avatar>
//                         <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B' }}>{order.name}</Typography>
//                         <Box>
//                           <Typography variant="caption" color="text.secondary" display="block">{order.email}</Typography>
//                           {console.log(order.shippingAddress)}
//                           <Typography variant="caption" color="text.secondary" display="block">{order.shippingAddress}</Typography>
//                         </Box>
//                       </Box>
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" sx={{ color: '#334155', fontWeight: 500 }}>{order.createdAt}</Typography>
//                     </TableCell>
//                     <TableCell>
//                       <Chip 
//                         label={order.orderStatus.toUpperCase()} 
//                         size="small" 
//                         color={getStatusChipColor(order.orderStatus)} 
//                         sx={{ fontSize: '10px', fontWeight: 800, borderRadius: '6px' }} 
//                       />
//                     </TableCell>
//                     <TableCell>
//                       <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A' }}>
//                         ₹{order.finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//                       </Typography>
//                     </TableCell>
//                     <TableCell align="center">
//                       <IconButton 
//                         size="small" 
//                         color="primary" 
//                         onClick={() => {
//                           setSelectedOrderId(order._id);
//                           setViewMode('details');
//                         }}
//                         sx={{ backgroundColor: '#F0F9FF', border: '1px solid #E0F2FE', '&:hover': { backgroundColor: '#BAE6FD' } }}
//                       >
//                         <VisibilityIcon fontSize="small" sx={{ color: '#0284C7' }} />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       ) : (
        
//         // ================= PAGE 2: GRANULAR DETAILS PAGE =================
//         <Box>
//           <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}>
//             <Button 
//               startIcon={<ArrowBackIcon />} 
//               onClick={() => setViewMode('list')} 
//               sx={{ fontWeight: 700, textTransform: 'none', color: '#475569' }}
//             >
//               Return to Ledger Index Array
//             </Button>
            
//             {!isCurrentlyCancelled && (
//               <Button 
//                 variant="contained" 
//                 disableElevation
//                 color="error" 
//                 onClick={() => handleOpenCancelDialog(activeOrder._id)}
//                 sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700, px: 3, bgcolor: '#EF4444' }}
//               >
//                 Terminate Placement
//               </Button>
//             )}
//           </Box>

//           <Grid container spacing={4}>
//             {/* Products Column */}
//             <Grid size={{ xs: 12, lg: 7 }}>
//               <Stack spacing={3}>
//                 <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
//                   <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                     <ReceiptLongIcon sx={{ color: '#64748B' }} />
//                     <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1E293B' }}>Manifest Breakdown Ledger</Typography>
//                   </Box>
//                   <CardContent sx={{ p: 3 }}>
//                     {activeOrder.products.map((item, idx) => {
//                       const hasDiscount = item.discounted_price < item.price;
//                       return (
//                         <Box key={item.id}>
//                           <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, py: 2.5, gap: 2 }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                               <Avatar 
//                                 variant="rounded" 
//                                 src={item.image || undefined} 
//                                 sx={{ width: 64, height: 64, bgcolor: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' }}
//                               >
//                                 {!item.image && <FastfoodIcon />}
//                               </Avatar>
//                               <Box>
//                                 <Typography variant="body1" sx={{ fontWeight: 700, color: '#0F172A' }}>{item.name}</Typography>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
//                                   <Chip label={item.category} size="small" variant="outlined" sx={{ fontSize: '11px', height: '22px', borderRadius: '6px' }} />
//                                   <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13px' }}>
//                                     Units allocated: <strong>{item.quantity}</strong>
//                                   </Typography>
//                                 </Box>
//                               </Box>
//                             </Box>

//                             <Box sx={{ textAlign: { xs: 'left', sm: 'right' }, minWidth: '100px' }}>
//                               {hasDiscount ? (
//                                 <>
//                                   <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94A3B8', display: 'block' }}>
//                                     ₹{(item.price * item.quantity).toLocaleString('en-IN')}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ fontWeight: 800, color: '#10B981' }}>
//                                     ₹{(item.discounted_price * item.quantity).toLocaleString('en-IN')}
//                                   </Typography>
//                                 </>
//                               ) : (
//                                 <Typography variant="body1" sx={{ fontWeight: 800, color: '#1E293B' }}>
//                                   ₹{(item.price * item.quantity).toLocaleString('en-IN')}
//                                 </Typography>
//                               )}
//                             </Box>
//                           </Box>
//                           {idx < activeOrder.products.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
//                         </Box>
//                       );
//                     })}
//                   </CardContent>
//                 </Paper>

//                 <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', p: 3, bgcolor: '#FFFFFF' }}>
//                   <Box display="flex" justifyContent="space-between" alignItems="center">
//                     <Typography variant="body1" sx={{ fontWeight: 800, color: '#0F172A' }}>Aggregate Audited Total</Typography>
//                     <Typography variant="h4" sx={{ fontWeight: 900, color: '#3B82F6', letterSpacing: '-0.03em' }}>
//                       ₹{activeOrder.finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//                     </Typography>
//                   </Box>
//                 </Paper>
//               </Stack>
//             </Grid>

//             {/* Operations Column */}
//             <Grid size={{ xs: 12, lg: 5 }}>
//               <Stack spacing={3}>
//                 <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
//                   <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                     <AccountCircleIcon sx={{ color: '#64748B' }} />
//                     <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1E293B' }}>Client & Destination Metadata</Typography>
//                   </Box>
//                   <Box sx={{ p: 3 }}>
//                     <Stack spacing={2.5}>
//                       <Box>
//                         <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }} display="block">RECIPIENT ACCOUNT</Typography>
//                         <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B', mt: 0.5 }}>{activeOrder.name}</Typography>
//                         <Typography variant="caption" sx={{ color: '#64748B' }}>{activeOrder.email}</Typography>
//                       </Box>
//                       <Divider sx={{ borderColor: '#F1F5F9' }} />
//                       <Box>
//                         <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }} display="block">SHIPPING ADDRESS ENDPOINT</Typography>
//                         <Box sx={{ mt: 1, p: 2, bgcolor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
//                           <Chip label={activeOrder.addressObj.label} size="small" sx={{ fontWeight: 800, fontSize: '9px', mb: 1 }} />
//                           <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155', lineHeight: 1.5 }}>
//                             {activeOrder.addressObj.street}, {activeOrder.addressObj.city}<br />
//                             {activeOrder.addressObj.state} - <strong>{activeOrder.addressObj.pincode}</strong><br />
//                             {activeOrder.addressObj.country}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     </Stack>
//                   </Box>
//                 </Paper>

//                 <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
//                   <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                     <LocalShippingIcon sx={{ color: '#64748B' }} />
//                     <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1E293B' }}>Logistics State Pipeline</Typography>
//                   </Box>
//                   <Box sx={{ p: 3 }}>
//                     {isCurrentlyCancelled ? (
//                       <Box sx={{ p: 2.5, bgcolor: '#FEF2F2', border: '1px dashed #FCA5A5', borderRadius: '12px', textAlign: 'center' }}>
//                         <Chip label="ORDER CANCELLED" color="error" sx={{ fontWeight: 900, px: 2 }} />
//                         <Typography variant="body2" color="error.main" sx={{ mt: 2, fontWeight: 700, textTransform: 'capitalize' }}>
//                           Cancelled By: {activeOrder.cancelledBy}
//                         </Typography>
//                         <Typography variant="body2" color="error.main" sx={{ mt: 0.5, fontWeight: 500, fontStyle: 'italic' }}>
//                           Reason: "{activeOrder.cancelReason}"
//                         </Typography>
//                       </Box>
//                     ) : (
//                       <Box>
//                         <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '12px', borderColor: '#E2E8F0', bgcolor: '#FAFAFA' }}>
//                           <Stepper 
//                             activeStep={interactiveStepIndex} 
//                             orientation="vertical" 
//                             sx={{
//                               '& .MuiStepIcon-root': { color: '#cbd5e1' },
//                               '& .MuiStepIcon-root.Mui-active': { color: '#3B82F6' },
//                               '& .MuiStepIcon-root.Mui-completed': { color: '#10B981' },
//                             }}
//                           >
//                             {STEP_DETAILS.map((step, index) => (
//                               <Step key={step.label} onClick={() => handleStepperStepClick(activeOrder._id, index)} sx={{ cursor: 'pointer' }}>
//                                 <StepLabel>
//                                   <Typography 
//                                     variant="body2" 
//                                     sx={{ 
//                                       fontWeight: interactiveStepIndex === index ? 800 : 600, 
//                                       color: interactiveStepIndex === index ? '#3B82F6' : '#475569' 
//                                     }}
//                                   >
//                                     {step.label}
//                                   </Typography>
//                                 </StepLabel>
//                               </Step>
//                             ))}
//                           </Stepper>
//                         </Paper>
//                       </Box>
//                     )}
//                   </Box>
//                 </Paper>
//               </Stack>
//             </Grid>
//           </Grid>
//         </Box>
//       )}

//       {/* CANCELLATION DIALOG REASON */}
//       <Dialog open={cancelDialogOpen} onClose={handleCloseCancelDialog} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
//         <DialogTitle sx={{ fontWeight: 800, pb: 1 }}>Provide Cancellation Reason</DialogTitle>
//         <DialogContent dividers sx={{ borderColor: "#f1f5f9" }}>
//           <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//             Please write the reason for cancelling this order layout index assignment below:
//           </Typography>
//           <TextField
//             autoFocus
//             fullWidth
//             multiline
//             rows={3}
//             variant="outlined"
//             placeholder="Type cancellation statement here..."
//             value={cancelReasonInput}
//             onChange={(e) => setCancelReasonInput(e.target.value)}
//             slotProps={{
//               htmlInput: { style: { fontSize: '14px', lineHeight: 1.5 } }
//             }}
//           />
//         </DialogContent>
//         <DialogActions sx={{ p: 2.5, gap: 1 }}>
//           <Button onClick={handleCloseCancelDialog} color="inherit" sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2 }}>
//             Cancel
//           </Button>
//           <Button onClick={handleConfirmCancelOrder} variant="contained" color="error" disableElevation sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}>
//             Submit Termination
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* TOAST MESSAGING SNACKBAR */}
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


import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Avatar, Chip, Paper, IconButton, 
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Snackbar, Alert as MuiAlert, Tooltip
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axiosConfig';
import { getOrder } from '../../../Redux/Slices/AdminSlice/OrderListSlice';

export default function OrderRecordsTable() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rawOrderList = useSelector((state) => state.orderlist?.orderlist || []);

  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const triggerSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const parseData = (rawOrders) => {
    if (!Array.isArray(rawOrders)) return [];
    return rawOrders.map(order => {
      const addr = order.shippingAddress;
      const formattedAddress = addr
        ? `${addr.street || ''}, ${addr.city || ''}, ${addr.state || ''} ${addr.pincode ? `- ${addr.pincode}` : ''}`.replace(/^,\s*,?/, '').trim()
        : "No address attached";

      return {
        _id: order._id,
        email: order.customer?.email || "No email linked",
        name: order.customer?.name || "Unknown Customer",
        orderStatus: order.orderStatus || "order placed",
        finalPrice: order.final_price || order.total || 0,
        fullShippingAddress: formattedAddress || "N/A",
        city: addr?.city || "N/A",
        addressLabel: addr?.label || "HOME",
        createdAt: order.createdAt 
          ? new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            }) 
          : "N/A",
      };
    });
  };

  const orders = parseData(rawOrderList);

  useEffect(() => {
    async function fetchFromBackend() {
      try {
        setLoading(true);
        const response = await api.get("/orders/admin/getAllOrders"); 
        const backendOrders = response.data.orders || response.data || [];
        
        dispatch(getOrder(backendOrders));
      } catch (err) {
        console.error("Backend connection fetch error:", err);
        triggerSnackbar("Failed to download historical logistics data.", "error");
      } finally {
        setLoading(false);
      }
    }
    fetchFromBackend();
  }, [dispatch]);

  const getStatusChipColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'order delivered': return 'success';
      case 'order shipped': return 'info';
      case 'preparing order': return 'warning';
      case 'order cancelled': return 'error';
      default: return 'primary';
    }
  };

  if (loading) return <Box sx={{ p: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress size={40} thickness={4} sx={{ color: '#3B82F6' }} /></Box>;
  if (orders.length === 0) return <Box sx={{ p: 6, textAlign: 'center' }}><Typography variant="subtitle1" color="text.secondary">No transactional data collections present inside system routing logs.</Typography></Box>;

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3, md: 4 }, bgcolor: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header Profile Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
          Master Enterprise Logistics Dashboard
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
          Monitoring total ledger pipeline containing <strong style={{ color: '#3B82F6' }}>{orders.length}</strong> indices safely routed.
        </Typography>
      </Box>
      
      {/* Table Container surface */}
      <TableContainer 
        component={Paper} 
        elevation={0}
        variant="outlined" 
        sx={{ 
          borderRadius: '16px', 
          borderColor: '#E2E8F0', 
          overflowX: 'auto', 
          bgcolor: '#FFFFFF',
          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.03)'
        }}
      >
        <Table sx={{ minWidth: { xs: 700, md: '100%' }, tableLayout: 'auto' }}>
          <ThemeHeadTable />
          <TableBody>
            {orders.map((order) => (
              <TableRow 
                key={order._id} 
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 }, 
                  transition: 'background-color 0.15s ease',
                  '&:hover': { bgcolor: '#F8FAFC', cursor: 'pointer' } 
                }}
                onClick={() => navigate(`/admin/orders/${order._id}`)}
              >
                {/* Order ID Reference */}
                <TableCell sx={{ py: 2 }}>
                  <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#64748B', fontWeight: 700 }}>
                    #{order._id.slice(-6).toUpperCase()}
                  </Typography>
                </TableCell>

                {/* Customer Identity */}
                <TableCell sx={{ py: 2 }}>
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Avatar sx={{ bgcolor: '#EFF6FF', color: '#2563EB', width: 34, height: 34, fontSize: '13px', fontWeight: 700 }}>
                      {order.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <Box sx={{ maxWidth: { xs: '110px', sm: '150px' } }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B', noWrap: true, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {order.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ noWrap: true, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {order.email}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>

                {/* Highly Compressed Address Column (Saves massive space) */}
                <TableCell sx={{ py: 2 }}>
                  <Tooltip title={`Full Destination: ${order.fullShippingAddress}`} arrow placement="top">
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon sx={{ color: '#94A3B8', fontSize: 16, flexShrink: 0 }} />
                      <Chip 
                        label={order.addressLabel.toUpperCase()} 
                        size="small" 
                        variant="soft"
                        color="secondary"
                        sx={{ 
                          fontSize: '9px', 
                          height: '18px', 
                          fontWeight: 800, 
                          bgcolor: '#F1F5F9', 
                          color: '#475569',
                          borderRadius: '4px'
                        }}
                      />
                      <Typography variant="body2" sx={{ color: '#475569', fontWeight: 600, fontSize: '13px' }}>
                        {order.city}
                      </Typography>
                    </Box>
                  </Tooltip>
                </TableCell>

                {/* System Process Date */}
                <TableCell sx={{ py: 2, whiteSpace: 'nowrap' }}>
                  <Typography variant="body2" sx={{ color: '#475569', fontWeight: 500, fontSize: '13px' }}>
                    {order.createdAt}
                  </Typography>
                </TableCell>

                {/* Current Status Mapping */}
                <TableCell sx={{ py: 2, whiteSpace: 'nowrap' }}>
                  <Chip 
                    label={order.orderStatus.toUpperCase()} 
                    size="small" 
                    color={getStatusChipColor(order.orderStatus)} 
                    sx={{ fontSize: '10px', fontWeight: 800, borderRadius: '6px' }} 
                  />
                </TableCell>

                {/* Price Metrics */}
                <TableCell sx={{ py: 2, whiteSpace: 'nowrap' }}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    ₹{order.finalPrice.toLocaleString('en-IN')}
                  </Typography>
                </TableCell>

                {/* Inspect Action Trigger */}
                <TableCell align="center" sx={{ py: 2 }} onClick={(e) => e.stopPropagation()}>
                  <IconButton 
                    size="small" 
                    color="primary" 
                    onClick={() => navigate(`/admin/orders/${order._id}`)}
                    sx={{ 
                      backgroundColor: '#F0F9FF', 
                      border: '1px solid #E0F2FE', 
                      '&:hover': { backgroundColor: '#0284C7', '& .MuiSvgIcon-root': { color: '#FFFFFF' } } 
                    }}
                  >
                    <VisibilityIcon fontSize="small" sx={{ color: '#0284C7' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <MuiAlert severity={snackbar.severity} variant="filled" elevation={4} sx={{ borderRadius: 2, fontWeight: 600 }}>{snackbar.message}</MuiAlert>
      </Snackbar>
    </Box>
  );
}

function ThemeHeadTable() {
  return (
    <TableHead sx={{ bgcolor: '#F1F5F9' }}>
      <TableRow>
        <TableCell sx={{ color: '#475569', fontWeight: 700, fontSize: '13px' }}>ID</TableCell>
        <TableCell sx={{ color: '#475569', fontWeight: 700, fontSize: '13px' }}>Customer</TableCell>
        <TableCell sx={{ color: '#475569', fontWeight: 700, fontSize: '13px' }}>Destination</TableCell>
        <TableCell sx={{ color: '#475569', fontWeight: 700, fontSize: '13px' }}>Date</TableCell>
        <TableCell sx={{ color: '#475569', fontWeight: 700, fontSize: '13px' }}>Status</TableCell>
        <TableCell sx={{ color: '#475569', fontWeight: 700, fontSize: '13px' }}>Total</TableCell>
        <TableCell align="center" sx={{ color: '#475569', fontWeight: 700, fontSize: '13px' }}>Action</TableCell>
      </TableRow>
    </TableHead>
  );
}