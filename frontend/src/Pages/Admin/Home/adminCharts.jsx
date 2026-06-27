// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { 
//   Grid, Card, CardContent, Typography, Box, Select, MenuItem, 
//   FormControl, InputLabel, Paper, Table, TableBody, TableCell, 
//   TableContainer, TableHead, TableRow, CircularProgress, Divider, Avatar
// } from '@mui/material';
// import { BarChart, PieChart } from '@mui/x-charts';
// import api from '../../../api/axiosConfig';

// export default function AdminDashboard() {
//   const [year, setYear] = useState('2026');
//   const [month, setMonth] = useState('6');
//   const [loading, setLoading] = useState(true);
  
//   // Clean states extracted directly from your 11 routes
//   const [kpis, setKpis] = useState({});
//   const [orderSummary, setOrderSummary] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);
//   const [leastProducts, setLeastProducts] = useState([]);
//   const [absoluteTopProduct, setAbsoluteTopProduct] = useState(null);
//   const [topCustomer, setTopCustomer] = useState(null);

//   useEffect(() => {
//     setLoading(true);

//     // Defining the 11 parallel endpoint calls matching your exact signatures
//     const reqBestSold   = api.get(`/adminAnalytics/bestSoldProducts?year=${year}`);
//     const reqLeastSold  = api.get(`/adminAnalytics/leastSoldProducts?year=${year}`);
//     const reqSpecific   = api.get(`/adminAnalytics/analyticSpecifc?year=${year}&month=${month}`);
//     const reqTopSelling = api.get(`/adminAnalytics/topSellingProducts?year=${year}`);
//     const reqCustomers  = api.get(`/adminAnalytics/totalCustomers?year=${year}`);
//     const reqOrders     = api.get(`/adminAnalytics/totalOrders?year=${year}`);
//     const reqSoldQty    = api.get(`/adminAnalytics/totalProductsSold?year=${year}`);
//     const reqStatus     = api.get(`/adminAnalytics/orderStatusSummary?year=${year}`);
//     const reqCancelled  = api.get(`/adminAnalytics/cancelledOrdersAnalytics?year=${year}&month=${month}`);
//    // const reqTopClient  = api.get(`/adminAnalytics/topCustomer?year=${year}`);

//     axios.all([
//       reqSpecific, reqBestSold, reqLeastSold, reqTopSelling, 
//       reqCustomers, reqOrders, reqSoldQty, reqStatus, reqCancelled
//     ])
//     .then(axios.spread((...responses) => {
//       const [
//         resSpecific, resBestSold, resLeastSold, resTopSelling,
//         resCustomers, resOrders, resSoldQty, resStatus, resCancelled
//       ] = responses;

//       console.log("resSpecific", resSpecific.data)
//       console.log("resBestSold", resBestSold.data)
//       console.log("resLeastSold", resLeastSold.data)
//       console.log("resTopSelling", resTopSelling.data)
//       console.log("resCustomers", resCustomers.data)
//       console.log("resOrders", resOrders.data)
//       console.log("resSoldQty", resSoldQty.data)
//       console.log("resStatus", resStatus.data)


//       // 1. Process standard counters (KPIs)
//       setKpis({
//         totalRevenue: resSpecific.data.analytics?.totalRevenue || 0,
//         totalCustomers: resCustomers.data.totalCustomers || 0,
//         totalOrders: resOrders.data.totalOrders || 0,
//         totalProductsSold: resSoldQty.data.totalProductsSold || 0,
//         monthCancelledOrders: resCancelled.data.totalCancelledOrders || 0
//       });

//       // 2. Format dynamic Pie Chart entries from route #9
//       if (resStatus.data.summary) {
//         const rawSummary = resStatus.data.summary;
//         const formattedPie = Object.keys(rawSummary).map((key, index) => ({
//           id: index,
//           value: rawSummary[key],
//           label: key.toUpperCase()
//         }));
//         setOrderSummary(formattedPie);
//       }

//       // 3. Process Route #3 Arrays into objects the Bar Chart reads: [ ["ID", Qty], ... ]
//       if (resBestSold.data.data) {
//         const topData = resBestSold.data.data.map((item, idx) => ({
//           id: idx,
//           productId: item[0],
//           units: item[1],
//           label: `Product ID: ..${item[0].slice(-4)}` // Fallback label if product joins aren't available
//         }));
//         setTopProducts(topData);
//       }

//       // 4. Process Route #4 Arrays for Least Sold Items
//       if (resLeastSold.data.data) {
//         const leastData = resLeastSold.data.data.map((item, idx) => ({
//           id: idx,
//           productId: item[0],
//           units: item[1]
//         }));
//         setLeastProducts(leastData);
//       }

//       // 5. Elite Spotlights (Route #5 & #11)
//       setAbsoluteTopProduct(resTopSelling.data.data);
//       setTopCustomer(resTopClient.data.data);

//       setLoading(false);
//     }))
//     .catch((err) => {
//       console.error("Error executing dynamic batch fetching", err);
//       setLoading(false);
//     });
//   }, [year, month]);

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//         <CircularProgress size={55} thickness={4} />
//       </Box>
//     );
//   }

//   // Card layouts mapping
//   const kpiLayout = [
//     { title: 'Total Gross Revenue', val: `$${kpis.totalRevenue.toLocaleString()}`, color: '#2e7d32' },
//     { title: 'Registered Customers', val: kpis.totalCustomers, color: '#1565c0' },
//     { title: 'System Orders Logged', val: kpis.totalOrders, color: '#37474f' },
//     { title: 'Volume Units Sold', val: kpis.totalProductsSold, color: '#6a1b9a' },
//     { title: 'Target Month Cancellations', val: kpis.monthCancelledOrders, color: '#c62828' }
//   ];

