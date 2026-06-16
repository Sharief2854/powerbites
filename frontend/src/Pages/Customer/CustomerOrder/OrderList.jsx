// import { Box, Table, TableBody,TableRow, TableCell, TableContainer, TableHead, Typography } from '@mui/material'
// import React from 'react'

// function OrderList() {

// const orders = [
//   {
//     _id: "ORD1001",
//     orderDate: "2026-06-10",
//     totalAmount: 52000,
//     status: "Delivered",
//     paymentMethod: "UPI",
//     shippingAddress: {
//       city: "Mumbai",
//       state: "Maharashtra",
//       pincode: "400001",
//     },
//     products: [
//       {
//         _id: "P1",
//         name: "Laptop",
//         price: 50000,
//         quantity: 1,
//         image:
//           "https://via.placeholder.com/100",
//       },
//       {
//         _id: "P2",
//         name: "Wireless Mouse",
//         price: 2000,
//         quantity: 1,
//         image:
//           "https://via.placeholder.com/100",
//       },
//     ],
//   },

//   {
//     _id: "ORD1002",
//     orderDate: "2026-06-12",
//     totalAmount: 3500,
//     status: "Shipped",
//     paymentMethod: "Credit Card",
//     shippingAddress: {
//       city: "Pune",
//       state: "Maharashtra",
//       pincode: "411001",
//     },
//     products: [
//       {
//         _id: "P3",
//         name: "Keyboard",
//         price: 1500,
//         quantity: 1,
//         image:
//           "https://via.placeholder.com/100",
//       },
//       {
//         _id: "P4",
//         name: "Headphones",
//         price: 2000,
//         quantity: 1,
//         image:
//           "https://via.placeholder.com/100",
//       },
//     ],
//   },

//   {
//     _id: "ORD1003",
//     orderDate: "2026-06-15",
//     totalAmount: 1200,
//     status: "Pending",
//     paymentMethod: "Cash On Delivery",
//     shippingAddress: {
//       city: "Nashik",
//       state: "Maharashtra",
//       pincode: "422001",
//     },
//     products: [
//       {
//         _id: "P5",
//         name: "USB Cable",
//         price: 300,
//         quantity: 2,
//         image:
//           "https://via.placeholder.com/100",
//       },
//       {
//         _id: "P6",
//         name: "Mobile Stand",
//         price: 600,
//         quantity: 1,
//         image:
//           "https://via.placeholder.com/100",
//       },
//     ],
//   },
// ];

//   return (
//     <Box>
//         <Box>
//          {orders.map((order) => (
//             <Box key={order._id}> 
//             <Typography>Order</Typography>
//               <TableContainer >
//                 <Table>
//                   <Typography>Order ID: {order._id}</Typography>  
//                   <TableHead>
//                     <TableCell>Product Name </TableCell>
//                     <TableCell>Price</TableCell>
//                     <TableCell>Quantity</TableCell>
//                     <TableCell>Image</TableCell>
//                     <TableCell>Total</TableCell>
//                     <TableCell>Status</TableCell>
//                     <TableCell>Payment Method</TableCell>
//                     <TableCell>Shipping Address</TableCell>
//                     <TableCell>Order Date</TableCell>
//                   </TableHead>
//                   <TableBody>
//                     {order.products.map((product) => (
//                       <TableRow key={product._id}>
//                         <TableCell>{product.name}</TableCell>
//                         <TableCell>{product.price}</TableCell>
//                         <TableCell>{product.quantity}</TableCell>
//                         <TableCell>
//                           <img
//                             src={product.image}
//                             alt={product.name}
//                             style={{ width: "50px", height: "50px" }}
//                           />
//                         </TableCell>
//                         <TableCell>{product.price * product.quantity}</TableCell>
//                         <TableCell>{order.status}</TableCell>
//                         <TableCell>{order.paymentMethod}</TableCell>
//                         <TableCell>{order.shippingAddress.city}, {order.shippingAddress.state}, {order.shippingAddress.pincode}</TableCell>
//                         <TableCell>{order.orderDate}</TableCell>

//                       </TableRow>
//                       ))}
//                  </TableBody>
//                 </Table>
//               </TableContainer>
//             </Box>
//             ))}

//         </Box>
      
//     </Box>
//   )
// }

// export default OrderList

