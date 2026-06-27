// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, CardContent, Divider, Stepper, Step, StepLabel, 
//   Avatar, Chip, Stack, Paper, Button, Snackbar, CircularProgress,
//   Alert as MuiAlert, Dialog, DialogTitle, DialogContent, DialogActions, TextField
// } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import FastfoodIcon from '@mui/icons-material/Fastfood';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../../../api/axiosConfig';
// import { getOrder } from '../../../Redux/Slices/AdminSlice/OrderListSlice';

// const BASE_STEPS_4 = ["order placed", "preparing order", "order shipped", "order delivered"];
// const EXTENDED_STEPS_5 = ["order placed", "preparing order", "order shipped", "order delivered", "completed"];

// const STEP_LABELS_MAP = {
//   "order placed": "Order Placed",
//   "preparing order": "Preparing Order",
//   "order shipped": "Order Shipped",
//   "order delivered": "Order Delivered",
//   "completed": "Order Completed"
// };

// const STEP_MESSAGES_MAP = {
//   "order placed": "Success: Order status has been initialized to Order Placed!",
//   "preparing order": "Success: Kitchen management informed. Order is now preparing!",
//   "order shipped": "Success: Dispatch logged. Package assigned to shipment carrier!",
//   "order delivered": "Success: Final drop-off verified. Cargo marked as Delivered!",
//   "completed": "Success: Transaction archived. Workflow marked as Completed!"
// };

// export default function OrderRecordsDashboardById() {
//   const { id: routeOrderId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const [loading, setLoading] = useState(false);
//   const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
//   const [cancelReasonInput, setCancelReasonInput] = useState("");
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   const rawOrderList = useSelector((state) => state.orderlist?.orderlist || []);
//   console.log("rawOrderList :",rawOrderList)
//   const triggerSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   // Simplified raw data access mapping layer to guarantee real-time updates from Redux are preserved
//   const activeBackendOrder = rawOrderList.find(o => o._id === routeOrderId);
  
//   const activeOrder = activeBackendOrder ? {
//     _id: activeBackendOrder._id,
//     name: activeBackendOrder.customer?.name || "Unknown Customer",
//     email: activeBackendOrder.customer?.email || "No email linked",
//     orderStatus: activeBackendOrder.orderStatus ? activeBackendOrder.orderStatus.toLowerCase() : "", 
//     historyStatuses: Array.isArray(activeBackendOrder.historyStatuses) 
//       ? activeBackendOrder.historyStatuses.map(s => s.toLowerCase()) 
//       : [],
//     cancelledBy: activeBackendOrder.cancelledBy || "system",
//     cancelReason: activeBackendOrder.cancelReason || "No explicit reason submitted.",
//     addressObj: {
//       street: activeBackendOrder.shippingAddress?.street || "N/A",
//       city: activeBackendOrder.shippingAddress?.city || "N/A",
//       state: activeBackendOrder.shippingAddress?.state || "N/A",
//       pincode: activeBackendOrder.shippingAddress?.pincode || "N/A",
//       country: activeBackendOrder.shippingAddress?.country || "India",
//       label: activeBackendOrder.shippingAddress?.label || "HOME"
//     },
//     finalPrice: activeBackendOrder.final_price || activeBackendOrder.total || 0,
//     products: Array.isArray(activeBackendOrder.products) ? activeBackendOrder.products.map((p, pIndex) => ({
//       id: p._id || `prod-${pIndex}`,
//       name: p.product?.name || "Unknown Item",
//       quantity: p.quantity || 1,
//       price: p.price || 0,
//       discounted_price: p.discounted_price || p.price || 0,
//       category: p.product?.category || "Food Item",
//       image: p.image ? p.image.replace(/\\/g, '/') : ""
//     })) : []
//   } : null;

//   const isCurrentlyCancelled = activeOrder?.orderStatus === "order cancelled";
//   const currentWorkflowSteps = (activeOrder?.orderStatus === "completed" || activeOrder?.historyStatuses?.includes("completed"))
//     ? EXTENDED_STEPS_5 
//     : BASE_STEPS_4;

//   useEffect(() => {
//     if (rawOrderList.length === 0) {
//       async function fetchFromBackend() {
//         try {
//           setLoading(true);
//           const response = await api.get("/orders/admin/getAllOrders"); 
//           const backendOrders = response.data.orders || response.data || [];
//           console.log("Backend fetch response:", backendOrders);
//           dispatch(getOrder(backendOrders));
//         } catch (err) {
//           triggerSnackbar("Failed to download historical logistics data.", "error");
//         } finally {
//           setLoading(false);
//         }
//       }
//       fetchFromBackend();
//     }
//   }, [dispatch, rawOrderList.length]);

//   const handleConfirmCancelOrder = async () => {
//     if (!cancelReasonInput.trim()) {
//       triggerSnackbar("Please write a cancellation reason first.", "warning");
//       return;
//     }
//     try {
//       await api.post(`/orderStatus/adminCancelling/${routeOrderId}`, { reason: cancelReasonInput.trim() });
//       const updatedList = rawOrderList.map(order => 
//         order._id === routeOrderId ? { ...order, orderStatus: "order cancelled", cancelledBy: "admin", cancelReason: cancelReasonInput.trim() } : order
//       );
//       console.log("cancel List:", updatedList);
//       dispatch(getOrder(updatedList));
//       setCancelDialogOpen(false);
//       triggerSnackbar("Order terminated successfully.", "success");
//     } catch (err) {
//       triggerSnackbar("Error processing cancellation request.", "error");
//     }
//   };

