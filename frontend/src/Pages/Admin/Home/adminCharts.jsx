// import React, { useState, useEffect, useMemo, useCallback } from 'react';
// import {
//   Grid, Card, CardContent, Typography, Box, Select, MenuItem,
//   FormControl, Paper, Table, TableBody, TableCell,
//   TableContainer, TableHead, TableRow, TableSortLabel, TextField,
//   IconButton, CircularProgress, Chip, TablePagination
// } from '@mui/material';
// import { BarChart, PieChart, LineChart } from '@mui/x-charts';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import PeopleIcon from '@mui/icons-material/People';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import InventoryIcon from '@mui/icons-material/Inventory';

// import api from '../../../api/axiosConfig';
// import { useNavigate } from 'react-router-dom';

// export default function AdminDashboard() {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Timeframe Filters
//   const [barTimeframe, setBarTimeframe] = useState('month');
//   const [pieTimeframe, setPieTimeframe] = useState('month');
//   const [lineTimeframe, setLineTimeframe] = useState('year');

//   const [year] = useState('2026');
//   const [month] = useState('6');

//   // Data States
//   const [kpis, setKpis] = useState({
//     totalRevenue: 0,
//     totalCustomers: 0,
//     totalOrders: 0,
//     totalProductsSold: 0,
//     deliveredOrders: 0,
//     cancelledOrders: 0
//   });
  
//   const [pieChartData, setPieChartData] = useState([]);
//   const [barChartData, setBarChartData] = useState([]);
//   const [trendChartData, setTrendChartData] = useState([]);
//   const [ordersList, setOrdersList] = useState([]);

//   // Table Controls
//   const [orderBy, setOrderBy] = useState('orderDate');
//   const [orderDirection, setOrderDirection] = useState('desc');
//   const [globalSearch, setGlobalSearch] = useState('');
//   const [statusFilter, setStatusFilter] = useState('All');
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);

//   const chartColors = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

//   // ==================== FETCH DATA ====================
//   const fetchDashboardData = useCallback(async () => {
//     setLoading(true);
//     try {
//       // A single, efficient call to the new consolidated endpoint
//       const [summaryRes, resBest, resTrends] = await Promise.all([
//         api.get(`/adminAnalytics/dashboard-summary?year=${year}&timeframe=${pieTimeframe}`),
//         api.get(`/adminAnalytics/bestSoldProducts?year=${year}&timeframe=${barTimeframe}`),
//         api.get(`/adminAnalytics/businessTrends?year=${year}&timeframe=${lineTimeframe}`).catch(() => ({ data: { trends: [] } }))
//       ]);

//       const dashboardData = summaryRes.data;
//       const totalRevenue = dashboardData.kpis?.totalRevenue || 0;
      
//       // FIX: The backend sends 'order delivered', not 'delivered'. This was causing the count to be 0.
//       // The pie chart logic is now updated to be fully dynamic based on the API response.
//       const orderSummary = dashboardData.orderStatusSummary || {};
//       const deliveredCount = orderSummary['order delivered'] || orderSummary['delivery successful'] || 0;

//       // The cancelled count can come from two different endpoints, so we prioritize the specific one.
//       const cancelledCount = orderSummary['order cancelled'] || 0;

//       setKpis({
//         ...dashboardData.kpis,
//         deliveredOrders: deliveredCount,
//         cancelledOrders: cancelledCount
//       });

//       // FIX: Reverting to only show Delivered and Cancelled counts as requested.
//       // This ensures the chart updates correctly when the timeframe filter is changed.
//       const pieData = [];
//       if (deliveredCount > 0) {
//         pieData.push({ id: 0, value: deliveredCount, label: 'DELIVERED', color: '#10b981' });
//       }
//       if (cancelledCount > 0) {
//         pieData.push({ id: 1, value: cancelledCount, label: 'CANCELLED', color: '#ef4444' });
//       }
//       setPieChartData(pieData);

//       // Bar Chart - Top 5 Products
//       const bestProducts = resBest.data?.data || [];
//       const grossProductsSum = bestProducts.reduce((sum, item) => sum + Number(item.totalQuantitySold || 0), 0);
      
