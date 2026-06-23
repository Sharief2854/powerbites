// import React, { useEffect, useState } from 'react';
// import {
//   Grid, Box, Typography, CardContent, Divider, Stepper, Step, StepLabel, 
//   Avatar, Chip, Stack, Paper, IconButton, TableContainer, Table, 
//   TableHead, TableRow, TableCell, TableBody, TableSortLabel, Button
// } from '@mui/material';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import FastfoodIcon from '@mui/icons-material/Fastfood';
// import api from '../../../api/axiosConfig';

// // import api from '../../../api/axiosConfig'; // <--- Uncomment this when backend is live

// const STATUS_STEPS = ["order placed", "preparing order", "order shipped", "order delivered", "order cancelled"];
// const STEP_DETAILS = [
//   { label: 'Order Placed', color: 'info' },
//   { label: 'Order Approval', color: 'warning' },
//   { label: 'Product Pickup', color: 'warning' },
//   { label: 'Shipped', color: 'secondary' },
//   { label: 'Delivered', color: 'success' }
// ];

// // --- STATIC DEMO DATA SET (Fallback) ---
// const localMockOrders = [
//   {
//     _id: "66734511fa123b0011aa0001",
//     customer: { _id: "667123a1fa123b0000000001", name: "John Doe", avatarColor: "#0D3B66" },
//     products: [
//       { product: { _id: "p1", name: "Pepperoni Pizza", category: "Main Course" }, price: 25.00, discounted_price: 25.00, quantity: 1 },
//       { product: { _id: "p2", name: "Garlic Bread", category: "Sides" }, price: 6.50, discounted_price: 6.50, quantity: 1 }
//     ],
//     paymentID: "pay_XYZ100234_ABC",
//     orderStatus: "order placed",
//     address: { street: "123 Luxury Lane", city: "New York", state: "NY", zipCode: "10001", phoneNumber: "+1 (555) 019-2834" }
//   },
//   {
//     _id: "66734511fa123b0011aa0002",
//     customer: { _id: "667123a1fa123b0000000002", name: "Jane Smith", avatarColor: "#489FB5" },
//     products: [
//       { product: { _id: "p3", name: "Chicken Burger", category: "Main Course" }, price: 12.00, discounted_price: 10.00, quantity: 2 },
//       { product: { _id: "p4", name: "French Fries", category: "Sides" }, price: 5.00, discounted_price: 5.00, quantity: 1 }
//     ],
//     paymentID: "pay_XYZ100233_DEF",
//     orderStatus: "order shipped",
//     address: { street: "456 Tech Boulevard", city: "San Francisco", state: "CA", zipCode: "94105", phoneNumber: "+1 (555) 014-9876" }
//   },
//   {
//     _id: "66734511fa123b0011aa0003",
//     customer: { _id: "667123a1fa123b0000000003", name: "Robert Johnson", avatarColor: "#E63946" },
//     products: [
//       { product: { _id: "p5", name: "Sushi Platter", category: "Japanese" }, price: 45.00, discounted_price: 45.00, quantity: 1 }
//     ],
//     paymentID: "pay_XYZ100232_GHI",
//     orderStatus: "order delivered",
//     address: { street: "789 Ocean Drive", city: "Miami", state: "FL", zipCode: "33139", phoneNumber: "+1 (555) 017-5544" }
//   }
// ];

// export default function OrderRecordsDashboard() {
//   const [orders, setOrders] = useState([]);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);
//   const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'
//   const [loading, setLoading] = useState(true);

