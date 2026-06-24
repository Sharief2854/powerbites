// import {
//   Grid,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Box,
//   Typography,
//   TableSortLabel,
//   Pagination,
//   Stack
// } from '@mui/material';
// import React, { useEffect, useState } from 'react'
// import api from '../../../api/axiosConfig'

// // Helper to get matching status dot color from image
// const getStatusStyles = (status) => {
//   const normalized = status.toLowerCase();
//   if (normalized.includes('pending')) return { color: '#68BBE3', label: 'Pending Confirmation' };
//   if (normalized.includes('preparing')) return { color: '#F4D068', label: 'Preparing' };
//   if (normalized.includes('rider assigned')) return { color: '#82C0CC', label: 'Rider Assigned' };
//   if (normalized.includes('delivery')) return { color: '#82C0CC', label: status }; 
//   return { color: '#9e9e9e', label: status };
// };

// // Helper to decide button style based on action type
// const renderActionButton = (status) => {
//   const normalized = status.toLowerCase();
//   if (normalized.includes('restaurant confirmation') || normalized.includes('rider assigned')) {
//     return (
//       <Button variant="contained" size="small" sx={{ bgcolor: '#0D3B66', borderRadius: '20px', textTransform: 'none' }}>
//         Manage Order
//       </Button>
//     );
//   }
//   if (normalized.includes('rider rider')) { // mimicking specific image cases
//     return (
//       <Button variant="contained" size="small" sx={{ bgcolor: '#0D3B66', borderRadius: '20px', textTransform: 'none' }}>
//         Contact Customer
//       </Button>
//     );
//   }
//   return (
//     <Button variant="contained" size="small" sx={{ bgcolor: '#489FB5', borderRadius: '20px', textTransform: 'none' }}>
//       View Details
//     </Button>
//   );
// };

// function Overview() {

//   const [data,setData] =useState({})

//   async function getData() {

//     try {

//       let response = await api.get("/dashboard/getTotalDashboard");
//       console.log("Admin Dashboard Data",response.data)
//       setData(response.data)

//     } catch (err) {

//       console.log(err)
      
//     }
    
//   }

//   const rows = [
//     { id: '#100234', name: 'John Doe', date: '2024-05-15 14:30', status: 'Pending Confirmation', amount: '$35.50' },
//     { id: '#100233', name: 'Jane Smith', date: '2024-05-15 13:45', status: 'Preparing', amount: '$28.00' },
//     { id: '#100232', name: 'John Doe', date: '2024-05-15 12:30', status: 'Out for Delivery (Awaiting Restaurant Confirmation)', amount: '$35.50' },
//     { id: '#100231', name: 'Jane Smith', date: '2024-05-15 12:00', status: 'Out for Delivery (Awaiting Restaurant Rider)', amount: '$35.00' },
//     { id: '#100230', name: 'Jann Doe', date: '2024-05-15 13:30', status: 'Rider Assigned', amount: '$28.00' },
//     { id: '#100220', name: 'Jane Smith', date: '2024-05-15 13:45', status: 'Out for Delivery', amount: '$28.00' },
//   ];


//   useEffect(()=>{
//     getData();

//   },[])

//   return (
//     <>
//     <Grid container spacing={3}>
//           {['Total Customers', 'Active Orders', 'Total Products', 'Total Revenue'].map((title, index) => (
//             <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 3.5,
//                   borderRadius: '20px',
//                   border: '1px solid #E5E7EB',
//                   bgcolor: '#ffffff',
//                   transition: 'all 0.3s ease',
//                   '&:hover': {
//                     transform: 'translateY(-4px)',
//                     boxShadow: '0 12px 25px rgba(0,0,0,0.08)',
//                   },
//                 }}
//               >
//                 <Typography variant="body2" color="text.secondary" gutterBottom>
//                   {title}
//                 </Typography>
//                 <Typography variant="h3" sx={{ fontWeight: 700, color: '#1E1154',fontSize:{xs:10,sm:30} }}>
//                   {/* {index === 3 ? '$24,500' : Math.floor(Math.random() * 800) + 120} */}
//                   {index === 0 && data.totalCustomers}
//                   {index === 1 && data.Orders }
//                   {index === 2 && data.totalProducts}
//                 </Typography>
//                 <Typography variant="caption" color="#22C55E" sx={{ fontWeight: 600 }}>
//                   +12.5% from last month
//                 </Typography>
//               </Paper>
//             </Grid>
//           ))}

//           <Grid size={{ xs: 12 }}>
           
//               {/* Title Header */}
//       <Box sx={{ mb: 2, display: 'flex', alignItems: 'baseline', gap: 1 }}>
//         <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a1a1a' }}>
//           Pending Order Records (What's Happening Orders)
//         </Typography>
//         <Typography variant="caption" sx={{ color: 'gray', fontStyle: 'italic' }}>
//           — What's Happening Orders refers to in the recent pending orders
//         </Typography>
//       </Box>