//       const topProducts = bestProducts.slice(0, 5).map((item, idx) => {
//         const itemUnits = Number(item.totalQuantitySold || 0);
//         const sharePercentage = grossProductsSum > 0 ? Number(((itemUnits / grossProductsSum) * 100).toFixed(1)) : 0;
//         return {
//           id: idx, 
//           label: item.productName || `Product ${idx + 1}`, 
//           value: sharePercentage,
//           units: itemUnits,
//           color: chartColors[idx % chartColors.length]
//         };
//       });

//       while (topProducts.length < 5) {
//         topProducts.push({ id: topProducts.length, label: 'N/A', value: 0, units: 0, color: '#e5e7eb' });
//       }
//       setBarChartData(topProducts);

//       // Line Chart
//       const timelineData = resTrends.data?.trends || [];
//       if (timelineData.length > 0) {
//         setTrendChartData(timelineData.map((t, idx) => ({
//           id: idx,
//           label: t.periodLabel || `Period ${idx + 1}`,
//           revenue: Number(t.revenue || 0),
//           profit: Number(t.profit || 0),
//           loss: Number(t.loss || 0)
//         })));
//       } else {
//         const labels = lineTimeframe === 'week' ? ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] : 
//                        lineTimeframe === 'month' ? ['Week 1', 'Week 2', 'Week 3', 'Week 4'] : 
//                        ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        
//         setTrendChartData(labels.map((lbl, idx) => ({
//           id: idx,
//           label: lbl,
//           revenue: totalRevenue * (0.4 + idx * 0.12),
//           profit: totalRevenue * (0.1 + idx * 0.05),
//           loss: totalRevenue * (0.02 + idx * 0.01)
//         })));
//       }

//       // Orders List
//       const activeOrders = dashboardData.recentOrders || [];
//       setOrdersList(activeOrders.map(order => ({
//         orderId: order._id || order.orderId || 'N/A',
//         customerName: order.customerName || 'Unknown',
//         orderDate: order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A',
//         orderStatus: order.orderStatus || 'unknown',
//         totalAmount: Number(order.final_price || order.totalAmount || 0)
//       })));

//     } catch (error) {
//       console.error("Error pulling production API metrics:", error);
//     } finally {
//       setLoading(false);
//     }
//   }, [year, barTimeframe, pieTimeframe, lineTimeframe]);

//   useEffect(() => {
//     fetchDashboardData();
//   }, [fetchDashboardData]);

//   // ==================== OPERATIONAL MATRIX FILTER & SORT LOGIC ====================
//   const filteredAndSortedOrders = useMemo(() => {
//     let filtered = [...ordersList];

//     // 1. Global search filter
//     if (globalSearch) {
//       const term = globalSearch.toLowerCase().trim();
//       filtered = filtered.filter(row =>
//         String(row.orderId).toLowerCase().includes(term) ||
//         String(row.customerName).toLowerCase().includes(term)
//       );
//     }

//     // 2. Resilient substring verification to prevent matching bugs
//     if (statusFilter && statusFilter !== 'All') {
//       const filterTarget = statusFilter.toLowerCase().trim();
//       filtered = filtered.filter(row => 
//         String(row.orderStatus).toLowerCase().trim().includes(filterTarget)
//       );
//     }

//     // 3. Sorting execution
//     return filtered.sort((a, b) => {
//       let valA = a[orderBy], valB = b[orderBy];
//       if (typeof valA === 'string') {
//         return orderDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
//       }
//       return orderDirection === 'asc' ? valA - valB : valB - valA;
//     });
//   }, [ordersList, globalSearch, statusFilter, orderBy, orderDirection]);

