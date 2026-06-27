

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