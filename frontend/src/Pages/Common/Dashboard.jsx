import React, { useState } from 'react';
import { 
  Box, Drawer, AppBar, Toolbar, List, ListItem, 
  ListItemButton, ListItemIcon, ListItemText, Typography, 
  IconButton, Grid, Paper 
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';

const drawerWidth = 260;

export default function DashboardLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Sidebar Menu Links configuration
  const menuItems = [
    { text: 'Overview', icon: <DashboardIcon /> },
    { text: 'Products', icon: <ShoppingBagIcon /> },
    { text: 'Orders', icon: <ReceiptLongIcon /> },
    { text: 'Customers', icon: <PeopleIcon /> },
    { text: 'Analytics', icon: <BarChartIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ height: '100%', bgcolor: '#1E1154', color: 'white' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#4A26E1', bgcolor: 'white', px: 2, py: 0.5, borderRadius: '8px' }}>
          AdminPanel
        </Typography>
      </Toolbar>
      <List sx={{ mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              sx={{ 
                mx: 1.5, 
                borderRadius: '8px',
                mb: 0.5,
                '&:hover': { bgcolor: 'rgba(255, 255, 255, 0.08)' } 
              }}
            >
              <ListItemIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} sx={{ '& .MuiTypography-root': { fontWeight: 500 } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#F4F5F7' }}>
      {/* Top Navbar */}
      <AppBar 
        position="fixed" 
        elevation={0}
        sx={{ 
          width: { md: `calc(100% - ${drawerWidth}px)` }, 
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'white',
          color: '#1E1154',
          borderBottom: '1px solid #E0E0E0'
        }}
      >
        <Toolbar>
          <IconButton 
            color="inherit" 
            edge="start" 
            onClick={handleDrawerToggle} 
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 600 }}>
            Dashboard Overview
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Navigation Sidebar Drawer */}
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        {/* Mobile View Responsive Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawerContent}
        </Drawer>
        {/* Desktop View Permanent Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, borderRight: 'none' },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content View Workspace */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3, 
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: '64px' // Offsets top navbar height
        }}
      >
        {/* Analytics Grid Mockup */}
        <Grid container spacing={3}>
          {['Total Sales', 'Active Orders', 'Total Products', 'Total Revenue'].map((title, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 3, 
                  borderRadius: '16px', 
                  border: '1px solid #E0E0E0',
                  boxShadow: '0px 4px 12px rgba(0,0,0,0.02)' 
                }}
              >
                <Typography variant="body2" color="textSecondary" gutterBottom sx={{ fontWeight: 500 }}>
                  {title}
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1E1154' }}>
                  {index === 3 ? '$24,500' : Math.floor(Math.random() * 500) + 50}
                </Typography>
              </Paper>
            </Grid>
          ))}

          {/* Place for Data Tables or Graphs */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 4, minHeight: '300px', borderRadius: '16px', border: '1px solid #E0E0E0' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>Recent Orders</Typography>
              <Typography variant="body2" color="textSecondary">
                Your data table or custom component views will go here later.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}