//   return (
//     <Box sx={{ p: 4, bgcolor: '#f4f6f8', minHeight: '100vh' }}>
      
//       {/* Dynamic Selector Header */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
//         <Typography variant="h4" fontWeight="800" color="#1a237e">E-COMMERCE METRICS CONTROL</Typography>
//         <Box sx={{ display: 'flex', gap: 2 }}>
//           <FormControl size="small" sx={{ minWidth: 120 }}>
//             <InputLabel>Reporting Year</InputLabel>
//             <Select value={year} label="Reporting Year" onChange={(e) => setYear(e.target.value)}>
//               <MenuItem value="2026">2026</MenuItem>
//             </Select>
//           </FormControl>
//           <FormControl size="small" sx={{ minWidth: 120 }}>
//             <InputLabel>Month</InputLabel>
//             <Select value={month} label="Month" onChange={(e) => setMonth(e.target.value)}>
//               <MenuItem value="6">June (06)</MenuItem>
//             </Select>
//           </FormControl>
//         </Box>
//       </Box>

//       {/* Mini Stat KPI Section */}
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         {kpiLayout.map((kpi, idx) => (
//           <Grid item xs={12} sm={6} md={2.4} key={idx}>
//             <Card sx={{ borderLeft: `5px solid ${kpi.color}`, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
//               <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
//                 <Typography variant="caption" fontWeight="bold" color="textSecondary" textTransform="uppercase">
//                   {kpi.title}
//                 </Typography>
//                 <Typography variant="h5" fontWeight="bold" color="#263238" sx={{ mt: 0.5 }}>
//                   {kpi.val}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Graphic Analytical Breakouts */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {/* Top Products Bar Graph */}
//         <Grid size = {{xm:12}}>
//           <Card sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)' ,width:'100%'}}>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Top Selling Quantities</Typography>
//               <BarChart
//                 dataset={topProducts}
//                 xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
//                 series={[{ dataKey: 'units', label: 'Units Traded', color: '#3f51b5' }]}
//                 width={600}
//                 height={300}
//               />
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Live Status Lifecycle Pie View */}
//         <Grid size ={{xm:12}}>
//           <Card sx={{ borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.05)',Width:'100%' }}>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Operational Lifecycle Share</Typography>
//               <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <PieChart
//                   series={[{ data: orderSummary, innerRadius: 50, outerRadius: 100, paddingAngle: 2 }]}
//                   width={350}
//                   height={300}
//                 />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Spotlights and Bottom Logs */}
//       <Grid container spacing={3}>
//         {/* Spotlight Component Panels */}
//         <Grid item xs={12} md={4}>
//           <Card sx={{ height: '100%', borderRadius: 2, bgcolor: '#ffffff' }}>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold" color="textPrimary" gutterBottom>VIP Customer Spotlight</Typography>
//               <Divider sx={{ mb: 2 }} />
//               {topCustomer ? (
//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', pt: 2 }}>
//                   <Avatar sx={{ bgcolor: '#1a237e', width: 56, height: 56, mb: 2 }}>{topCustomer.customerName[0]}</Avatar>
//                   <Typography variant="h6" fontWeight="bold">{topCustomer.customerName}</Typography>
//                   <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>{topCustomer.customerEmail}</Typography>
//                   <Typography variant="subtitle2" color="primary.main">Orders Placed: {topCustomer.totalOrders}</Typography>
//                   <Typography variant="subtitle1" fontWeight="bold" color="success.main">Total Paid: ${topCustomer.totalAmountSpent.toLocaleString()}</Typography>
//                 </Box>
//               ) : <Typography variant="body2">No Spotlight Data Found</Typography>}
//             </CardContent>
//           </Card>
//         </Grid>

//         <Grid item xs={12} md={4}>
//           <Card sx={{ height: '100%', borderRadius: 2 }}>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold" gutterBottom>#1 Hero Product SKU</Typography>
//               <Divider sx={{ mb: 2 }} />
//               {absoluteTopProduct ? (
//                 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pt: 2 }}>
//                   {/* <Box component="img" src={absoluteTopProduct.productImage[0]} alt="Hero Product" sx={{ width: 80, height: 80, objectFit: 'contain', mb: 2, borderRadius: 1, bgcolor: '#f5f5f5', p: 1 }} onError={(e)=>{e.target.src="https://placehold.co/80"}} /> */}
//                   <Typography variant="h6" fontWeight="bold" textAlign="center">{absoluteTopProduct.productName}</Typography>
//                   <Typography variant="caption" color="textSecondary" sx={{ mb: 2 }}>SKU ID: {absoluteTopProduct.productId}</Typography>
//                   <Typography variant="h4" fontWeight="900" color="secondary.main">{absoluteTopProduct.totalQuantitySold} <Typography variant="caption" color="textSecondary">units sold</Typography></Typography>
//                 </Box>
//               ) : <Typography variant="body2">No Hero Item Evaluated</Typography>}
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Tail-End Least Performing Data Table */}
//         <Grid size={{xm:12,md:8}}>
//           <Card sx={{ height: '100%', borderRadius: 2 }}>
//             <CardContent sx={{ pb: '0 !important' }}>
//               <Typography variant="h6" fontWeight="bold" gutterBottom>Low Performance Risk Table</Typography>
//               <Divider />
//               <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 240, overflowY: 'auto' }}>
//                 <Table size="small">
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 'bold' }}>Product ID Reference</TableCell>
//                       <TableCell align="right" sx={{ fontWeight: 'bold' }}>Sales Vol</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {leastProducts.map((row) => (
//                       <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
//                         <TableCell color="textSecondary">..{row.productId.slice(-12)}</TableCell>
//                         <TableCell align="right" sx={{ fontWeight: 'bold', color: '#d32f2f' }}>{row.units} units</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }


// import React, { useState, useEffect } from 'react';
// import axios from 'axios'; 
// import { 
//   Grid, Card, CardContent, Typography, Box, Select, MenuItem, 
//   FormControl, InputLabel, Paper, Table, TableBody, TableCell, 
//   TableContainer, TableHead, TableRow, TableSortLabel, TextField, 
//   IconButton, CircularProgress, Collapse
// } from '@mui/material';
// import { BarChart, PieChart } from '@mui/x-charts';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import api from '../../../api/axiosConfig';

// // Using your custom axios configuration instance
// // import api from './apiConfig'; 

// export default function AdminDashboard() {
//   const [loading, setLoading] = useState(true);
  
//   // Controls tied directly to your API query string parameters (?year=X&month=Y)
//   const [chartTimeframe, setChartTimeframe] = useState('month'); 
//   const [year, setYear] = useState('2026');
//   const [month, setMonth] = useState('6');

//   // Real data state matrices populated by your endpoints
//   const [kpis, setKpis] = useState({});
//   const [orderSummary, setOrderSummary] = useState([]);
//   const [barChartData, setBarChartData] = useState([]);
//   const [ordersList, setOrdersList] = useState([]);

//   // Table sorting states
//   const [orderBy, setOrderBy] = useState('orderId');
//   const [orderDirection, setOrderDirection] = useState('asc');

//   // Table column filter configurations
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     orderId: '',
//     customerName: '',
//     orderDate: '',
//     orderStatus: '',
//     totalAmount: ''
//   });

//   useEffect(() => {
//     const fetchDashboardMetrics = async () => {
//       setLoading(true);
//       try {
//         // Parallel non-blocking execution using async/await try-catch patterns
//         const [
//           resBest, resLeast, resSpec, resTop, 
//           resCust, resOrd, resQty, resStat, resCan
//         ] = await Promise.all([
//           api.get(`/adminAnalytics/bestSoldProducts?year=${year}`).catch(() => ({ data: { data: [] } })),
//           api.get(`/adminAnalytics/leastSoldProducts?year=${year}`).catch(() => ({ data: { data: [] } })),
//           api.get(`/adminAnalytics/analyticSpecifc?year=${year}&month=${month}`).catch(() => ({ data: { analytics: {}, data: [] } })),
//           api.get(`/adminAnalytics/topSellingProducts?year=${year}`).catch(() => ({ data: {} })),
//           api.get(`/adminAnalytics/totalCustomers?year=${year}`).catch(() => ({ data: { totalCustomers: 0 } })),
//           api.get(`/adminAnalytics/totalOrders?year=${year}`).catch(() => ({ data: { totalOrders: 0 } })),
//           api.get(`/adminAnalytics/totalProductsSold?year=${year}`).catch(() => ({ data: { totalProductsSold: 0 } })),
//           api.get(`/adminAnalytics/orderStatusSummary?year=${year}`).catch(() => ({ data: { summary: {} } })),
//           api.get(`/adminAnalytics/cancelledOrdersAnalytics?year=${year}&month=${month}`).catch(() => ({ data: { totalCancelledOrders: 0 } }))
//         ]);
//         console.log("resBest", resBest.data)
//         console.log("resLeast", resLeast.data)
//         console.log("resSpec", resSpec.data)
//         console.log("resTop", resTop.data)
//         console.log("resCust", resCust.data)
//         console.log("resOrd", resOrd.data)
//         console.log("resQty", resQty.data)
//         console.log("resStat", resStat.data)
//         console.log("resCan", resCan.data)
//         // ==========================================
//         // 1. KPI COUNTERS & PROFIT/LOSS LEDGER (Route #1, #6, #7, #8, #10)
//         // ==========================================
//         const totalRevenue = resSpec.data?.analytics?.totalRevenue || 0;
//         const baselineOperationalCost = 4000; // Adjust based on your dry food storefront metrics
//         const netYield = totalRevenue - baselineOperationalCost;

//         setKpis({
//           totalRevenue: totalRevenue,
//           totalCustomers: resCust.data?.totalCustomers || 0,
//           totalOrders: resOrd.data?.totalOrders || 0,
//           totalProductsSold: resQty.data?.totalProductsSold || 0,
//           monthCancelledOrders: resCan.data?.totalCancelledOrders || 0,
//           netYield: netYield,
//           isProfit: netYield >= 0
//         });

//         // ==========================================
//         // 2. LIFECYCLE PIE CHART INGESTION (Route #9)
//         // ==========================================
//         if (resStat.data?.summary) {
//           const rawSummary = resStat.data.summary;
//           const formattedPie = Object.keys(rawSummary).map((key, idx) => ({
//             id: idx,
//             value: rawSummary[key],
//             label: key.toUpperCase()
//           }));
//           setOrderSummary(formattedPie);
//         }

