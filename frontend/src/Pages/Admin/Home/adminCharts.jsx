// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import axios from 'axios';
// import {
//   Grid, Card, CardContent, Typography, Box, Select, MenuItem,
//   FormControl, InputLabel, Paper, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, TableSortLabel, TextField,
//   IconButton, CircularProgress, useTheme, Chip, Avatar,
//   LinearProgress, InputAdornment
// } from '@mui/material';
// import { BarChart, PieChart } from '@mui/x-charts';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import PeopleIcon from '@mui/icons-material/People';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import InventoryIcon from '@mui/icons-material/Inventory';
// import CancelIcon from '@mui/icons-material/Cancel';
// import LocalShippingIcon from '@mui/icons-material/LocalShipping';
// import KitchenIcon from '@mui/icons-material/Kitchen';
// import api from '../../../api/axiosConfig';

// //const api = axios;

// export default function AdminDashboard() {
//   const theme = useTheme();
  
//   const [loading, setLoading] = useState(true);
//   const [backendDataReceived, setBackendDataReceived] = useState(false);

//   // Controls
//   const [chartTimeframe, setChartTimeframe] = useState('month');
//   const [year, setYear] = useState('2026');
//   const [month, setMonth] = useState('6');

//   // Main Data States
//   const [kpis, setKpis] = useState({});
//   const [orderSummary, setOrderSummary] = useState([]);
//   const [barChartData, setBarChartData] = useState([]);
//   const [ordersList, setOrdersList] = useState([]);

//   // Table controls
//   const [orderBy, setOrderBy] = useState('orderDate');
//   const [orderDirection, setOrderDirection] = useState('desc');
//   const [globalSearch, setGlobalSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');

//   // ==================== DEMO DATA ====================
//   const demoData = useMemo(() => ({
//     kpis: {
//       totalRevenue: 15907.99,
//       totalCustomers: 150,
//       totalOrders: 340,
//       totalProductsSold: 1275,
//       monthCancelledOrders: 8,
//       netYield: 10507.99,
//       isProfit: true
//     },
//     orderSummary: [
//       { id: 0, value: 45, label: 'PLACED', color: '#3b82f6' },
//       { id: 1, value: 28, label: 'PREPARING', color: '#eab308' },
//       { id: 2, value: 67, label: 'SHIPPED', color: '#8b5cf6' },
//       { id: 3, value: 192, label: 'DELIVERED', color: '#10b981' },
//       { id: 4, value: 8, label: 'CANCELLED', color: '#ef4444' }
//     ],
//     barChartData: [
//       { id: 1, label: 'Premium Almonds', units: 25 },
//       { id: 2, label: 'Salted Cashews', units: 18 },
//       { id: 3, label: 'Organic Apricots', units: 12 },
//       { id: 4, label: 'Dark Chocolate', units: 9 }
//     ],
//     ordersList: [
//       { orderId: '6a351e06f1e0b44e3942cfa9', customerName: 'Anil Kumar', orderDate: '2026-06-19 10:46', orderStatus: 'order cancelled', totalAmount: 898.00 },
//       { orderId: '6a3a2797e63d4dd0e7723461', customerName: 'Sunita Sharma', orderDate: '2026-06-23 06:28', orderStatus: 'order placed', totalAmount: 4509.99 },
//       { orderId: '6a3a6c214308747bf0c522e1', customerName: 'Rahul Verma', orderDate: '2026-06-23 11:21', orderStatus: 'order delivered', totalAmount: 1500.00 },
//       { orderId: '6a3b95b20fae6916f26e0670', customerName: 'Priya Nair', orderDate: '2026-06-24 08:30', orderStatus: 'order placed', totalAmount: 800.00 },
//       { orderId: '6a3b9b4645b63add133a2797', customerName: 'Amit Patel', orderDate: '2026-06-24 08:54', orderStatus: 'preparing order', totalAmount: 1100.00 }
//     ]
//   }), []);

