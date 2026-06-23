
// import React, { useEffect, useState } from 'react';
// import {
//   Grid, Box, Typography, Card, CardContent, ListItemButton, List,
//   ListItemText, Divider, Stepper, Step, StepLabel, Avatar, Chip, Stack, Paper, IconButton,
//   TableContainer,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   TableSortLabel,
// } from '@mui/material';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FastfoodIcon from '@mui/icons-material/Fastfood'; // Fallback icon for images

// // import api from '../../../api/axiosConfig'; // <--- Uncomment later when backend works

// const STATUS_STEPS = ["order placed", "preparing order", "order shipped", "order delivered", "order cancelled"];
// const STEP_DETAILS = [
//   { label: 'Order Placed', color: 'info' },
//   { label: 'Order Approval', color: 'warning' },
//   { label: 'Product Pickup', color: 'warning' },
//   { label: 'Shipped', color: 'secondary' },
//   { label: 'Delivered', color: 'success' }
// ];

// // --- 10 REALISTIC MONGOOSE REPLICA RECORDS ---
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
//   },
//   {
//     _id: "66734511fa123b0011aa0004",
//     customer: { _id: "667123a1fa123b0000000004", name: "Alice Brown", avatarColor: "#F4A261" },
//     products: [
//       { product: { _id: "p6", name: "Margherita Pizza", category: "Main Course" }, price: 18.00, discounted_price: 16.50, quantity: 1 }
//     ],
//     paymentID: "pay_XYZ100231_JKL",
//     orderStatus: "preparing order",
//     address: { street: "12 Pine Street", city: "Seattle", state: "WA", zipCode: "98101", phoneNumber: "+1 (555) 012-3321" }
//   },
//   {
//     _id: "66734511fa123b0011aa0005",
//     customer: { _id: "667123a1fa123b0000000005", name: "Michael Green", avatarColor: "#2A9D8F" },
//     products: [
//       { product: { _id: "p7", name: "BBQ Wings", category: "Appetizers" }, price: 12.50, discounted_price: 12.50, quantity: 2 }
//     ],
//     paymentID: "pay_XYZ100230_MNO",
//     orderStatus: "order placed",
//     address: { street: "555 Maple Avenue", city: "Austin", state: "TX", zipCode: "78701", phoneNumber: "+1 (555) 015-8899" }
//   },
//   {
//     _id: "66734511fa123b0011aa0006",
//     customer: { _id: "667123a1fa123b0000000006", name: "Emily Davis", avatarColor: "#7209B7" },
//     products: [
//       { product: { _id: "p8", name: "Ceasar Salad", category: "Healthy" }, price: 14.00, discounted_price: 14.00, quantity: 1 }
//     ],
//     paymentID: "pay_XYZ100229_PQR",
//     orderStatus: "order cancelled",
//     address: { street: "77 Broadway", city: "Boston", state: "MA", zipCode: "02111", phoneNumber: "+1 (555) 011-4433" }
//   },
//   {
//     _id: "66734511fa123b0011aa0007",
//     customer: { _id: "667123a1fa123b0000000007", name: "David Wilson", avatarColor: "#FFB703" },
//     products: [
//       { product: { _id: "p9", name: "Fettuccine Alfredo", category: "Main Course" }, price: 22.00, discounted_price: 20.00, quantity: 1 }
//     ],
//     paymentID: "pay_XYZ100228_STU",
//     orderStatus: "preparing order",
//     address: { street: "888 Oak Lane", city: "Denver", state: "CO", zipCode: "80202", phoneNumber: "+1 (555) 013-7766" }
//   },
//   {
//     _id: "66734511fa123b0011aa0008",
//     customer: { _id: "667123a1fa123b0000000008", name: "Sarah Miller", avatarColor: "#FB8500" },
//     products: [
//       { product: { _id: "p10", name: "Chocolate Cake", category: "Dessert" }, price: 8.50, discounted_price: 8.50, quantity: 2 }
//     ],
//     paymentID: "pay_XYZ100227_VWX",
//     orderStatus: "order shipped",
//     address: { street: "99 Walnut Road", city: "Philadelphia", state: "PA", zipCode: "19104", phoneNumber: "+1 (555) 016-2211" }
//   },
//   {
//     _id: "66734511fa123b0011aa0009",
//     customer: { _id: "667123a1fa123b0000000009", name: "James Taylor", avatarColor: "#1D3557" },
//     products: [
//       { product: { _id: "p11", name: "Ribeye Steak", category: "Main Course" }, price: 38.00, discounted_price: 35.00, quantity: 1 }
//     ],
//     paymentID: "pay_XYZ100226_YZA",
//     orderStatus: "order delivered",
//     address: { street: "234 Market Street", city: "Chicago", state: "IL", zipCode: "60601", phoneNumber: "+1 (555) 018-4455" }
//   },
//   {
//     _id: "66734511fa123b0011aa0010",
//     customer: { _id: "667123a1fa123b0000000010", name: "Jessica White", avatarColor: "#457B9D" },
//     products: [
//       { product: { _id: "p12", name: "Vegetable Ramen", category: "Japanese" }, price: 16.00, discounted_price: 16.00, quantity: 1 }
//     ],
//     paymentID: "pay_XYZ100225_BCD",
//     orderStatus: "order placed",
//     address: { street: "711 Sunset Strip", city: "Los Angeles", state: "CA", zipCode: "90069", phoneNumber: "+1 (555) 010-1234" }
//   }
// ];