//   const handleUpdateStatus = async (orderId, targetStatus) => {
//     // Check if this step is already checked
//     const isAlreadyClicked = activeOrder?.orderStatus === targetStatus || activeOrder?.historyStatuses?.includes(targetStatus);
//     if (isAlreadyClicked) {
//       return; 
//     }

//     try {
//       await api.post(`/orderStatus/updateStatus/${orderId}`, { status: targetStatus });
      
//       const updatedList = rawOrderList.map(order => {
//         if (order._id === orderId) {
//           const currentHistory = Array.isArray(order.historyStatuses) ? [...order.historyStatuses] : [];
//           const updatedHistory = currentHistory.map(s => s.toLowerCase());
          
//           if (!updatedHistory.includes(targetStatus)) {
//             updatedHistory.push(targetStatus);
//           }
//           return { ...order, orderStatus: targetStatus, historyStatuses: updatedHistory };
//         }
//         return order;
//       });


//       dispatch(getOrder(updatedList));
//       triggerSnackbar(STEP_MESSAGES_MAP[targetStatus] || `Status shifted to ${STEP_LABELS_MAP[targetStatus]}`, "success");
//     } catch (err) {
//       triggerSnackbar("Error executing status update configuration.", "error");
//     }
//   };

//   const renderCustomStepIcon = (stepKey) => {
//     // Evaluates directly against raw data store mapping structures
//     const isClicked = activeOrder?.orderStatus === stepKey || activeOrder?.historyStatuses?.includes(stepKey);
    
//     if (isClicked) {
//       return <CheckCircleIcon sx={{ color: '#10B981', fontSize: 26 }} />;
//     }
    
//     const globalIndex = currentWorkflowSteps.indexOf(stepKey);
//     return (
//       <Box 
//         sx={{ 
//           width: 24, 
//           height: 24, 
//           borderRadius: '50%', 
//           bgcolor: '#F1F5F9', 
//           border: '2px solid #CBD5E1',
//           color: '#64748B', 
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center',
//           fontSize: '11px',
//           fontWeight: 700
//         }}
//       >
//         {globalIndex + 1}
//       </Box>
//     );
//   };

//   if (loading) return <Box sx={{ p: 6, display: 'flex', justifyContent: 'center' }}><CircularProgress size={35} /></Box>;
//   if (!activeOrder) return <Box sx={{ p: 6, textAlign: 'center' }}><Typography variant="subtitle1" color="text.secondary">Order lookup failure profiles.</Typography></Box>;

//   return (
//     <Box sx={{ p: { xs: 2, sm: 3, md: 4, lg: 5 }, bgcolor: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
//       {/* Action Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4, bgcolor: '#FFFFFF', p: 2, borderRadius: '12px', border: '1px solid #E2E8F0' }}>
//         <Button 
//           startIcon={<ArrowBackIcon />} 
//           onClick={() => navigate(-1)} 
//           sx={{ fontWeight: 700, textTransform: 'none', color: '#475569', '&:hover': { bgcolor: '#F1F5F9' } }}
//         >
//           Back to Orders List
//         </Button>
//         <Stack direction="row" spacing={2} alignItems="center">
//           <Typography variant="subtitle2" sx={{ color: '#64748B', fontFamily: 'monospace', fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
//             REF ID: #{activeOrder._id.toUpperCase()}
//           </Typography>
//           {!isCurrentlyCancelled && (
//             <Button 
//               variant="contained" 
//               disableElevation 
//               color="error" 
//               onClick={() => { setCancelReasonInput(""); setCancelDialogOpen(true); }} 
//               sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 700, px: 2.5, bgcolor: '#EF4444' }}
//             >
//               Cancel Order
//             </Button>
//           )}
//         </Stack>
//       </Box>

//       <Grid container spacing={4}>
//         {/* Left Side Info Segment */}
//         <Grid item xs={12} lg={7}>
//           <Stack spacing={3}>
            
//             {/* Manifest Card Items */}
//             <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' }}>
//               <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                 <ReceiptLongIcon sx={{ color: '#475569' }} />
//                 <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>Items Manifest List</Typography>
//               </Box>
              
//               <CardContent sx={{ p: 0 }}>
//                 {activeOrder.products.map((item, idx) => (
//                   <Box key={item.id}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, '&:hover': { bgcolor: '#FAFAFA' } }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
//                         <Avatar variant="rounded" src={item.image || undefined} sx={{ width: 56, height: 56, bgcolor: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
//                           {!item.image && <FastfoodIcon sx={{ color: '#64748B' }} />}
//                         </Avatar>
//                         <Box>
//                           <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B' }}>{item.name}</Typography>
//                           <Stack direction="row" spacing={1} sx={{ mt: 0.5 }} alignItems="center">
//                             <Chip label={item.category} size="small" variant="outlined" sx={{ height: '20px', fontSize: '11px', color: '#475569', borderColor: '#E2E8F0' }} />
//                             <Typography variant="caption" color="text.secondary">QTY: <strong style={{ color: '#0F172A' }}>{item.quantity}</strong></Typography>
//                           </Stack>
//                         </Box>
//                       </Box>
//                       <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A' }}>
//                         ₹{(item.discounted_price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//                       </Typography>
//                     </Box>
//                     {idx < activeOrder.products.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
//                   </Box>
//                 ))}
//               </CardContent>
//             </Paper>

//             {/* Price Total cleared summary statement layout */}
//             <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', p: 3, bgcolor: '#FFFFFF', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' }}>
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography variant="body1" sx={{ fontWeight: 700, color: '#475569' }}>Aggregate Total Payment</Typography>
//                 <Typography variant="h4" sx={{ fontWeight: 900, color: '#2563EB', letterSpacing: '-0.03em' }}>
//                   ₹{activeOrder.finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//                 </Typography>
//               </Box>
//             </Paper>
//           </Stack>
//         </Grid>

