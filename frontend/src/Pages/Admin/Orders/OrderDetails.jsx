// import React, { useState } from 'react';
// import {
//   Grid,
//   Box,
//   Typography,
//   Card,
//   CardContent,
//   ListItemButton,
//   List,
//   ListItemText,
//   Divider,
//   Stepper,
//   Step,
//   StepLabel,
//   Avatar,
//   Stack
// } from '@mui/material';

// export default function OrderDetails() {
//   // Demo Backend Data matching your request
//   const mockDashboardData = {
//     users: [
//       {
//         id: '#100234',
//         name: 'John Doe',
//         amount: '$35.50',
//         currentStatusStep: 0, // order placed
//         products: [
//           { name: 'Pepperoni Pizza', qty: 1, price: '$25.00' },
//           { name: 'Garlic Bread', qty: 1, price: '$6.50' }
//         ],
//         pricing: { subtotal: '$31.50', shipping: '$2.00', tax: '$2.00', total: '$35.50' }
//       },
//       {
//         id: '#100233',
//         name: 'Jane Smith',
//         amount: '$28.00',
//         currentStatusStep: 2, // product pickup
//         products: [
//           { name: 'Chicken Burger', qty: 2, price: '$20.00' },
//           { name: 'French Fries', qty: 1, price: '$5.00' }
//         ],
//         pricing: { subtotal: '$25.00', shipping: '$1.50', tax: '$1.50', total: '$28.00' }
//       }
//     ]
//   };

//   // State tracker to switch views dynamically on user click
//   const [selectedUserIndex, setSelectedUserIndex] = useState(0);
//   const activeUser = mockDashboardData.users[selectedUserIndex];

//   // Order timeline milestones
//   const steps = [
//     'Order Placed',
//     'Order Approval',
//     'Product Pickup',
//     'Shipped',
//     'Delivered'
//   ];

//   return (
//     <Box sx={{ p: 3, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
//       <Grid container spacing={3}>
        
//         {/* ================= LEFT SIDE: USER CARDS LIST ================= */}
//         <Grid item xs={12} md={3}>
//           <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1E1154' }}>
//             Active Carts / Users
//           </Typography>
//           <Box sx={{ maxHeight: '75vh', overflowY: 'auto', pr: 1 }}>
//             <List disablePadding>
//               {mockDashboardData.users.map((user, index) => (
//                 <Card 
//                   key={user.id} 
//                   variant="outlined" 
//                   sx={{ 
//                     mb: 2, 
//                     borderRadius: '12px',
//                     borderColor: selectedUserIndex === index ? '#489FB5' : '#E0E6ED',
//                     boxShadow: selectedUserIndex === index ? '0 4px 12px rgba(72,159,181,0.15)' : 'none',
//                     bgcolor: selectedUserIndex === index ? '#F0F9FF' : '#ffffff'
//                   }}
//                 >
//                   <ListItemButton 
//                     onClick={() => setSelectedUserIndex(index)}
//                     sx={{ p: 2, borderRadius: '12px' }}
//                   >
//                     <Avatar sx={{ bgcolor: '#0D3B66', mr: 2 }}>{user.name.charAt(0)}</Avatar>
//                     <ListItemText
//                       primary={<Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>{user.name}</Typography>}
//                       secondary={
//                         <Box sx={{ mt: 0.5 }}>
//                           <Typography variant="caption" display="block" color="text.secondary">ID: {user.id}</Typography>
//                           <Typography variant="body2" sx={{ fontWeight: 600, color: '#0D3B66', mt: 0.5 }}>{user.amount}</Typography>
//                         </Box>
//                       }
//                     />
//                   </ListItemButton>
//                 </Card>
//               ))}
//             </List>
//           </Box>
//         </Grid>

//         {/* ================= CENTER: COMPREHENSIVE PRODUCT LIST ================= */}
//         <Grid item xs={12} md={5}>
//           <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1E1154' }}>
//             Product List for {activeUser.name}
//           </Typography>
          