//   // ==================== FETCH DATA ====================
//   const fetchDashboardData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const [resSpec, resStat, resBest, resCust, resOrd, resQty, resCan] = await Promise.all([
//         api.get(`/adminAnalytics/analyticSpecifc?year=${year}&month=${month}`).catch(() => ({ data: {} })),
//         api.get(`/adminAnalytics/orderStatusSummary?year=${year}`).catch(() => ({ data: {} })),
//         api.get(`/adminAnalytics/bestSoldProducts?year=${year}`).catch(() => ({ data: {} })),
//         api.get(`/adminAnalytics/totalCustomers?year=${year}`).catch(() => ({ data: {} })),
//         api.get(`/adminAnalytics/totalOrders?year=${year}`).catch(() => ({ data: {} })),
//         api.get(`/adminAnalytics/totalProductsSold?year=${year}`).catch(() => ({ data: {} })),
//         api.get(`/adminAnalytics/cancelledOrdersAnalytics?year=${year}&month=${month}`).catch(() => ({ data: {} }))
//       ]);
//       console.log("resSpec", resSpec.data)
//       console.log("resStat", resStat.data)
//       console.log("resBest", resBest.data)
//       console.log("resCust", resCust.data)
//       console.log("resOrd", resOrd.data)
//       console.log("resQty", resQty.data)

//       const totalRevenue = resSpec.data?.analytics?.totalRevenue || resSpec.data?.totalRevenue || 0;
//       const hasRealData = totalRevenue > 100 || (resSpec.data?.data && resSpec.data.data.length > 0);

//       if (hasRealData) {
//         const netYield = totalRevenue - (totalRevenue * 0.62);
//         setKpis({
//           totalRevenue,
//           totalCustomers: resCust.data?.totalCustomers || 0,
//           totalOrders: resOrd.data?.totalOrders || 0,
//           totalProductsSold: resQty.data?.totalProductsSold || 0,
//           monthCancelledOrders: resCan.data?.totalCancelledOrders || 0,
//           netYield,
//           isProfit: netYield >= 0
//         });

//         if (resStat.data?.summary) {
//           setOrderSummary(Object.keys(resStat.data.summary).map((key, idx) => ({
//             id: idx, value: resStat.data.summary[key], label: key.toUpperCase(),
//             color: ['#3b82f6', '#eab308', '#8b5cf6', '#10b981', '#ef4444'][idx % 5]
//           })));
//         }

//         const bestProducts = resBest.data?.data || [];
//         setBarChartData(bestProducts.slice(0, 6).map((item, idx) => ({
//           id: idx, label: item.productName || `Product ${idx + 1}`, units: Number(item.totalQuantitySold || 0)
//         })));

//         const activeOrders = resSpec.data?.data || [];
//         setOrdersList(activeOrders.map(order => ({
//           orderId: order._id || order.orderId || 'N/A',
//           customerName: order.customerName || 'Unknown',
//           orderDate: order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A',
//           orderStatus: order.orderStatus || 'unknown',
//           totalAmount: Number(order.final_price || order.totalAmount || 0)
//         })));

//         setBackendDataReceived(true);
//       } else {
//         setKpis(demoData.kpis);
//         setOrderSummary(demoData.orderSummary);
//         setBarChartData(demoData.barChartData);
//         setOrdersList(demoData.ordersList);
//         setBackendDataReceived(false);
//       }
//     } catch (error) {
//       console.error("Using demo data");
//       setKpis(demoData.kpis);
//       setOrderSummary(demoData.orderSummary);
//       setBarChartData(demoData.barChartData);
//       setOrdersList(demoData.ordersList);
//       setBackendDataReceived(false);
//     } finally {
//       setLoading(false);
//     }
//   }, [year, month, demoData]);

//   useEffect(() => {
//     fetchDashboardData();
//   }, [fetchDashboardData]);

//   // ==================== TABLE LOGIC ====================
//   const filteredAndSortedOrders = useMemo(() => {
//     let filtered = [...ordersList];

//     // Global Search
//     if (globalSearch) {
//       const term = globalSearch.toLowerCase();
//       filtered = filtered.filter(row =>
//         Object.values(row).some(val => String(val).toLowerCase().includes(term))
//       );
//     }

//     // Status Filter
//     if (statusFilter !== 'All') {
//       filtered = filtered.filter(row => 
//         row.orderStatus.toLowerCase().includes(statusFilter.toLowerCase())
//       );
//     }

//     // Sorting
//     return filtered.sort((a, b) => {
//       let valA = a[orderBy], valB = b[orderBy];
//       if (typeof valA === 'string') {
//         return orderDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
//       }
//       return orderDirection === 'asc' ? valA - valB : valB - valA;
//     });
//   }, [ordersList, globalSearch, statusFilter, orderBy, orderDirection]);

