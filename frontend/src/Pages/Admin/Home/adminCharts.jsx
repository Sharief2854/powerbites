import React from 'react';
import { Box, Grid, Paper, Typography, Card, useTheme } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import PeopleIcon from '@mui/icons-material/People';
import LayersIcon from '@mui/icons-material/Layers';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

// Simulated professional data payload from backend
const mockBackendData = {
  analytics: {
    totalCustomers: 1240,
    totalProducts: 450,
    totalRevenue: 52340.00,
    statusCounts: {
      placed: 5,
      preparing: 3,
      shipped: 5,
      cancelled: 2,
      active: 13 // Active Orders = placed + preparing + shipped
    }
  },
  barChartData: [
    { label: 'Mon', revenue: 4000 },
    { label: 'Tue', revenue: 3000 },
    { label: 'Wed', revenue: 2000 },
    { label: 'Thu', revenue: 6000 },
    { label: 'Fri', revenue: 7500 },
    { label: 'Sat', revenue: 4200 },
    { label: 'Sun', revenue: 4900 },
  ]
};

export default function DynamicAdminDashboard(){
  const theme = useTheme();
  const { analytics, barChartData } = mockBackendData;

  // 1. Core Platform Summary Cards
  const coreMetrics = [
    { title: 'Total Customers', val: analytics.totalCustomers, icon: <PeopleIcon color="primary" />, border: '#1976d2' },
    { title: 'Active Orders', val: analytics.statusCounts.active, icon: <ShoppingBagIcon color="success" />, border: '#2e7d32' },
    { title: 'Total Products', val: analytics.totalProducts, icon: <LayersIcon color="warning" />, border: '#ed6c02' },
    { title: 'Total Revenue', val: `₹${analytics.totalRevenue.toLocaleString('en-IN')}`, icon: <AttachMoneyIcon color="secondary" />, border: '#9c27b0' },
  ];

  // 2. Operational Order Pipeline Metric Squares
  const statusMetrics = [
    { title: 'Order Placed', val: analytics.statusCounts.placed, color: '#0288d1', bg: '#e1f5fe' },
    { title: 'Preparing Order', val: analytics.statusCounts.preparing, color: '#f57c00', bg: '#fff3e0' },
    { title: 'Order Shipped', val: analytics.statusCounts.shipped, color: '#388e3c', bg: '#e8f5e9' },
    { title: 'Order Cancelled', val: analytics.statusCounts.cancelled, color: '#d32f2f', bg: '#ffebee' },
  ];

  return (
    <Box sx={{ p: 4, bgcolor: '#f4f6f8', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
        Enterprise Performance Insights
      </Typography>

      {/* Row 1: High-Level Platform Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {coreMetrics.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ 
              borderRadius: '16px', 
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.03)',
              borderTop: `4px solid ${item.border}`,
              transition: 'transform 0.2s',
              '&:hover': { transform: 'translateY(-4px)' }
            }}>
              <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', mb: 0.5 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: '#0f172a' }}>
                    {item.val}
                  </Typography>
                </Box>
                <Box sx={{ p: 1.5, bgcolor: '#f8fafc', borderRadius: '12px', display: 'flex', alignItems: 'center' }}>
                  {item.icon}
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Row 2: Operational Flow Pipeline Squares */}
      <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Live Order Fulfillment Funnel
      </Typography>
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {statusMetrics.map((item, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Paper sx={{ 
              p: 3, 
              borderRadius: '16px', 
              textAlign: 'center',
              boxShadow: '0px 2px 12px rgba(0, 0, 0, 0.02)',
              border: '1px solid #e2e8f0',
              bgcolor: '#ffffff'
            }}>
              <Box sx={{ 
                width: '48px', 
                height: '48px', 
                borderRadius: '50%', 
                bgcolor: item.bg, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 12px' 
              }}>
                <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', bgcolor: item.color }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, color: '#0f172a', mb: 0.5 }}>
                {item.val}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                {item.title}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Row 3: Central Financial Growth Bar Chart */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ 
            p: 4, 
            borderRadius: '24px', 
            boxShadow: '0px 6px 24px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e2e8f0' 
          }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b' }}>
                Financial Timeline Revenue
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                Gross income realizations computed based on successful customer transactions
              </Typography>
            </Box>
            
            <BarChart
              dataset={barChartData}
              xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
              series={[
                { 
                  dataKey: 'revenue', 
                  label: 'Gross Profit Margins (₹)', 
                  color: theme.palette.primary.main,
                  valueFormatter: (value) => `₹${value?.toLocaleString('en-IN')}`
                }
              ]}
              height={350}
              slotProps={{
                legend: { direction: 'row', position: { vertical: 'top', horizontal: 'right' } }
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};


// import React, { useState, useEffect } from 'react';
// import { Box, Grid, Paper, Typography, Card, CircularProgress, Alert } from '@mui/material';
// import { BarChart } from '@mui/x-charts/BarChart';
// import { PieChart } from '@mui/x-charts/PieChart';
// import axios from 'axios';

// // Icons
// import PeopleIcon from '@mui/icons-material/People';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import LayersIcon from '@mui/icons-material/Layers';
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import api from '../../../api/axiosConfig';

// //const BASE_URL = 'http://localhost:4500'; // Update with your actual backend port

// const DynamicAdminDashboard  = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAllDashboardData = async () => {
//       try {
//         setLoading(true);
        
//         // 1. Fire your exact backend endpoints in parallel for maximum speed
//         const [
//           customersRes,
//           ordersRes,
//           productsSoldRes,
//           statusSummaryRes,
//           timeAnalyticsRes
//         ] = await Promise.all([
//           api.get(`/adminAnalytics/totalCustomers`),
//           api.get(`/adminAnalytics/totalOrders`),
//           api.get(`/adminAnalytics/adminAnalytics/totalProductsSold`),
//           api.get(`/adminAnalytics/adminAnalytics/orderStatusSummary`),
//           api.get(`/adminAnalytics/analytics/week`) // Fetches chronological graph data
//         ]);

//         // 2. Combine all separate API records into one unified frontend engine state
//         setDashboardData({
//           totalCustomers: customersRes.data.totalCustomers || 0,
//           totalOrders: ordersRes.data.totalOrders || 0,
//           totalProductsSold: productsSoldRes.data.totalProductsSold || 0,
//           totalRevenue: timeAnalyticsRes.data.analytics?.totalRevenue || 0,
//           statusSummary: statusSummaryRes.data.summary || [], // Assumed Array format: [{status: 'order placed', count: 5}]
//           timelineData: timeAnalyticsRes.data.data || []     // Raw list of orders for processing chart labels
//         });

//       } catch (err) {
//         console.error("Dashboard Aggregation Error:", err);
//         setError("Failed to fetch one or more admin data components.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllDashboardData();
//   }, []);

//   // 3. Format raw time analytics responses into readable chart bars
//   const formattedBarData = React.useMemo(() => {
//     if (!dashboardData?.timelineData) return [];
    
//     // Group final prices by formatted calendar date labels
//     const daysMap = {};
//     dashboardData.timelineData.forEach(order => {
//       const dateKey = new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
//       daysMap[dateKey] = (daysMap[dateKey] || 0) + (order.orderStatus !== 'order cancelled' ? order.final_price : 0);
//     });

//     return Object.keys(daysMap).map(date => ({
//       dateLabel: date,
//       revenueValue: parseFloat(daysMap[date].toFixed(2))
//     }));
//   }, [dashboardData]);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
//         <CircularProgress size={60} thickness={4} />
//       </Box>
//     );
//   }

//   if (error) return <Box p={4}> <Alert severity="error">{error}</Alert> </Box>;

//   return (
//     <Box sx={{ p: 4, bgcolor: '#f8fafc', minHeight: '100vh' }}>
//       <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: '#0f172a' }}>
//         Control Center Overview
//       </Typography>

//       {/* Row 1: High Level KPI Squares mapping to /totalCustomers, /totalOrders endpoints */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 3, borderRadius: '16px', borderTop: '4px solid #1976d2' }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Box>
//                 <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>TOTAL CUSTOMERS</Typography>
//                 <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>{dashboardData.totalCustomers}</Typography>
//               </Box>
//               <PeopleIcon color="primary" fontSize="large" />
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 3, borderRadius: '16px', borderTop: '4px solid #4caf50' }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Box>
//                 <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>TOTAL ORDERS</Typography>
//                 <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>{dashboardData.totalOrders}</Typography>
//               </Box>
//               <ShoppingBagIcon color="success" fontSize="large" />
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 3, borderRadius: '16px', borderTop: '4px solid #ff9800' }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Box>
//                 <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>PRODUCTS SOLD</Typography>
//                 <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>{dashboardData.totalProductsSold}</Typography>
//               </Box>
//               <LayersIcon color="warning" fontSize="large" />
//             </Box>
//           </Card>
//         </Grid>

//         <Grid item xs={12} sm={6} md={3}>
//           <Card sx={{ p: 3, borderRadius: '16px', borderTop: '4px solid #9c27b0' }}>
//             <Box display="flex" justifyContent="space-between" alignItems="center">
//               <Box>
//                 <Typography variant="body2" color="textSecondary" sx={{ fontWeight: 600 }}>GROSS EARNINGS</Typography>
//                 <Typography variant="h4" sx={{ fontWeight: 700, mt: 1 }}>₹{dashboardData.totalRevenue.toLocaleString('en-IN')}</Typography>
//               </Box>
//               <AttachMoneyIcon color="secondary" fontSize="large" />
//             </Box>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Row 2: Graph Canvas */}
//       <Grid container spacing={4}>
//         {/* Sales Timeline Bar Chart */}
//         <Grid item xs={12} md={7}>
//           <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
//             <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Revenue Trajectory</Typography>
//             <BarChart
//               dataset={formattedBarData}
//               xAxis={[{ scaleType: 'band', dataKey: 'dateLabel' }]}
//               series={[{ dataKey: 'revenueValue', label: 'Revenue Realization (₹)', color: '#1976d2' }]}
//               height={300}
//             />
//           </Paper>
//         </Grid>

//         {/* Dynamic Status Breakdown pie mapping to /orderStatusSummary */}
//         <Grid item xs={12} md={5}>
//           <Paper sx={{ p: 3, borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
//             <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Order Process Summaries</Typography>
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//               <PieChart
//                 series={[{
//                   data: dashboardData.statusSummary.map((item, i) => ({
//                     id: i,
//                     value: item.count,
//                     label: item.status.toUpperCase()
//                   })),
//                   innerRadius: 40,
//                   outerRadius: 90,
//                 }]}
//                 width={350}
//                 height={240}
//               />
//             </Box>
//           </Paper>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default DynamicAdminDashboard;