//           <Card variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E0E6ED', bgcolor: '#ffffff', p: 1 }}>
//             <CardContent>
//               {activeUser.products.map((product, idx) => (
//                 <Box key={idx}>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
//                     <Box>
//                       <Typography variant="body1" sx={{ fontWeight: 600, color: '#333' }}>
//                         {product.name}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         Quantity: {product.qty}
//                       </Typography>
//                     </Box>
//                     <Typography variant="body1" sx={{ fontWeight: 700, color: '#1A1A1A' }}>
//                       {product.price}
//                     </Typography>
//                   </Box>
//                   {idx < activeUser.products.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
//                 </Box>
//               ))}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* ================= RIGHT SIDE: STATUS TRACKER & FINANCIAL SUMMARY ================= */}
//         <Grid item xs={12} md={4}>
//           <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#1E1154' }}>
//             Order Status & Summary
//           </Typography>

//           {/* Stepper Timeline Box */}
//           <Card variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E0E6ED', bgcolor: '#ffffff', p: 3, mb: 3 }}>
//             <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 3, color: '#475569' }}>
//               Tracking Lifecycle
//             </Typography>
//             <Stepper activeStep={activeUser.currentStatusStep} orientation="vertical" spacing={2}>
//               {steps.map((label) => (
//                 <Step key={label}>
//                   <StepLabel 
//                     StepIconProps={{
//                       sx: {
//                         '&.Mui-active': { color: '#489FB5' },
//                         '&.Mui-completed': { color: '#0D3B66' }
//                       }
//                     }}
//                   >
//                     <Typography variant="body2" sx={{ fontWeight: 500 }}>{label}</Typography>
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//           </Card>

//           {/* Checkout Cost Totals Card */}
//           <Card variant="outlined" sx={{ borderRadius: '16px', borderColor: '#E0E6ED', bgcolor: '#ffffff', p: 3 }}>
//             <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, color: '#475569' }}>
//               Payment Totals Breakdown
//             </Typography>
            
//             <Stack spacing={1.5}>
//               <Box display="flex" justifyContent="space-between">
//                 <Typography variant="body2" color="text.secondary">Subtotal</Typography>
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>{activeUser.pricing.subtotal}</Typography>
//               </Box>
              
//               <Box display="flex" justifyContent="space-between">
//                 <Typography variant="body2" color="text.secondary">Shipping Fee</Typography>
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>{activeUser.pricing.shipping}</Typography>
//               </Box>
              
//               <Box display="flex" justifyContent="space-between">
//                 <Typography variant="body2" color="text.secondary">Sales Tax</Typography>
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>{activeUser.pricing.tax}</Typography>
//               </Box>
              
//               <Divider sx={{ my: 1 }} />
              
//               <Box display="flex" justifyContent="space-between" alignItems="center">
//                 <Typography variant="body1" sx={{ fontWeight: 'bold', color: '#1E1154' }}>Total</Typography>
//                 <Typography variant="h5" sx={{ fontWeight: 800, color: '#0D3B66' }}>{activeUser.pricing.total}</Typography>
//               </Box>
//             </Stack>
//           </Card>
//         </Grid>

//       </Grid>
//     </Box>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  Grid, Box, Typography, Card, CardContent, ListItemButton, List,
  ListItemText, Divider, Stepper, Step, StepLabel, Avatar, Chip, Stack, Paper, IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FastfoodIcon from '@mui/icons-material/Fastfood'; // Fallback icon for images

// import api from '../../../api/axiosConfig'; // <--- Uncomment later when backend works

const STATUS_STEPS = ["order placed", "preparing order", "order shipped", "order delivered", "order cancelled"];
const STEP_DETAILS = [
  { label: 'Order Placed', color: 'info' },
  { label: 'Order Approval', color: 'warning' },
  { label: 'Product Pickup', color: 'warning' },
  { label: 'Shipped', color: 'secondary' },
  { label: 'Delivered', color: 'success' }
];