// import React from 'react';
// import {
//   Box,
//   Table,
//   TableBody,
//   TableRow,
//   TableCell,
//   TableContainer,
//   TableHead,
//   Typography,
//   Paper,
//   Stepper,
//   Step,
//   StepLabel,
//   Grid,
//   Divider,
//   Chip
// } from '@mui/material';

// // Helper function to map your status strings to Step indexes
// const getStatusStep = (status) => {
//   switch (status) {
//     case 'Pending':
//       return 0;
//     case 'Shipped':
//       return 1;
//     case 'Delivered':
//       return 2;
//     default:
//       return 0;
//   }
// };

// const steps = ['Order Placed', 'Shipped', 'Delivered'];

// function OrderList() {
//   const orders = [
//     {
//       _id: "ORD1001",
//       orderDate: "2026-06-10",
//       totalAmount: 52000,
//       status: "Delivered",
//       paymentMethod: "UPI",
//       shippingAddress: { city: "Mumbai", state: "Maharashtra", pincode: "400001" },
//       products: [
//         { _id: "P1", name: "Laptop", price: 50000, quantity: 1, image: "https://via.placeholder.com/100" },
//         { _id: "P2", name: "Wireless Mouse", price: 2000, quantity: 1, image: "https://via.placeholder.com/100" },
//       ],
//     },
//     {
//       _id: "ORD1002",
//       orderDate: "2026-06-12",
//       totalAmount: 3500,
//       status: "Shipped",
//       paymentMethod: "Credit Card",
//       shippingAddress: { city: "Pune", state: "Maharashtra", pincode: "411001" },
//       products: [
//         { _id: "P3", name: "Keyboard", price: 1500, quantity: 1, image: "https://via.placeholder.com/100" },
//         { _id: "P4", name: "Headphones", price: 2000, quantity: 1, image: "https://via.placeholder.com/100" },
//       ],
//     },
//     {
//       _id: "ORD1003",
//       orderDate: "2026-06-15",
//       totalAmount: 1200,
//       status: "Pending",
//       paymentMethod: "Cash On Delivery",
//       shippingAddress: { city: "Nashik", state: "Maharashtra", pincode: "422001" },
//       products: [
//         { _id: "P5", name: "USB Cable", price: 300, quantity: 2, image: "https://via.placeholder.com/100" },
//         { _id: "P6", name: "Mobile Stand", price: 600, quantity: 1, image: "https://via.placeholder.com/100" },
//       ],
//     },
//   ];

//   return (
//     <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto', bgcolor: '#f9f9f9', minHeight: '100vh' }}>
//       <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1a1a1a' }}>
//         Your Orders
//       </Typography>

//       {orders.map((order) => (
//         <Paper 
//           key={order._id} 
//           elevation={2} 
//           sx={{ mb: 4, borderRadius: 3, overflow: 'hidden', border: '1px solid #e0e0e0' }}
//         >
//           {/* 1. ORDER CARD HEADER */}
//           <Box sx={{ p: 3, bgcolor: '#f5f5f5', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
//             <Box>
//               <Typography variant="subtitle2" color="text.secondary">ORDER ID</Typography>
//               <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{order._id}</Typography>
//             </Box>
//             <Box>
//               <Typography variant="subtitle2" color="text.secondary">DATE PLACED</Typography>
//               <Typography variant="body1" sx={{ fontWeight: 500 }}>{order.orderDate}</Typography>
//             </Box>
//             <Box>
//               <Typography variant="subtitle2" color="text.secondary">TOTAL AMOUNT</Typography>
//               <Typography variant="h6" color="primary.main" sx={{ fontWeight: 'bold' }}>
//                 ₹{order.totalAmount.toLocaleString()}
//               </Typography>
//             </Box>
//             <Chip 
//               label={order.status} 
//               color={order.status === 'Delivered' ? 'success' : order.status === 'Shipped' ? 'info' : 'warning'} 
//               variant="filled"
//               sx={{ fontWeight: 'bold' }}
//             />
//           </Box>

//           <Divider />

//           {/* 2. DELIVERY TRACKING STEPPER */}
//           <Box sx={{ px: 4, py: 4, bgcolor: '#fff' }}>
//             <Stepper activeStep={getStatusStep(order.status)} alternativeLabel>
//               {steps.map((label) => (
//                 <Step key={label}>
//                   <StepLabel>{label}</StepLabel>
//                 </Step>
//               ))}
//             </Stepper>
//           </Box>