// export default function OrderRecordsDashboard() {
//   const [users, setUsers] = useState([]);
//   const [selectedUserIndex, setSelectedUserIndex] = useState(0);
//   const [loading, setLoading] = useState(true);

//   // Core Data Parsing Handler
//   const parseData = (rawOrders) => {
//     return rawOrders.map(order => ({
//       id: order.paymentID ? `#${order.paymentID.split('_')[1] || order._id.slice(-6)}` : `#${order._id.slice(-6)}`,
//       name: order.customer?.name || "Unknown Customer",
//       avatarColor: order.customer?.avatarColor || "#334155",
//       currentStatusStep: STATUS_STEPS.indexOf(order.orderStatus) !== -1 ? STATUS_STEPS.indexOf(order.orderStatus) : 0,
//       formattedAddress: order.address 
//         ? `${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zipCode}`
//         : "No address attached",
//       phone: order.address?.phoneNumber || "N/A",
//       products: order.products.map((p, pIndex) => ({
//         id: p.product?._id || `prod-${pIndex}`,
//         name: p.product?.name || "Unknown Item",
//         qty: p.quantity,
//         price: p.discounted_price || p.price,
//         category: p.product?.category || "General"
//       }))
//     }));
//   };

//   useEffect(() => {
//     // CURRENT WORKAROUND: Runs directly out of local replica records array seamlessly
//     const parsedData = parseData(localMockOrders);
//     setUsers(parsedData);
//     setLoading(false);

//     /* // --- WHEN BACKEND IS ACTIVE AGAIN, REPLACE CODE WITH THIS BLOCK ---
//     async function fetchFromBackend() {
//       try {
//         setLoading(true);
//         let response = await api.get("/dashboard/getTotalDashboard");
//         setUsers(parseData(response.data || []));
//         setLoading(false);
//       } catch (err) {
//         console.error("Backend offline fallback:", err);
//         setLoading(false);
//       }
//     }
//     fetchFromBackend();
//     */
//   }, []);

//   if (loading) return <Box sx={{ p: 4 }}><Typography>Loading records...</Typography></Box>;
//   if (users.length === 0) return <Box sx={{ p: 4 }}><Typography>No active data sets found.</Typography></Box>;

//   const activeUser = users[selectedUserIndex];