//   const handleChangePage = (event, newPage) => setPage(newPage);
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSortRequest = (property) => {
//     const isAsc = orderBy === property && orderDirection === 'asc';
//     setOrderDirection(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const getStatusStyle = (status) => {
//     const currentStatus = String(status).toLowerCase().trim();
//     // FIX: Accommodate both "delivered" from filters and "delivery successful" from API data
//     if (currentStatus.includes('delivered') || currentStatus.includes('delivery successful')) {
//       return { bg: '#dcfce7', color: '#166534' };
//     }
//     if (currentStatus.includes('cancelled')) return { bg: '#fee2e2', color: '#991b1b' };
//     if (currentStatus.includes('placed')) return { bg: '#dbeafe', color: '#1e40af' };
//     if (currentStatus.includes('preparing')) return { bg: '#fef3c7', color: '#854d0e' };
//     return { bg: '#f1f5f9', color: '#475569' };
//   };

//   return (
//     <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
//       {/* Header */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5, alignItems: 'center' }}>
//         <Box>
//           <Typography variant="h4" fontWeight="900" letterSpacing="-1px" color="#0f172a">
//             PowerBites Engine
//           </Typography>
//           <Typography variant="body2" color="textSecondary" fontWeight="500">
//             Live Corporate Administration Workspace
//           </Typography>
//         </Box>
//       </Box>

//       {/* KPI Cards */}
//       <Grid container spacing={3} sx={{ mb: 5 }}>
//         {[
//           { title: 'Gross Revenue', value: `$${(kpis.totalRevenue || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, icon: <TrendingUpIcon />, color: '#10b981' },
//           { title: 'Total Customers', value: kpis.totalCustomers, icon: <PeopleIcon />, color: '#3b82f6' },
//           { title: 'Total Orders', value: kpis.totalOrders, icon: <ShoppingCartIcon />, color: '#64748b' },
//           { title: 'Products Sold', value: kpis.totalProductsSold, icon: <InventoryIcon />, color: '#8b5cf6' },
//         ].map((card, i) => (
//           <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
//             <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
//               <CardContent sx={{ p: 3 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
//                   <Typography variant="caption" color="textSecondary" fontWeight="700" sx={{ textTransform: 'uppercase' }}>{card.title}</Typography>
//                   <Box sx={{ bgcolor: `${card.color}10`, color: card.color, p: 1, borderRadius: '8px', display: 'flex' }}>
//                     {card.icon}
//                   </Box>
//                 </Box>
//                 <Typography variant="h5" fontWeight="800" color="#0f172a">{card.value}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Charts Section */}
//       <Grid container spacing={4} sx={{ mb: 6 }}>
//         {/* Pie Chart */}
//         <Grid size={{ xs: 12, md: 6 }}>
//           <Card sx={{ borderRadius: '20px', border: '1px solid #e2e8f0', height: '100%' }}>
//             <CardContent sx={{ p: 3 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="800">Order Fulfillment Ratio</Typography>
//                   <Typography variant="caption" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
//                     Breakdown for this {pieTimeframe}
//                   </Typography>
//                 </Box>
//                 <FormControl size="small">
//                   <Select value={pieTimeframe} onChange={(e) => setPieTimeframe(e.target.value)} sx={{ borderRadius: '8px', fontSize: '0.8rem' }}>
//                     <MenuItem value="week">This Week</MenuItem>
//                     <MenuItem value="month">This Month</MenuItem>
//                     <MenuItem value="year">This Year</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>

//               <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
//                 <PieChart
//                   series={[{
//                     data: pieChartData,
//                     innerRadius: 60,
//                     outerRadius: 90,
//                     paddingAngle: 3,
//                     cornerRadius: 4,
//                   }]}
//                   width={240}
//                   height={180}
//                 />
//               </Box>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2, borderTop: '1px solid #f1f5f9', pt: 2 }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'normal' }}>
//                   <Typography variant="body2" color="textSecondary" fontWeight="600">Delivered:</Typography>
//                   <Typography variant="body2" fontWeight="700" color="#10b981"> {kpis.deliveredOrders}</Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', justifyContent: 'normal' }}>
//                   <Typography variant="body2" color="textSecondary" fontWeight="600">Cancelled:</Typography>
//                   <Typography variant="body2" fontWeight="700" color="#ef4444"> {kpis.cancelledOrders}</Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Line Chart */}
//         {/* <Grid size={{ xs: 12, md: 6 }}>
//           <Card sx={{ borderRadius: '20px', border: '1px solid #e2e8f0', height: '100%' }}>
//             <CardContent sx={{ p: 3 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="800">Financial Performance</Typography>
//                   <Typography variant="caption" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
//                     P&L Performance Overview for this {lineTimeframe}
//                   </Typography>
//                 </Box>
//                 <FormControl size="small">
//                   <Select value={lineTimeframe} onChange={(e) => setLineTimeframe(e.target.value)} sx={{ borderRadius: '8px', fontSize: '0.8rem' }}>
//                     <MenuItem value="week">This Week</MenuItem>
//                     <MenuItem value="month">This Month</MenuItem>
//                     <MenuItem value="year">This Year</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>

//               <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <LineChart
//                   dataset={trendChartData}
//                   xAxis={[{ scaleType: 'point', dataKey: 'label' }]}
//                   series={[
//                     { dataKey: 'revenue', label: 'Revenue', color: '#3b82f6' },
//                     { dataKey: 'profit', label: 'Profit', color: '#10b981' },
//                     { dataKey: 'loss', label: 'Loss', color: '#ef4444' }
//                   ]}
//                   width={420}
//                   height={220}
//                   slotProps={{
//                     legend: {
//                       direction: 'row',
//                       position: { vertical: 'bottom', horizontal: 'middle' },
//                       padding: { top: 5 },
//                       labelStyle: { fontSize: '0.65rem', fontWeight: 600 }
//                     }
//                   }}
//                 />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid> */}

//         {/* Bar Chart */}
//         <Grid size={{ xs: 12, md: 12 }}>
//           <Card sx={{ borderRadius: '20px', border: '1px solid #e2e8f0' }}>
//             <CardContent sx={{ p: 3 }}>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
//                 <Box>
//                   <Typography variant="subtitle1" fontWeight="800">Top 5 Products Distribution</Typography>
//                   <Typography variant="caption" color="textSecondary" sx={{ textTransform: 'capitalize' }}>
//                     Market share breakdown by volume for this {barTimeframe}
//                   </Typography>
//                 </Box>
//                 <FormControl size="small">
//                   <Select value={barTimeframe} onChange={(e) => setBarTimeframe(e.target.value)} sx={{ borderRadius: '8px', fontSize: '0.8rem' }}>
//                     <MenuItem value="week">This Week</MenuItem>
//                     <MenuItem value="month">This Month</MenuItem>
//                     <MenuItem value="year">This Year</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>

//               {barChartData.length > 0 ? (
//                 <Grid container spacing={4} alignItems="center">
//                   <Grid size={{ xs: 12, md: 7 }}>
//                     <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
//                       <BarChart
//                         layout="horizontal"
//                         dataset={barChartData}
//                         yAxis={[{ 
//                           scaleType: 'band', 
//                           dataKey: 'label',
//                         }]}
//                         xAxis={[{ label: 'Volume Share (%)' }]}
//                         series={[{ 
//                           dataKey: 'value', 
//                           label: 'Volume Share (%)', 
//                           color: '#3b82f6',
//                         }]}
//                         width={500}
//                         height={260}
//                         margin={{ top: 20, bottom: 40, left: 120, right: 20 }}
//                       />
//                     </Box>
//                   </Grid>
                  
//                   <Grid size={{ xs: 12, md: 5 }}>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, pl: { md: 2 } }}>
//                       <Typography variant="caption" color="textSecondary" fontWeight="800" sx={{ textTransform: 'uppercase', mb: 1 }}>
//                         Product Metrics Ledger
//                       </Typography>
//                       {barChartData.map((item, idx) => (
//                         <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #e2e8f0', pb: 1 }}>
//                           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
//                             <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: item.color }} />
//                             <Typography variant="body2" fontWeight="600" color="#334155">{item.label}</Typography>
//                           </Box>
//                           <Typography variant="body2" fontWeight="700" color="#0f172a">
//                             {item.value}% <Box component="span" sx={{ fontWeight: 500, color: 'text.secondary', fontSize: '0.75rem' }}>({item.units} units)</Box>
//                           </Typography>
//                         </Box>
//                       ))}
//                     </Box>
//                   </Grid>
//                 </Grid>
//               ) : (
//                 <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>No product metrics recorded.</Typography>
//               )}
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Operational Control Ledger Header */}
//       <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//         <Typography variant="subtitle1" fontWeight="800" color="#0f172a">System Transaction Log</Typography>
//         <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//           <TextField
//             placeholder="Search Order ID / Customer..."
//             size="small"
//             value={globalSearch}
//             onChange={(e) => { setGlobalSearch(e.target.value); setPage(0); }}
//             sx={{ width: 260, bgcolor: 'white', '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
//           />
//           <FormControl size="small" sx={{ minWidth: 160, bgcolor: 'white' }}>
//             <Select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }} sx={{ borderRadius: '8px' }}>
//               <MenuItem value="All">All Statuses</MenuItem>
//               <MenuItem value="placed">Placed</MenuItem>
//               <MenuItem value="preparing">Preparing</MenuItem>
//               <MenuItem value="delivered">Delivered</MenuItem>
//               <MenuItem value="cancelled">Cancelled</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>