//       {/* Main Table Grid */}
//               <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', overflow: 'hidden', borderColor: '#E0E6ED' }}>
//         <Table>
//           <TableHead sx={{ bgcolor: '#D0DFEC' }}>
//             <TableRow>
//               <TableCell><TableSortLabel active directional="asc"><b>Order ID</b></TableSortLabel></TableCell>
//               <TableCell><TableSortLabel><b>Customer Name</b></TableSortLabel></TableCell>
//               <TableCell><TableSortLabel><b>Order Date & Time</b></TableSortLabel></TableCell>
//               <TableCell><TableSortLabel><b>Order Status</b></TableSortLabel></TableCell>
//               <TableCell><TableSortLabel><b>Total Amount</b></TableSortLabel></TableCell>
//               <TableCell align="center"><b>Actions</b></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row, index) => {
//               const statusInfo = getStatusStyles(row.status);
//               return (
//                 <TableRow key={index} sx={{ '&:hover': { bgcolor: '#F8FAFC' } }}>
//                   {/* ID */}
//                   <TableCell sx={{ color: '#333', fontWeight: 500 }}>{row.id}</TableCell>
                  
//                   {/* Name */}
//                   <TableCell>{row.name}</TableCell>
                  
//                   {/* Date */}
//                   <TableCell sx={{ color: '#555' }}>{row.date}</TableCell>
                  
//                   {/* Status with Color Indicator Dot */}
//                   <TableCell>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                       <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: statusInfo.color, shrink: 0 }} />
//                       <Typography variant="body2" sx={{ color: '#2C3E50', fontSize: '14px' }}>
//                         {row.status}
//                       </Typography>
//                     </Box>
//                   </TableCell>
                  
//                   {/* Amount */}
//                   <TableCell sx={{ fontWeight: 500 }}>{row.amount}</TableCell>
                  
//                   {/* Dynamic Action Buttons */}
//                   <TableCell align="center">
//                     {renderActionButton(row.status)}
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//           </TableBody>
//         </Table>
//       </TableContainer>
          
//           </Grid>
//         </Grid>
//     </>
//   )
// }

// export default Overview

import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
  TableSortLabel,
  Pagination,
  Stack
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../../../api/axiosConfig';

// Helper to get matching status dot color from image
const getStatusStyles = (status) => {
  if (!status) return { color: '#9e9e9e', label: '' };
  const normalized = status.toLowerCase();
  if (normalized.includes('pending')) return { color: '#68BBE3', label: 'Pending Confirmation' };
  if (normalized.includes('preparing')) return { color: '#F4D068', label: 'Preparing' };
  if (normalized.includes('rider assigned')) return { color: '#82C0CC', label: 'Rider Assigned' };
  if (normalized.includes('delivery')) return { color: '#82C0CC', label: status }; 
  return { color: '#9e9e9e', label: status };
};

// Helper to decide button style based on action type
const renderActionButton = (status) => {
  if (!status) return null;
  const normalized = status.toLowerCase();
  if (normalized.includes('restaurant confirmation') || normalized.includes('rider assigned')) {
    return (
      <Button variant="contained" size="small" sx={{ bgcolor: '#0D3B66', borderRadius: '20px', textTransform: 'none', px: 2 }}>
        Manage Order
      </Button>
    );
  }
  if (normalized.includes('rider rider')) {
    return (
      <Button variant="contained" size="small" sx={{ bgcolor: '#0D3B66', borderRadius: '20px', textTransform: 'none', px: 2 }}>
        Contact Customer
      </Button>
    );
  }
  return (
    <Button variant="contained" size="small" sx={{ bgcolor: '#489FB5', borderRadius: '20px', textTransform: 'none', px: 2 }}>
      View Details
    </Button>
  );
};