//   // Dynamic Data Parser: Translates raw mongoose objects into clean UI properties
//   const parseData = (rawOrders) => {
//     return rawOrders.map(order => ({
//       _id: order._id,
//       paymentID: order.paymentID || "",
//       orderIdClean: order.paymentID ? `#${order.paymentID.split('_')[1] || order._id.slice(-6)}` : `#${order._id.slice(-6)}`,
//       name: order.customer?.name || "Unknown Customer",
//       avatarColor: order.customer?.avatarColor || "#334155",
//       orderStatus: order.orderStatus || "order placed",
//       formattedAddress: order.address 
//         ? `${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zipCode}`
//         : "No address attached",
//       phone: order.address?.phoneNumber || "N/A",
//       products: order.products.map((p, pIndex) => ({
//         id: p.product?._id || `prod-${pIndex}`,
//         name: p.product?.name || "Unknown Item",
//         quantity: p.quantity || 1,
//         price: p.price || 0,
//         discounted_price: p.discounted_price || p.price || 0,
//         category: p.product?.category || "General"
//       }))
//     }));
//   };

//   useEffect(() => {
//     // --- LIVE BACKEND TOGGLE ---
//     // When your backend is ready, uncomment the logic below and delete the default mock lines.
    
//     async function fetchFromBackend() {
//       try {
//         setLoading(true);
//         let response = await api.get("/orders/admin/getAllOrders"); // Update URL if needed
//         console.log("Backend fetch response:", response.data)
//         setOrders(parseData(response.data.orders || []));
//         setLoading(false);
//       } catch (err) {
//         console.error("Backend fetch error, falling back to demo data:", err);
//         setOrders(parseData(localMockOrders));
//         setLoading(false);
//       }
//     }
//     fetchFromBackend();
    

//     // --- DEMO WORKING BUFFER ---
//    // setOrders(parseData(localMockOrders));
//     setLoading(false);
//   }, []);

//   const calculateOrderTotal = (products) => {
//     const subtotal = products.reduce((acc, item) => acc + (item.discounted_price * item.quantity), 0);
//     const shipping = subtotal > 0 ? 0.00 : 0.00;
//     const tax = subtotal > 0 ? 0.00 : 0.00;
//     const total = subtotal + shipping + tax;
//     return {
//       subtotal: `$${subtotal.toFixed(2)}`,
//       shipping: `$${shipping.toFixed(2)}`,
//       tax: `$${tax.toFixed(2)}`,
//       total: `$${total.toFixed(2)}`
//     };
//   };

//   const handleStatusChange = (orderId, stepIndex) => {
//     setOrders(prevOrders => prevOrders.map(order => {
//       if (order._id !== orderId) return order;
//       return { ...order, orderStatus: STATUS_STEPS[stepIndex] || STATUS_STEPS[0] };
//     }));
//   };

//   const getStatusChipColor = (status) => {
//     switch (status) {
//       case 'order delivered': return 'success';
//       case 'order shipped': return 'info';
//       case 'preparing order': return 'warning';
//       case 'order cancelled': return 'error';
//       default: return 'primary';
//     }
//   };

//   if (loading) return <Box sx={{ p: 4 }}><Typography>Loading records...</Typography></Box>;
//   if (orders.length === 0) return <Box sx={{ p: 4 }}><Typography>No active data sets found.</Typography></Box>;

//   const activeOrder = orders.find(o => o._id === selectedOrderId) || orders[0];
//   const activePricing = calculateOrderTotal(activeOrder.products);
//   const currentStepIndex = STATUS_STEPS.indexOf(activeOrder.orderStatus) !== -1 ? STATUS_STEPS.indexOf(activeOrder.orderStatus) : 0;

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
//       {viewMode === 'list' ? (
        
//         // ================= PAGE 1: DYNAMIC OVERVIEW TABLE =================
//         <Box>
//           <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1E293B' }}>
//             Master Order Dashboard ({orders.length} Records)
//           </Typography>
          