//   const calculatePricing = (products) => {
//     const subtotal = products.reduce((acc, item) => acc + item.price * item.qty, 0);
//     const shipping = subtotal > 0 ? 2.00 : 0.00;
//     const tax = subtotal > 0 ? 2.00 : 0.00;
//     const total = subtotal + shipping + tax;
//     return {
//       subtotal: `$${subtotal.toFixed(2)}`,
//       shipping: `$${shipping.toFixed(2)}`,
//       tax: `$${tax.toFixed(2)}`,
//       total: `$${total.toFixed(2)}`
//     };
//   };

//   const activePricing = calculatePricing(activeUser.products);

//   const handleQuantityChange = (productId, denominator) => {
//     setUsers(prev => prev.map((user, idx) => {
//       if (idx !== selectedUserIndex) return user;
//       return {
//         ...user,
//         products: user.products.map(p => p.id === productId ? { ...p, qty: Math.max(0, p.qty + denominator) } : p).filter(p => p.qty > 0)
//       };
//     }));
//   };

//   const handleStatusChange = (stepIndex) => {
//     setUsers(prev => prev.map((user, idx) => idx === selectedUserIndex ? { ...user, currentStatusStep: stepIndex } : user));
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#F8FAFC', minHeight: '100vh' }}>
//       <Grid container spacing={3}>
        
//         {/* ================= COLUMN 1: INTERACTIVE USER LIST ================= */}
//         <Grid size={{xs:12}}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#334155', textTransform: 'uppercase', fontSize: '0.75rem' }}>
//             Active Carts ({users.length})
//           </Typography>
//           <Box sx={{ maxHeight: '72vh', overflowY: 'auto', pr: 1 }}>
//             <List disablePadding>
//               {users.map((user, index) => {
//                 const isSelected = selectedUserIndex === index;
//                 const userTotals = calculatePricing(user.products);
//                 const currentStepDetails = STEP_DETAILS[user.currentStatusStep] || STEP_DETAILS[0];

//                 return (
//                   <TableContainer 
//   component={Paper} 
//   variant="outlined" 
//   sx={{ 
//     borderRadius: '16px', 
//     borderColor: '#E2E8F0',
//     width: '100%',
//     overflowX: 'auto', 
//     WebkitOverflowScrolling: 'touch'
//   }}
// >
//   <Table sx={{ minWidth: { xs: 700, md: 800 } }}>
    
//     {/* Table Header */}
//     <TableHead sx={{ bgcolor: '#D0DFEC' }}>
//       <TableRow>
//         <TableCell><TableSortLabel active direction="asc"><b>Order ID</b></TableSortLabel></TableCell>
//         <TableCell><b>Customer Name</b></TableCell>
//         <TableCell><b>Order Date & Time</b></TableCell>
//         <TableCell><b>Order Status</b></TableCell>
//         <TableCell><b>Total Amount</b></TableCell>
//         <TableCell align="center"><b>Actions</b></TableCell>
//       </TableRow>
//     </TableHead>

//     {/* Table Body utilizing your exact array data */}
//     <TableBody>
      
//           <TableRow key={order._id} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: '#F8FAFC' } }}>
            
//             {/* Order ID */}
//             <TableCell>
//               <Typography variant="body2" sx={{ fontFamily: 'monospace', color: '#475569' }}>
//                 {order._id.substring(16)}
//               </Typography>
//             </TableCell>

//             {/* Customer Details */}
//             <TableCell>
//               <Box display="flex" alignItems="center" gap={1.5}>
//                 <Avatar sx={{ bgcolor: order.customer.avatarColor, width: 32, height: 32, fontSize: '14px' }}>
//                   {order.customer.name.charAt(0)}
//                 </Avatar>
//                 <Box>
//                   <Typography variant="body2" sx={{ fontWeight: 600 }}>
//                     {order.customer.name}
//                   </Typography>
//                   <Typography variant="caption" color="text.secondary" display="block">
//                     {order.address.city}, {order.address.state}
//                   </Typography>
//                 </Box>
//               </Box>
//             </TableCell>