//           <Divider />

//           {/* 3. ORDER DETAILS SPLIT GRID */}
//           <Grid container sx={{ bgcolor: '#fff' }}>
//             {/* Products Table (Left Side) */}
//             <Grid item xs={12} md={8} sx={{ borderRight: { md: '1px solid #e0e0e0' }, p: 2 }}>
//               <TableContainer component={Box}>
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Image</TableCell>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Product</TableCell>
//                       <TableCell align="right" sx={{ fontWeight: 'bold' }}>Price</TableCell>
//                       <TableCell align="center" sx={{ fontWeight: 'bold' }}>Qty</TableCell>
//                       <TableCell align="right" sx={{ fontWeight: 'bold' }}>Total</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {order.products.map((product) => (
//                       <TableRow key={product._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                         <TableCell>
//                           <Box 
//                             component="img"
//                             src={product.image}
//                             alt={product.name}
//                             sx={{ width: 50, height: 50, borderRadius: 1, objectFit: 'cover', border: '1px solid #e0e0e0' }}
//                           />
//                         </TableCell>
//                         <TableCell sx={{ fontWeight: 500 }}>{product.name}</TableCell>
//                         <TableCell align="right">₹{product.price.toLocaleString()}</TableCell>
//                         <TableCell align="center">{product.quantity}</TableCell>
//                         <TableCell align="right" sx={{ fontWeight: 500 }}>
//                           ₹{(product.price * product.quantity).toLocaleString()}
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Grid>

//             {/* Shipping & Payment Meta (Right Side) */}
//             <Grid item xs={12} md={4} sx={{ p: 3, bgcolor: '#fafafa' }}>
//               <Box sx={{ mb: 3 }}>
//                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold', mb: 1 }}>
//                   SHIPPING ADDRESS
//                 </Typography>
//                 <Typography variant="body2" color="text.primary" sx={{ lineHeight: 1.6 }}>
//                   {order.shippingAddress.city},<br />
//                   {order.shippingAddress.state} - {order.shippingAddress.pincode}
//                 </Typography>
//               </Box>
//               <Box>
//                 <Typography variant="subtitle2" color="text.secondary" sx={{ fontWeight: 'bold', mb: 0.5 }}>
//                   PAYMENT METHOD
//                 </Typography>
//                 <Typography variant="body2" sx={{ fontWeight: 500 }}>
//                   {order.paymentMethod}
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Paper>
//       ))}
//     </Box>
//   );
// }

// export default OrderList;


import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Grid,
  Divider,
  Chip,
  IconButton,
  Button,
  Tooltip
} from '@mui/material';

const steps = [
  'Order Placed', 
  'Preparing', 
  'Prepared', 
  'Shipped', 
  'Out for Delivery', 
  'Delivered'
];

const getStatusStep = (status) => {
  switch (status) {
    case 'Order Placed': return 0;
    case 'Order Preparing': return 1;
    case 'Order Prepared': return 2;
    case 'Shipped': return 3;
    case 'Out for Delivery': return 4;
    case 'Delivered': return 5;
    default: return 0;
  }
};

const isCancellable = (status) => {
  return status === 'Order Placed' || status === 'Order Preparing';
};