//           <TableContainer 
//             component={Paper} 
//             variant="outlined" 
//             sx={{ borderRadius: '16px', borderColor: '#E2E8F0', width: '100%', overflowX: 'auto' }}
//           >
//             <Table sx={{ minWidth: 800 }}>
//               <TableHead sx={{ bgcolor: '#D0DFEC' }}>
//                 <TableRow>
//                   <TableCell><TableSortLabel active direction="asc"><b>Order ID</b></TableSortLabel></TableCell>
//                   <TableCell><b>Customer Name</b></TableCell>
//                   <TableCell><b>Order Date & Time</b></TableCell>
//                   <TableCell><b>Order Status</b></TableCell>
//                   <TableCell><b>Total Amount</b></TableCell>
//                   <TableCell align="center"><b>Actions</b></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {orders.map((order) => {
//                   const pricing = calculateOrderTotal(order.products);
//                   return (
//                     <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#F8FAFC' } }}>
//                       <TableCell sx={{ fontFamily: 'monospace', color: '#475569' }}>
//                         {order._id.substring(16)}
//                       </TableCell>
//                       <TableCell>
//                         <Box display="flex" alignItems="center" gap={1.5}>
//                           <Avatar sx={{ bgcolor: order.avatarColor, width: 32, height: 32, fontSize: '14px' }}>
//                             {order.name.charAt(0)}
//                           </Avatar>
//                           <Box>
//                             <Typography variant="body2" sx={{ fontWeight: 600 }}>{order.name}</Typography>
//                             <Typography variant="caption" color="text.secondary" display="block">
//                               {order.formattedAddress.split(',')[1] || "N/A"}
//                             </Typography>
//                           </Box>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="body2" sx={{ color: '#334155' }}>Jun 20, 2026, 03:19 PM</Typography>
//                       </TableCell>
//                       <TableCell>
//                         <Chip 
//                           label={order.orderStatus.toUpperCase()} 
//                           size="small" 
//                           color={getStatusChipColor(order.orderStatus)} 
//                           variant="soft" 
//                           sx={{ fontSize: '10px', fontWeight: 700 }} 
//                         />
//                       </TableCell>
//                       <TableCell>
//                         <Typography variant="body2" sx={{ fontWeight: 700 }}>{pricing.total}</Typography>
//                       </TableCell>
//                       <TableCell align="center">
//                         <IconButton 
//                           size="small" 
//                           color="primary" 
//                           onClick={() => {
//                             setSelectedOrderId(order._id);
//                             setViewMode('details');
//                           }}
//                           sx={{ backgroundColor: '#EFF6FF', '&:hover': { backgroundColor: '#DBEAFE' } }}
//                         >
//                           <VisibilityIcon fontSize="small" />
//                         </IconButton>
//                       </TableCell>
//                     </TableRow>
//                   );
//                 })}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Box>
//       ) : (
        
//         // ================= PAGE 2: ISOLATED SPECIFIC DETAILS PAGE =================
//         <Box>
//           <Button 
//             startIcon={<ArrowBackIcon />} 
//             onClick={() => setViewMode('list')} 
//             sx={{ mb: 3, fontWeight: 600, textTransform: 'none' }}
//           >
//             Back to Orders Management Table
//           </Button>

//           <Grid container spacing={3}>
//             {/* Products Column */}
//             <Grid item xs={12} md={7}>
//               <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#334155', textTransform: 'uppercase', fontSize: '0.75rem' }}>
//                 Cart Contents ({activeOrder.name})
//               </Typography>
              
//               <Stack spacing={3}>
//                 <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
//                   <Box sx={{ p: 3, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
//                     <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Itemized Items</Typography>
//                   </Box>
//                   <CardContent sx={{ p: 3 }}>
//                     {activeOrder.products.map((item, idx) => {
//                       const hasDiscount = item.discounted_price < item.price;
//                       return (
//                         <Box key={item.id}>
//                           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2.5 }}>
//                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                               <Avatar variant="rounded" sx={{ width: 60, height: 60, bgcolor: '#F1F5F9', color: '#64748B' }}>
//                                 <FastfoodIcon />
//                               </Avatar>
//                               <Box>
//                                 <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B' }}>{item.name}</Typography>
//                                 <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
//                                   <Chip label={item.category} size="small" variant="outlined" sx={{ fontSize: '11px', height: '20px' }} />
//                                   <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13px' }}>
//                                     Qty: <strong>{item.quantity}</strong>
//                                   </Typography>
//                                 </Box>
//                               </Box>
//                             </Box>