//             {/* Static Date Format String */}
//             <TableCell>
//               <Typography variant="body2" sx={{ color: '#334155' }}>
//                 Jun 20, 2026, 03:19 PM
//               </Typography>
//             </TableCell>

//             {/* Order Status Badge */}
//             <TableCell>
//               <Chip 
//                 label={order.orderStatus.toUpperCase()} 
//                 size="small" 
//                 color={chipColor} 
//                 variant="soft" 
//                 sx={{ fontSize: '10px', fontWeight: 700 }} 
//               />
//             </TableCell>

//             {/* Total Calculated Amount */}
//             <TableCell>
//               <Typography variant="body2" sx={{ fontWeight: 700 }}>
//                 ${orderTotal.toFixed(2)}
//               </Typography>
//             </TableCell>

//             {/* Single View Action Button */}
//             <TableCell align="center">
//               <IconButton 
//                 size="small" 
//                 color="primary" 
//                 onClick={() => handleViewOrder(order._id)} // Apply your existing click method here
//                 sx={{ backgroundColor: '#EFF6FF', '&:hover': { backgroundColor: '#DBEAFE' } }}
//                 title="View Details"
//               >
//                 <VisibilityIcon fontSize="small" />
//               </IconButton>
//             </TableCell>

//           </TableRow>
        
//     </TableBody>

//   </Table>
// </TableContainer>
//                 );
//               })}
//             </List>
//           </Box>
//         </Grid>

//         {/* ================= COLUMN 2: PRODUCTS & POPULATED ADDRESS PANEL ================= */}
//         <Grid size={{xs:12,md:8,lg:5}}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#334155', textTransform: 'uppercase', fontSize: '0.75rem' }}>
//             Cart Contents ({activeUser.name})
//           </Typography>
          
//           <Stack spacing={3}>
//             <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', overflow: 'hidden' }}>
//               <Box sx={{ p: 3, bgcolor: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
//                 <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Itemized Items</Typography>
//               </Box>
//               {/* <CardContent sx={{ p: 3 }}>
//                 {activeUser.products.map((product, idx) => (
//                   <Box key={product.id}>
//                     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
//                       <Box>
//                         <Typography variant="body1" sx={{ fontWeight: 600 }}>{product.name}</Typography>
//                         <Chip label={product.category} size="small" variant="outlined" sx={{ fontSize: '11px', mt: 0.5 }} />
//                       </Box>
//                       <Stack direction="row" alignItems="center" spacing={1.5}>
//                         <IconButton size="small" onClick={() => handleQuantityChange(product.id, -1)} sx={{ border: '1px solid #E2E8F0' }}><RemoveIcon fontSize="small" /></IconButton>
//                         <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{product.qty}</Typography>
//                         <IconButton size="small" onClick={() => handleQuantityChange(product.id, 1)} sx={{ border: '1px solid #E2E8F0' }}><AddIcon fontSize="small" /></IconButton>
//                         <Typography variant="body1" sx={{ fontWeight: 700, pl: 2, minWidth: '60px', textAlign: 'right' }}>${(product.price * product.qty).toFixed(2)}</Typography>
//                       </Stack>
//                     </Box>
//                     {idx < activeUser.products.length - 1 && <Divider />}
//                   </Box>
//                 ))}
//               </CardContent> */}
//               <CardContent sx={{ p: 3 }}>
//   {activeUser.products.map((item, idx) => {
//     // Accessing properties based on your nested 'product' object structure
//     const productDetail = item; 
//     const hasDiscount = item.discounted_price < item.price;

//     return (
//       <Box key={productDetail._id}>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2.5 }}>
          