//       {/* Orders Table */}
//       <TableContainer component={Paper} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
//         <Table size="small">
//           <TableHead sx={{ bgcolor: '#f8fafc' }}>
//             <TableRow>
//               {[
//                 { id: 'orderId', label: 'Order ID' },
//                 { id: 'customerName', label: 'Customer' },
//                 { id: 'orderDate', label: 'Timestamp' },
//                 { id: 'orderStatus', label: 'State' },
//                 { id: 'totalAmount', label: 'Value' }
//               ].map(col => (
//                 <TableCell key={col.id} sx={{ py: 2, fontWeight: 700, color: '#475569' }}>
//                   <TableSortLabel
//                     active={orderBy === col.id}
//                     direction={orderBy === col.id ? orderDirection : 'asc'}
//                     onClick={() => handleSortRequest(col.id)}
//                   >
//                     {col.label}
//                   </TableSortLabel>
//                 </TableCell>
//               ))}
//               <TableCell align="center" sx={{ fontWeight: 700, color: '#475569' }}>Action</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {filteredAndSortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
//               const style = getStatusStyle(row.orderStatus);
//               return (
//                 <TableRow key={row.orderId} hover>
//                   <TableCell sx={{ fontWeight: 600, color: '#0284c7', fontFamily: 'monospace' }}>
//                     #{row.orderId.substring(0, 8).toUpperCase()}
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>{row.customerName}</TableCell>
//                   <TableCell sx={{ color: '#64748b' }}>{row.orderDate}</TableCell>
//                   <TableCell>
//                     <Chip label={row.orderStatus.toUpperCase()} size="small" sx={{ bgcolor: style.bg, color: style.color, fontWeight: 800, fontSize: '0.65rem', borderRadius: '6px' }} />
//                   </TableCell>
//                   <TableCell sx={{ fontWeight: 700 }}>${row.totalAmount.toFixed(2)}</TableCell>
//                   <TableCell align="center">
//                     <IconButton size="small" onClick={() => navigate(`/admin/orders/${row.orderId}`)}>
//                       <VisibilityIcon fontSize="small" />
//                     </IconButton>
//                   </TableCell>
//                 </TableRow>
//               );
//             })}
//             {filteredAndSortedOrders.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
//                   No matching transaction logs found.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//         <TablePagination
//           rowsPerPageOptions={[10]}
//           component="div"
//           count={filteredAndSortedOrders.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>
//     </Box>
//   );
// }