function OrderList() {
  const orders = [
    {
      _id: "ORD1001",
      orderDate: "2026-06-10",
      totalAmount: 52000,
      status: "Delivered",
      paymentMethod: "UPI",
      shippingAddress: { city: "Mumbai", state: "Maharashtra", pincode: "400001" },
      products: [
        { _id: "P1", name: "Laptop", price: 50000, quantity: 1, image: "https://via.placeholder.com/100" },
        { _id: "P2", name: "Wireless Mouse", price: 2000, quantity: 1, image: "https://via.placeholder.com/100" },
      ],
    },
    {
      _id: "ORD1002",
      orderDate: "2026-06-12",
      totalAmount: 3500,
      status: "Out for Delivery",
      paymentMethod: "Credit Card",
      shippingAddress: { city: "Pune", state: "Maharashtra", pincode: "411001" },
      products: [
        { _id: "P3", name: "Keyboard", price: 1500, quantity: 1, image: "https://via.placeholder.com/100" },
      ],
    },
    {
      _id: "ORD1003",
      orderDate: "2026-06-15",
      totalAmount: 1200,
      status: "Order Preparing",
      paymentMethod: "Cash On Delivery",
      shippingAddress: { city: "Nashik", state: "Maharashtra", pincode: "422001" },
      products: [
        { _id: "P5", name: "USB Cable", price: 300, quantity: 2, image: "https://via.placeholder.com/100" },
      ],
    },
  ];

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1000, margin: '0 auto', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#111827' }}>
        Order History
      </Typography>

      {orders.map((order) => (
        <Paper 
          key={order._id} 
          elevation={0} 
          sx={{ mb: 3, borderRadius: 3, border: '1px solid #e5e7eb', overflow: 'hidden' }}
        >
          {/* TOP HEADER: Clean Meta & Strategic Action Placement */}
          <Box sx={{ p: 2.5, bgcolor: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order ID</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827' }}>{order._id}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date Placed</Typography>
                <Typography variant="body2" sx={{ fontWeight: 500, color: '#374151' }}>{order.orderDate}</Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#111827' }}>₹{order.totalAmount.toLocaleString()}</Typography>
              </Box>
            </Box>

            {/* ACTION CONTAINER */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={order.status} 
                size="small"
                color={order.status === 'Delivered' ? 'success' : order.status === 'Order Placed' ? 'default' : 'primary'} 
                sx={{ fontWeight: 600, borderRadius: 1.5, px: 0.5 }}
              />
              
              <Tooltip title="Chat with support">
                <IconButton 
                  size="small" 
                  color="primary"
                  onClick={() => alert(`Starting support live chat for ${order._id}`)}
                  sx={{ border: '1px solid #e5e7eb', bgcolor: '#fff', '&:hover': { bgcolor: '#f3f4f6' } }}
                >
                  💬
                </IconButton>
              </Tooltip>

              {isCancellable(order.status) && (
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => alert(`Cancelling order ${order._id}`)}
                  sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, height: 32 }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Box>

          <Divider />

          {/* STEPPER CONTAINER */}
          <Box sx={{ p: 3, width: '100%', overflowX: 'auto', bgcolor: '#fff' }}>
            <Box sx={{ minWidth: 700 }}>
              <Stepper 
                activeStep={getStatusStep(order.status)} 
                alternativeLabel
                sx={{
                  '& .MuiStepLabel-label': { fontSize: '0.75rem', mt: 0.5, fontWeight: 500 },
                  '& .MuiStepLabel-label.Mui-active': { fontWeight: 700, color: 'primary.main' },
                  '& .MuiStepLabel-label.Mui-completed': { color: 'text.primary' }
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>

          <Divider />

          {/* LOWER DETAILS PANEL */}
          <Grid container sx={{ bgcolor: '#fff' }}>
            {/* Left Side: Clean Products List */}
            <Grid item xs={12} md={8} sx={{ p: 2 }}>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    {order.products.map((product) => (
                      <TableRow key={product._id} sx={{ '& td': { borderBottom: '1px style #f3f4f6' }, '&:last-child td': { border: 0 } }}>
                        <TableCell sx={{ width: 64, pl: 0, py: 1.5 }}>
                          <Box 
                            component="img"
                            src={product.image}
                            alt={product.name}
                            sx={{ width: 48, height: 48, borderRadius: 1.5, border: '1px solid #f3f4f6', objectFit: 'cover' }}
                          />
                        </TableCell>
                        <TableCell sx={{ py: 1.5, px: 1 }}>
                          <Typography variant="body2" sx={{ fontWeight: 600, color: '#111827' }}>{product.name}</Typography>
                          <Typography variant="caption" color="text.secondary">Qty: {product.quantity}</Typography>
                        </TableCell>
                        <TableCell align="right" sx={{ py: 1.5, pr: 1, fontWeight: 600, color: '#374151' }}>
                          ₹{(product.price * product.quantity).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

            {/* Right Side: Clean Delivery Data */}
            <Grid item xs={12} md={4} sx={{ p: 3, bgcolor: '#fafafa', borderLeft: { md: '1px solid #e5e7eb' }, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
                  DELIVERY ADDRESS
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500, lineHeight: 1.5 }}>
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 0.5 }}>
                  PAYMENT VIA
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 600 }}>
                  {order.paymentMethod}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      ))}
    </Box>
  );
}

export default OrderList;