//           {/* Left Side: Product Image & Details */}
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             {/* Product Image / Avatar Placeholder */}
//             <Avatar 
//               src={productDetail.image || ""} // Fallback if you have an image URL later
//               variant="rounded" 
//               alt='Not Fount'
//               sx={{ width: 60, height: 60, bgcolor: '#F1F5F9', color: '#64748B' }}
//             >
//               <FastfoodIcon />
//             </Avatar>

//             {/* Name, Category & Quantity */}
//             <Box>
//               <Typography variant="body1" sx={{ fontWeight: 600, color: '#1E293B' }}>
//                 {productDetail.name}
//               </Typography>
              
//               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
//                 <Chip 
//                   label={productDetail.category} 
//                   size="small" 
//                   variant="outlined" 
//                   sx={{ fontSize: '11px', height: '20px', color: '#64748B' }} 
//                 />
//                 <Typography variant="body2" sx={{ color: '#64748B', fontSize: '13px' }}>
//                   Qty: <strong>{item.qty}</strong>
//                 </Typography>
//               </Box>
//             </Box>
//           </Box>

//           {/* Right Side: Pricing & Action Buttons */}
//           <Stack direction="row" alignItems="center" spacing={2}>
            
//             {/* Price Display (Handles Regular vs Discounted Pricing) */}
//             <Box sx={{ textAlign: 'right', minWidth: '90px' }}>
//               {hasDiscount ? (
//                 <>
//                   {/* Strikethrough Original Total */}
//                   <Typography variant="caption" sx={{ textDecoration: 'line-through', color: '#94A3B8', display: 'block' }}>
//                     ${(item.price * item.quantity).toFixed(2)}
//                   </Typography>
//                   {/* Active Discounted Total */}
//                   <Typography variant="body1" sx={{ fontWeight: 700, color: '#10B981' }}>
//                     ${(item.discounted_price * item.quantity).toFixed(2)}
//                   </Typography>
//                 </>
//               ) : (
//                 /* Regular Price Total */
//                 <Typography variant="body1" sx={{ fontWeight: 700, color: '#1E293B' }}>
//                   ${(item.price * item.qty).toFixed(2)}
//                 </Typography>
//               )}
//             </Box>

//             <Divider orientation="vertical" flexItem sx={{ mx: 0.5 }} />

//             {/* Action Buttons */}
//             <Stack direction="row" spacing={0.5}>
//               <IconButton 
//                 size="small" 
//                 color="primary" 
//                 onClick={() => handleEditProduct(productDetail._id)}
//                 sx={{ backgroundColor: '#EFF6FF', '&:hover': { backgroundColor: '#DBEAFE' } }}
//               >
//                 <EditIcon fontSize="small" />
//               </IconButton>
              
//               <IconButton 
//                 size="small" 
//                 color="error" 
//                 onClick={() => handleDeleteProduct(productDetail._id)}
//                 sx={{ backgroundColor: '#FEF2F2', '&:hover': { backgroundColor: '#FEE2E2' } }}
//               >
//                 <DeleteIcon fontSize="small" />
//               </IconButton>
//             </Stack>

//           </Stack>
//         </Box>
        
//         {/* Clean divider line between items */}
//         {idx < activeUser.products.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
//       </Box>
//     );
//   })}
// </CardContent>
//             </Paper>

//              <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', p: 3 }}>
//             <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>Statement Breakdown</Typography>
//             <Stack spacing={2}>
//               <Box display="flex" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Subtotal</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{activePricing.subtotal}</Typography></Box>
//               <Box display="flex" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Shipping</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{activePricing.shipping}</Typography></Box>
//               <Box display="flex" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Sales Tax</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{activePricing.tax}</Typography></Box>
//               <Divider />
//               <Box display="flex" justifyContent="space-between" alignItems="center"><Typography variant="body1" sx={{ fontWeight: 700 }}>Total</Typography><Typography variant="h5" sx={{ fontWeight: 800, color: '#3B82F6' }}>{activePricing.total}</Typography></Box>
//             </Stack>
//           </Paper>

            
//           </Stack>
//         </Grid>