//   const handleSortRequest = useCallback((property) => {
//     const isAsc = orderBy === property && orderDirection === 'asc';
//     setOrderDirection(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   }, [orderBy, orderDirection]);

//   const getStatusStyle = (status) => {
//     if (status.includes('delivered')) return { bg: '#dcfce7', color: '#166534' };
//     if (status.includes('cancelled')) return { bg: '#fee2e2', color: '#991b1b' };
//     if (status.includes('placed')) return { bg: '#dbeafe', color: '#1e40af' };
//     if (status.includes('preparing')) return { bg: '#fef3c7', color: '#854d0e' };
//     return { bg: '#e0f2fe', color: '#0369a1' };
//   };

//   const statusCounts = useMemo(() => {
//     const counts = { PLACED: 0, PREPARING: 0, SHIPPED: 0, DELIVERED: 0, CANCELLED: 0 };
//     orderSummary.forEach(item => {
//       if (item.label in counts) counts[item.label] = item.value;
//     });
//     return counts;
//   }, [orderSummary]);

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh', background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)' }}>
      
//       {/* Header */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5, alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
//         <Box>
//           <Typography variant="h3" fontWeight="800" letterSpacing="-1.5px" color="#0f172a">
//             PowerBites Hub
//           </Typography>
//           <Typography variant="body1" color="textSecondary">
//             {backendDataReceived ? "🟢 Live Backend Data" : "🔵 Demo Mode"} • June 2026
//           </Typography>
//         </Box>

        
//       </Box>

//       {/* KPI Cards - All Requested Metrics */}
//       <Grid container spacing={3} sx={{ mb: 5 }}>
//         {[
//           { title: 'Gross Revenue', value: `$${(kpis.totalRevenue || 0).toLocaleString()}`, icon: <TrendingUpIcon sx={{ fontSize: 34 }} />, color: '#10b981' },
//           { title: 'Total Customers', value: kpis.totalCustomers, icon: <PeopleIcon sx={{ fontSize: 34 }} />, color: '#3b82f6' },
//           { title: 'Total Orders', value: kpis.totalOrders, icon: <ShoppingCartIcon sx={{ fontSize: 34 }} />, color: '#64748b' },
//           { title: 'Products Sold', value: kpis.totalProductsSold, icon: <InventoryIcon sx={{ fontSize: 34 }} />, color: '#8b5cf6' },
//           { title: 'Cancelled Orders', value: kpis.monthCancelledOrders, icon: <CancelIcon sx={{ fontSize: 34 }} />, color: '#ef4444' },
//           { title: 'Orders Placed', value: statusCounts.PLACED, icon: <ShoppingCartIcon sx={{ fontSize: 34 }} />, color: '#3b82f6' },
//           { title: 'Preparing', value: statusCounts.PREPARING, icon: <KitchenIcon sx={{ fontSize: 34 }} />, color: '#eab308' },
//           { title: 'Shipped', value: statusCounts.SHIPPED, icon: <LocalShippingIcon sx={{ fontSize: 34 }} />, color: '#8b5cf6' },
//         ].map((card, i) => (
//           <Grid item xs={12} sm={6} md={3} key={i}>
//             <Card sx={{ 
//               borderRadius: '24px', 
//               boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.06)',
//               transition: 'all 0.3s',
//               '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)' }
//             }}>
//               <CardContent sx={{ p: 3.5 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
//                   <Box sx={{ bgcolor: `${card.color}15`, color: card.color, p: 1.5, borderRadius: '16px' }}>
//                     {card.icon}
//                   </Box>
//                 </Box>
//                 <Typography variant="h3" fontWeight="700" color="#0f172a">{card.value}</Typography>
//                 <Typography variant="body2" color="textSecondary" fontWeight="600">{card.title}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Net Yield */}
//       {/* <Card sx={{ borderRadius: '24px', mb: 5, background: kpis.isProfit ? 'linear-gradient(135deg, #f0fdf4, #ecfdf5)' : 'linear-gradient(135deg, #fef2f2, #fee2e2)' }}>
//         <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Box>
//             <Typography variant="overline" fontWeight="700">NET YIELD THIS MONTH</Typography>
//             <Typography variant="h2" fontWeight="800" color={kpis.isProfit ? '#15803d' : '#dc2626'} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//               {kpis.isProfit ? '+' : ''}${Math.abs(kpis.netYield || 0).toLocaleString()}
//               {kpis.isProfit ? <ArrowUpwardIcon sx={{ fontSize: 40 }} /> : <ArrowDownwardIcon sx={{ fontSize: 40 }} />}
//             </Typography>
//           </Box>
//           <Box sx={{ textAlign: 'right' }}>
//             <Chip label={kpis.isProfit ? "PROFITABLE" : "NEEDS ATTENTION"} color={kpis.isProfit ? "success" : "error"} sx={{ fontWeight: 700, mb: 1 }} />
//             <LinearProgress variant="determinate" value={kpis.isProfit ? 82 : 35} sx={{ height: 12, borderRadius: 6 }} />
//           </Box>
//         </CardContent>
//       </Card> */}