//         {/* Right Sidebar Control Hub */}
//         <Grid item xs={12} lg={5}>
//           <Stack spacing={3}>
            
//             {/* Customer Information Cards */}
//             <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' }}>
//               <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                 <AccountCircleIcon sx={{ color: '#475569' }} />
//                 <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>Customer & Destination Logistics</Typography>
//               </Box>
//               <Box sx={{ p: 3 }}>
//                 <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.05em' }}>CUSTOMER ACCOUNT</Typography>
//                 <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5, color: '#1E293B' }}>{activeOrder.name}</Typography>
//                 <Typography variant="caption" color="text.secondary" display="block">{activeOrder.email}</Typography>
                
//                 <Divider sx={{ my: 2.5, borderColor: '#F1F5F9' }} />
                
//                 <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.05em' }}>DELIVERY DESTINATION</Typography>
//                 <Box sx={{ mt: 1.5, p: 2, bgcolor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
//                   <Chip label={activeOrder.addressObj.label} size="small" color="primary" sx={{ fontWeight: 800, fontSize: '10px', height: '20px', borderRadius: '6px', mb: 1.5 }} />
//                   <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155', lineHeight: 1.6 }}>
//                     {activeOrder.addressObj.street}, {activeOrder.addressObj.city}<br />
//                     {activeOrder.addressObj.state} - <strong style={{ color: '#0F172A' }}>{activeOrder.addressObj.pincode}</strong><br />
//                     <span style={{ color: '#64748B', fontSize: '12px' }}>{activeOrder.addressObj.country}</span>
//                   </Typography>
//                 </Box>
//               </Box>
//             </Paper>

//             {/* Stepper Node Channel */}
//             <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' }}>
//               <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                 <LocalShippingIcon sx={{ color: '#475569' }} />
//                 <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>Logistics Management Channel</Typography>
//               </Box>
//               <Box sx={{ p: 3 }}>
//                 {isCurrentlyCancelled ? (
//                   <Box sx={{ p: 3, bgcolor: '#FEF2F2', border: '1px dashed #EF4444', borderRadius: '14px', textAlign: 'center' }}>
//                     <Chip label="ORDER TERMINATED" color="error" sx={{ fontWeight: 900, borderRadius: '6px' }} />
//                     <Typography variant="body2" color="error.main" sx={{ mt: 2, fontWeight: 700 }}>Assignment Aborted By: {activeOrder.cancelledBy.toUpperCase()}</Typography>
//                     <Typography variant="body2" color="error.dark" sx={{ fontStyle: 'italic', mt: 0.5 }}>"{activeOrder.cancelReason}"</Typography>
//                   </Box>
//                 ) : (
//                   <Box sx={{ p: 1 }}>
//                     <Stepper orientation="vertical">
//                       {currentWorkflowSteps.map((stepKey) => {
//                         const isClicked = activeOrder?.orderStatus === stepKey || activeOrder?.historyStatuses?.includes(stepKey);

//                         return (
//                           <Step key={stepKey} active={true}>
//                             <StepLabel 
//                               StepIconComponent={() => renderCustomStepIcon(stepKey)}
//                               onClick={() => handleUpdateStatus(activeOrder._id, stepKey)}
//                               sx={{ 
//                                 cursor: isClicked ? 'default' : 'pointer',
//                                 py: 1,
//                                 '& .MuiStepLabel-labelContainer': { width: '100%' }
//                               }}
//                             >
//                               <Box sx={{ pl: 1 }}>
//                                 <Typography 
//                                   variant="body2" 
//                                   sx={{ 
//                                     fontWeight: isClicked ? 800 : 600,
//                                     color: isClicked ? '#10B981' : '#64748B',
//                                     transition: 'color 0.2s'
//                                   }}
//                                 >
//                                   {STEP_LABELS_MAP[stepKey]}
//                                 </Typography>
//                               </Box>
//                             </StepLabel>
//                           </Step>
//                         );
//                       })}
//                     </Stepper>
//                   </Box>
//                 )}
//               </Box>
//             </Paper>
//           </Stack>
//         </Grid>
//       </Grid>

//       {/* Cancellation Dialog Modal */}
//       <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '12px' } }}>
//         <DialogTitle sx={{ fontWeight: 800 }}>Confirm Order Interruption</DialogTitle>
//         <DialogContent dividers sx={{ borderColor: '#F1F5F9' }}>
//           <TextField autoFocus fullWidth multiline rows={3} variant="outlined" placeholder="Submit cancellation rationale description here..." value={cancelReasonInput} onChange={(e) => setCancelReasonInput(e.target.value)} />
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={() => setCancelDialogOpen(false)} color="inherit" sx={{ textTransform: 'none', fontWeight: 600 }}>Dismiss</Button>
//           <Button onClick={handleConfirmCancelOrder} variant="contained" color="error" disableElevation sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '6px' }}>Terminate Invoice</Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
//         <MuiAlert severity={snackbar.severity} variant="filled" elevation={4} sx={{ borderRadius: '8px', fontWeight: 600 }}>{snackbar.message}</MuiAlert>
//       </Snackbar>
//     </Box>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import {
//   Box, Typography, CardContent, Divider, Stepper, Step, StepLabel, 
//   Avatar, Chip, Stack, Paper, Button, Snackbar, CircularProgress,
//   Alert as MuiAlert, Dialog, DialogTitle, DialogContent, DialogActions, TextField
// } from '@mui/material';
// import Grid from '@mui/material/Grid';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import FastfoodIcon from '@mui/icons-material/Fastfood';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
// import RefundIcon from '@mui/icons-material/AttachMoney';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams, useNavigate } from 'react-router-dom';
// import api from '../../../api/axiosConfig';
// import { getOrder } from '../../../Redux/Slices/AdminSlice/OrderListSlice';