//         {/* ================= COLUMN 3: TRACKING & TOTALS ================= */}
//         <Grid size={{xs:12,md:12,lg:4}}>
//           <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#334155', textTransform: 'uppercase', fontSize: '0.75rem' }}>
//             Operations & Summary
//           </Typography>

//           <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', bgcolor: '#FFFFFF', p: 3 ,mb:2}}>
//               <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2, color: '#1E293B' }}>
//                 Delivery Destination Details
//               </Typography>
//               <Stack spacing={1.5}>
//                 <Box>
//                   <Typography variant="caption" color="text.secondary" display="block">SHIPPING ADDRESS</Typography>
//                   <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155', mt: 0.5 }}>
//                     {activeUser.formattedAddress}
//                   </Typography>
//                 </Box>
//                 <Box>
//                   <Typography variant="caption" color="text.secondary" display="block">CONTACT LINE</Typography>
//                   <Typography variant="body2" sx={{ fontWeight: 600, color: '#3B82F6', mt: 0.5 }}>
//                     {activeUser.phone}
//                   </Typography>
//                 </Box>
//               </Stack>
//             </Paper>

//           <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', p: 3, mb: 3 }}>
//             <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3 }}>Live Tracking Pipeline</Typography>
//             <Stepper 
//               activeStep={activeUser.currentStatusStep} 
//               orientation="vertical" 
//               sx={{
//                 '& .MuiStepIcon-root.Mui-active': { color: '#3B82F6' },
//                 '& .MuiStepIcon-root.Mui-completed': { color: '#10B981' }
//               }}
//             >
//               {STEP_DETAILS.map((step, index) => (
//                 <Step key={step.label} onClick={() => handleStatusChange(index)} sx={{ cursor: 'pointer' }}>
//                   <StepLabel>
//                     <Typography variant="body2" sx={{ fontWeight: activeUser.currentStatusStep === index ? 700 : 500 }}>
//                       {step.label}
//                     </Typography>
//                   </StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//           </Paper>

          
//         </Grid>

//       </Grid>
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

// import api from '../../../api/axiosConfig'; // <--- Uncomment this when backend is live

const STATUS_STEPS = ["order placed", "preparing order", "order shipped", "order delivered", "order cancelled"];
const STEP_DETAILS = [
  { label: 'Order Placed', color: 'info' },
  { label: 'Order Approval', color: 'warning' },
  { label: 'Product Pickup', color: 'warning' },
  { label: 'Shipped', color: 'secondary' },
  { label: 'Delivered', color: 'success' }
];

// --- STATIC DEMO DATA SET (Fallback) ---
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
  }
];

