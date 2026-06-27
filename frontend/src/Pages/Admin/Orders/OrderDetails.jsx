import React, { useEffect, useState, useMemo, useCallback } from 'react';
import {
  Box, Typography, Avatar, Chip, Paper, IconButton, 
  TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CircularProgress, Snackbar, Alert as MuiAlert, Tooltip,
  TextField, InputAdornment, FormControl, InputLabel, Select, MenuItem, TableSortLabel
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../../socket';
import { useNavigate } from 'react-router-dom';
import api from '../../../api/axiosConfig';
import { getOrder } from '../../../Redux/Slices/AdminSlice/OrderListSlice';

export default function OrderRecordsTable() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rawOrderList = useSelector((state) => state.orderlist?.orderlist || []);

  // States for filtering and sorting
  const [globalSearch, setGlobalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [orderDirection, setOrderDirection] = useState('desc');

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
        addressLabel: addr?.label?.toUpperCase() || "HOME",
        createdAt: order.createdAt 
          ? new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
            }) 
          : "N/A",
      };
    });
  };

  const parsedOrders = useMemo(() => parseData(rawOrderList), [rawOrderList]);

  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...parsedOrders];

    // Global Search
    if (globalSearch) {
      const term = globalSearch.toLowerCase();
      filtered = filtered.filter(row =>
        Object.values(row).some(val => String(val).toLowerCase().includes(term))
      );
    }

    // Status Filter
    if (statusFilter !== 'All') {
      filtered = filtered.filter(row => 
        row.orderStatus.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Sorting
    return filtered.sort((a, b) => {
      let valA = a[orderBy], valB = b[orderBy];
      // Handle date sorting for 'createdAt'
      if (orderBy === 'createdAt') {
        valA = new Date(a.createdAt);
        valB = new Date(b.createdAt);
      }
      return orderDirection === 'asc' ? (valA > valB ? 1 : -1) : (valB > valA ? 1 : -1);
    });
  }, [parsedOrders, globalSearch, statusFilter, orderBy, orderDirection]);

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

  // WebSocket listener for real-time order updates
  useEffect(() => {
    socket.connect();

    function onOrderUpdate(updatedOrder) {
      console.log('Real-time admin order update received:', updatedOrder);
      triggerSnackbar(`Order #${updatedOrder._id.slice(-6)} was updated!`, 'info');
      
      // Update the order in the Redux store
      const updatedList = rawOrderList.map(order => 
        order._id === updatedOrder._id ? { ...order, ...updatedOrder } : order
      );
      dispatch(getOrder(updatedList));
    }

    socket.on('orderUpdate', onOrderUpdate);

    // Clean up the listener and disconnect when the component unmounts
    return () => { socket.off('orderUpdate', onOrderUpdate); socket.disconnect(); };
  }, [dispatch, rawOrderList]);

  const getStatusChipColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'order delivered': return 'success';
      case 'order shipped': return 'info';
      case 'preparing order': return 'warning';
      case 'order cancelled': return 'error';
      default: return 'primary';
    }
  };

  const handleSortRequest = useCallback((property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, [orderBy, orderDirection]);

  if (loading) return <Box sx={{ p: 6, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}><CircularProgress size={40} thickness={4} sx={{ color: '#3B82F6' }} /></Box>;

  return (
    <Box sx={{ p: { xs: 1.5, sm: 3, md: 4 }, bgcolor: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      
      {/* Header Profile Section */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em', fontSize: { xs: '1.25rem', md: '1.5rem' } }}>
            Master Enterprise Logistics Dashboard
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontWeight: 500 }}>
            Monitoring total ledger pipeline containing <strong style={{ color: '#3B82F6' }}>{filteredAndSortedOrders.length}</strong> indices safely routed.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search orders..."
            size="small"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
              sx: { borderRadius: '12px' }
            }}
            sx={{ width: 280 }}
          />
          <FormControl size="small" sx={{ minWidth: 180 }}>
            <InputLabel>Status</InputLabel>
            <Select 
              value={statusFilter} 
              label="Status" 
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ borderRadius: '12px' }}
            >
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="order placed">Placed</MenuItem>
              <MenuItem value="preparing order">Preparing</MenuItem>
              <MenuItem value="order shipped">Shipped</MenuItem>
              <MenuItem value="order delivered">Delivered</MenuItem>
              <MenuItem value="order cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
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
          <ThemeHeadTable order={orderDirection} orderBy={orderBy} onRequestSort={handleSortRequest} />
          <TableBody>
            {filteredAndSortedOrders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 10 }}>
                  <Typography variant="subtitle1" color="text.secondary">No orders match the current filters.</Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedOrders.map((order) => (
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
                      {order.addressLabel && <Chip 
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
                      />}
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
            )))}
          </TableBody>
        </Table>
      </TableContainer>

      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <MuiAlert severity={snackbar.severity} variant="filled" elevation={4} sx={{ borderRadius: 2, fontWeight: 600 }}>{snackbar.message}</MuiAlert>
      </Snackbar>
    </Box>
  );
}

function ThemeHeadTable({ order, orderBy, onRequestSort }) {
  const headCells = [
    { id: '_id', label: 'ID' },
    { id: 'name', label: 'Customer' },
    { id: 'city', label: 'Destination' },
    { id: 'createdAt', label: 'Date' },
    { id: 'orderStatus', label: 'Status' },
    { id: 'finalPrice', label: 'Total' },
  ];

  return (
    <TableHead sx={{ bgcolor: '#F1F5F9' }}>
      <TableRow>
        {headCells.map((cell) => (
          <TableCell key={cell.id} sortDirection={orderBy === cell.id ? order : false} sx={{ color: '#475569', fontWeight: 700, fontSize: '13px' }}>
            <TableSortLabel active={orderBy === cell.id} direction={orderBy === cell.id ? order : 'asc'} onClick={() => onRequestSort(cell.id)}>
              {cell.label}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell align="center" sx={{ color: '#475569', fontWeight: 700, fontSize: '13px' }}>Actions</TableCell>
      </TableRow>
    </TableHead>
  );
}