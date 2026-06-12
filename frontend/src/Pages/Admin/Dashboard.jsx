// import React, { useState } from 'react';
// import { 
//   Box, Drawer, AppBar, Toolbar, List, ListItem, 
//   ListItemButton, ListItemIcon, ListItemText, Typography, 
//   IconButton, Grid, Paper, Menu, MenuItem, Avatar
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';

// const drawerWidth = 260;

// export default function DashboardLayout() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const isMenuOpen = Boolean(anchorEl);

//   const handleDrawerToggle = () => {
//     setMobileOpen(!mobileOpen);
//   };

//   const handleProfileMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogout = () => {
//     handleMenuClose();
//     // Add your actual logout logic here (e.g., clearing local storage, navigating to login)
//     console.log("Logged out");
//   };

//   // Sidebar Menu Links configuration
//   const menuItems = [
//     { text: 'Overview', icon: <DashboardIcon /> },
//     { text: 'Products', icon: <ShoppingBagIcon /> },
//     { text: 'Orders', icon: <ReceiptLongIcon /> },
//     { text: 'Customers', icon: <PeopleIcon /> },
//     { text: 'Analytics', icon: <BarChartIcon /> },
//   ];

  

//   const drawerContent = (
//     <Box sx={{ height: '100%', bgcolor: '#1E1154', color: 'white' }}>
//       <Toolbar>
//         <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A26E1', bgcolor: 'white', px: 2, py: 0.5, borderRadius: '8px' }}>
//           AdminPanel
//         </Typography>
//       </Toolbar>
//       <List sx={{ mt: 2 }}>
//         {menuItems.map((item) => (
//           <ListItem key={item.text} disablePadding>
//             <ListItemButton 
//               sx={{ 
//                 mx: 1.5, 
//                 borderRadius: '8px',
//                 mb: 0.5,
//                 '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' } 
//               }}
//               onClick={() => console.log(`${item.text} clicked`)} // Replace with actual navigation logic
//             >
//               <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{item.icon}</ListItemIcon>
//               <ListItemText primary={item.text} sx={{ '& .MuiTypography-root': { fontWeight: 500 } }} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F4F5F7' }}>
//       {/* Top Navbar */}
//       <AppBar 
//         position="fixed" 
//         elevation={0}
//         sx={{ 
//           width: { md: `calc(100% - ${drawerWidth}px)` }, 
//           ml: { md: `${drawerWidth}px` },
//           bgcolor: 'white',
//           color: '#1E1154',
//           borderBottom: '1px solid #E0E0E0'
//         }}
//       >
//         <Toolbar>
//           <IconButton 
//             color="inherit" 
//             edge="start" 
//             onClick={handleDrawerToggle} 
//             sx={{ mr: 2, display: { md: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
//             Dashboard Overview
//           </Typography>
//           <Box sx={{ flexGrow: 1 }} />
//           <IconButton color="inherit">
//             <DashboardIcon />
//           </IconButton>         
//           <IconButton color="inherit">
//             <BarChartIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <ShoppingBagIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <ReceiptLongIcon />
//           </IconButton>
//           <IconButton color="inherit">
//             <PeopleIcon />
//           </IconButton>
//            <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton 
//               color="inherit" 
//               onClick={handleProfileMenuOpen}
//               sx={{ display: 'flex', alignItems: 'center', gap: 1, borderRadius: 2 }}
//             >
//               <Avatar sx={{ width: 32, height: 32, bgcolor: '#4A26E1', fontSize: '0.9rem' }}>AD</Avatar>
//               <Typography variant="body2" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
//                 Admin Name
//               </Typography>
//             </IconButton>
//             <Menu
//               anchorEl={anchorEl}
//               open={isMenuOpen}
//               onClose={handleMenuClose}
//               transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//               anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//             >
//               <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
//               <MenuItem onClick={handleLogout}>Logout</MenuItem>
//             </Menu>
//           </Box>
          


//         </Toolbar>
//       </AppBar>

//       {/* Navigation Sidebar Drawer */}
//       <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
//         {/* Mobile View Responsive Drawer */}
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: 'block', md: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawerContent}
//         </Drawer>
//         {/* Desktop View Permanent Drawer */}
//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', md: 'block' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
//           }}
//           open
//         >
//           {drawerContent}
//         </Drawer>
//       </Box>

//       {/* Main Content View Workspace */}
//       <Box 
//         component="main" 
//         sx={{ 
//           flexGrow: 1, 
//           p: 3, 
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           mt: '64px' // Offsets top navbar height
//         }}
//       >
//         {/* Analytics Grid Mockup */}
//         <Grid container spacing={3}>
//           {['Total Sales', 'Active Orders', 'Total Products', 'Total Revenue'].map((title, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Paper 
//                 elevation={0} 
//                 sx={{ 
//                   p: 3, 
//                   borderRadius: '16px', 
//                   border: '1px solid #E0E0E0',
//                   boxShadow: '0px 4px 12px rgba(0,0,0,0.02)' 
//                 }}
//               >
//                 <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontWeight: 500 }}>
//                   {title}
//                 </Typography>
//                 <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1E1154' }}>
//                   {index === 3 ? '$24,500' : Math.floor(Math.random() * 500) + 50}
//                 </Typography>
//               </Paper>
//             </Grid>
//           ))}