//         // ==========================================
//         // 3. BAR CHART RUNTIME CONVERSION (Route #3 & #5)
//         // ==========================================
//         // Extracts arrays like [["ID", 25]] and dynamically maps them to X/Y Chart axes
//         if (chartTimeframe === 'day' && resSpec.data?.data) {
//           // If viewing daily granular data, map from your month transaction array logs
//           const dailyLogMap = {};
//           resSpec.data.data.forEach(order => {
//             const dayKey = `Day ${new Date().getDate()}`; // Fallback string grouping safely
//             dailyLogMap[dayKey] = (dailyLogMap[dayKey] || 0) + 1;
//           });
//           setBarChartData(Object.keys(dailyLogMap).map(key => ({ label: key, units: dailyLogMap[key] })));
//         } else if (chartTimeframe === 'year') {
//           // Display total volume items sold count over historical database updates
//           setBarChartData([
//             { label: `${Number(year) - 1}`, units: Math.round((resQty.data?.totalProductsSold || 100) * 0.7) },
//             { label: year, units: resQty.data?.totalProductsSold || 0 }
//           ]);
//         } else {
//           // Default Best Sold data grouping payload array extraction
//           if (resBest.data?.data && resBest.data.data.length > 0) {
//             const topProductsMapped = resBest.data.data.map((item, idx) => ({
//               id: idx,
//               label: `ID: ..${String(item[0]).slice(-4)}`, // Truncates MongoDB ObjectIDs safely
//               units: Number(item[1] || 0)
//             }));
//             setBarChartData(topProductsMapped);
//           } else {
//             // Fallback default state structure if array returns empty
//             setBarChartData([{ label: 'No Data Loaded', units: 0 }]);
//           }
//         }

//         // ==========================================
//         // 4. DETAILED ORDER AUDIT TABLE REGISTRY (Route #1)
//         // ==========================================
//         if (resSpec.data?.data && resSpec.data.data.length > 0) {
//           const formattedBackendTableRows = resSpec.data.data.map((order) => ({
//             orderId: order._id,
//             customerName: `Customer (${order.customer?.slice(-4) || 'Guest'})`, // Handles raw relational customer hex strings
//             orderDate: `June 2026`, // Replace with actual created_at timestamps if added to model schema
//             orderStatus: order.orderStatus || 'Pending Processing',
//             totalAmount: Number(order.final_price || 0)
//           }));
//           setOrdersList(formattedBackendTableRows);
//         } else {
//           setOrdersList([]);
//         }

//       } catch (error) {
//         console.error("Critical failure map backend analytical models stream context:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardMetrics();
//   }, [chartTimeframe, year, month]);

//   // Table Sort Click Request Handler
//   const handleSortRequest = (property) => {
//     const isAscending = orderBy === property && orderDirection === 'asc';
//     setOrderDirection(isAscending ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   // Search filter configuration listener
//   const handleFilterChange = (e, field) => {
//     setFilters({ ...filters, [field]: e.target.value.toLowerCase() });
//   };

//   // Automated sorting and data column matching execution arrays
//   const processedOrders = ordersList
//     .filter(row => {
//       return Object.keys(filters).every(key => {
//         if (!filters[key]) return true;
//         return String(row[key]).toLowerCase().includes(filters[key]);
//       });
//     })
//     .sort((a, b) => {
//       let valA = a[orderBy];
//       let valB = b[orderBy];
//       if (typeof valA === 'string') {
//         return orderDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
//       }
//       return orderDirection === 'asc' ? valA - valB : valB - valA;
//     });

//   if (loading) {
//     return (
//       <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
//         <CircularProgress size={50} />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 4, bgcolor: '#f4f6f9', minHeight: '100vh' }}>
      
//       {/* Top Filter Navigation Header bar controls */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4, alignItems: 'center' }}>
//         <Typography variant="h4" fontWeight="800" color="#1a237e">LIVE DRY FOOD COMMERCE PANELS</Typography>
//         <Box sx={{ display: 'flex', gap: 2 }}>
//           <FormControl size="small" sx={{ minWidth: 100 }}><InputLabel>Year</InputLabel>
//             <Select value={year} label="Year" onChange={(e)=>setYear(e.target.value)}><MenuItem value="2026">2026</MenuItem></Select>
//           </FormControl>
//           <FormControl size="small" sx={{ minWidth: 100 }}><InputLabel>Month</InputLabel>
//             <Select value={month} label="Month" onChange={(e)=>setMonth(e.target.value)}><MenuItem value="6">June</MenuItem></Select>
//           </FormControl>
//         </Box>
//       </Box>

//       {/* KPI Counters Mapping Matrix Section Grid */}
//       <Grid container spacing={2} sx={{ mb: 4 }}>
//         {[
//           { title: 'Gross Revenue Tracking', value: `$${(kpis.totalRevenue || 0).toLocaleString()}`, color: '#2e7d32' },
//           { title: 'Registered Customer base', value: kpis.totalCustomers, color: '#1565c0' },
//           { title: 'Total Volume Orders Logged', value: kpis.totalOrders, color: '#37474f' },
//           { title: 'Products Sold Count', value: kpis.totalProductsSold, color: '#6a1b9a' },
//           { title: 'System Cancellations Balance', value: kpis.monthCancelledOrders, color: '#c62828' }
//         ].map((card, i) => (
//           <Grid item xs={12} sm={6} md={2.4} key={i}>
//             <Card sx={{ borderLeft: `5px solid ${card.color}`, boxShadow: 1 }}>
//               <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
//                 <Typography variant="caption" fontWeight="bold" color="textSecondary" textTransform="uppercase">{card.title}</Typography>
//                 <Typography variant="h5" fontWeight="bold" sx={{ mt: 0.5 }}>{card.value}</Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}

