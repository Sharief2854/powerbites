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
import api from '../../../api/axiosConfig';

const STATUS_STEPS = ["order placed", "preparing order", "order shipped", "order delivered", "order cancelled"];
const STEP_DETAILS = [
  { label: 'Order Placed', color: 'info' },
  { label: 'Order Approval', color: 'warning' },
  { label: 'Product Pickup', color: 'warning' },
  { label: 'Shipped', color: 'secondary' },
  { label: 'Delivered', color: 'success' }
];

export default function OrderRecordsDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'
  const [loading, setLoading] = useState(true);

  // Dynamic Data Parser: Maps backend schema into clean UI structures
  const parseData = (rawOrders) => {
    return rawOrders.map(order => ({
      _id: order._id,
      paymentID: order.paymentID || "",
      orderIdClean: order.paymentID ? `#${order.paymentID.split('_')[1] || order._id.slice(-6)}` : `#${order._id.slice(-6)}`,
      name: order.customer?.name || "Unknown Customer",
      email: order.customer?.email || "N/A",
      avatarColor: "#3B82F6",
      orderStatus: order.orderStatus || "order placed",
      formattedAddress: typeof order.address === 'object' && order.address !== null
        ? `${order.address.street || ''}, ${order.address.city || ''}, ${order.address.state || ''} ${order.address.zipCode || ''}`
        : order.address || "No address attached",
      phone: order.address?.phoneNumber || "N/A",
      createdAt: order.createdAt ? new Date(order.createdAt).toLocaleString() : "N/A",
      finalPrice: order.final_price || order.total || 0,
      products: Array.isArray(order.products) ? order.products.map((p, pIndex) => ({
        id: p._id || `prod-${pIndex}`,
        productRef: typeof p.product === 'object' ? p.product?._id : p.product,
        name: p.product?.name || `Product Item (${pIndex + 1})`,
        quantity: p.quantity || 1,
        price: p.price || 0,
        discounted_price: p.discounted_price || p.price || 0,
        category: p.product?.category || "General",
        image: p.image || ""
      })) : []
    }));
  };

  useEffect(() => {
    async function fetchFromBackend() {
      try {
        setLoading(true);
        const response = await api.get("/orders/admin/getAllOrders"); 
        console.log("Backend fetch response:", response.data)
        const backendOrders = response.data.orders || response.data || [];
        setOrders(parseData(backendOrders));
      } catch (err) {
        console.error("Backend fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFromBackend();
  }, []);

  // SEPARATE FUNCTION: Specifically handles order cancellations with reasons
  const handleCancelOrder = async (orderId) => {
    const reason = prompt("Please enter the reason for cancelling this order:");
    
    // Exit if the admin cancels the prompt window or leaves it completely empty
    if (reason === null) return; 
    if (!reason.trim()) {
      alert("A cancellation reason is required.");
      return;
    }

    try {
      // Cancellation API Call: passes orderId and reason
      await api.put(`/orders/admin/cancelOrder`, {
        orderId: orderId,
        reason: reason.trim()
      });

      // Update client state locally
      setOrders(prevOrders => prevOrders.map(order => {
        if (order._id !== orderId) return order;
        return { ...order, orderStatus: "order cancelled" };
      }));
      
      alert("Order successfully cancelled.");
    } catch (err) {
      console.error("Failed to cancel order on backend:", err);
      alert("Error processing cancellation. Please try again.");
    }
  };

  // STANDARD FUNCTION: Handles progress updates (Placed -> Shipped -> Delivered)
  const handleUpdateStatus = async (orderId, nextStatus) => {
    try {
      await api.put(`/orders/admin/updateStatus`, {
        orderId: orderId,
        orderStatus: nextStatus
      });

      setOrders(prevOrders => prevOrders.map(order => {
        if (order._id !== orderId) return order;
        return { ...order, orderStatus: nextStatus };
      }));
    } catch (err) {
      console.error("Failed to update status on backend:", err);
      alert("Error updating status. Please try again.");
    }
  };

  // Traffic director for step click bindings
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

  if (loading) return <Box sx={{ p: 4 }}><Typography>Loading records...</Typography></Box>;
  if (orders.length === 0) return <Box sx={{ p: 4 }}><Typography>No active data sets found.</Typography></Box>;

  const activeOrder = orders.find(o => o._id === selectedOrderId) || orders[0];
  const currentStepIndex = STATUS_STEPS.indexOf(activeOrder.orderStatus) !== -1 ? STATUS_STEPS.indexOf(activeOrder.orderStatus) : 0;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      {viewMode === 'list' ? (
        
        // ================= PAGE 1: DYNAMIC OVERVIEW TABLE =================
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1E293B' }}>
            Master Order Dashboard ({orders.length} Records)
          </Typography>
          
          <TableContainer 
            component={Paper} 
            variant="outlined" 
            sx={{ borderRadius: '16px', borderColor: '#E2E8F0', width: '100%', overflowX: 'auto' }}
          >
            <Table sx={{ minWidth: 800 }}>
              <TableHead sx={{ bgcolor: '#D0DFEC' }}>
                <TableRow>
                  <TableCell><TableSortLabel active direction="asc"><b>Order ID</b></TableSortLabel></TableCell>
                  <TableCell><b>Customer Name</b></TableCell>
                  <TableCell><b>Order Date & Time</b></TableCell>
                  <TableCell><b>Order Status</b></TableCell>
                  <TableCell><b>Total Amount</b></TableCell>
                  <TableCell align="center"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#F8FAFC' } }}>
                    <TableCell sx={{ fontFamily: 'monospace', color: '#475569' }}>
                      {order._id.substring(16)}
                    </TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar sx={{ bgcolor: order.avatarColor, width: 32, height: 32, fontSize: '14px' }}>
                          {order.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>{order.name}</Typography>
                          <Typography variant="caption" color="text.secondary" display="block">
                            {order.email}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#334155' }}>{order.createdAt}</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={order.orderStatus.toUpperCase()} 
                        size="small" 
                        color={getStatusChipColor(order.orderStatus)} 
                        variant="soft" 
                        sx={{ fontSize: '10px', fontWeight: 700 }} 
                      />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 700 }}>₹{order.finalPrice.toFixed(2)}</Typography>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small" 
                        color="primary" 
                        onClick={() => {
                          setSelectedOrderId(order._id);
                          setViewMode('details');
                        }}
                        sx={{ backgroundColor: '#EFF6FF', '&:hover': { backgroundColor: '#DBEAFE' } }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        
        // ================= PAGE 2: ISOLATED SPECIFIC DETAILS PAGE =================
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Button 
              startIcon={<ArrowBackIcon />} 
              onClick={() => setViewMode('list')} 
              sx={{ fontWeight: 600, textTransform: 'none' }}
            >
              Back to Orders Management Table
            </Button>
            
            {/* Quick cancellation shortcut button */}
            {activeOrder.orderStatus !== "order cancelled" && (
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => handleCancelOrder(activeOrder._id)}
                sx={{ borderRadius: '8px', textTransform: 'none', fontWeight: 600 }}
              >
                Cancel Order
              </Button>
            )}
          </Box>

          <Grid container spacing={3}>
            {/* Products Column */}
            <Grid item xs={12} md={7}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#334155', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                Cart Contents ({activeOrder.name})
              </Typography>
              
              <Stack spacing={3}>
                <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
                  <Box sx={{ p: 3, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Itemized Items</Typography>
                  </Box>
                  <CardContent sx={{ p: 3 }}>
                    {activeOrder.products.map((item, idx) => {
                      const hasDiscount = item.discounted_price < item.price;
                      return (
                        <Box key={item.id}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2.5 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                              <Avatar 
                                variant="rounded" 
                                src={item.image || undefined} 
                                sx={{ width: 60, height: 60, bgcolor: '#F1F5F9', color: '#64748B' }}
                              >
                                {!item.image && <FastfoodIcon />}
                              </Avatar>
                              <Box>
                                <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B' }}>{item.name}</Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                                  <Chip label={item.category} size="small" variant="outlined" sx={{ fontSize: '11px', height: '20px' }} />
                                  <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13px' }}>
                                    Qty: <strong>{item.quantity}</strong>
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>

                            <Box sx={{ textAlign: 'right', minWidth: '90px' }}>
                              {hasDiscount ? (
                                <>
                                  <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94A3B8', display: 'block' }}>
                                    ₹{(item.price * item.quantity).toFixed(2)}
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#10B981' }}>
                                    ₹{(item.discounted_price * item.quantity).toFixed(2)}
                                  </Typography>
                                </>
                              ) : (
                                <Typography variant="body1" sx={{ fontWeight: 700, color: '#1E293B' }}>
                                  ₹{(item.price * item.quantity).toFixed(2)}
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

                <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', p: 3 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Statement Breakdown</Typography>
                  <Stack spacing={2}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="body1" sx={{ fontWeight: 700 }}>Total Paid</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: '#3B82F6' }}>
                        ₹{activeOrder.finalPrice.toFixed(2)}
                      </Typography>
                    </Box>
                  </Stack>
                </Paper>
              </Stack>
            </Grid>

            {/* Operations Column */}
            <Grid item xs={12} md={5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#334155', textTransform: 'uppercase', fontSize: '0.75rem' }}>
                Operations & Summary
              </Typography>

              <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', p: 3, mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#1E293B' }}>Delivery Destination Details</Typography>
                <Stack spacing={1.5}>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">SHIPPING ADDRESS ID / DETAIL</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155', mt: 0.5 }}>
                      {activeOrder.formattedAddress}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">CONTACT LINE</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#3B82F6', mt: 0.5 }}>{activeOrder.email}</Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3 }}>Live Tracking Pipeline (Click step to modify)</Typography>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', borderColor: '#F1F5F9' }}>
                  {activeOrder.orderStatus === "order cancelled" ? (
                    <Box textAlign="center" sx={{ py: 2 }}>
                      <Chip label="ORDER CANCELLED" color="error" sx={{ fontWeight: 800, px: 2 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5 }}>
                        This placement records a terminal cancelled state.
                      </Typography>
                    </Box>
                  ) : (
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
                            <Typography variant="body2" sx={{ fontWeight: currentStepIndex === index ? 700 : 500 }}>
                              {step.label}
                            </Typography>
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  )}
                </Paper>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}