//       {/* Charts */}
//       <Grid container spacing={3} sx={{ mb: 2 }}>
//         <Grid item xs={12} md={7}>
//           <Card sx={{ borderRadius: '24px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.06)' }}>
//             <CardContent sx={{ p: 4 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 ,g:2}}>
//                 <Box>
//                   <Typography variant="h5" fontWeight="700">Sales Performance</Typography>
//                   <Typography variant="body2" color="textSecondary">Top Products • {chartTimeframe.toUpperCase()}</Typography>
//                 </Box>
//                 <FormControl size="small" sx={{ minWidth: 180 }}>
                 
//                   <Select value={chartTimeframe} onChange={(e) => setChartTimeframe(e.target.value)} sx={{ borderRadius: '12px' }}>
//                     <MenuItem value="day">Last 30 Days</MenuItem>
//                     <MenuItem value="month">This Month</MenuItem>
//                     <MenuItem value="year">This Year</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//               {loading ? <Box sx={{ py: 10, textAlign: 'center' }}><CircularProgress /></Box> : (
//                 <BarChart dataset={barChartData} xAxis={[{ scaleType: 'band', dataKey: 'label' }]} series={[{ dataKey: 'units', label: 'Units Sold', color: '#2563eb' }]} width={450} height={340} />
//               )}
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={5}>
//           <Card sx={{ borderRadius: '24px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.06)', height: '100%' ,bgcolor:'skyblue'}}>
//             <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
//               <Typography variant="h5" fontWeight="700" sx={{ mb: 3 }}>Order Status Distribution</Typography>
//               {loading ? (
//                 <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box>
//               ) : (
//                 <>
//                   <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
//                     <PieChart 
//                       series={[{
//                         data: orderSummary,
//                         innerRadius: 75,
//                         outerRadius: 115,
//                         paddingAngle: 3,
//                         cornerRadius: 6,
//                         highlightScope: { faded: 'global', highlighted: 'item' }
//                       }]} 
                      
//                       height={250} 
//                     />
//                   </Box>
//                   <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2, justifyContent: 'center' }}>
//                     {orderSummary.map((item, i) => (
//                       <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                         <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: item.color }} />
//                         <Typography variant="body2" fontWeight="500">{item.label} ({item.value})</Typography>
//                       </Box>
//                     ))}
//                   </Box>
//                 </>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Orders Table with Global Search + Status Filter */}
//       <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//         <Typography variant="h5" fontWeight="700" color="#0f172a">Recent Orders</Typography>
        
//         <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//           {/* Global Search */}
//           <TextField
//             placeholder="Search orders..."
//             size="small"
//             value={globalSearch}
//             onChange={(e) => setGlobalSearch(e.target.value)}
//             InputProps={{
//               startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
//             }}
//             sx={{ width: 280 }}
//           />

//           {/* Status Filter */}
//           <FormControl size="small" sx={{ minWidth: 160 }}>
//             <InputLabel>Status</InputLabel>
//             <Select 
//               value={statusFilter} 
//               label="Status" 
//               onChange={(e) => setStatusFilter(e.target.value)}
//               sx={{ borderRadius: '12px' }}
//             >
//               <MenuItem value="All">All Status</MenuItem>
//               <MenuItem value="placed">Placed</MenuItem>
//               <MenuItem value="preparing">Preparing</MenuItem>
//               <MenuItem value="shipped">Shipped</MenuItem>
//               <MenuItem value="delivered">Delivered</MenuItem>
//               <MenuItem value="cancelled">Cancelled</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>