function Overview() {
  const [data, setData] = useState({});

  async function getData() {
    try {
      let response = await api.get("/dashboard/getTotalDashboard");
      console.log("Admin Dashboard Data", response.data);
      setData(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  // --- EASY SWAP BLOCK FOR BACKEND DATA ---
  // When backend is ready, just replace this variable with your dynamic array (e.g., data.recentOrders || [])
  const rows = [
    { id: '#100234', name: 'John Doe', date: '2024-05-15 14:30', status: 'Pending Confirmation', amount: '$35.50' },
    { id: '#100233', name: 'Jane Smith', date: '2024-05-15 13:45', status: 'Preparing', amount: '$28.00' },
    { id: '#100232', name: 'John Doe', date: '2024-05-15 12:30', status: 'Out for Delivery (Awaiting Restaurant Confirmation)', amount: '$35.50' },
    { id: '#100231', name: 'Jane Smith', date: '2024-05-15 12:00', status: 'Out for Delivery (Awaiting Restaurant Rider)', amount: '$35.00' },
    { id: '#100230', name: 'Jann Doe', date: '2024-05-15 13:30', status: 'Rider Assigned', amount: '$28.00' },
    { id: '#100220', name: 'Jane Smith', date: '2024-05-15 13:45', status: 'Out for Delivery', amount: '$28.00' },
  ];

  useEffect(() => {
    getData();
      console.log("data",data)

  }, []);

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Grid container spacing={3}>
        
        {/* Top Metric Cards */}
        {[
          { title: 'Total Customers', val: data.totalCustomers },
          { title: 'Active Orders', val: data.Orders },
          { title: 'Total Products', val: data.totalProducts },
          { title: 'Total Revenue', val: data.totalRevenue || '$52.00' },// added a default fallback for revenue
          { title: 'Order Place', val: 5 || '0.00' },// added a default fallback for revenue
          { title: 'Preparing Order', val: 3|| '0.00' },// added a default fallback for revenue
          { title: 'Order shipped', val: 5 || '0.00' },// added a default fallback for revenue
          { title: 'Order Cancelled', val: 2 || '0.00' },// added a default fallback for revenue
        ].map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: '16px',
                border: '1px solid #E5E7EB',
                bgcolor: '#ffffff',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 25px rgba(0,0,0,0.06)',
                },
              }}
            >
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 1 }}>
                {card.title}
              </Typography>
              <Typography variant="h4" sx={{ fontWeight: 700, color: '#1E1154', fontSize: { xs: '1.75rem', sm: '2.25rem' } }}>
                {card.val ?? 10}
              </Typography>
              
            </Paper>
          </Grid>
        ))}

        {/* Orders Table Container Block */}
        <Grid item xs={12}>
          
          {/* Title Header with Responsive Layout */}
          <Box 
            sx={{ 
              mb: 2, 
              display: 'flex', 
              flexDirection: { xs: 'column', sm: 'row' }, 
              alignItems: { xs: 'flex-start', sm: 'baseline' }, 
              gap: { xs: 0.5, sm: 1 } 
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1a1a1a', fontSize: { xs: '1.1rem', sm: '1.25rem' } }}>
              Pending Order Records (What's Happening Orders)
            </Typography>
            <Typography variant="caption" sx={{ color: 'gray', fontStyle: 'italic' }}>
              — What's Happening Orders refers to in the recent pending orders
            </Typography>
          </Box>

          {/* Table container configuration built for all viewports */}
          <TableContainer 
            component={Paper} 
            variant="outlined" 
            sx={{ 
              borderRadius: '8px', 
              borderColor: '#E0E6ED',
              width: '100%',
              overflowX: 'auto', // Allows scrolling horizontally if table columns run out of viewport space
              WebkitOverflowScrolling: 'touch'
            }}
          >
            <Table sx={{ minWidth: { xs: 700, md: 800 } }}>
              <TableHead sx={{ bgcolor: '#D0DFEC' }}>
                <TableRow>
                  <TableCell><TableSortLabel active direction="asc"><b>Order ID</b></TableSortLabel></TableCell>
                  <TableCell><TableSortLabel><b>Customer Name</b></TableSortLabel></TableCell>
                  <TableCell><TableSortLabel><b>Order Date & Time</b></TableSortLabel></TableCell>
                  <TableCell><TableSortLabel><b>Order Status</b></TableSortLabel></TableCell>
                  <TableCell><TableSortLabel><b>Total Amount</b></TableSortLabel></TableCell>
                  <TableCell align="center"><b>Actions</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => {
                  const statusInfo = getStatusStyles(row.status);
                  return (
                    <TableRow key={index} sx={{ '&:hover': { bgcolor: '#F8FAFC' } }}>
                      
                      {/* ID */}
                      <TableCell sx={{ color: '#333', fontWeight: 500, whiteSpace: 'nowrap' }}>
                        {row.id}
                      </TableCell>
                      
                      {/* Name */}
                      <TableCell sx={{ whiteSpace: 'nowrap' }}>
                        {row.name}
                      </TableCell>
                      
                      {/* Date */}
                      <TableCell sx={{ color: '#555', whiteSpace: 'nowrap' }}>
                        {row.date}
                      </TableCell>
                      
                      {/* Status */}
                      <TableCell sx={{ minWidth: 180 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: statusInfo.color, flexShrink: 0 }} />
                          <Typography variant="body2" sx={{ color: '#2C3E50', fontSize: '14px' }}>
                            {row.status}
                          </Typography>
                        </Box>
                      </TableCell>
                      
                      {/* Amount */}
                      <TableCell sx={{ fontWeight: 500, whiteSpace: 'nowrap' }}>
                        {row.amount}
                      </TableCell>
                      
                      {/* Actions */}
                      <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                        {renderActionButton(row.status)}
                      </TableCell>

                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

        </Grid>
      </Grid>
    </Box>
  );
}

export default Overview;