import React, { useState, useEffect, useMemo } from 'react';
import {
  Grid, Card, CardContent, Typography, Box, Select, MenuItem,
  FormControl, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TableSortLabel, TextField,
  IconButton, CircularProgress, Chip, TablePagination, Alert, AlertTitle
} from '@mui/material';
import { BarChart, PieChart, LineChart } from '@mui/x-charts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

import api from '../../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const year = "2026";

  // Global Context State (Metrics Card + Data Table Feed)
  const [summaryLoading, setSummaryLoading] = useState(true);
  const [kpis, setKpis] = useState({ totalRevenue: 0, totalCustomers: 0, totalOrders: 0, totalProductsSold: 0, deliveredOrders: 0, cancelledOrders: 0 });
  const [ordersList, setOrdersList] = useState([]);

  // Data Table State Management
  const [globalSearch, setGlobalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [orderDirection, setOrderDirection] = useState('desc');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Load Main KPI Cards & Transaction Table Log Rows
  useEffect(() => {
    async function loadSummary() {
      try {
        const res = await api.get(`/adminAnalytics/dashboard-summary?year=${year}&timeframe=year`);
        setKpis(res.data.kpis);
        setOrdersList(res.data.orders);
      } catch (err) {
        console.error("Summary execution failed:", err);
      } finally {
        setSummaryLoading(false);
      }
    }
    loadSummary();
  }, []);

  // Table Filter & Sorting Engine Logic Matrix
  const filteredAndSortedOrders = useMemo(() => {
    let output = [...ordersList];
    if (globalSearch) {
      const term = globalSearch.toLowerCase().trim();
      output = output.filter(r => String(r._id).toLowerCase().includes(term) || String(r.customerName).toLowerCase().includes(term));
    }
    if (statusFilter && statusFilter !== 'All') {
      const target = statusFilter.toLowerCase().trim();
      output = output.filter(r => String(r.orderStatus).toLowerCase().includes(target));
    }
    return output.sort((a, b) => {
      let vA = a[orderBy], vB = b[orderBy];
      if (typeof vA === 'string') return orderDirection === 'asc' ? vA.localeCompare(vB) : vB.localeCompare(vA);
      return orderDirection === 'asc' ? vA - vB : vB - vA;
    });
  }, [ordersList, globalSearch, statusFilter, orderBy, orderDirection]);

  if (summaryLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', gap: 2 }}>
        <CircularProgress />
        <Typography variant="body2" color="textSecondary" fontWeight="600">Syncing Corporate Operations Desk...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="900" color="#0f172a">PowerBites Business Suite</Typography>
        <Typography variant="body2" color="textSecondary">Enterprise Data Ledger & Analytics Operations Desk</Typography>
      </Box>

      {/* KPI Panel Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { label: 'Gross Net Revenue', val: `₹${kpis.totalRevenue.toLocaleString('en-IN')}`, icon: <TrendingUpIcon />, color: '#10b981' },
          { label: 'Registered Clients', val: kpis.totalCustomers, icon: <PeopleIcon />, color: '#3b82f6' },
          { label: 'System Invoices', val: kpis.totalOrders, icon: <ShoppingCartIcon />, color: '#64748b' },
          { label: 'Volume Sold Units', val: kpis.totalProductsSold, icon: <InventoryIcon />, color: '#8b5cf6' }
        ].map((c, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ borderRadius: '14px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5, alignItems: 'center' }}>
                  <Typography variant="caption" color="textSecondary" fontWeight="700">{c.label}</Typography>
                  <Box sx={{ bgcolor: `${c.color}15`, color: c.color, p: 0.8, borderRadius: '6px', display: 'flex' }}>{c.icon}</Box>
                </Box>
                <Typography variant="h5" fontWeight="800">{c.val}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Isolated Graphical Dashboard Analytics Components Row */}
      <Grid container spacing={4} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}><IsolatedLineChart year={year} /></Grid>
        <Grid item xs={12} md={6}><IsolatedFulfillmentRatio delivered={kpis.deliveredOrders} cancelled={kpis.cancelledOrders} /></Grid>
        <Grid item xs={12} md={6}><IsolatedProductLeaderboard type="top" year={year} /></Grid>
        <Grid item xs={12} md={6}><IsolatedProductLeaderboard type="least" year={year} /></Grid>
      </Grid>

      {/* Corporate Action Planning Matrix Section */}
      <Card sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'none', bgcolor: '#feffec', mb: 5 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
            <LightbulbIcon sx={{ color: '#ca8a04' }} />
            <Typography variant="subtitle1" fontWeight="800" color="#854d0e">Strategic Corporate Action Ledger</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Alert severity="success" icon={false} sx={{ border: '1px solid #bbf7d0', bgcolor: '#f0fdf4' }}>
                <AlertTitle sx={{ fontWeight: 800 }}>Top Products Strategy</AlertTitle>
                Maximize catalog inventory pipelines immediately. Scale digital advertising campaigns targeting these assets to secure conversion velocity.
              </Alert>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Alert severity="warning" icon={false} sx={{ border: '1px solid #fef08a', bgcolor: '#fefce8' }}>
                <AlertTitle sx={{ fontWeight: 800 }}>Least Products Strategy</AlertTitle>
                Identify stock bottlenecks. Deploy flash discount promotions, bundle underperforming items with top sellers, or clear warehouse space by liquidating remaining units.
              </Alert>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Core Full Data Table Filter Controls */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight="800">Operational Invoices Data Feed ({filteredAndSortedOrders.length} records)</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField placeholder="Search Invoice ID / Customer..." size="small" value={globalSearch} onChange={(e) => { setGlobalSearch(e.target.value); setPage(0); }} sx={{ width: 260, bgcolor: 'white' }} />
          <FormControl size="small" sx={{ minWidth: 160, bgcolor: 'white' }}>
            <Select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setPage(0); }}>
              <MenuItem value="All">All Order Statuses</MenuItem>
              <MenuItem value="placed">Placed</MenuItem>
              <MenuItem value="preparing">Preparing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* Main Enterprise Data Grid Grid */}
      <TableContainer component={Paper} sx={{ borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
        <Table size="small">
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              {[{ id: '_id', label: 'Invoice ID' }, { id: 'customerName', label: 'Client Buyer' }, { id: 'createdAt', label: 'Timestamp Date' }, { id: 'orderStatus', label: 'Pipeline State' }, { id: 'final_price', label: 'Net Payment' }].map(col => (
                <TableCell key={col.id} sx={{ py: 2, fontWeight: 700 }}>
                  <TableSortLabel active={orderBy === col.id} direction={orderBy === col.id ? orderDirection : 'asc'} onClick={() => { setOrderDirection(orderBy === col.id && orderDirection === 'asc' ? 'desc' : 'asc'); setOrderBy(col.id); }}>
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: 700 }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedOrders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow key={row._id} hover>
                <TableCell sx={{ fontWeight: 600, color: '#0284c7', fontFamily: 'monospace' }}>#{row._id.substring(0, 8).toUpperCase()}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{row.customerName}</TableCell>
                <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Chip label={row.orderStatus.toUpperCase()} size="small" sx={{ 
                    fontWeight: 800, fontSize: '0.65rem', borderRadius: '6px',
                    bgcolor: row.orderStatus.includes('delivered') ? '#e8f5e9' : row.orderStatus.includes('cancelled') ? '#ffebee' : '#fff8e1',
                    color: row.orderStatus.includes('delivered') ? '#2e7d32' : row.orderStatus.includes('cancelled') ? '#c62828' : '#f57f17'
                  }} />
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }}>₹{row.final_price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton size="small" onClick={() => navigate(`/admin/orders/${row._id}`)}><VisibilityIcon fontSize="small" /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination rowsPerPageOptions={[10, 25, 50]} component="div" count={filteredAndSortedOrders.length} rowsPerPage={rowsPerPage} page={page} onPageChange={(e, p) => setPage(p)} onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }} />
      </TableContainer>
    </Box>
  );
}