//                             <Box sx={{ textAlign: 'right', minWidth: '90px' }}>
//                               {hasDiscount ? (
//                                 <>
//                                   <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94A3B8', display: 'block' }}>
//                                     ${(item.price * item.quantity).toFixed(2)}
//                                   </Typography>
//                                   <Typography variant="body1" sx={{ fontWeight: 700, color: '#10B981' }}>
//                                     ${(item.discounted_price * item.quantity).toFixed(2)}
//                                   </Typography>
//                                 </>
//                               ) : (
//                                 <Typography variant="body1" sx={{ fontWeight: 700, color: '#1E293B' }}>
//                                   ${(item.price * item.quantity).toFixed(2)}
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

//                 <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', p: 3 }}>
//                   <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Statement Breakdown</Typography>
//                   <Stack spacing={2}>
//                     <Box display="flex" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Subtotal</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{activePricing.subtotal}</Typography></Box>
//                     <Box display="flex" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Shipping</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{activePricing.shipping}</Typography></Box>
//                     <Box display="flex" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Sales Tax</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{activePricing.tax}</Typography></Box>
//                     <Divider />
//                     <Box display="flex" justifyContent="space-between" alignItems="center"><Typography variant="body1" sx={{ fontWeight: 700 }}>Total</Typography><Typography variant="h5" sx={{ fontWeight: 800, color: '#3B82F6' }}>{activePricing.total}</Typography></Box>
//                   </Stack>
//                 </Paper>
//               </Stack>
//             </Grid>

//             {/* Operations Column */}
//             <Grid item xs={12} md={5}>
//               <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#334155', textTransform: 'uppercase', fontSize: '0.75rem' }}>
//                 Operations & Summary
//               </Typography>

//               <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', p: 3, mb: 2 }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#1E293B' }}>Delivery Destination Details</Typography>
//                 <Stack spacing={1.5}>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary" display="block">SHIPPING ADDRESS</Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155', mt: 0.5 }}>
//                       {activeOrder.formattedAddress}
//                     </Typography>
//                   </Box>
//                   <Box>
//                     <Typography variant="caption" color="text.secondary" display="block">CONTACT LINE</Typography>
//                     <Typography variant="body2" sx={{ fontWeight: 600, color: '#3B82F6', mt: 0.5 }}>{activeOrder.phone}</Typography>
//                   </Box>
//                 </Stack>
//               </Paper>

//               <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', p: 3 }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3 }}>Live Tracking Pipeline (Click step to modify)</Typography>
//                 <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', borderColor: '#F1F5F9' }}>
//                   <Stepper 
//                     activeStep={currentStepIndex} 
//                     orientation="vertical" 
//                     sx={{
//                       '& .MuiStepIcon-root.Mui-active': { color: '#3B82F6' },
//                       '& .MuiStepIcon-root.Mui-completed': { color: '#10B981' }
//                     }}
//                   >
//                     {STEP_DETAILS.map((step, index) => (
//                       <Step key={step.label} onClick={() => handleStatusChange(activeOrder._id, index)} sx={{ cursor: 'pointer' }}>
//                         <StepLabel>
//                           <Typography variant="body2" sx={{ fontWeight: currentStepIndex === index ? 700 : 500 }}>
//                             {step.label}
//                           </Typography>
//                         </StepLabel>
//                       </Step>
//                     ))}
//                   </Stepper>
//                 </Paper>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>
//       )}
//     </Box>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  Grid, Box, Typography, CardContent, Divider, Stepper, Step, StepLabel, 
  Avatar, Chip, Stack, Paper, IconButton, TableContainer, Table, 
  TableHead, TableRow, TableCell, TableBody, TableSortLabel, Button
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import { useDispatch, useSelector } from 'react-redux'; // <-- FIXED: Added useDispatch here
import { useNavigate } from 'react-router-dom';        // <-- FIXED: Added useNavigate here
import api from '../../../api/axiosConfig';
import { getOrder } from '../../../Redux/Slices/AdminSlice/OrderListSlice';