//           {/* Place for Data Tables or Graphs */}
//           <Grid item xs={12}>
//             <Paper elevation={0} sx={{ p: 4, minHeight: '300px', borderRadius: '16px', border: '1px solid #E0E0E0' }}>
//               <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Recent Orders</Typography>
//               <Typography variant="body2" color="textSecondary">
//                 Your data table or custom component views will go here later.
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }

// 'use client';

// import React, { useState } from 'react';
// import { Box, Drawer, Toolbar, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Grid, Paper } from '@mui/material';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';
// import TopNavbar from './TopNavbar'; // Import the new component

// const drawerWidth = 260;

// export default function DashboardLayout() {
//   const [mobileOpen, setMobileOpen] = useState(false);

//   const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

//   const handleLogout = () => {
//     console.log("Logged out");
//     // Add real logout logic
//   };

//   const menuItems = [
//     { text: 'Overview', icon: <DashboardIcon /> },
//     { text: 'Products', icon: <ShoppingBagIcon /> },
//     { text: 'Orders', icon: <ReceiptLongIcon /> },
//     { text: 'Customers', icon: <PeopleIcon /> },
//     { text: 'Analytics', icon: <BarChartIcon /> },
//   ];

//   const drawerContent = (
//     <Box sx={{ height: '100%', bgcolor: '#1E1154', color: 'white' }}>
//       <Toolbar sx={{ px: 3 }}>
//         <Typography
//           variant="h5"
//           fontWeight="bold"
//           sx={{
//             color: '#fff',
//             letterSpacing: '-0.5px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: 1,
//           }}
//         >
//           🍔 <span style={{ color: '#A78BFA' }}>PowerBites</span>
//         </Typography>
//       </Toolbar>

//       <List sx={{ mt: 2, px: 2 }}>
//         {menuItems.map((item) => (
//           <ListItem key={item.text} disablePadding>
//             <ListItemButton
//               sx={{
//                 borderRadius: '12px',
//                 mb: 0.8,
//                 '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
//                 '&.Mui-selected': { bgcolor: 'rgba(167, 139, 250, 0.15)' },
//               }}
//               onClick={() => console.log(`${item.text} clicked`)}
//             >
//               <ListItemIcon sx={{ color: '#C4B5FD' }}>{item.icon}</ListItemIcon>
//               <ListItemText
//                 primary={item.text}
//                 sx={{ '& .MuiTypography-root': { fontWeight: 500 } }}
//               />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
//       {/* Top Navbar - Reusable */}
//       <TopNavbar
//         onMenuClick={handleDrawerToggle}
//         title="Dashboard Overview"
//         userName="Admin Name"
//         onLogout={handleLogout}
//       />

//       {/* Sidebar */}
//       <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
//         <Drawer
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{ keepMounted: true }}
//           sx={{
//             display: { xs: 'block', md: 'none' },
//             '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
//           }}
//         >
//           {drawerContent}
//         </Drawer>

//         <Drawer
//           variant="permanent"
//           sx={{
//             display: { xs: 'none', md: 'block' },
//             '& .MuiDrawer-paper': {
//               width: drawerWidth,
//               boxSizing: 'border-box',
//               borderRight: 'none',
//               boxShadow: '2px 0 8px rgba(0,0,0,0.06)',
//             },
//           }}
//           open
//         >
//           {drawerContent}
//         </Drawer>
//       </Box>

//       {/* Main Content */}
//       <Box
//         component="main"
//         sx={{
//           flexGrow: 1,
//           p: { xs: 2, sm: 3, md: 4 },
//           width: { md: `calc(100% - ${drawerWidth}px)` },
//           mt: '72px',
//         }}
//       >
//         <Grid container spacing={3}>
//           {/* KPI Cards */}
//           {['Total Sales', 'Active Orders', 'Total Products', 'Total Revenue'].map((title, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Paper
//                 elevation={0}
//                 sx={{
//                   p: 3.5,
//                   borderRadius: '20px',
//                   border: '1px solid #E5E7EB',
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
//                 <Typography variant="h3" fontWeight="700" color="#1E1154">
//                   {index === 3 ? '$24,500' : Math.floor(Math.random() * 800) + 120}
//                 </Typography>
//                 <Typography variant="caption" color="#22C55E" sx={{ fontWeight: 600 }}>
//                   +12.5% from last month
//                 </Typography>
//               </Paper>
//             </Grid>
//           ))}