// --- 10 REALISTIC MONGOOSE REPLICA RECORDS ---
const localMockOrders = [
  {
    _id: "66734511fa123b0011aa0001",
    customer: { _id: "667123a1fa123b0000000001", name: "John Doe", avatarColor: "#0D3B66" },
    products: [
      { product: { _id: "p1", name: "Pepperoni Pizza", category: "Main Course" }, price: 25.00, discounted_price: 25.00, quantity: 1 },
      { product: { _id: "p2", name: "Garlic Bread", category: "Sides" }, price: 6.50, discounted_price: 6.50, quantity: 1 }
    ],
    paymentID: "pay_XYZ100234_ABC",
    orderStatus: "order placed",
    address: { street: "123 Luxury Lane", city: "New York", state: "NY", zipCode: "10001", phoneNumber: "+1 (555) 019-2834" }
  },
  {
    _id: "66734511fa123b0011aa0002",
    customer: { _id: "667123a1fa123b0000000002", name: "Jane Smith", avatarColor: "#489FB5" },
    products: [
      { product: { _id: "p3", name: "Chicken Burger", category: "Main Course" }, price: 12.00, discounted_price: 10.00, quantity: 2 },
      { product: { _id: "p4", name: "French Fries", category: "Sides" }, price: 5.00, discounted_price: 5.00, quantity: 1 }
    ],
    paymentID: "pay_XYZ100233_DEF",
    orderStatus: "order shipped",
    address: { street: "456 Tech Boulevard", city: "San Francisco", state: "CA", zipCode: "94105", phoneNumber: "+1 (555) 014-9876" }
  },
  {
    _id: "66734511fa123b0011aa0003",
    customer: { _id: "667123a1fa123b0000000003", name: "Robert Johnson", avatarColor: "#E63946" },
    products: [
      { product: { _id: "p5", name: "Sushi Platter", category: "Japanese" }, price: 45.00, discounted_price: 45.00, quantity: 1 }
    ],
    paymentID: "pay_XYZ100232_GHI",
    orderStatus: "order delivered",
    address: { street: "789 Ocean Drive", city: "Miami", state: "FL", zipCode: "33139", phoneNumber: "+1 (555) 017-5544" }
  },
  {
    _id: "66734511fa123b0011aa0004",
    customer: { _id: "667123a1fa123b0000000004", name: "Alice Brown", avatarColor: "#F4A261" },
    products: [
      { product: { _id: "p6", name: "Margherita Pizza", category: "Main Course" }, price: 18.00, discounted_price: 16.50, quantity: 1 }
    ],
    paymentID: "pay_XYZ100231_JKL",
    orderStatus: "preparing order",
    address: { street: "12 Pine Street", city: "Seattle", state: "WA", zipCode: "98101", phoneNumber: "+1 (555) 012-3321" }
  },
  {
    _id: "66734511fa123b0011aa0005",
    customer: { _id: "667123a1fa123b0000000005", name: "Michael Green", avatarColor: "#2A9D8F" },
    products: [
      { product: { _id: "p7", name: "BBQ Wings", category: "Appetizers" }, price: 12.50, discounted_price: 12.50, quantity: 2 }
    ],
    paymentID: "pay_XYZ100230_MNO",
    orderStatus: "order placed",
    address: { street: "555 Maple Avenue", city: "Austin", state: "TX", zipCode: "78701", phoneNumber: "+1 (555) 015-8899" }
  },
  {
    _id: "66734511fa123b0011aa0006",
    customer: { _id: "667123a1fa123b0000000006", name: "Emily Davis", avatarColor: "#7209B7" },
    products: [
      { product: { _id: "p8", name: "Ceasar Salad", category: "Healthy" }, price: 14.00, discounted_price: 14.00, quantity: 1 }
    ],
    paymentID: "pay_XYZ100229_PQR",
    orderStatus: "order cancelled",
    address: { street: "77 Broadway", city: "Boston", state: "MA", zipCode: "02111", phoneNumber: "+1 (555) 011-4433" }
  },
  {
    _id: "66734511fa123b0011aa0007",
    customer: { _id: "667123a1fa123b0000000007", name: "David Wilson", avatarColor: "#FFB703" },
    products: [
      { product: { _id: "p9", name: "Fettuccine Alfredo", category: "Main Course" }, price: 22.00, discounted_price: 20.00, quantity: 1 }
    ],
    paymentID: "pay_XYZ100228_STU",
    orderStatus: "preparing order",
    address: { street: "888 Oak Lane", city: "Denver", state: "CO", zipCode: "80202", phoneNumber: "+1 (555) 013-7766" }
  },
  {
    _id: "66734511fa123b0011aa0008",
    customer: { _id: "667123a1fa123b0000000008", name: "Sarah Miller", avatarColor: "#FB8500" },
    products: [
      { product: { _id: "p10", name: "Chocolate Cake", category: "Dessert" }, price: 8.50, discounted_price: 8.50, quantity: 2 }
    ],
    paymentID: "pay_XYZ100227_VWX",
    orderStatus: "order shipped",
    address: { street: "99 Walnut Road", city: "Philadelphia", state: "PA", zipCode: "19104", phoneNumber: "+1 (555) 016-2211" }
  },
  {
    _id: "66734511fa123b0011aa0009",
    customer: { _id: "667123a1fa123b0000000009", name: "James Taylor", avatarColor: "#1D3557" },
    products: [
      { product: { _id: "p11", name: "Ribeye Steak", category: "Main Course" }, price: 38.00, discounted_price: 35.00, quantity: 1 }
    ],
    paymentID: "pay_XYZ100226_YZA",
    orderStatus: "order delivered",
    address: { street: "234 Market Street", city: "Chicago", state: "IL", zipCode: "60601", phoneNumber: "+1 (555) 018-4455" }
  },
  {
    _id: "66734511fa123b0011aa0010",
    customer: { _id: "667123a1fa123b0000000010", name: "Jessica White", avatarColor: "#457B9D" },
    products: [
      { product: { _id: "p12", name: "Vegetable Ramen", category: "Japanese" }, price: 16.00, discounted_price: 16.00, quantity: 1 }
    ],
    paymentID: "pay_XYZ100225_BCD",
    orderStatus: "order placed",
    address: { street: "711 Sunset Strip", city: "Los Angeles", state: "CA", zipCode: "90069", phoneNumber: "+1 (555) 010-1234" }
  }
];