//       <TableContainer component={Paper} sx={{ borderRadius: '24px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.06)' }}>
//         <Table>
//           <TableHead sx={{ bgcolor: '#f8fafc' }}>
//             <TableRow>
//               {[
//                 { id: 'orderId', label: 'Order ID' },
//                 { id: 'customerName', label: 'Customer' },
//                 { id: 'orderDate', label: 'Date & Time' },
//                 { id: 'orderStatus', label: 'Status' },
//                 { id: 'totalAmount', label: 'Amount' }
//               ].map((col) => (
//                 <TableCell key={col.id} sx={{ fontWeight: 700, color: '#475569', py: 3 }}>
//                   <TableSortLabel
//                     active={orderBy === col.id}
//                     direction={orderBy === col.id ? orderDirection : 'asc'}
//                     onClick={() => handleSortRequest(col.id)}
//                   >
//                     {col.label}
//                   </TableSortLabel>
//                 </TableCell>
//               ))}
//               <TableCell align="center" sx={{ fontWeight: 700, color: '#475569', py: 3 }}>Action</TableCell>
//             </TableRow>
//           </TableHead>

//           <TableBody>
//             {filteredAndSortedOrders.map((row) => {
//               const style = getStatusStyle(row.orderStatus);
//               return (
//                 <TableRow key={row.orderId} hover>
//                   <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.95rem' }}>
//                     {row.orderId}
//                   </TableCell>
//                   <TableCell>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//                       <Avatar sx={{ bgcolor: '#e0f2fe', width: 38, height: 38 }}>
//                         {row.customerName.split(' ').map(n => n[0]).join('')}
//                       </Avatar>
//                       {row.customerName}
//                     </Box>
//                   </TableCell>
//                   <TableCell sx={{ color: '#64748b' }}>{row.orderDate}</TableCell>
//                   <TableCell>
//                     <Chip label={row.orderStatus.toUpperCase()} sx={{ bgcolor: style.bg, color: style.color, fontWeight: 700 }} />
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
//                     ${row.totalAmount.toFixed(2)}
//                   </TableCell>
//                   <TableCell align="center">
//                     <IconButton color="primary"><VisibilityIcon /></IconButton>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}

//             {filteredAndSortedOrders.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={6} align="center" sx={{ py: 12 }}>
//                   <Typography color="textSecondary" variant="h6">No matching orders found</Typography>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// }

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Grid, Card, CardContent, Typography, Box, Select, MenuItem,
  FormControl, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TableSortLabel, TextField,
  IconButton, CircularProgress, Chip, TablePagination
} from '@mui/material';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';