// const BASE_STEPS = ["order placed", "preparing order", "order shipped", "order delivered", "completed"];

// const STEP_LABELS_MAP = {
//   "order placed": "Order Placed",
//   "preparing order": "Preparing Order",
//   "order shipped": "Order Shipped",
//   "order delivered": "Order Delivered",
//   "completed": "Order Completed",
//   "order cancelled": "Order Cancelled",
//   "refund": "Refund Processed"
// };

// export default function OrderRecordsDashboardById() {
//   const { id: routeOrderId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   const [loading, setLoading] = useState(false);
//   const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
//   const [cancelReasonInput, setCancelReasonInput] = useState("");
//   const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

//   const rawOrderList = useSelector((state) => state.orderlist?.orderlist || []);
//   const activeBackendOrder = rawOrderList.find(o => o._id === routeOrderId);

//   const activeOrder = activeBackendOrder ? {
//     _id: activeBackendOrder._id,
//     name: activeBackendOrder.customer?.name || "Unknown Customer",
//     email: activeBackendOrder.customer?.email || "No email linked",
//     orderStatus: activeBackendOrder.orderStatus ? activeBackendOrder.orderStatus.toLowerCase() : "", 
//     historyStatuses: Array.isArray(activeBackendOrder.historyStatuses) 
//       ? activeBackendOrder.historyStatuses.map(s => s.toLowerCase()) 
//       : [],
//     cancelledBy: activeBackendOrder.cancelledBy || "system",
//     cancelReason: activeBackendOrder.cancelReason || "",
//     addressObj: { /* ... same as before */ },
//     finalPrice: activeBackendOrder.final_price || activeBackendOrder.total || 0,
//     products: Array.isArray(activeBackendOrder.products) ? activeBackendOrder.products.map((p, pIndex) => ({
//       id: p._id || `prod-${pIndex}`,
//       name: p.product?.name || "Unknown Item",
//       quantity: p.quantity || 1,
//       discounted_price: p.discounted_price || p.price || 0,
//       category: p.product?.category || "Food Item",
//       image: p.image ? p.image.replace(/\\/g, '/') : ""
//     })) : []
//   } : null;

//   const isCancelled = activeOrder?.orderStatus === "order cancelled";
//   const canCancel = ["order placed", "preparing order"].includes(activeOrder?.orderStatus || "");

//   // Dynamic Steps including Cancel + Refund
//   const getWorkflowSteps = () => {
//     let steps = [...BASE_STEPS];
//     if (isCancelled) {
//       steps = steps.filter(s => 
//         activeOrder.historyStatuses.includes(s) || 
//         activeOrder.orderStatus === s
//       );
//       steps.push("order cancelled", "refund");
//     }
//     return steps;
//   };

//   const workflowSteps = getWorkflowSteps();

//   useEffect(() => {
//     if (rawOrderList.length === 0) {
//       const fetchFromBackend = async () => {
//         try {
//           setLoading(true);
//           const response = await api.get("/orders/admin/getAllOrders");
//           dispatch(getOrder(response.data.orders || response.data || []));
//         } catch (err) {
//           console.error(err);
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchFromBackend();
//     }
//   }, [dispatch, rawOrderList.length]);

//   const triggerSnackbar = (message, severity = "success") => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleConfirmCancelOrder = async () => {
//     if (!cancelReasonInput.trim()) return triggerSnackbar("Please provide a reason", "warning");

//     try {
//       await api.post(`/orderStatus/adminCancelling/${routeOrderId}`, { reason: cancelReasonInput.trim() });
      
//       const updatedList = rawOrderList.map(order => 
//         order._id === routeOrderId 
//           ? { ...order, orderStatus: "order cancelled", cancelledBy: "admin", cancelReason: cancelReasonInput.trim() } 
//           : order
//       );
//       dispatch(getOrder(updatedList));
      
//       setCancelDialogOpen(false);
//       triggerSnackbar("Order cancelled successfully. Refund will be processed.", "success");
//     } catch (err) {
//       triggerSnackbar("Failed to cancel order", "error");
//     }
//   };

//   const handleUpdateStatus = async (orderId, targetStatus) => {
//     if (isCancelled || targetStatus === "refund") return;

//     const isAlreadyDone = activeOrder?.historyStatuses?.includes(targetStatus) || 
//                          activeOrder?.orderStatus === targetStatus;
//     if (isAlreadyDone) return;

//     try {
//       await api.post(`/orderStatus/updateStatus/${orderId}`, { status: targetStatus });
      
//       const updatedList = rawOrderList.map(order => {
//         if (order._id === orderId) {
//           const current = Array.isArray(order.historyStatuses) ? [...order.historyStatuses] : [];
//           if (!current.map(s => s.toLowerCase()).includes(targetStatus)) {
//             current.push(targetStatus);
//           }
//           return { ...order, orderStatus: targetStatus, historyStatuses: current };
//         }
//         return order;
//       });

//       dispatch(getOrder(updatedList));
//       triggerSnackbar(`Status updated to ${STEP_LABELS_MAP[targetStatus]}`, "success");
//     } catch (err) {
//       triggerSnackbar("Failed to update status", "error");
//     }
//   };

//   const renderCustomStepIcon = (stepKey) => {
//     const isCompleted = activeOrder?.historyStatuses?.includes(stepKey) || 
//                        activeOrder?.orderStatus === stepKey;