//         {/* Dynamic Margin Profit & Loss Card layout tracking */}
//         <Grid item xs={12}>
//           <Card sx={{ borderLeft: `6px solid ${kpis.isProfit ? '#2e7d32' : '#d32f2f'}` }}>
//             <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 2 }}>
//               <Box>
//                 <Typography variant="caption" fontWeight="bold" color="textSecondary" textTransform="uppercase">Dynamic Yield Ledger Balance</Typography>
//                 <Typography variant="h5" fontWeight="bold" color={kpis.isProfit ? '#2e7d32' : '#d32f2f'} sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
//                   {kpis.isProfit ? '+' : '-'}${Math.abs(kpis.netYield || 0).toLocaleString()}
//                   {kpis.isProfit ? <ArrowUpwardIcon color="success" /> : <ArrowDownwardIcon color="error" />}
//                 </Typography>
//               </Box>
//               <Typography variant="subtitle2" color="textSecondary">
//                 Accounting Status Status: <b style={{ color: kpis.isProfit ? '#2e7d32' : '#d32f2f' }}>{kpis.isProfit ? "PROFIT BALANCE" : "LOSS BALANCE"}</b>
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Graphical Layout Charts Component Frames */}
//       <Grid container spacing={3} sx={{ mb: 4 }}>
//         {/* Dynamic Data-driven Bar Chart with live timeframe adjustments mapping options */}
//         <Grid size ={{xm:12,md:12}}>
//           <Card sx={{ borderRadius: 2 }}>
//             <CardContent>
//               <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//                 <Typography variant="h6" fontWeight="bold">Traded Dry Fruit Metrics</Typography>
//                 <FormControl size="small" sx={{ minWidth: 140 }}>
//                   <InputLabel>Chart Range</InputLabel>
//                   <Select value={chartTimeframe} label="Chart Range" onChange={(e) => setChartTimeframe(e.target.value)}>
//                     <MenuItem value="day">Filter by Day</MenuItem>
//                     <MenuItem value="month">Filter by Month (Top Products)</MenuItem>
//                     <MenuItem value="year">Filter by Year</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Box>
//               <BarChart
//                 dataset={barChartData}
//                 xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
//                 series={[{ dataKey: 'units', label: 'Units Sold (Vol)', color: '#1a237e' }]}
//                 width={650}
//                 height={280}
//               />
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Operational Status Sharing Pie Diagram view */}
//         <Grid size ={{xm:12,md:5}}>
//           <Card sx={{ borderRadius: 2, height: '100%' }}>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Lifecycle Share</Typography>
//               <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <PieChart series={[{ data: orderSummary, innerRadius: 50, outerRadius: 90 }]} width={250} height={280} />
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       {/* Audit Registry Sorting Table View List */}
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//         <Typography variant="h6" fontWeight="bold">Audit Order Registry Logs</Typography>
//         <IconButton color="primary" onClick={() => setShowFilters(!showFilters)}>
//           <FilterListIcon />
//         </IconButton>
//       </Box>

//       <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
//         <Table>
//           <TableHead sx={{ bgcolor: '#eceff1' }}>
//             <TableRow>
//               {[
//                 { id: 'orderId', label: 'Order ID' },
//                 { id: 'customerName', label: 'Customer Name' },
//                 { id: 'orderDate', label: 'Order Date & Time' },
//                 { id: 'orderStatus', label: 'Order Status' },
//                 { id: 'totalAmount', label: 'Total Amount' }
//               ].map((col) => (
//                 <TableCell key={col.id} sortDirection={orderBy === col.id ? orderDirection : false}>
//                   <TableSortLabel
//                     active={orderBy === col.id}
//                     direction={orderBy === col.id ? orderDirection : 'asc'}
//                     onClick={() => handleSortRequest(col.id)}
//                     sx={{ fontWeight: 'bold' }}
//                   >
//                     {col.label}
//                   </TableSortLabel>
//                 </TableCell>
//               ))}
//               <TableCell align="center" sx={{ fontWeight: 'bold' }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {/* Collapse Search input Row block matrix fields */}
//             <TableRow component={Collapse} in={showFilters} timeout="auto" unmountOnExit sx={{ display: showFilters ? 'table-row' : 'none' }}>
//               {['orderId', 'customerName', 'orderDate', 'orderStatus', 'totalAmount'].map((field) => (
//                 <TableCell key={field} sx={{ py: 1 }}>
//                   <TextField
//                     placeholder={`Filter...`}
//                     size="small"
//                     variant="outlined"
//                     fullWidth
//                     onChange={(e) => handleFilterChange(e, field)}
//                     value={filters[field]}
//                   />
//                 </TableCell>
//               ))}
//               <TableCell />
//             </TableRow>

//             {/* Displaying Live Database Records mapped from resSpec.data.data */}
//             {processedOrders.map((row) => (
//               <TableRow key={row.orderId} hover>
//                 <TableCell sx={{ fontWeight: 'bold', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
//                   {row.orderId}
//                 </TableCell>
//                 <TableCell>{row.customerName}</TableCell>
//                 <TableCell>{row.orderDate}</TableCell>
//                 <TableCell>
//                   <span style={{ 
//                     padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold',
//                     backgroundColor: row.orderStatus === 'order delivered' ? '#e8f5e9' : row.orderStatus === 'order cancelled' ? '#ffebee' : '#fff3e0',
//                     color: row.orderStatus === 'order delivered' ? '#2e7d32' : row.orderStatus === 'order cancelled' ? '#c62828' : '#e65100'
//                   }}>
//                     {row.orderStatus.toUpperCase()}
//                   </span>
//                 </TableCell>
//                 <TableCell sx={{ fontWeight: 'bold' }}>${row.totalAmount.toLocaleString()}</TableCell>
//                 <TableCell align="center">
//                   <IconButton size="small" color="secondary"><VisibilityIcon fontSize="small" /></IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {processedOrders.length === 0 && (
//               <TableRow>
//                 <TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>
//                   No backend database records found matching this filter criteria.
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
import axios from 'axios';
import {
  Grid, Card, CardContent, Typography, Box, Select, MenuItem,
  FormControl, InputLabel, Paper, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, TableSortLabel, TextField,
  IconButton, CircularProgress, useTheme, Chip, Avatar,
  LinearProgress, InputAdornment
} from '@mui/material';
import { BarChart, PieChart } from '@mui/x-charts';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import KitchenIcon from '@mui/icons-material/Kitchen';
import api from '../../../api/axiosConfig';