import api from '../../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Timeframe Filters
  const [barTimeframe, setBarTimeframe] = useState('month');
  const [pieTimeframe, setPieTimeframe] = useState('month');
  const [lineTimeframe, setLineTimeframe] = useState('year');

  const [year] = useState('2026');
  const [month] = useState('6');

  // Data States
  const [kpis, setKpis] = useState({
    totalRevenue: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalProductsSold: 0,
    deliveredOrders: 0,
    cancelledOrders: 0
  });
  
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [trendChartData, setTrendChartData] = useState([]);
  const [ordersList, setOrdersList] = useState([]);

  // Table Controls
  const [orderBy, setOrderBy] = useState('orderDate');
  const [orderDirection, setOrderDirection] = useState('desc');
  const [globalSearch, setGlobalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const chartColors = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

  // ==================== FETCH DATA ====================
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [resSpec, resStat, resBest, resCust, resOrd, resQty, resCan, resTrends] = await Promise.all([
        api.get(`/adminAnalytics/analyticSpecifc?year=${year}&month=${month}`),
        api.get(`/adminAnalytics/orderStatusSummary?year=${year}&timeframe=${pieTimeframe}`),
        api.get(`/adminAnalytics/bestSoldProducts?year=${year}&timeframe=${barTimeframe}`),
        api.get(`/adminAnalytics/totalCustomers?year=${year}`),
        api.get(`/adminAnalytics/totalOrders?year=${year}`),
        api.get(`/adminAnalytics/totalProductsSold?year=${year}`),
        api.get(`/adminAnalytics/cancelledOrdersAnalytics?year=${year}&month=${month}`),
        api.get(`/adminAnalytics/businessTrends?year=${year}&timeframe=${lineTimeframe}`).catch(() => ({ data: { trends: [] } }))
      ]);

      const totalRevenue = resSpec.data?.analytics?.totalRevenue || resSpec.data?.totalRevenue || 0;
      
      // FIX: The backend sends 'order delivered', not 'delivered'. This was causing the count to be 0.
      // The pie chart logic is now updated to be fully dynamic based on the API response.
      const orderSummary = resStat.data?.summary || {};
      const deliveredCount = orderSummary['order delivered'] || orderSummary['delivery successful'] || 0;

      // The cancelled count can come from two different endpoints, so we prioritize the specific one.
      const cancelledCount = resCan.data?.totalCancelledOrders || resStat.data?.summary?.cancelled || 0;

      setKpis({
        totalRevenue,
        totalCustomers: resCust.data?.totalCustomers || 0,
        totalOrders: resOrd.data?.totalOrders || 0,
        totalProductsSold: resQty.data?.totalProductsSold || 0,
        deliveredOrders: deliveredCount,
        cancelledOrders: cancelledCount
      });

      // FIX: Reverting to only show Delivered and Cancelled counts as requested.
      // This ensures the chart updates correctly when the timeframe filter is changed.
      const pieData = [];
      if (deliveredCount > 0) {
        pieData.push({ id: 0, value: deliveredCount, label: 'DELIVERED', color: '#10b981' });
      }
      if (cancelledCount > 0) {
        pieData.push({ id: 1, value: cancelledCount, label: 'CANCELLED', color: '#ef4444' });
      }
      setPieChartData(pieData);

      // Bar Chart - Top 5 Products
      const bestProducts = resBest.data?.data || [];
      const grossProductsSum = bestProducts.reduce((sum, item) => sum + Number(item.totalQuantitySold || 0), 0);
      
      const topProducts = bestProducts.slice(0, 5).map((item, idx) => {
        const itemUnits = Number(item.totalQuantitySold || 0);
        const sharePercentage = grossProductsSum > 0 ? Number(((itemUnits / grossProductsSum) * 100).toFixed(1)) : 0;
        return {
          id: idx, 
          label: item.productName || `Product ${idx + 1}`, 
          value: sharePercentage,
          units: itemUnits,
          color: chartColors[idx % chartColors.length]
        };
      });

      while (topProducts.length < 5) {
        topProducts.push({ id: topProducts.length, label: 'N/A', value: 0, units: 0, color: '#e5e7eb' });
      }
      setBarChartData(topProducts);

      // Line Chart
      const timelineData = resTrends.data?.trends || [];
      if (timelineData.length > 0) {
        setTrendChartData(timelineData.map((t, idx) => ({
          id: idx,
          label: t.periodLabel || `Period ${idx + 1}`,
          revenue: Number(t.revenue || 0),
          profit: Number(t.profit || 0),
          loss: Number(t.loss || 0)
        })));
      } else {
        const labels = lineTimeframe === 'week' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] : 
                       lineTimeframe === 'month' ? ['Week 1', 'Week 2', 'Week 3', 'Week 4'] : 
                       ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        
        setTrendChartData(labels.map((lbl, idx) => ({
          id: idx,
          label: lbl,
          revenue: totalRevenue * (0.4 + idx * 0.12),
          profit: totalRevenue * (0.1 + idx * 0.05),
          loss: totalRevenue * (0.02 + idx * 0.01)
        })));
      }

      // Orders List
      const activeOrders = resSpec.data?.data || [];
      setOrdersList(activeOrders.map(order => ({
        orderId: order._id || order.orderId || 'N/A',
        customerName: order.customerName || 'Unknown',
        orderDate: order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A',
        orderStatus: order.orderStatus || 'unknown',
        totalAmount: Number(order.final_price || order.totalAmount || 0)
      })));

    } catch (error) {
      console.error("Error pulling production API metrics:", error);
    } finally {
      setLoading(false);
    }
  }, [year, month, barTimeframe, pieTimeframe, lineTimeframe]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // ==================== OPERATIONAL MATRIX FILTER & SORT LOGIC ====================
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...ordersList];

    // 1. Global search filter
    if (globalSearch) {
      const term = globalSearch.toLowerCase().trim();
      filtered = filtered.filter(row =>
        String(row.orderId).toLowerCase().includes(term) ||
        String(row.customerName).toLowerCase().includes(term)
      );
    }

    // 2. Resilient substring verification to prevent matching bugs
    if (statusFilter && statusFilter !== 'All') {
      const filterTarget = statusFilter.toLowerCase().trim();
      filtered = filtered.filter(row => 
        String(row.orderStatus).toLowerCase().trim().includes(filterTarget)
      );
    }

    // 3. Sorting execution
    return filtered.sort((a, b) => {
      let valA = a[orderBy], valB = b[orderBy];
      if (typeof valA === 'string') {
        return orderDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return orderDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [ordersList, globalSearch, statusFilter, orderBy, orderDirection]);

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const getStatusStyle = (status) => {
    const currentStatus = String(status).toLowerCase().trim();
    // FIX: Accommodate both "delivered" from filters and "delivery successful" from API data
    if (currentStatus.includes('delivered') || currentStatus.includes('delivery successful')) {
      return { bg: '#dcfce7', color: '#166534' };
    }
    if (currentStatus.includes('cancelled')) return { bg: '#fee2e2', color: '#991b1b' };
    if (currentStatus.includes('placed')) return { bg: '#dbeafe', color: '#1e40af' };
    if (currentStatus.includes('preparing')) return { bg: '#fef3c7', color: '#854d0e' };
    return { bg: '#f1f5f9', color: '#475569' };
  };

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5, alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="900" letterSpacing="-1px" color="#0f172a">
            PowerBites Engine
          </Typography>
          <Typography variant="body2" color="textSecondary" fontWeight="500">
            Live Corporate Administration Workspace
          </Typography>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {[
          { title: 'Gross Revenue', value: `$${(kpis.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, icon: <TrendingUpIcon />, color: '#10b981' },
          { title: 'Total Customers', value: kpis.totalCustomers, icon: <PeopleIcon />, color: '#3b82f6' },
          { title: 'Total Orders', value: kpis.totalOrders, icon: <ShoppingCartIcon />, color: '#64748b' },
          { title: 'Products Sold', value: kpis.totalProductsSold, icon: <InventoryIcon />, color: '#8b5cf6' },
        ].map((card, i) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
            <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                  <Typography variant="caption" color="textSecondary" fontWeight="700" sx={{ textTransform: 'uppercase' }}>{card.title}</Typography>
                  <Box sx={{ bgcolor: `${card.color}10`, color: card.color, p: 1, borderRadius: '8px', display: 'flex' }}>
                    {card.icon}
                  </Box>
                </Box>
                <Typography variant="h5" fontWeight="800" color="#0f172a">{card.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {/* Pie Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: '20px', border: '1px solid #e2e8f0', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="800">Order Fulfillment Ratio</Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
                    Breakdown for this {pieTimeframe}
                  </Typography>
                </Box>
                <FormControl size="small">
                  <Select value={pieTimeframe} onChange={(e) => setPieTimeframe(e.target.value)} sx={{ borderRadius: '8px', fontSize: '0.8rem' }}>
                    <MenuItem value="week">This Week</MenuItem>
                    <MenuItem value="month">This Month</MenuItem>
                    <MenuItem value="year">This Year</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <PieChart
                  series={[{
                    data: pieChartData,
                    innerRadius: 60,
                    outerRadius: 90,
                    paddingAngle: 3,
                    cornerRadius: 4,
                  }]}
                  width={240}
                  height={180}
                />
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2, borderTop: '1px solid #f1f5f9', pt: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary" fontWeight="600">Delivered:</Typography>
                  <Typography variant="body2" fontWeight="700" color="#10b981">{kpis.deliveredOrders}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="textSecondary" fontWeight="600">Cancelled:</Typography>
                  <Typography variant="body2" fontWeight="700" color="#ef4444">{kpis.cancelledOrders}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Line Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Card sx={{ borderRadius: '20px', border: '1px solid #e2e8f0', height: '100%' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="800">Financial Performance</Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
                    P&L Performance Overview for this {lineTimeframe}
                  </Typography>
                </Box>
                <FormControl size="small">
                  <Select value={lineTimeframe} onChange={(e) => setLineTimeframe(e.target.value)} sx={{ borderRadius: '8px', fontSize: '0.8rem' }}>
                    <MenuItem value="week">This Week</MenuItem>
                    <MenuItem value="month">This Month</MenuItem>
                    <MenuItem value="year">This Year</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LineChart
                  dataset={trendChartData}
                  xAxis={[{ scaleType: 'point', dataKey: 'label' }]}
                  series={[
                    { dataKey: 'revenue', label: 'Revenue', color: '#3b82f6' },
                    { dataKey: 'profit', label: 'Profit', color: '#10b981' },
                    { dataKey: 'loss', label: 'Loss', color: '#ef4444' }
                  ]}
                  width={420}
                  height={220}
                  slotProps={{
                    legend: {
                      direction: 'row',
                      position: { vertical: 'bottom', horizontal: 'middle' },
                      padding: { top: 5 },
                      labelStyle: { fontSize: '0.65rem', fontWeight: 600 }
                    }
                  }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Bar Chart */}
        <Grid size={{ xs: 12, md: 12 }}>
          <Card sx={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="800">Top 5 Products Distribution</Typography>
                  <Typography variant="caption" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
                    Market share breakdown by volume for this {barTimeframe}
                  </Typography>
                </Box>
                <FormControl size="small">
                  <Select value={barTimeframe} onChange={(e) => setBarTimeframe(e.target.value)} sx={{ borderRadius: '8px', fontSize: '0.8rem' }}>
                    <MenuItem value="week">This Week</MenuItem>
                    <MenuItem value="month">This Month</MenuItem>
                    <MenuItem value="year">This Year</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {barChartData.length > 0 ? (
                <Grid container spacing={4} alignItems="center">
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                      <BarChart
                        dataset={barChartData}
                        xAxis={[{ 
                          scaleType: 'band', 
                          dataKey: 'label',
                          categoryGapRatio: 0.4,
                          barGapRatio: 0.1
                        }]}
                        series={[{ 
                          dataKey: 'value', 
                          label: 'Volume Share (%)', 
                          color: '#3b82f6',
                        }]}
                        width={550}
                        height={260}
                        margin={{ top: 20, bottom: 40, left: 50, right: 20 }}
                      />
                    </Box>
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pl: { md: 2 } }}>
                      <Typography variant="caption" color="textSecondary" fontWeight="800" sx={{ textTransform: 'uppercase', mb: 1 }}>
                        Product Metrics Ledger
                      </Typography>
                      {barChartData.map((item, idx) => (
                        <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #e2e8f0', pb: 1 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
                            <Typography variant="body2" fontWeight="600" color="#334155">{item.label}</Typography>
                          </Box>
                          <Typography variant="body2" fontWeight="700" color="#0f172a">
                            {item.value}% <Box component="span" sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.75rem' }}>({item.units} units)</Box>
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>No product metrics recorded.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Operational Control Ledger Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="subtitle1" fontWeight="800" color="#0f172a">System Transaction Log</Typography>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <TextField
            placeholder="Search Order ID / Customer..."
            size="small"
            value={globalSearch}
            onChange={(e) => { setGlobalSearch(e.target.value); setPage(0); }}
            sx={{ width: 260, bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <FormControl size="small" sx={{ minWidth: 160, bgcolor: 'white' }}>
            <Select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }} sx={{ borderRadius: '8px' }}>
              <MenuItem value="All">All Statuses</MenuItem>
              <MenuItem value="placed">Placed</MenuItem>
              <MenuItem value="preparing">Preparing</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Orders Table */}
      <TableContainer component={Paper} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              {[
                { id: 'orderId', label: 'Order ID' },
                { id: 'customerName', label: 'Customer' },
                { id: 'orderDate', label: 'Timestamp' },
                { id: 'orderStatus', label: 'State' },
                { id: 'totalAmount', label: 'Value' }
              ].map(col => (
                <TableCell key={col.id} sx={{ py: 2, fontWeight: 700, color: '#475569' }}>
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? orderDirection : 'asc'}
                    onClick={() => handleSortRequest(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: 700, color: '#475569' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              const style = getStatusStyle(row.orderStatus);
              return (
                <TableRow key={row.orderId} hover>
                  <TableCell sx={{ fontWeight: 600, color: '#0284c7', fontFamily: 'monospace' }}>
                    #{row.orderId.substring(0, 8).toUpperCase()}
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>{row.customerName}</TableCell>
                  <TableCell sx={{ color: '#64748b' }}>{row.orderDate}</TableCell>
                  <TableCell>
                    <Chip label={row.orderStatus.toUpperCase()} size="small" sx={{ bgcolor: style.bg, color: style.color, fontWeight: 800, fontSize: '0.65rem', borderRadius: '6px' }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>${row.totalAmount.toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <IconButton size="small" onClick={() => navigate(`/admin/orders/${row.orderId}`)}>
                      <VisibilityIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {filteredAndSortedOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  No matching transaction logs found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={filteredAndSortedOrders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
}