//     if (stepKey === "order cancelled") {
//       return <CancelIcon sx={{ color: '#EF4444', fontSize: 28 }} />;
//     }
//     if (stepKey === "refund") {
//       return <RefundIcon sx={{ color: '#10B981', fontSize: 28 }} />;
//     }
//     if (isCompleted) {
//       return <CheckCircleIcon sx={{ color: '#10B981', fontSize: 28 }} />;
//     }

//     return (
//       <Box sx={{
//         width: 26, height: 26, borderRadius: '50%', border: '2px solid #CBD5E1',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         color: '#64748B', fontSize: '13px', fontWeight: 700
//       }}>
//         {BASE_STEPS.indexOf(stepKey) + 1}
//       </Box>
//     );
//   };

//   if (loading) return <Box sx={{ p: 6, display: 'flex', justifyContent: 'center' }}><CircularProgress size={40} /></Box>;
//   if (!activeOrder) return <Box sx={{ p: 6, textAlign: 'center' }}><Typography color="text.secondary">Order not found</Typography></Box>;

//   return (
//     <Box sx={{ p: { xs: 2, sm: 3, md: 5 }, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      
//       {/* Header */}
//       <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 5, bgcolor: '#fff', p: 3, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
//         <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ fontWeight: 600, color: '#475569' }}>
//           Back to Orders
//         </Button>
        
//         <Stack direction="row" spacing={2} alignItems="center">
//           <Typography variant="subtitle2" sx={{ fontFamily: 'monospace', color: '#64748B' }}>
//             #{activeOrder._id}
//           </Typography>
//           {canCancel && (
//             <Button 
//               variant="contained" 
//               color="error" 
//               onClick={() => setCancelDialogOpen(true)}
//               sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700 }}
//             >
//               Cancel Order
//             </Button>
//           )}
//         </Stack>
//       </Box>

//       <Grid container spacing={4}>
//         {/* Left Side - Items */}
//         <Grid item xs={12} lg={7}>
//           <Stack spacing={4}>
//             <Paper sx={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
//               <Box sx={{ p: 3, bgcolor: '#F1F5F9' }}>
//                 <Typography variant="h6" fontWeight="700">Order Items</Typography>
//               </Box>
//               {activeOrder.products.map((item, idx) => (
//                 <Box key={idx}>
//                   <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', '&:hover': { bgcolor: '#FAFAFA' } }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
//                       <Avatar src={item.image} variant="rounded" sx={{ width: 72, height: 72, borderRadius: '12px' }}>
//                         {!item.image && <FastfoodIcon />}
//                       </Avatar>
//                       <Box>
//                         <Typography variant="h6" fontWeight="600">{item.name}</Typography>
//                         <Typography variant="body2" color="text.secondary">{item.category} • Qty: {item.quantity}</Typography>
//                       </Box>
//                     </Box>
//                     <Typography variant="h6" fontWeight="700">
//                       ₹{(item.discounted_price * item.quantity).toLocaleString('en-IN')}
//                     </Typography>
//                   </Box>
//                   {idx < activeOrder.products.length - 1 && <Divider />}
//                 </Box>
//               ))}
//             </Paper>

//             <Paper sx={{ p: 4, borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
//               <Typography color="text.secondary">Total Amount</Typography>
//               <Typography variant="h3" fontWeight="800" color="#2563EB">
//                 ₹{activeOrder.finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
//               </Typography>
//             </Paper>
//           </Stack>
//         </Grid>

//         {/* Right Side */}
//         <Grid item xs={12} lg={5}>
//           <Stack spacing={4}>
//             {/* Customer Info */}
//             <Paper sx={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
//               <Box sx={{ p: 3, bgcolor: '#F1F5F9' }}>
//                 <Typography variant="h6" fontWeight="700">Customer & Delivery</Typography>
//               </Box>
//               <Box sx={{ p: 3.5 }}>
//                 <Typography variant="subtitle1" fontWeight="600">{activeOrder.name}</Typography>
//                 <Typography color="text.secondary">{activeOrder.email}</Typography>
//                 <Divider sx={{ my: 3 }} />
//                 <Typography variant="subtitle2" color="text.secondary">DELIVERY ADDRESS</Typography>
//                 <Typography sx={{ mt: 1 }}>
//                   {activeOrder.addressObj.street}, {activeOrder.addressObj.city}<br />
//                   {activeOrder.addressObj.state} - {activeOrder.addressObj.pincode}
//                 </Typography>
//               </Box>
//             </Paper>

//             {/* Order Status Stepper */}
//             <Paper sx={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
//               <Box sx={{ p: 3, bgcolor: '#F1F5F9' }}>
//                 <Typography variant="h6" fontWeight="700">Order Progress</Typography>
//               </Box>
//               <Box sx={{ p: 4 }}>
//                 <Stepper orientation="vertical">
//                   {workflowSteps.map((stepKey) => {
//                     const isCompleted = activeOrder?.historyStatuses?.includes(stepKey) || 
//                                        activeOrder?.orderStatus === stepKey;
//                     const isClickable = !isCancelled && stepKey !== "refund" && stepKey !== "order cancelled";