//           {/* Recent Orders / Content Area */}
//           <Grid item xs={12}>
//             <Paper
//               elevation={0}
//               sx={{
//                 p: 4,
//                 borderRadius: '20px',
//                 border: '1px solid #E5E7EB',
//                 minHeight: '420px',
//               }}
//             >
//               <Typography variant="h6" fontWeight={700} mb={3}>
//                 Recent Orders
//               </Typography>
//               <Typography color="text.secondary">
//                 Your data tables, charts, or custom components will go here.
//               </Typography>
//             </Paper>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// }

'use client';

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Grid,
  Paper,
  Drawer
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Sidebar from './SideNavBar';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    console.log("Logged out");
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F8FAFC' }}>
      {/* Sidebar - Handles both Mobile and Desktop Drawers */}
      <Sidebar 
        sidebarOpen={sidebarOpen} 
        mobileOpen={mobileOpen} 
        onMobileClose={handleDrawerToggle} 
        onLogout={handleLogout} 
      />

      {/* Top Navbar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: '#ffffff',
          color: '#1E1154',
          borderBottom: '1px solid #E5E7EB',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
          backdropFilter: 'blur(12px)',
          transition: 'width 0.3s ease, margin-left 0.3s ease',
          width: { xs: '100%', md: sidebarOpen ? 'calc(100% - 260px)' : 'calc(100% - 80px)' },
          ml: { xs: 0, md: sidebarOpen ? '260px' : '80px' },
        }}
      >
        <Toolbar sx={{ minHeight: 76, px: { xs: 2, sm: 4 } }}>
          {/* Mobile Menu Button - Mobile Only (xs only) */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Sidebar Toggle Button - Tablet & Desktop Only (md+) */}
          <IconButton
            color="inherit"
            onClick={handleSidebarToggle}
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            {sidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>

          {/* Title */}
          <Typography
            variant="h6"
            fontWeight={700}
            sx={{
              flexGrow: 1,
              color: '#1E1154',
              letterSpacing: '-0.5px',
            }}
          >
            Dashboard Overview
          </Typography>

          {/* Quick Navigation Icons - Desktop Only */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, mr: 2 }}>
            {[
              { icon: <DashboardIcon />, tooltip: 'Dashboard' },
              { icon: <ShoppingBagIcon />, tooltip: 'Products' },
              { icon: <ReceiptLongIcon />, tooltip: 'Orders' },
              { icon: <PeopleIcon />, tooltip: 'Customers' },
              { icon: <BarChartIcon />, tooltip: 'Analytics' },
            ].map((item, index) => (
              <Tooltip title={item.tooltip} key={index}>
                <IconButton
                  color="inherit"
                  sx={{
                    '&:hover': {
                      bgcolor: 'rgba(107, 45, 212, 0.08)',
                      color: '#6B2DD4',
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>

          {/* User Profile Section */}
          <Box>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleProfileClick}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  borderRadius: 3,
                  p: 1,
                  '&:hover': {
                    bgcolor: '#F8FAFC',
                  },
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#6B2DD4',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(107, 45, 212, 0.2)',
                  }}
                >
                  AD
                </Avatar>

                <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
                  <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
                    Admin Name
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Administrator
                  </Typography>
                </Box>
              </IconButton>
            </Tooltip>

            {/* Profile Menu */}
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 3,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
                  minWidth: 180,
                },
              }}
            >
              <MenuItem onClick={handleClose}>My Profile</MenuItem>
              <MenuItem onClick={handleClose}>Settings</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2, sm: 3, md: 4 },
          width: { xs: '100%', md: sidebarOpen ? 'calc(100% - 260px)' : 'calc(100% - 80px)' },
          mt: '76px', // Align with AppBar minHeight
          transition: 'width 0.3s ease',
        }}
      >
        <Grid container spacing={3}>
          {/* KPI Cards */}
          {['Total Sales', 'Active Orders', 'Total Products', 'Total Revenue'].map((title, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3.5,
                  borderRadius: '20px',
                  border: '1px solid #E5E7EB',
                  bgcolor: '#ffffff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 25px rgba(0,0,0,0.08)',
                  },
                }}
              >
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="h3" fontWeight="700" color="#1E1154">
                  {index === 3 ? '$24,500' : Math.floor(Math.random() * 800) + 120}
                </Typography>
                <Typography variant="caption" color="#22C55E" sx={{ fontWeight: 600 }}>
                  +12.5% from last month
                </Typography>
              </Paper>
            </Grid>
          ))}

          {/* Recent Orders Section */}
          <Grid item xs={12}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: '20px',
                border: '1px solid #E5E7EB',
                bgcolor: '#ffffff',
                minHeight: '420px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
              }}
            >
              <Typography variant="h6" fontWeight={700} mb={3} color="#1E1154">
                Recent Orders
              </Typography>
              <Typography color="text.secondary">
                Your data tables, charts, or custom components will go here.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}