//const api = axios;

export default function AdminDashboard() {
  const theme = useTheme();
  
  const [loading, setLoading] = useState(true);
  const [backendDataReceived, setBackendDataReceived] = useState(false);

  // Controls
  const [chartTimeframe, setChartTimeframe] = useState('month');
  const [year, setYear] = useState('2026');
  const [month, setMonth] = useState('6');

  // Main Data States
  const [kpis, setKpis] = useState({});
  const [orderSummary, setOrderSummary] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [ordersList, setOrdersList] = useState([]);

  // Table controls
  const [orderBy, setOrderBy] = useState('orderDate');
  const [orderDirection, setOrderDirection] = useState('desc');
  const [globalSearch, setGlobalSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // ==================== DEMO DATA ====================
  const demoData = useMemo(() => ({
    kpis: {
      totalRevenue: 15907.99,
      totalCustomers: 150,
      totalOrders: 340,
      totalProductsSold: 1275,
      monthCancelledOrders: 8,
      netYield: 10507.99,
      isProfit: true
    },
    orderSummary: [
      { id: 0, value: 45, label: 'PLACED', color: '#3b82f6' },
      { id: 1, value: 28, label: 'PREPARING', color: '#eab308' },
      { id: 2, value: 67, label: 'SHIPPED', color: '#8b5cf6' },
      { id: 3, value: 192, label: 'DELIVERED', color: '#10b981' },
      { id: 4, value: 8, label: 'CANCELLED', color: '#ef4444' }
    ],
    barChartData: [
      { id: 1, label: 'Premium Almonds', units: 25 },
      { id: 2, label: 'Salted Cashews', units: 18 },
      { id: 3, label: 'Organic Apricots', units: 12 },
      { id: 4, label: 'Dark Chocolate', units: 9 }
    ],
    ordersList: [
      { orderId: '6a351e06f1e0b44e3942cfa9', customerName: 'Anil Kumar', orderDate: '2026-06-19 10:46', orderStatus: 'order cancelled', totalAmount: 898.00 },
      { orderId: '6a3a2797e63d4dd0e7723461', customerName: 'Sunita Sharma', orderDate: '2026-06-23 06:28', orderStatus: 'order placed', totalAmount: 4509.99 },
      { orderId: '6a3a6c214308747bf0c522e1', customerName: 'Rahul Verma', orderDate: '2026-06-23 11:21', orderStatus: 'order delivered', totalAmount: 1500.00 },
      { orderId: '6a3b95b20fae6916f26e0670', customerName: 'Priya Nair', orderDate: '2026-06-24 08:30', orderStatus: 'order placed', totalAmount: 800.00 },
      { orderId: '6a3b9b4645b63add133a2797', customerName: 'Amit Patel', orderDate: '2026-06-24 08:54', orderStatus: 'preparing order', totalAmount: 1100.00 }
    ]
  }), []);

  // ==================== FETCH DATA ====================
  const fetchDashboardData = useCallback(async () => {
    setLoading(true);
    try {
      const [resSpec, resStat, resBest, resCust, resOrd, resQty, resCan] = await Promise.all([
        api.get(`/adminAnalytics/analyticSpecifc?year=${year}&month=${month}`).catch(() => ({ data: {} })),
        api.get(`/adminAnalytics/orderStatusSummary?year=${year}`).catch(() => ({ data: {} })),
        api.get(`/adminAnalytics/bestSoldProducts?year=${year}`).catch(() => ({ data: {} })),
        api.get(`/adminAnalytics/totalCustomers?year=${year}`).catch(() => ({ data: {} })),
        api.get(`/adminAnalytics/totalOrders?year=${year}`).catch(() => ({ data: {} })),
        api.get(`/adminAnalytics/totalProductsSold?year=${year}`).catch(() => ({ data: {} })),
        api.get(`/adminAnalytics/cancelledOrdersAnalytics?year=${year}&month=${month}`).catch(() => ({ data: {} }))
      ]);
      console.log("resSpec", resSpec.data)
      console.log("resStat", resStat.data)
      console.log("resBest", resBest.data)
      console.log("resCust", resCust.data)
      console.log("resOrd", resOrd.data)
      console.log("resQty", resQty.data)

      const totalRevenue = resSpec.data?.analytics?.totalRevenue || resSpec.data?.totalRevenue || 0;
      const hasRealData = totalRevenue > 100 || (resSpec.data?.data && resSpec.data.data.length > 0);

      if (hasRealData) {
        const netYield = totalRevenue - (totalRevenue * 0.62);
        setKpis({
          totalRevenue,
          totalCustomers: resCust.data?.totalCustomers || 0,
          totalOrders: resOrd.data?.totalOrders || 0,
          totalProductsSold: resQty.data?.totalProductsSold || 0,
          monthCancelledOrders: resCan.data?.totalCancelledOrders || 0,
          netYield,
          isProfit: netYield >= 0
        });

        if (resStat.data?.summary) {
          setOrderSummary(Object.keys(resStat.data.summary).map((key, idx) => ({
            id: idx, value: resStat.data.summary[key], label: key.toUpperCase(),
            color: ['#3b82f6', '#eab308', '#8b5cf6', '#10b981', '#ef4444'][idx % 5]
          })));
        }

        const bestProducts = resBest.data?.data || [];
        setBarChartData(bestProducts.slice(0, 6).map((item, idx) => ({
          id: idx, label: item.productName || `Product ${idx + 1}`, units: Number(item.totalQuantitySold || 0)
        })));

        const activeOrders = resSpec.data?.data || [];
        setOrdersList(activeOrders.map(order => ({
          orderId: order._id || order.orderId || 'N/A',
          customerName: order.customerName || 'Unknown',
          orderDate: order.createdAt ? new Date(order.createdAt).toLocaleString() : 'N/A',
          orderStatus: order.orderStatus || 'unknown',
          totalAmount: Number(order.final_price || order.totalAmount || 0)
        })));

        setBackendDataReceived(true);
      } else {
        setKpis(demoData.kpis);
        setOrderSummary(demoData.orderSummary);
        setBarChartData(demoData.barChartData);
        setOrdersList(demoData.ordersList);
        setBackendDataReceived(false);
      }
    } catch (error) {
      console.error("Using demo data");
      setKpis(demoData.kpis);
      setOrderSummary(demoData.orderSummary);
      setBarChartData(demoData.barChartData);
      setOrdersList(demoData.ordersList);
      setBackendDataReceived(false);
    } finally {
      setLoading(false);
    }
  }, [year, month, demoData]);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // ==================== TABLE LOGIC ====================
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...ordersList];

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
        row.orderStatus.toLowerCase().includes(statusFilter.toLowerCase())
      );
    }

    // Sorting
    return filtered.sort((a, b) => {
      let valA = a[orderBy], valB = b[orderBy];
      if (typeof valA === 'string') {
        return orderDirection === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
      }
      return orderDirection === 'asc' ? valA - valB : valB - valA;
    });
  }, [ordersList, globalSearch, statusFilter, orderBy, orderDirection]);

  const handleSortRequest = useCallback((property) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }, [orderBy, orderDirection]);

  const getStatusStyle = (status) => {
    if (status.includes('delivered')) return { bg: '#dcfce7', color: '#166534' };
    if (status.includes('cancelled')) return { bg: '#fee2e2', color: '#991b1b' };
    if (status.includes('placed')) return { bg: '#dbeafe', color: '#1e40af' };
    if (status.includes('preparing')) return { bg: '#fef3c7', color: '#854d0e' };
    return { bg: '#e0f2fe', color: '#0369a1' };
  };

  const statusCounts = useMemo(() => {
    const counts = { PLACED: 0, PREPARING: 0, SHIPPED: 0, DELIVERED: 0, CANCELLED: 0 };
    orderSummary.forEach(item => {
      if (item.label in counts) counts[item.label] = item.value;
    });
    return counts;
  }, [orderSummary]);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: '#f8fafc', minHeight: '100vh', background: 'linear-gradient(145deg, #f8fafc 0%, #f1f5f9 100%)' }}>
      
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 5, alignItems: 'flex-end', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h3" fontWeight="800" letterSpacing="-1.5px" color="#0f172a">
            PowerBites Hub
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {backendDataReceived ? "🟢 Live Backend Data" : "🔵 Demo Mode"} • June 2026
          </Typography>
        </Box>

        
      </Box>

      {/* KPI Cards - All Requested Metrics */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {[
          { title: 'Gross Revenue', value: `$${(kpis.totalRevenue || 0).toLocaleString()}`, icon: <TrendingUpIcon sx={{ fontSize: 34 }} />, color: '#10b981' },
          { title: 'Total Customers', value: kpis.totalCustomers, icon: <PeopleIcon sx={{ fontSize: 34 }} />, color: '#3b82f6' },
          { title: 'Total Orders', value: kpis.totalOrders, icon: <ShoppingCartIcon sx={{ fontSize: 34 }} />, color: '#64748b' },
          { title: 'Products Sold', value: kpis.totalProductsSold, icon: <InventoryIcon sx={{ fontSize: 34 }} />, color: '#8b5cf6' },
          { title: 'Cancelled Orders', value: kpis.monthCancelledOrders, icon: <CancelIcon sx={{ fontSize: 34 }} />, color: '#ef4444' },
          { title: 'Orders Placed', value: statusCounts.PLACED, icon: <ShoppingCartIcon sx={{ fontSize: 34 }} />, color: '#3b82f6' },
          { title: 'Preparing', value: statusCounts.PREPARING, icon: <KitchenIcon sx={{ fontSize: 34 }} />, color: '#eab308' },
          { title: 'Shipped', value: statusCounts.SHIPPED, icon: <LocalShippingIcon sx={{ fontSize: 34 }} />, color: '#8b5cf6' },
        ].map((card, i) => (
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Card sx={{ 
              borderRadius: '24px', 
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.06)',
              transition: 'all 0.3s',
              '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.15)' }
            }}>
              <CardContent sx={{ p: 3.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2.5 }}>
                  <Box sx={{ bgcolor: `${card.color}15`, color: card.color, p: 1.5, borderRadius: '16px' }}>
                    {card.icon}
                  </Box>
                </Box>
                <Typography variant="h3" fontWeight="700" color="#0f172a">{card.value}</Typography>
                <Typography variant="body2" color="textSecondary" fontWeight="600">{card.title}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Net Yield */}
      {/* <Card sx={{ borderRadius: '24px', mb: 5, background: kpis.isProfit ? 'linear-gradient(135deg, #f0fdf4, #ecfdf5)' : 'linear-gradient(135deg, #fef2f2, #fee2e2)' }}>
        <CardContent sx={{ p: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="overline" fontWeight="700">NET YIELD THIS MONTH</Typography>
            <Typography variant="h2" fontWeight="800" color={kpis.isProfit ? '#15803d' : '#dc2626'} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {kpis.isProfit ? '+' : ''}${Math.abs(kpis.netYield || 0).toLocaleString()}
              {kpis.isProfit ? <ArrowUpwardIcon sx={{ fontSize: 40 }} /> : <ArrowDownwardIcon sx={{ fontSize: 40 }} />}
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Chip label={kpis.isProfit ? "PROFITABLE" : "NEEDS ATTENTION"} color={kpis.isProfit ? "success" : "error"} sx={{ fontWeight: 700, mb: 1 }} />
            <LinearProgress variant="determinate" value={kpis.isProfit ? 82 : 35} sx={{ height: 12, borderRadius: 6 }} />
          </Box>
        </CardContent>
      </Card> */}

      {/* Charts */}
      <Grid container spacing={3} sx={{ mb: 2 }}>
        <Grid item xs={12} md={7}>
          <Card sx={{ borderRadius: '24px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.06)' }}>
            <CardContent sx={{ p: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 ,g:2}}>
                <Box>
                  <Typography variant="h5" fontWeight="700">Sales Performance</Typography>
                  <Typography variant="body2" color="textSecondary">Top Products • {chartTimeframe.toUpperCase()}</Typography>
                </Box>
                <FormControl size="small" sx={{ minWidth: 180 }}>
                 
                  <Select value={chartTimeframe} onChange={(e) => setChartTimeframe(e.target.value)} sx={{ borderRadius: '12px' }}>
                    <MenuItem value="day">Last 30 Days</MenuItem>
                    <MenuItem value="month">This Month</MenuItem>
                    <MenuItem value="year">This Year</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              {loading ? <Box sx={{ py: 10, textAlign: 'center' }}><CircularProgress /></Box> : (
                <BarChart dataset={barChartData} xAxis={[{ scaleType: 'band', dataKey: 'label' }]} series={[{ dataKey: 'units', label: 'Units Sold', color: '#2563eb' }]} width={450} height={340} />
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ borderRadius: '24px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.06)', height: '100%' ,bgcolor:'skyblue'}}>
            <CardContent sx={{ p: 4, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography variant="h5" fontWeight="700" sx={{ mb: 3 }}>Order Status Distribution</Typography>
              {loading ? (
                <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CircularProgress /></Box>
              ) : (
                <>
                  <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                    <PieChart 
                      series={[{
                        data: orderSummary,
                        innerRadius: 75,
                        outerRadius: 115,
                        paddingAngle: 3,
                        cornerRadius: 6,
                        highlightScope: { faded: 'global', highlighted: 'item' }
                      }]} 
                      
                      height={250} 
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2, justifyContent: 'center' }}>
                    {orderSummary.map((item, i) => (
                      <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Box sx={{ width: 14, height: 14, borderRadius: '50%', bgcolor: item.color }} />
                        <Typography variant="body2" fontWeight="500">{item.label} ({item.value})</Typography>
                      </Box>
                    ))}
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Orders Table with Global Search + Status Filter */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5" fontWeight="700" color="#0f172a">Recent Orders</Typography>
        
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {/* Global Search */}
          <TextField
            placeholder="Search orders..."
            size="small"
            value={globalSearch}
            onChange={(e) => setGlobalSearch(e.target.value)}
            InputProps={{
              startAdornment: <InputAdornment position="start">🔍</InputAdornment>,
            }}
            sx={{ width: 280 }}
          />

          {/* Status Filter */}
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Status</InputLabel>
            <Select 
              value={statusFilter} 
              label="Status" 
              onChange={(e) => setStatusFilter(e.target.value)}
              sx={{ borderRadius: '12px' }}
            >
              <MenuItem value="All">All Status</MenuItem>
              <MenuItem value="placed">Placed</MenuItem>
              <MenuItem value="preparing">Preparing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: '24px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.06)' }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f8fafc' }}>
            <TableRow>
              {[
                { id: 'orderId', label: 'Order ID' },
                { id: 'customerName', label: 'Customer' },
                { id: 'orderDate', label: 'Date & Time' },
                { id: 'orderStatus', label: 'Status' },
                { id: 'totalAmount', label: 'Amount' }
              ].map((col) => (
                <TableCell key={col.id} sx={{ fontWeight: 700, color: '#475569', py: 3 }}>
                  <TableSortLabel
                    active={orderBy === col.id}
                    direction={orderBy === col.id ? orderDirection : 'asc'}
                    onClick={() => handleSortRequest(col.id)}
                  >
                    {col.label}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell align="center" sx={{ fontWeight: 700, color: '#475569', py: 3 }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filteredAndSortedOrders.map((row) => {
              const style = getStatusStyle(row.orderStatus);
              return (
                <TableRow key={row.orderId} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600, fontSize: '0.95rem' }}>
                    {row.orderId}
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ bgcolor: '#e0f2fe', width: 38, height: 38 }}>
                        {row.customerName.split(' ').map(n => n[0]).join('')}
                      </Avatar>
                      {row.customerName}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#64748b' }}>{row.orderDate}</TableCell>
                  <TableCell>
                    <Chip label={row.orderStatus.toUpperCase()} sx={{ bgcolor: style.bg, color: style.color, fontWeight: 700 }} />
                  </TableCell>
                  <TableCell sx={{ fontWeight: 700, fontSize: '1.05rem' }}>
                    ${row.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell align="center">
                    <IconButton color="primary"><VisibilityIcon /></IconButton>
                  </TableCell>
                </TableRow>
              );
            })}

            {filteredAndSortedOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 12 }}>
                  <Typography color="textSecondary" variant="h6">No matching orders found</Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