//                     return (
//                       <Step key={stepKey} completed={isCompleted}>
//                         <StepLabel 
//                           StepIconComponent={() => renderCustomStepIcon(stepKey)}
//                           onClick={() => isClickable && handleUpdateStatus(activeOrder._id, stepKey)}
//                           sx={{ 
//                             cursor: isClickable ? 'pointer' : 'default',
//                             py: 1.5,
//                             '&:hover': { bgcolor: isClickable ? '#F8FAFC' : 'transparent' }
//                           }}
//                         >
//                           <Typography 
//                             fontWeight={isCompleted ? 700 : 500}
//                             color={stepKey === "order cancelled" ? "error.main" : 
//                                    stepKey === "refund" ? "#10B981" : "inherit"}
//                           >
//                             {STEP_LABELS_MAP[stepKey]}
//                           </Typography>
//                         </StepLabel>
//                       </Step>
//                     );
//                   })}
//                 </Stepper>
//               </Box>
//             </Paper>
//           </Stack>
//         </Grid>
//       </Grid>

//       {/* Cancel Dialog */}
//       <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth>
//         <DialogTitle>Cancel Order</DialogTitle>
//         <DialogContent>
//           <TextField
//             autoFocus
//             fullWidth
//             multiline
//             rows={4}
//             placeholder="Reason for cancellation..."
//             value={cancelReasonInput}
//             onChange={(e) => setCancelReasonInput(e.target.value)}
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setCancelDialogOpen(false)}>Close</Button>
//           <Button onClick={handleConfirmCancelOrder} variant="contained" color="error">
//             Confirm Cancel & Initiate Refund

//           </Button>
//         </DialogActions>
//       </Dialog>

//       <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(p => ({...p, open: false}))}>
//         <MuiAlert severity={snackbar.severity} variant="filled" elevation={6}>
//           {snackbar.message}
//         </MuiAlert>
//       </Snackbar>
//     </Box>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  Box, Typography, CardContent, Divider, Stepper, Step, StepLabel, 
  Avatar, Chip, Stack, Paper, Button, Snackbar, CircularProgress,
  Alert as MuiAlert, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import Grid from '@mui/material/Grid'; // Modernized layout syntax
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import RefundIcon from '@mui/icons-material/AttachMoney';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/axiosConfig';
import { socket } from '../../../socket';
import { getOrder } from '../../../Redux/Slices/AdminSlice/OrderListSlice';

const BASE_STEPS = ["order placed", "preparing order", "order shipped", "order delivered", "completed"];

const STEP_LABELS_MAP = {
  "order placed": "Order Placed",
  "preparing order": "Preparing Order",
  "order shipped": "Order Shipped",
  "order delivered": "Order Delivered",
  "completed": "Order Completed",
  "order cancelled": "Order Cancelled", // Status for when cancellation is initiated
  "refund pending": "Refund Pending", // Status while waiting for webhook
  "refunded": "Refund Processed" // Final status after webhook confirmation
};