const STATUS_STEPS = ["order placed", "preparing order", "order shipped", "order delivered", "order cancelled"];
const STEP_DETAILS = [
  { label: 'Order Placed' },
  { label: 'Order Approval' },
  { label: 'Product Pickup' },
  { label: 'Shipped' },
  { label: 'Delivered' }
];

export default function OrderRecordsDashboard() {
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [viewMode, setViewMode] = useState('list'); 
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch(); // <-- Now works perfectly because it's imported
  const navigate = useNavigate(); // <-- Now works perfectly because it's imported
  
  const rawOrderList = useSelector((state) => state.orderlist?.orderlist || []);

  const getProductFallbackName = (productRef, index) => {
    if (typeof productRef === 'object' && productRef?.name) return productRef.name;
    const cleanId = String(productRef || '').slice(-4).toUpperCase();
    return `Menu Item #${cleanId || (index + 1)}`;
  };

  const parseData = (rawOrders) => {
    if (!Array.isArray(rawOrders)) return [];
    return rawOrders.map(order => ({
      _id: order._id,
      paymentID: order.paymentID || "N/A",
      orderIdClean: order.paymentID ? `#${order.paymentID.split('_')[1] || order._id.slice(-6)}` : `#${order._id.slice(-6)}`,
      name: order.customer?.name || "Unknown Customer",
      email: order.customer?.email || "No email linked",
      avatarColor: "#3B82F6",
      orderStatus: order.orderStatus || "order placed",
      cancelReason: order.reason || order.cancellationReason || "No explicit reason submitted.",
      addressObj: {
        street: order.shippingAddress?.street || "N/A",
        city: order.shippingAddress?.city || "N/A",
        state: order.shippingAddress?.state || "N/A",
        pincode: order.shippingAddress?.pincode || "N/A",
        country: order.shippingAddress?.country || "India",
        label: order.shippingAddress?.label || "HOME"
      },
      formattedAddress: order.shippingAddress 
        ? `${order.shippingAddress.street || ''}, ${order.shippingAddress.city || ''}, ${order.shippingAddress.state || ''} - ${order.shippingAddress.pincode || ''}`
        : "No shipping address attached",
      createdAt: order.createdAt 
        ? new Date(order.createdAt).toLocaleDateString('en-US', {
            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
          }) 
        : "N/A",
      finalPrice: order.final_price || order.total || 0,
      products: Array.isArray(order.products) ? order.products.map((p, pIndex) => ({
        id: p._id || `prod-${pIndex}`,
       // name: getProductFallbackName(p.product, pIndex),
       name: p.product?.name || "Unknown Item",
        quantity: p.quantity || 1,
        price: p.price || 0,
        discounted_price: p.discounted_price || p.price || 0,
        category: p.product?.category || "Food Item",
        image: p.image ? p.image.replace(/\\/g, '/') : ""
      })) : []
    }));
  };

  const orders = parseData(rawOrderList);
  console.log("Parsed Orders:", orders)
  useEffect(() => {
    async function fetchFromBackend() {
      try {
        setLoading(true);
        const response = await api.get("/orders/admin/getAllOrders"); 
        const backendOrders = response.data.orders || response.data || [];
        console.log("Backend fetch response:", backendOrders);
        dispatch(getOrder(backendOrders));
      } catch (err) {
        console.error("Backend connection fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFromBackend();
  }, [dispatch]); // <-- Safely tracked now

  const handleCancelOrder = async (orderId) => {
    const reason = prompt("Please provide a reason for cancelling this order placement:");
    if (reason === null) return; 
    if (!reason.trim()) {
      alert("A structural cancellation statement reason is required.");
      return;
    }

    try {
      await api.post(`/orderStatus/adminCancelling/${orderId}`, {
        reason: reason.trim()
      });

      const updatedList = rawOrderList.map(order => 
        order._id === orderId ? { ...order, orderStatus: "order cancelled", reason: reason.trim() } : order
      );
      dispatch(getOrder(updatedList));
      
      alert("Order status successfully terminated.");
    } catch (err) {
      console.error("Failed to cancel order:", err);
      alert("Error processing tracking action request.");
    }
  };

  const handleUpdateStatus = async (orderId, nextStatus) => {
    try {
      await api.put(`/orders/admin/updateOrder/${orderId}`, {
        orderStatus: nextStatus
      });

      const updatedList = rawOrderList.map(order => 
        order._id === orderId ? { ...order, orderStatus: nextStatus } : order
      );
      dispatch(getOrder(updatedList));
    } catch (err) {
      console.error("Backend updates sync failure error:", err);
      alert("Error syncing modification update transitions.");
    }
  };

  const handleStatusChange = (orderId, stepIndex) => {
    const targetStatus = STATUS_STEPS[stepIndex];
    if (targetStatus === "order cancelled") {
      handleCancelOrder(orderId);
    } else {
      handleUpdateStatus(orderId, targetStatus);
    }
  };

  const getStatusChipColor = (status) => {
    switch (status) {
      case 'order delivered': return 'success';
      case 'order shipped': return 'info';
      case 'preparing order': return 'warning';
      case 'order cancelled': return 'error';
      default: return 'primary';
    }
  };

  if (loading) return <Box sx={{ p: 6, textAlign: 'center' }}><Typography variant="subtitle1" color="text.secondary">Loading management logs backend database...</Typography></Box>;
  if (orders.length === 0) return <Box sx={{ p: 6, textAlign: 'center' }}><Typography variant="subtitle1" color="text.secondary">No transactional data collections present inside system routing logs.</Typography></Box>;

  const activeOrder = orders.find(o => o._id === selectedOrderId) || orders[0];
  const currentStepIndex = STATUS_STEPS.indexOf(activeOrder.orderStatus) !== -1 ? STATUS_STEPS.indexOf(activeOrder.orderStatus) : 0;

  return (
    <Box sx={{ p: { xs: 2, sm: 3, md: 5 }, bgcolor: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      {viewMode === 'list' ? (
        
        // ================= PAGE 1: OVERVIEW TABLE =================
        <Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A', letterSpacing: '-0.025em' }}>
                Master Enterprise Logistics Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                Monitoring total ledger pipeline containing ({orders.length}) total indices safely routed.
              </Typography>
            </Box>
          </Box>
          
          <TableContainer 
            component={Paper} 
            elevation={0}
            variant="outlined" 
            sx={{ borderRadius: '16px', borderColor: '#E2E8F0', overflowX: 'auto', bgcolor: '#FFFFFF' }}
          >
            <Table sx={{ minWidth: 900 }}>
              <TableHead sx={{ bgcolor: '#F1F5F9' }}>
                <TableRow>
                  <TableCell sx={{ color: '#475569', fontWeight: 700 }}>Order Ref Mapping</TableCell>
                  <TableCell sx={{ color: '#475569', fontWeight: 700 }}>User Identity</TableCell>
                  <TableCell sx={{ color: '#475569', fontWeight: 700 }}>System Registration Timestamp</TableCell>
                  <TableCell sx={{ color: '#475569', fontWeight: 700 }}>Current Node Status</TableCell>
                  <TableCell sx={{ color: '#475569', fontWeight: 700 }}>Settled Value</TableCell>
                  <TableCell align="center" sx={{ color: '#475569', fontWeight: 700 }}>Inspect</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#F8FAFC' } }}>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, color: '#1E293B' }}>
                        {order.orderIdClean}
                      </Typography>
                      <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#94A3B8', display: 'block' }}>
                        ID: ...{order._id.slice(-8)}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar sx={{ bgcolor: '#EFF6FF', color: '#3B82F6', width: 36, height: 36, fontSize: '14px', fontWeight: 700 }}>
                          {order.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B' }}>{order.name}</Typography>
                          <Typography variant="caption" color="text.secondary" display="block">{order.email}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#334155', fontWeight: 500 }}>{order.createdAt}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={order.orderStatus.toUpperCase()} 
                        size="small" 
                        color={getStatusChipColor(order.orderStatus)} 
                        sx={{ fontSize: '10px', fontWeight: 800, borderRadius: '6px' }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 800, color: '#0F172A' }}>
                        ₹{order.finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small" 
                        color="primary" 
                        onClick={() => {
                          setSelectedOrderId(order._id);
                          setViewMode('details');
                        }}
                        sx={{ backgroundColor: '#F0F9FF', border: '1px solid #E0F2FE', '&:hover': { backgroundColor: '#BAE6FD' } }}
                      >
                        <VisibilityIcon fontSize="small" sx={{ color: '#0284C7' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        
        // ================= PAGE 2: GRANULAR DETAILS PAGE =================
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 4, flexWrap: 'wrap', gap: 2 }}>
            <Button 
              startIcon={<ArrowBackIcon />} 
              onClick={() => setViewMode('list')} 
              sx={{ fontWeight: 700, textTransform: 'none', color: '#475569' }}
            >
              Return to Ledger Index Array
            </Button>
            
            {activeOrder.orderStatus !== "order cancelled" && (
              <Button 
                variant="contained" 
                disableElevation
                color="error" 
                onClick={() => handleCancelOrder(activeOrder._id)}
                sx={{ borderRadius: '10px', textTransform: 'none', fontWeight: 700, px: 3, bgcolor: '#EF4444' }}
              >
                Terminate Placement
              </Button>
            )}
          </Box>

          <Grid container spacing={4}>
            {/* Products Column */}
            <Grid item xs={12} lg={7}>
              <Stack spacing={3}>
                <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
                  <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <ReceiptLongIcon sx={{ color: '#64748B' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1E293B' }}>Manifest Breakdown Ledger</Typography>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    {activeOrder.products.map((item, idx) => {
                      const hasDiscount = item.discounted_price < item.price;
                      return (
                        <Box key={item.id}>
                          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, py: 2.5, gap: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar 
                                variant="rounded" 
                                src={item.image || undefined} 
                                sx={{ width: 64, height: 64, bgcolor: '#F1F5F9', color: '#475569', border: '1px solid #E2E8F0' }}
                              >
                                {!item.image && <FastfoodIcon />}
                              </Avatar>
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 700, color: '#0F172A' }}>{item.name}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
                                  <Chip label={item.category} size="small" variant="outlined" sx={{ fontSize: '11px', height: '22px', borderRadius: '6px' }} />
                                  <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13px' }}>
                                    Units allocated: <strong>{item.quantity}</strong>
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            <Box sx={{ textAlign: { xs: 'left', sm: 'right' }, minWidth: '100px' }}>
                              {hasDiscount ? (
                                <>
                                  <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94A3B8', display: 'block' }}>
                                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 800, color: '#10B981' }}>
                                    ₹{(item.discounted_price * item.quantity).toLocaleString('en-IN')}
                                  </Typography>
                                </>
                              ) : (
                                <Typography variant="body1" sx={{ fontWeight: 800, color: '#1E293B' }}>
                                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                                </Typography>
                              )}
                            </Box>
                          </Box>
                          {idx < activeOrder.products.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
                        </Box>
                      );
                    })}
                  </CardContent>
                </Paper>

                <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', p: 3, bgcolor: '#FFFFFF' }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 800, color: '#0F172A' }}>Aggregate Audited Total</Typography>
                    </Box>
                    <Typography variant="h4" sx={{ fontWeight: 900, color: '#3B82F6', letterSpacing: '-0.03em' }}>
                      ₹{activeOrder.finalPrice.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </Typography>
                  </Box>
                </Paper>
              </Stack>
            </Grid>

            {/* Operations Column */}
            <Grid item xs={12} lg={5}>
              <Stack spacing={3}>
                <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
                  <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AccountCircleIcon sx={{ color: '#64748B' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1E293B' }}>Client & Destination Metadata</Typography>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    <Stack spacing={2.5}>
                      <Box>
                        <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }} display="block">RECIPIENT ACCOUNT</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700, color: '#1E293B', mt: 0.5 }}>{activeOrder.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#64748B' }}>{activeOrder.email}</Typography>
                      </Box>
                      <Divider sx={{ borderColor: '#F1F5F9' }} />
                      <Box>
                        <Typography variant="caption" sx={{ color: '#94A3B8', fontWeight: 700 }} display="block">SHIPPING ADDRESS ENDPOINT</Typography>
                        <Box sx={{ mt: 1, p: 2, bgcolor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                          <Chip label={activeOrder.addressObj.label} size="small" sx={{ fontWeight: 800, fontSize: '9px', mb: 1 }} />
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#334155', lineHeight: 1.5 }}>
                            {activeOrder.addressObj.street}, {activeOrder.addressObj.city}<br />
                            {activeOrder.addressObj.state} - <strong>{activeOrder.addressObj.pincode}</strong><br />
                            {activeOrder.addressObj.country}
                          </Typography>
                        </Box>
                      </Box>
                    </Stack>
                  </Box>
                </Paper>

                <Paper variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
                  <Box sx={{ p: 2.5, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <LocalShippingIcon sx={{ color: '#64748B' }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#1E293B' }}>Logistics State Pipeline</Typography>
                  </Box>
                  <Box sx={{ p: 3 }}>
                    {activeOrder.orderStatus === "order cancelled" ? (
                      <Box sx={{ p: 2.5, bgcolor: '#FEF2F2', border: '1px dashed #FCA5A5', borderRadius: '12px', textAlign: 'center' }}>
                        <Chip label="ORDER CANCELLED" color="error" sx={{ fontWeight: 900, px: 2 }} />
                        <Typography variant="body2" color="error.main" sx={{ mt: 2, fontWeight: 700 }}>
                          Reason: "{activeOrder.cancelReason}"
                        </Typography>
                      </Box>
                    ) : (
                      <Box>
                        <Paper variant="outlined" sx={{ p: 2.5, borderRadius: '12px', borderColor: '#E2E8F0', bgcolor: '#FAFAFA' }}>
                          <Stepper 
                            activeStep={currentStepIndex} 
                            orientation="vertical" 
                            sx={{
                              '& .MuiStepIcon-root.Mui-active': { color: '#3B82F6' },
                              '& .MuiStepIcon-root.Mui-completed': { color: '#10B981' }
                            }}
                          >
                            {STEP_DETAILS.map((step, index) => (
                              <Step key={step.label} onClick={() => handleStatusChange(activeOrder._id, index)} sx={{ cursor: 'pointer' }}>
                                <StepLabel>
                                  <Typography variant="body2" sx={{ fontWeight: currentStepIndex === index ? 800 : 600, color: currentStepIndex === index ? '#3B82F6' : '#475569' }}>
                                    {step.label}
                                  </Typography>
                                </StepLabel>
                              </Step>
                            ))}
                          </Stepper>
                        </Paper>
                      </Box>
                    )}
                  </Box>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}