export default function OrderRecordsDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Core Data Parsing Handler
  const parseData = (rawOrders) => {
    return rawOrders.map(order => ({
      id: order.paymentID ? `#${order.paymentID.split('_')[1] || order._id.slice(-6)}` : `#${order._id.slice(-6)}`,
      name: order.customer?.name || "Unknown Customer",
      avatarColor: order.customer?.avatarColor || "#334155",
      currentStatusStep: STATUS_STEPS.indexOf(order.orderStatus) !== -1 ? STATUS_STEPS.indexOf(order.orderStatus) : 0,
      formattedAddress: order.address 
        ? `${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zipCode}`
        : "No address attached",
      phone: order.address?.phoneNumber || "N/A",
      products: order.products.map((p, pIndex) => ({
        id: p.product?._id || `prod-${pIndex}`,
        name: p.product?.name || "Unknown Item",
        qty: p.quantity,
        price: p.discounted_price || p.price,
        category: p.product?.category || "General"
      }))
    }));
  };

  useEffect(() => {
    // CURRENT WORKAROUND: Runs directly out of local replica records array seamlessly
    const parsedData = parseData(localMockOrders);
    setUsers(parsedData);
    setLoading(false);

    /* // --- WHEN BACKEND IS ACTIVE AGAIN, REPLACE CODE WITH THIS BLOCK ---
    async function fetchFromBackend() {
      try {
        setLoading(true);
        let response = await api.get("/dashboard/getTotalDashboard");
        setUsers(parseData(response.data || []));
        setLoading(false);
      } catch (err) {
        console.error("Backend offline fallback:", err);
        setLoading(false);
      }
    }
    fetchFromBackend();
    */
  }, []);

  if (loading) return <Box sx={{ p: 4 }}><Typography>Loading records...</Typography></Box>;
  if (users.length === 0) return <Box sx={{ p: 4 }}><Typography>No active data sets found.</Typography></Box>;

  const activeUser = users[selectedUserIndex];

  const calculatePricing = (products) => {
    const subtotal = products.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shipping = subtotal > 0 ? 2.00 : 0.00;
    const tax = subtotal > 0 ? 2.00 : 0.00;
    const total = subtotal + shipping + tax;
    return {
      subtotal: `$${subtotal.toFixed(2)}`,
      shipping: `$${shipping.toFixed(2)}`,
      tax: `$${tax.toFixed(2)}`,
      total: `$${total.toFixed(2)}`
    };
  };

  const activePricing = calculatePricing(activeUser.products);

  const handleQuantityChange = (productId, denominator) => {
    setUsers(prev => prev.map((user, idx) => {
      if (idx !== selectedUserIndex) return user;
      return {
        ...user,
        products: user.products.map(p => p.id === productId ? { ...p, qty: Math.max(0, p.qty + denominator) } : p).filter(p => p.qty > 0)
      };
    }));
  };

  const handleStatusChange = (stepIndex) => {
    setUsers(prev => prev.map((user, idx) => idx === selectedUserIndex ? { ...user, currentStatusStep: stepIndex } : user));
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
      <Grid container spacing={3}>
        
        {/* ================= COLUMN 1: INTERACTIVE USER LIST ================= */}
        <Grid size={{xs:12,md:4,lg:3}}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#334155', textTransform: 'uppercase', fontSize: '0.75rem' }}>
            Active Carts ({users.length})
          </Typography>
          <Box sx={{ maxHeight: '72vh', overflowY: 'auto', pr: 1 }}>
            <List disablePadding>
              {users.map((user, index) => {
                const isSelected = selectedUserIndex === index;
                const userTotals = calculatePricing(user.products);
                const currentStepDetails = STEP_DETAILS[user.currentStatusStep] || STEP_DETAILS[0];

                return (
                  <Card key={user.id} variant="outlined" sx={{ mb: 2, borderRadius: '16px', borderColor: isSelected ? '#3B82F6' : '#E2E8F0' }}>
                    <ListItemButton onClick={() => setSelectedUserIndex(index)} sx={{ p: 2.5, borderRadius: '16px', alignItems: 'flex-start' }}>
                      <Avatar sx={{ bgcolor: user.avatarColor, mr: 2, mt: 0.5 }}>{user.name?.charAt(0)}</Avatar>
                      <ListItemText
                        component="div"
                        primary={
                          <Box display="flex" justifyContent="space-between" alignItems="center" width="100%">
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>{user.name}</Typography>
                            <Chip label={currentStepDetails.label} size="small" color={currentStepDetails.color} variant="soft" sx={{ fontSize: '11px' }} />
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="caption" display="block" color="text.secondary">{user.id}</Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, mt: 0.5 }}>{userTotals.total}</Typography>
                          </Box>
                        }
                      />
                    </ListItemButton>
                  </Card>
                );
              })}
            </List>
          </Box>
        </Grid>

        {/* ================= COLUMN 2: PRODUCTS & POPULATED ADDRESS PANEL ================= */}
        <Grid size={{xs:12,md:8,lg:5}}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#334155', textTransform: 'uppercase', fontSize: '0.75rem' }}>
            Cart Contents ({activeUser.name})
          </Typography>
          
          <Stack spacing={3}>
            <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
              <Box sx={{ p: 3, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Itemized Items</Typography>
              </Box>
              {/* <CardContent sx={{ p: 3 }}>
                {activeUser.products.map((product, idx) => (
                  <Box key={product.id}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>{product.name}</Typography>
                        <Chip label={product.category} size="small" variant="outlined" sx={{ fontSize: '11px', mt: 0.5 }} />
                      </Box>
                      <Stack direction="row" alignItems="center" spacing={1.5}>
                        <IconButton size="small" onClick={() => handleQuantityChange(product.id, -1)} sx={{ border: '1px solid #E2E8F0' }}><RemoveIcon fontSize="small" /></IconButton>
                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{product.qty}</Typography>
                        <IconButton size="small" onClick={() => handleQuantityChange(product.id, 1)} sx={{ border: '1px solid #E2E8F0' }}><AddIcon fontSize="small" /></IconButton>
                        <Typography variant="body1" sx={{ fontWeight: 700, pl: 2, minWidth: '60px', textAlign: 'right' }}>${(product.price * product.qty).toFixed(2)}</Typography>
                      </Stack>
                    </Box>
                    {idx < activeUser.products.length - 1 && <Divider />}
                  </Box>
                ))}
              </CardContent> */}
              <CardContent sx={{ p: 3 }}>
  {activeUser.products.map((item, idx) => {
    // Accessing properties based on your nested 'product' object structure
    const productDetail = item; 
    const hasDiscount = item.discounted_price < item.price;

    return (
      <Box key={productDetail._id}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2.5 }}>
          
          {/* Left Side: Product Image & Details */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* Product Image / Avatar Placeholder */}
            <Avatar 
              src={productDetail.image || ""} // Fallback if you have an image URL later
              variant="rounded" 
              alt='Not Fount'
              sx={{ width: 60, height: 60, bgcolor: '#F1F5F9', color: '#64748B' }}
            >
              <FastfoodIcon />
            </Avatar>

            {/* Name, Category & Quantity */}
            <Box>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B' }}>
                {productDetail.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <Chip 
                  label={productDetail.category} 
                  size="small" 
                  variant="outlined" 
                  sx={{ fontSize: '11px', height: '20px', color: '#64748B' }} 
                />
                <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13px' }}>
                  Qty: <strong>{item.qty}</strong>
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Right Side: Pricing & Action Buttons */}
          <Stack direction="row" alignItems="center" spacing={2}>
            
            {/* Price Display (Handles Regular vs Discounted Pricing) */}
            <Box sx={{ textAlign: 'right', minWidth: '90px' }}>
              {hasDiscount ? (
                <>
                  {/* Strikethrough Original Total */}
                  <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94A3B8', display: 'block' }}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                  {/* Active Discounted Total */}
                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#10B981' }}>
                    ${(item.discounted_price * item.quantity).toFixed(2)}
                  </Typography>
                </>
              ) : (
                /* Regular Price Total */
                <Typography variant="body1" sx={{ fontWeight: 700, color: '#1E293B' }}>
                  ${(item.price * item.qty).toFixed(2)}
                </Typography>
              )}
            </Box>

            <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

            {/* Action Buttons */}
            <Stack direction="row" spacing={0.5}>
              <IconButton 
                size="small" 
                color="primary" 
                onClick={() => handleEditProduct(productDetail._id)}
                sx={{ backgroundColor: '#EFF6FF', '&:hover': { backgroundColor: '#DBEAFE' } }}
              >
                <EditIcon fontSize="small" />
              </IconButton>
              
              <IconButton 
                size="small" 
                color="error" 
                onClick={() => handleDeleteProduct(productDetail._id)}
                sx={{ backgroundColor: '#FEF2F2', '&:hover': { backgroundColor: '#FEE2E2' } }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Stack>

          </Stack>
        </Box>
        
        {/* Clean divider line between items */}
        {idx < activeUser.products.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
      </Box>
    );
  })}
</CardContent>
            </Paper>

             <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', p: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Statement Breakdown</Typography>
            <Stack spacing={2}>
              <Box display="flex" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Subtotal</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{activePricing.subtotal}</Typography></Box>
              <Box display="flex" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Shipping</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{activePricing.shipping}</Typography></Box>
              <Box display="flex" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Sales Tax</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{activePricing.tax}</Typography></Box>
              <Divider />
              <Box display="flex" justifyContent="space-between" alignItems="center"><Typography variant="body1" sx={{ fontWeight: 700 }}>Total</Typography><Typography variant="h5" sx={{ fontWeight: 800, color: '#3B82F6' }}>{activePricing.total}</Typography></Box>
            </Stack>
          </Paper>

            
          </Stack>
        </Grid>

        {/* ================= COLUMN 3: TRACKING & TOTALS ================= */}
        <Grid size={{xs:12,md:12,lg:4}}>
          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#334155', textTransform: 'uppercase', fontSize: '0.75rem' }}>
            Operations & Summary
          </Typography>

          <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', p: 3 ,mb:2}}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#1E293B' }}>
                Delivery Destination Details
              </Typography>
              <Stack spacing={1.5}>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">SHIPPING ADDRESS</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155', mt: 0.5 }}>
                    {activeUser.formattedAddress}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" display="block">CONTACT LINE</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#3B82F6', mt: 0.5 }}>
                    {activeUser.phone}
                  </Typography>
                </Box>
              </Stack>
            </Paper>

          <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', p: 3, mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3 }}>Live Tracking Pipeline</Typography>
            <Stepper 
              activeStep={activeUser.currentStatusStep} 
              orientation="vertical" 
              sx={{
                '& .MuiStepIcon-root.Mui-active': { color: '#3B82F6' },
                '& .MuiStepIcon-root.Mui-completed': { color: '#10B981' }
              }}
            >
              {STEP_DETAILS.map((step, index) => (
                <Step key={step.label} onClick={() => handleStatusChange(index)} sx={{ cursor: 'pointer' }}>
                  <StepLabel>
                    <Typography variant="body2" sx={{ fontWeight: activeUser.currentStatusStep === index ? 700 : 500 }}>
                      {step.label}
                    </Typography>
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
          </Paper>

          
        </Grid>

      </Grid>
    </Box>
  );
}
