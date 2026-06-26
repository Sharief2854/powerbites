import React, { useEffect, useState } from 'react';
import {
  Box, Typography, CardContent, Divider, Stepper, Step, StepLabel, 
  Avatar, Chip, Stack, Paper, Button, Snackbar, CircularProgress,
  Alert as MuiAlert, Dialog, DialogTitle, DialogContent, DialogActions, TextField
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../../api/axiosConfig';
import { getOrder } from '../../../Redux/Slices/AdminSlice/OrderListSlice';

const BASE_STEPS_4 = ["order placed", "preparing order", "order shipped", "order delivered"];
const EXTENDED_STEPS_5 = ["order placed", "preparing order", "order shipped", "order delivered", "completed"];

const STEP_LABELS_MAP = {
  "order placed": "Order Placed",
  "preparing order": "Preparing Order",
  "order shipped": "Order Shipped",
  "order delivered": "Order Delivered",
  "completed": "Order Completed"
};

const STEP_MESSAGES_MAP = {
  "order placed": "Success: Order status has been initialized to Order Placed!",
  "preparing order": "Success: Kitchen management informed. Order is now preparing!",
  "order shipped": "Success: Dispatch logged. Package assigned to shipment carrier!",
  "order delivered": "Success: Final drop-off verified. Cargo marked as Delivered!",
  "completed": "Success: Transaction archived. Workflow marked as Completed!"
};

export default function OrderRecordsDashboardById() {
  const { id: routeOrderId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [loading, setLoading] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelReasonInput, setCancelReasonInput] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  const rawOrderList = useSelector((state) => state.orderlist?.orderlist || []);

  const triggerSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Simplified raw data access mapping layer to guarantee real-time updates from Redux are preserved
  const activeBackendOrder = rawOrderList.find(o => o._id === routeOrderId);
  
  const activeOrder = activeBackendOrder ? {
    _id: activeBackendOrder._id,
    name: activeBackendOrder.customer?.name || "Unknown Customer",
    email: activeBackendOrder.customer?.email || "No email linked",
    orderStatus: activeBackendOrder.orderStatus ? activeBackendOrder.orderStatus.toLowerCase() : "", 
    historyStatuses: Array.isArray(activeBackendOrder.historyStatuses) 
      ? activeBackendOrder.historyStatuses.map(s => s.toLowerCase()) 
      : [],
    cancelledBy: activeBackendOrder.cancelledBy || "system",
    cancelReason: activeBackendOrder.cancelReason || "No explicit reason submitted.",
    addressObj: {
      street: activeBackendOrder.shippingAddress?.street || "N/A",
      city: activeBackendOrder.shippingAddress?.city || "N/A",
      state: activeBackendOrder.shippingAddress?.state || "N/A",
      pincode: activeBackendOrder.shippingAddress?.pincode || "N/A",
      country: activeBackendOrder.shippingAddress?.country || "India",
      label: activeBackendOrder.shippingAddress?.label || "HOME"
    },
    finalPrice: activeBackendOrder.final_price || activeBackendOrder.total || 0,
    products: Array.isArray(activeBackendOrder.products) ? activeBackendOrder.products.map((p, pIndex) => ({
      id: p._id || `prod-${pIndex}`,
      name: p.product?.name || "Unknown Item",
      quantity: p.quantity || 1,
      price: p.price || 0,
      discounted_price: p.discounted_price || p.price || 0,
      category: p.product?.category || "Food Item",
      image: p.image ? p.image.replace(/\\/g, '/') : ""
    })) : []
  } : null;

  const isCurrentlyCancelled = activeOrder?.orderStatus === "order cancelled";
  const currentWorkflowSteps = (activeOrder?.orderStatus === "completed" || activeOrder?.historyStatuses?.includes("completed"))
    ? EXTENDED_STEPS_5 
    : BASE_STEPS_4;

  useEffect(() => {
    if (rawOrderList.length === 0) {
      async function fetchFromBackend() {
        try {
          setLoading(true);
          const response = await api.get("/orders/admin/getAllOrders"); 
          const backendOrders = response.data.orders || response.data || [];
          dispatch(getOrder(backendOrders));
        } catch (err) {
          triggerSnackbar("Failed to download historical logistics data.", "error");
        } finally {
          setLoading(false);
        }
      }
      fetchFromBackend();
    }
  }, [dispatch, rawOrderList.length]);

  const handleConfirmCancelOrder = async () => {
    if (!cancelReasonInput.trim()) {
      triggerSnackbar("Please write a cancellation reason first.", "warning");
      return;
    }
    try {
      await api.post(`/orderStatus/adminCancelling/${routeOrderId}`, { reason: cancelReasonInput.trim() });
      const updatedList = rawOrderList.map(order => 
        order._id === routeOrderId ? { ...order, orderStatus: "order cancelled", cancelledBy: "admin", cancelReason: cancelReasonInput.trim() } : order
      );
      dispatch(getOrder(updatedList));
      setCancelDialogOpen(false);
      triggerSnackbar("Order terminated successfully.", "success");
    } catch (err) {
      triggerSnackbar("Error processing cancellation request.", "error");
    }
  };

  const handleUpdateStatus = async (orderId, targetStatus) => {
    // Check if this step is already checked
    const isAlreadyClicked = activeOrder?.orderStatus === targetStatus || activeOrder?.historyStatuses?.includes(targetStatus);
    if (isAlreadyClicked) {
      return; 
    }

    try {
      await api.post(`/orderStatus/updateStatus/${orderId}`, { status: targetStatus });
      
      const updatedList = rawOrderList.map(order => {
        if (order._id === orderId) {
          const currentHistory = Array.isArray(order.historyStatuses) ? [...order.historyStatuses] : [];
          const updatedHistory = currentHistory.map(s => s.toLowerCase());
          
          if (!updatedHistory.includes(targetStatus)) {
            updatedHistory.push(targetStatus);
          }
          return { ...order, orderStatus: targetStatus, historyStatuses: updatedHistory };
        }
        return order;
      });

      dispatch(getOrder(updatedList));
      triggerSnackbar(STEP_MESSAGES_MAP[targetStatus] || `Status shifted to ${STEP_LABELS_MAP[targetStatus]}`, "success");
    } catch (err) {
      triggerSnackbar("Error executing status update configuration.", "error");
    }
  };

  const renderCustomStepIcon = (stepKey) => {
    // Evaluates directly against raw data store mapping structures
    const isClicked = activeOrder?.orderStatus === stepKey || activeOrder?.historyStatuses?.includes(stepKey);
    
    if (isClicked) {
      return <CheckCircleIcon sx={{ color: '#10B981', fontSize: 26 }} />;
    }
    
    const globalIndex = currentWorkflowSteps.indexOf(stepKey);
    return (
      <Box 
        sx={{ 
          width: 24, 
          height: 24, 
          borderRadius: '50%', 
          bgcolor: '#F1F5F9', 
          border: '2px solid #CBD5E1',
          color: '#64748B', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '11px',
          fontWeight: 700
        }}
      >
        {globalIndex + 1}
      </Box>
    );
  };

  if (loading) return <Box sx={{ p: 6, display: 'flex', justifyContent: 'center' }}><CircularProgress size={35} /></Box>;
  if (!activeOrder) return <Box sx={{ p: 6, textAlign: 'center' }}><Typography variant="subtitle1" color="text.secondary">Order lookup failure profiles.</Typography></Box>;

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 4, lg: 5 }, bgcolor: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Action Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4, bgcolor: '#FFFFFF', p: 2, borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate(-1)} 
          sx={{ fontWeight: 700, textTransform: 'none', color: '#475569', '&:hover': { bgcolor: '#F1F5F9' } }}
        >
          Back to Orders List
        </Button>
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="subtitle2" sx={{ color: '#64748B', fontFamily: 'monospace', fontWeight: 700, display: { xs: 'none', sm: 'block' } }}>
            REF ID: #{activeOrder._id.toUpperCase()}
          </Typography>
          {!isCurrentlyCancelled && (
            <Button 
              variant="contained" 
              disableElevation 
              color="error" 
              onClick={() => { setCancelReasonInput(""); setCancelDialogOpen(true); }} 
              sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 700, px: 2.5, bgcolor: '#EF4444' }}
            >
              Cancel Order
            </Button>
          )}
        </Stack>
      </Box>

      <Grid container spacing={4}>
        {/* Left Side Info Segment */}
        <Grid item xs={12} lg={7}>
          <Stack spacing={3}>
            
            {/* Manifest Card Items */}
            <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' }}>
              <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <ReceiptLongIcon sx={{ color: '#475569' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>Items Manifest List</Typography>
              </Box>
              
              <CardContent sx={{ p: 0 }}>
                {activeOrder.products.map((item, idx) => (
                  <Box key={item.id}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3, '&:hover': { bgcolor: '#FAFAFA' } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                        <Avatar variant="rounded" src={item.image || undefined} sx={{ width: 56, height: 56, bgcolor: '#F1F5F9', border: '1px solid #E2E8F0', borderRadius: '8px' }}>
                          {!item.image && <FastfoodIcon sx={{ color: '#64748B' }} />}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B' }}>{item.name}</Typography>
                          <Stack direction="row" spacing={1} sx={{ mt: 0.5 }} alignItems="center">
                            <Chip label={item.category} size="small" variant="outlined" sx={{ height: '20px', fontSize: '11px', color: '#475569', borderColor: '#E2E8F0' }} />
                            <Typography variant="caption" color="text.secondary">QTY: <strong style={{ color: '#0F172A' }}>{item.quantity}</strong></Typography>
                          </Stack>
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                        ₹{(item.discounted_price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </Typography>
                    </Box>
                    {idx < activeOrder.products.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
                  </Box>
                ))}
              </CardContent>
            </Paper>

            {/* Price Total cleared summary statement layout */}
            <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', p: 3, bgcolor: '#FFFFFF', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#475569' }}>Aggregate Total Payment</Typography>
                <Typography variant="h4" sx={{ fontWeight: 900, color: '#2563EB', letterSpacing: '-0.03em' }}>
                  ₹{activeOrder.finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </Typography>
              </Box>
            </Paper>
          </Stack>
        </Grid>

        {/* Right Sidebar Control Hub */}
        <Grid item xs={12} lg={5}>
          <Stack spacing={3}>
            
            {/* Customer Information Cards */}
            <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' }}>
              <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <AccountCircleIcon sx={{ color: '#475569' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>Customer & Destination Logistics</Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.05em' }}>CUSTOMER ACCOUNT</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, mt: 0.5, color: '#1E293B' }}>{activeOrder.name}</Typography>
                <Typography variant="caption" color="text.secondary" display="block">{activeOrder.email}</Typography>
                
                <Divider sx={{ my: 2.5, borderColor: '#F1F5F9' }} />
                
                <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 800, letterSpacing: '0.05em' }}>DELIVERY DESTINATION</Typography>
                <Box sx={{ mt: 1.5, p: 2, bgcolor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                  <Chip label={activeOrder.addressObj.label} size="small" color="primary" sx={{ fontWeight: 800, fontSize: '10px', height: '20px', borderRadius: '6px', mb: 1.5 }} />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155', lineHeight: 1.6 }}>
                    {activeOrder.addressObj.street}, {activeOrder.addressObj.city}<br />
                    {activeOrder.addressObj.state} - <strong style={{ color: '#0F172A' }}>{activeOrder.addressObj.pincode}</strong><br />
                    <span style={{ color: '#64748B', fontSize: '12px' }}>{activeOrder.addressObj.country}</span>
                  </Typography>
                </Box>
              </Box>
            </Paper>

            {/* Stepper Node Channel */}
            <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)' }}>
              <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <LocalShippingIcon sx={{ color: '#475569' }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#0F172A' }}>Logistics Management Channel</Typography>
              </Box>
              <Box sx={{ p: 3 }}>
                {isCurrentlyCancelled ? (
                  <Box sx={{ p: 3, bgcolor: '#FEF2F2', border: '1px dashed #EF4444', borderRadius: '14px', textAlign: 'center' }}>
                    <Chip label="ORDER TERMINATED" color="error" sx={{ fontWeight: 900, borderRadius: '6px' }} />
                    <Typography variant="body2" color="error.main" sx={{ mt: 2, fontWeight: 700 }}>Assignment Aborted By: {activeOrder.cancelledBy.toUpperCase()}</Typography>
                    <Typography variant="body2" color="error.dark" sx={{ fontStyle: 'italic', mt: 0.5 }}>"{activeOrder.cancelReason}"</Typography>
                  </Box>
                ) : (
                  <Box sx={{ p: 1 }}>
                    <Stepper orientation="vertical">
                      {currentWorkflowSteps.map((stepKey) => {
                        const isClicked = activeOrder?.orderStatus === stepKey || activeOrder?.historyStatuses?.includes(stepKey);

                        return (
                          <Step key={stepKey} active={true}>
                            <StepLabel 
                              StepIconComponent={() => renderCustomStepIcon(stepKey)}
                              onClick={() => handleUpdateStatus(activeOrder._id, stepKey)}
                              sx={{ 
                                cursor: isClicked ? 'default' : 'pointer',
                                py: 1,
                                '& .MuiStepLabel-labelContainer': { width: '100%' }
                              }}
                            >
                              <Box sx={{ pl: 1 }}>
                                <Typography 
                                  variant="body2" 
                                  sx={{ 
                                    fontWeight: isClicked ? 800 : 600,
                                    color: isClicked ? '#10B981' : '#64748B',
                                    transition: 'color 0.2s'
                                  }}
                                >
                                  {STEP_LABELS_MAP[stepKey]}
                                </Typography>
                              </Box>
                            </StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                  </Box>
                )}
              </Box>
            </Paper>
          </Stack>
        </Grid>
      </Grid>

      {/* Cancellation Dialog Modal */}
      <Dialog open={cancelDialogOpen} onClose={() => setCancelDialogOpen(false)} maxWidth="xs" fullWidth PaperProps={{ sx: { borderRadius: '12px' } }}>
        <DialogTitle sx={{ fontWeight: 800 }}>Confirm Order Interruption</DialogTitle>
        <DialogContent dividers sx={{ borderColor: '#F1F5F9' }}>
          <TextField autoFocus fullWidth multiline rows={3} variant="outlined" placeholder="Submit cancellation rationale description here..." value={cancelReasonInput} onChange={(e) => setCancelReasonInput(e.target.value)} />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCancelDialogOpen(false)} color="inherit" sx={{ textTransform: 'none', fontWeight: 600 }}>Dismiss</Button>
          <Button onClick={handleConfirmCancelOrder} variant="contained" color="error" disableElevation sx={{ textTransform: 'none', fontWeight: 700, borderRadius: '6px' }}>Terminate Invoice</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <MuiAlert severity={snackbar.severity} variant="filled" elevation={4} sx={{ borderRadius: '8px', fontWeight: 600 }}>{snackbar.message}</MuiAlert>
      </Snackbar>
    </Box>
  );
}