// ======================== ISOLATED INDEPENDENT CHART UI MODULES ========================

function IsolatedLineChart({ year }) {
  const [filter, setFilter] = useState('year');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrends() {
      setLoading(true);
      try {
        const res = await api.get(`/adminAnalytics/businessTrends?year=${year}&timeframe=${filter}`);
        setData(res.data.trends);
      } catch (err) { console.error(err); }
      setLoading(false);
    }
    fetchTrends();
  }, [filter, year]);

  return (
    <Card sx={{ borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" fontWeight="800">Financial Growth Trajectory</Typography>
          <Select size="small" value={filter} onChange={(e) => setFilter(e.target.value)} sx={{ height: 30, borderRadius: '6px', fontSize: '0.75rem' }}>
            <MenuItem value="week">Weekly Window</MenuItem>
            <MenuItem value="month">Monthly Window</MenuItem>
            <MenuItem value="year">Annual Summary</MenuItem>
          </Select>
        </Box>
        <Box sx={{ height: 220, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {loading ? <CircularProgress size={20} /> : <LineChart dataset={data} xAxis={[{ scaleType: 'point', dataKey: 'label' || 'periodLabel' }]} series={[{ dataKey: 'revenue', label: 'Revenue (₹)', color: '#3b82f6' }, { dataKey: 'profit', label: 'Profit (₹)', color: '#10b981' }]} width={460} height={220} />}
        </Box>
      </CardContent>
    </Card>
  );
}

function IsolatedFulfillmentRatio({ delivered, cancelled }) {
  const data = [
    { id: 0, value: delivered, label: 'Delivered', color: '#10b981' },
    { id: 1, value: cancelled, label: 'Cancelled', color: '#ef4444' }
  ];
  return (
    <Card sx={{ borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: 'none', height: '100%' }}>
      <CardContent>
        <Typography variant="subtitle2" fontWeight="800" sx={{ mb: 3 }}>System Fulfillment Effectiveness</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 180 }}>
          <PieChart series={[{ data, innerRadius: 50, outerRadius: 75, paddingAngle: 2 }]} width={260} height={160} />
        </Box>
      </CardContent>
    </Card>
  );
}

function IsolatedProductLeaderboard({ type, year }) {
  const [filter, setFilter] = useState('month');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const path = type === 'top' ? 'bestSoldProducts' : 'leastSoldProducts';
        const res = await api.get(`/adminAnalytics/${path}?year=${year}&timeframe=${filter}`);
        const total = res.data.data.reduce((sum, item) => sum + Number(item.totalQuantitySold || 0), 0);
        setData(res.data.data.map((item, idx) => ({
          label: item.productName,
          value: total > 0 ? Number(((item.totalQuantitySold / total) * 100).toFixed(1)) : 0,
          units: item.totalQuantitySold
        })));
      } catch (err) { console.error(err); }
      setLoading(false);
    }
    fetchProducts();
  }, [filter, type, year]);

  return (
    <Card sx={{ borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: 'none' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="subtitle2" fontWeight="800" color={type === 'top' ? '#1e3a8a' : '#7f1d1d'}>
            {type === 'top' ? '🌟 Top Performing Catalog Assets' : '⚠️ Lowest Velocity Inventory Liabilities'}
          </Typography>
          <Select size="small" value={filter} onChange={(e) => setFilter(e.target.value)} sx={{ height: 30, borderRadius: '6px', fontSize: '0.75rem' }}>
            <MenuItem value="week">Weekly</MenuItem>
            <MenuItem value="month">Monthly</MenuItem>
            <MenuItem value="year">Annual</MenuItem>
          </Select>
        </Box>
        <Box sx={{ minHeight: 200, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress size={20} /></Box>
          ) : data.length > 0 ? (
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={7}>
                <BarChart layout="horizontal" dataset={data} yAxis={[{ scaleType: 'band', dataKey: 'label' }]} series={[{ dataKey: 'value', color: type === 'top' ? '#3b82f6' : '#f43f5e' }]} width={280} height={200} margin={{ left: 90, right: 10, top: 10, bottom: 20 }} />
              </Grid>
              <Grid item xs={5}>
                {data.map((item, i) => (
                  <Box key={i} sx={{ borderBottom: '1px dashed #e2e8f0', pb: 0.5, mb: 0.5, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption" fontWeight="700" color="textSecondary" noWrap sx={{ maxWidth: 80 }}>{item.label}</Typography>
                    <Typography variant="caption" fontWeight="800">{item.units} units</Typography>
                  </Box>
                ))}
              </Grid>
            </Grid>
          ) : (
            <Typography variant="caption" color="textSecondary" sx={{ textAlign: 'center' }}>No log streams found.</Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