export default function OrderRecordsDashboardById() {
  const { id: routeOrderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReasonInput, setCancelReasonInput] = useState("");
  const [isRefunding, setIsRefunding] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const rawOrderList = useSelector((state) => state.orderlist?.orderlist || []);
  const activeBackendOrder = rawOrderList.find(o => o._id === routeOrderId);
console.log('activeBackendOrder',activeBackendOrder)
  const activeOrder = activeBackendOrder ? {
    _id: activeBackendOrder._id,
    name: activeBackendOrder.customer?.name || "Unknown Customer",
    email: activeBackendOrder.customer?.email || "No email linked",
    orderStatus: activeBackendOrder.orderStatus ? activeBackendOrder.orderStatus.toLowerCase() : "", 
    historyStatuses: Array.isArray(activeBackendOrder.historyStatuses) 
      ? activeBackendOrder.historyStatuses.map(s => s.toLowerCase()) 
      : [],
    cancelledBy: activeBackendOrder.cancelledBy || "system",
    cancelReason: activeBackendOrder.cancelReason || "",
    addressObj: activeBackendOrder.shippingAddress || {},
    finalPrice: activeBackendOrder.final_price || activeBackendOrder.total || 0,
    products: Array.isArray(activeBackendOrder.products) ? activeBackendOrder.products.map((p, pIndex) => ({
      id: p._id || `prod-${pIndex}`,
      name: p.product?.name || "Unknown Item",
      quantity: p.quantity || 1,
      discounted_price: p.discounted_price || p.price || 0,
      category: p.product?.category || "Food Item",
      image: p.image ? p.image.replace(/\\/g, '/') : ""
    })) : []
  } : null;

  const isCancelled = ["order cancelled", "refund pending", "refunded"].includes(activeOrder?.orderStatus);
  const isRefundPending = activeOrder?.orderStatus === "refund pending";
  const canCancel = ["order placed", "preparing order"].includes(activeOrder?.orderStatus || "");

  // DYNAMIC ADAPTIVE PROGRESS STEPPER BUILDER
  const getWorkflowSteps = () => {
    if (!activeOrder) return BASE_STEPS;
    
    if (isCancelled) {
      // Filter out base timeline tracks that were actually accomplished before cancellation interception
      const stepsBeforeCancellation = BASE_STEPS.filter(s => 
        activeOrder.historyStatuses.includes(s) || s === "order placed"
      );
      // Append immediate tracking parameters right underneath it
      return [...stepsBeforeCancellation, "order cancelled", "refund pending", "refunded"];
    }
    
    return BASE_STEPS;
  };

  const workflowSteps = getWorkflowSteps();

  useEffect(() => {
    if (rawOrderList.length === 0) {
      const fetchFromBackend = async () => {
        try {
          console.log("order")
          setLoading(true);
          const response = await api.get("/orders/admin/getAllOrders");
          console.log("order list",response.data);
          dispatch(getOrder(response.data.orders || response.data || []));
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchFromBackend();
    }
  }, [dispatch, rawOrderList.length]);

  // WebSocket listener for real-time updates on this specific order
  useEffect(() => {
    socket.connect();

    function onOrderUpdate(updatedOrder) {
      // Only react to updates for the currently viewed order
      if (updatedOrder._id === routeOrderId) {
        console.log(`Real-time update for order ${routeOrderId}:`, updatedOrder);
        triggerSnackbar(`Order status updated to: ${updatedOrder.orderStatus}`, 'info');
        
        const updatedList = rawOrderList.map(order => 
          order._id === updatedOrder._id ? { ...order, ...updatedOrder } : order
        );
        dispatch(getOrder(updatedList));
      }
    }

    socket.on('orderUpdate', onOrderUpdate);

    return () => { socket.off('orderUpdate', onOrderUpdate); socket.disconnect(); };
  }, [dispatch, rawOrderList, routeOrderId, triggerSnackbar]);

  const triggerSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const handleConfirmCancelOrder = async () => {
    if (!cancelReasonInput.trim()) return triggerSnackbar("Please provide a reason", "warning");

    try {
      await api.post(`/orderStatus/adminCancelling/${routeOrderId}`, { reason: cancelReasonInput.trim() });
      
      const updatedList = rawOrderList.map(order => 
        order._id === routeOrderId 
          ? { 
              ...order, 
              orderStatus: "refund pending", 
              cancelledBy: "admin", 
              cancelReason: cancelReasonInput.trim(),
              // Preserve tracking data array blocks for local mutation mapping updates
              historyStatuses: Array.isArray(order.historyStatuses) ? [...order.historyStatuses] : ["order placed"]
            } 
          : order
      );
      console.log("updatedList",updatedList)
      dispatch(getOrder(updatedList));
      
      setCancelDialogOpen(false);
      triggerSnackbar("Order cancelled successfully. Refund pipeline initialized.", "success");
    } catch (err) {
      triggerSnackbar("Failed to cancel order", "error");
    }
  };

  const handleUpdateStatus = async (orderId, targetStatus) => {
    if (isCancelled || targetStatus === "refund") return;

    try {
      await api.post(`/orderStatus/updateStatus/${orderId}`, { status: targetStatus });
      
      const updatedList = rawOrderList.map(order => {
        if (order._id === orderId) {
          const current = Array.isArray(order.historyStatuses) ? [...order.historyStatuses] : [];
          if (!current.map(s => s.toLowerCase()).includes(targetStatus)) {
            current.push(targetStatus);
          }
          return { ...order, orderStatus: targetStatus, historyStatuses: current };
        }
        return order;
      });

      dispatch(getOrder(updatedList));
      triggerSnackbar(`Status updated to ${STEP_LABELS_MAP[targetStatus]}`, "success");
    } catch (err) {
      triggerSnackbar("Failed to update status", "error");
    }
  };

  const renderCustomStepIcon = (stepKey) => {
    if (stepKey === "order cancelled") {
      return <CancelIcon sx={{ color: '#EF4444', fontSize: 28 }} />;
    }
    if (stepKey === "refund") {
      return <RefundIcon sx={{ color: '#10B981', fontSize: 28 }} />;
    }
    
    const isCompleted = activeOrder?.historyStatuses?.includes(stepKey) || activeOrder?.orderStatus === stepKey;
    if (isCompleted) {
      return <CheckCircleIcon sx={{ color: '#10B981', fontSize: 28 }} />;
    }

    return (
      <Box sx={{
        width: 26, height: 26, borderRadius: '50%', border: '2px solid #CBD5E1',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#64748B', fontSize: '13px', fontWeight: 700, bgcolor: '#fff'
      }}>
        {BASE_STEPS.indexOf(stepKey) + 1}
      </Box>
    );
  };

  if (loading) return <Box sx={{ p: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress size={40} /></Box>;
  if (!activeOrder) return <Box sx={{ p: 6, textAlign: 'center' }}><Typography color="text.secondary">Order not found</Typography></Box>;

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 5 }, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      
      {/* Header Container Area */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 5, bgcolor: '#fff', p: 3, borderRadius: '16px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ fontWeight: 700, color: '#475569', textTransform: 'none' }}>
          Back to Orders List
        </Button>
        
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="subtitle2" sx={{ fontFamily: 'monospace', color: '#64748B', bgcolor: '#E2E8F0', px: 1.5, py: 0.5, borderRadius: '6px' }}>
            #{activeOrder._id}
          </Typography>
          {canCancel && (
            <Button 
              variant="contained" 
              color="error" 
              onClick={() => setCancelDialogOpen(true)}
              sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700, boxShadow: 'none' }}
            >
              Cancel Order
            </Button>
          )}
          {isRefundPending && (
            <Button
              variant="contained"
              color="success"
              onClick={handleManualRefund}
              disabled={isRefunding}
              startIcon={isRefunding ? <CircularProgress size={16} color="inherit" /> : <RefundIcon />}
              sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700, boxShadow: 'none' }}
            >
              {isRefunding ? 'Refunding...' : 'Manual Refund'}
            </Button>
          )}
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {/* Left Grid Side Container */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Stack spacing={4}>
            <Paper sx={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
              <Box sx={{ p: 3, bgcolor: '#F1F5F9', borderBottom: '1px solid #E2E8F0' }}>
                <Typography variant="h6" fontWeight="800" color="#1E293B">Order Items</Typography>
              </Box>
              {activeOrder.products.map((item, idx) => (
                <Box key={item.id}>
                  <Box sx={{ p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between', '&:hover': { bgcolor: '#FAFAFA' } }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                      <Avatar src={item.image} variant="rounded" sx={{ width: 72, height: 72, borderRadius: '12px', bgcolor: '#F1F5F9', color: '#4f46e5' }}>
                        {!item.image && <FastfoodIcon />}
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="700" color="#0F172A">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>{item.category} • Qty Units: {item.quantity}</Typography>
                      </Box>
                    </Box>
                    <Typography variant="h6" fontWeight="800" color="#0F172A">
                      ₹{(item.discounted_price * item.quantity).toLocaleString('en-IN')}
                    </Typography>
                  </Box>
                  {idx < activeOrder.products.length - 1 && <Divider />}
                </Box>
              ))}
            </Paper>

            <Paper sx={{ p: 4, borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0', bgcolor: '#fff' }}>
              <Typography color="text.secondary" sx={{ fontWeight: 700, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.5px' }}>Total Amount Handled</Typography>
              <Typography variant="h3" fontWeight="900" color="#4f46e5" sx={{ mt: 1 }}>
                ₹{activeOrder.finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
              </Typography>
            </Paper>
          </Stack>
        </Grid>

        {/* Right Grid Side Container */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Stack spacing={4}>
            <Paper sx={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
              <Box sx={{ p: 3, bgcolor: '#F1F5F9', borderBottom: '1px solid #E2E8F0' }}>
                <Typography variant="h6" fontWeight="800" color="#1E293B">Customer Logistics</Typography>
              </Box>
              <Box sx={{ p: 3.5 }}>
                <Typography variant="subtitle1" fontWeight="700" color="#0F172A">{activeOrder.name}</Typography>
                <Typography color="text.secondary" sx={{ fontWeight: 500 }}>{activeOrder.email}</Typography>
                <Divider sx={{ my: 3 }} />
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>DELIVERY ADDRESS TARGET</Typography>
                <Typography sx={{ mt: 1, fontWeight: 600, color: '#475569', lineHeight: 1.6 }}>
                  {activeOrder.addressObj?.street || "N/A"}, {activeOrder.addressObj?.city || ""}<br />
                  {activeOrder.addressObj?.state || ""} - {activeOrder.addressObj?.pincode || ""}
                </Typography>
              </Box>
            </Paper>

            {/* PROGRESS AND TIMELINE OVERRIDE STEPPER BLOCK */}
            <Paper sx={{ borderRadius: '20px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.04)', border: '1px solid #E2E8F0' }}>
              <Box sx={{ p: 3, bgcolor: '#F1F5F9', borderBottom: '1px solid #E2E8F0' }}>
                <Typography variant="h6" fontWeight="800" color="#1E293B">Order Live Progress</Typography>
              </Box>
              <Box sx={{ p: 4, bgcolor: '#fff' }}>
                {isCancelled && (
                  <Box sx={{ mb: 3, p: 2, bgcolor: '#FFF5F5', borderLeft: '4px solid #EF4444', borderRadius: '4px' }}>
                    <Typography variant="body2" sx={{ color: '#991B1B', fontWeight: 700, textTransform: 'capitalize' }}>
                      Order Cancelled by: {activeOrder.cancelledBy}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#7F1D1D', display: 'block', mt: 0.5, fontSize: '0.85rem' }}>
                      {activeOrder.cancelReason || "No descriptive context reason compiled."}
                    </Typography>
                  </Box>
                )}

                <Stepper orientation="vertical">
                  {workflowSteps.map((stepKey) => {
                    const isCompleted = activeOrder?.historyStatuses?.includes(stepKey) || 
                                       activeOrder?.orderStatus === stepKey || 
                                       (stepKey === 'refunded' && activeOrder?.orderStatus === 'refunded');
                    
                    const isClickable = !isCancelled && !["refund pending", "refunded"].includes(stepKey);

                    return (
                      <Step key={stepKey} completed={isCompleted}>
                        <StepLabel 
                          StepIconComponent={() => renderCustomStepIcon(stepKey)}
                          onClick={() => isClickable && handleUpdateStatus(activeOrder._id, stepKey)}
                          sx={{ 
                            cursor: isClickable ? 'pointer' : 'default',
                            py: 1.5,
                            borderRadius: '8px',
                            px: 1,
                            '&:hover': { bgcolor: isClickable ? '#F8FAFC' : 'transparent' }
                          }}
                        >
                          <Typography 
                            fontWeight={isCompleted ? 800 : 600}
                            color={stepKey === "order cancelled" ? "error.main" : 
                                   stepKey === "refunded" ? "#10B981" :
                                   stepKey === "refund pending" ? "#D97706" : "#334155"}
                          >
                            {STEP_LABELS_MAP[stepKey]}
                          </Typography>
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* Cancellation Handler Modal */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: '16px' } }}>
        <DialogTitle sx={{ fontWeight: 800 }}>Cancel Order Target Processing</DialogTitle>
        <DialogContent dividers>
          <TextField
            autoFocus
            fullWidth
            multiline
            rows={4}
            placeholder="Provide a mandatory verification reason context for stopping active fulfillment operations..."
            value={cancelReasonInput}
            onChange={(e) => setCancelReasonInput(e.target.value)}
            InputProps={{ sx: { borderRadius: '12px' } }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5 }}>
          <Button onClick={() => setCancelDialogOpen(false)} color="inherit" sx={{ fontWeight: 700, textTransform: 'none' }}>Close</Button>
          <Button onClick={handleConfirmCancelOrder} variant="contained" color="error" disableElevation sx={{ fontWeight: 700, textTransform: 'none', borderRadius: '10px' }}>
            Confirm Cancel &amp; Refund
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Toast Layer */}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(p => ({...p, open: false}))} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <MuiAlert severity={snackbar.severity} variant="filled" elevation={6} sx={{ borderRadius: '12px', fontWeight: 700 }}>
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}