export default function OrderRecordsDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'details'
  const [loading, setLoading] = useState(true);

  // Dynamic Data Parser: Translates raw mongoose objects into clean UI properties
  const parseData = (rawOrders) => {
    return rawOrders.map(order => ({
      _id: order._id,
      paymentID: order.paymentID || "",
      orderIdClean: order.paymentID ? `#${order.paymentID.split('_')[1] || order._id.slice(-6)}` : `#${order._id.slice(-6)}`,
      name: order.customer?.name || "Unknown Customer",
      avatarColor: order.customer?.avatarColor || "#334155",
      orderStatus: order.orderStatus || "order placed",
      formattedAddress: order.address 
        ? `${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zipCode}`
        : "No address attached",
      phone: order.address?.phoneNumber || "N/A",
      products: order.products.map((p, pIndex) => ({
        id: p.product?._id || `prod-${pIndex}`,
        name: p.product?.name || "Unknown Item",
        quantity: p.quantity || 1,
        price: p.price || 0,
        discounted_price: p.discounted_price || p.price || 0,
        category: p.product?.category || "General"
      }))
    }));
  };

  useEffect(() => {
    // --- LIVE BACKEND TOGGLE ---
    // When your backend is ready, uncomment the logic below and delete the default mock lines.
    
    async function fetchFromBackend() {
      try {
        setLoading(true);
        let response = await api.get("/orders/admin/getAllOrders"); // Update URL if needed
        console.log("Backend fetch response:", response.data)
        setOrders(parseData(response.data || []));
        setLoading(false);
      } catch (err) {
        console.error("Backend fetch error, falling back to demo data:", err);
        setOrders(parseData(localMockOrders));
        setLoading(false);
      }
    }
    fetchFromBackend();
    

    // --- DEMO WORKING BUFFER ---
    setOrders(parseData(localMockOrders));
    setLoading(false);
  }, []);

  const calculateOrderTotal = (products) => {
    const subtotal = products.reduce((acc, item) => acc + (item.discounted_price * item.quantity), 0);
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

  const handleStatusChange = (orderId, stepIndex) => {
    setOrders(prevOrders => prevOrders.map(order => {
      if (order._id !== orderId) return order;
      return { ...order, orderStatus: STATUS_STEPS[stepIndex] || STATUS_STEPS[0] };
    }));
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
  const activePricing = calculateOrderTotal(activeOrder.products);
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
                {orders.map((order) => {
                  const pricing = calculateOrderTotal(order.products);
                  return (
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
                              {order.formattedAddress.split(',')[1] || "N/A"}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ color: '#334155' }}>Jun 20, 2026, 03:19 PM</Typography>
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
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>{pricing.total}</Typography>
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
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
        
        // ================= PAGE 2: ISOLATED SPECIFIC DETAILS PAGE =================
        <Box>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={() => setViewMode('list')} 
            sx={{ mb: 3, fontWeight: 600, textTransform: 'none' }}
          >
            Back to Orders Management Table
          </Button>

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
                              <Avatar variant="rounded" sx={{ width: 60, height: 60, bgcolor: '#F1F5F9', color: '#64748B' }}>
                                <FastfoodIcon />
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
                                    ${(item.price * item.quantity).toFixed(2)}
                                  </Typography>
                                  <Typography variant="body1" sx={{ fontWeight: 700, color: '#10B981' }}>
                                    ${(item.discounted_price * item.quantity).toFixed(2)}
                                  </Typography>
                                </>
                              ) : (
                                <Typography variant="body1" sx={{ fontWeight: 700, color: '#1E293B' }}>
                                  ${(item.price * item.quantity).toFixed(2)}
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
                    <Box display="flex" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Subtotal</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{activePricing.subtotal}</Typography></Box>
                    <Box display="flex" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Shipping</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{activePricing.shipping}</Typography></Box>
                    <Box display="flex" justifyContent="space-between"><Typography variant="body2" color="text.secondary">Sales Tax</Typography><Typography variant="body2" sx={{ fontWeight: 600 }}>{activePricing.tax}</Typography></Box>
                    <Divider />
                    <Box display="flex" justifyContent="space-between" alignItems="center"><Typography variant="body1" sx={{ fontWeight: 700 }}>Total</Typography><Typography variant="h5" sx={{ fontWeight: 800, color: '#3B82F6' }}>{activePricing.total}</Typography></Box>
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
                    <Typography variant="caption" color="text.secondary" display="block">SHIPPING ADDRESS</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 500, color: '#334155', mt: 0.5 }}>
                      {activeOrder.formattedAddress}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary" display="block">CONTACT LINE</Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: '#3B82F6', mt: 0.5 }}>{activeOrder.phone}</Typography>
                  </Box>
                </Stack>
              </Paper>

              <Paper variant="outlined" sx={{ borderRadius: '20px', borderColor: '#E2E8F0', p: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 3 }}>Live Tracking Pipeline (Click step to modify)</Typography>
                <Paper variant="outlined" sx={{ p: 2, borderRadius: '12px', borderColor: '#F1F5F9' }}>
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
                </Paper>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      )}
    </Box>
  );
}
