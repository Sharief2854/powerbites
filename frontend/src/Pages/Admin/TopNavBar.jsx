// 'use client';

// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Box,
//   Avatar,
//   Menu,
//   MenuItem,
//   Tooltip,
//   useTheme,
// } from '@mui/material';
// import MenuIcon from '@mui/icons-material/Menu';
// import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
// import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
// import PeopleIcon from '@mui/icons-material/People';
// import BarChartIcon from '@mui/icons-material/BarChart';

// export default function TopNavbar({
//   onMenuClick,
//   title = 'Dashboard Overview',
//   userName = 'Admin Name',
//   userAvatar,
//   onLogout,
// }) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const open = Boolean(anchorEl);
//   const theme = useTheme();

//   const handleProfileClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleLogoutClick = () => {
//     handleClose();
//     onLogout?.();
//   };

//   return (
//     <AppBar
//       position="fixed"
//       elevation={0}
//       sx={{
//         bgcolor: '#ffffff',
//         color: '#1E1154',
//         borderBottom: '1px solid #E5E7EB',
//         boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
//         backdropFilter: 'blur(12px)',
//       }}
//     >
//       <Toolbar sx={{ minHeight: 76, px: { xs: 2, sm: 4 } }}>
//         {/* Mobile Menu Button */}
//         <IconButton
//           color="inherit"
//           edge="start"
//           onClick={onMenuClick}
//           sx={{ mr: 2, display: { md: 'none' } }}
//         >
//           <MenuIcon />
//         </IconButton>

//         {/* Title */}
//         <Typography
//           variant="h6"
//           fontWeight={700}
//           sx={{
//             flexGrow: 1,
//             color: '#1E1154',
//             letterSpacing: '-0.5px',
//           }}
//         >
//           {title}
//         </Typography>

//         {/* Quick Navigation Icons - Desktop Only */}
//         <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, mr: 4 }}>
//           {[
//             { icon: <DashboardIcon />, tooltip: 'Dashboard' },
//             { icon: <ShoppingBagIcon />, tooltip: 'Products' },
//             { icon: <ReceiptLongIcon />, tooltip: 'Orders' },
//             { icon: <PeopleIcon />, tooltip: 'Customers' },
//             { icon: <BarChartIcon />, tooltip: 'Analytics' },
//           ].map((item, index) => (
//             <Tooltip title={item.tooltip} key={index}>
//               <IconButton
//                 color="inherit"
//                 sx={{
//                   '&:hover': {
//                     bgcolor: 'rgba(107, 45, 212, 0.08)',
//                     color: '#6B2DD4',
//                   },
//                 }}
//               >
//                 {item.icon}
//               </IconButton>
//             </Tooltip>
//           ))}
//         </Box>

//         {/* User Profile Section */}
//         <Box>
//           <Tooltip title="Account settings">
//             <IconButton
//               onClick={handleProfileClick}
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1.5,
//                 borderRadius: 3,
//                 p: 1,
//                 '&:hover': {
//                   bgcolor: '#F8FAFC',
//                 },
//               }}
//             >
//               <Avatar
//                 src={userAvatar}
//                 sx={{
//                   width: 40,
//                   height: 40,
//                   bgcolor: '#6B2DD4',
//                   fontSize: '1.1rem',
//                   fontWeight: 700,
//                   boxShadow: '0 2px 8px rgba(107, 45, 212, 0.2)',
//                 }}
//               >
//                 {userName?.slice(0, 2).toUpperCase()}
//               </Avatar>

//               <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
//                 <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
//                   {userName}
//                 </Typography>
//                 <Typography variant="caption" color="text.secondary">
//                   Administrator
//                 </Typography>
//               </Box>
//             </IconButton>
//           </Tooltip>

//           {/* Profile Menu */}
//           <Menu
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             transformOrigin={{ horizontal: 'right', vertical: 'top' }}
//             anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
//             PaperProps={{
//               sx: {
//                 mt: 1,
//                 borderRadius: 3,
//                 boxShadow: '0 10px 30px rgba(0,0,0,0.12)',
//                 minWidth: 180,
//               },
//             }}
//           >
//             <MenuItem onClick={handleClose}>My Profile</MenuItem>
//             <MenuItem onClick={handleClose}>Settings</MenuItem>
//             <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
//           </Menu>
//         </Box>
//       </Toolbar>
//     </AppBar>
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function TopNavbar({
  onMenuClick,
  onSidebarToggle,
  sidebarOpen,
  title = 'Dashboard Overview',
  userName = 'Admin Name',
  userAvatar,
  onLogout,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleClose();
    onLogout?.();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: '#ffffff',
        color: '#1E1154',
        borderBottom: '1px solid #E5E7EB',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
        backdropFilter: 'blur(12px)',
        transition: 'width 0.3s ease, ml 0.3s ease',
        width: sidebarOpen ? 'calc(100% - 260px)' : 'calc(100% - 80px)',
        ml: sidebarOpen ? '260px' : '80px',
      }}
    >
      <Toolbar sx={{ minHeight: 76, px: { xs: 2, sm: 4 } }}>
        {/* Mobile Menu Button */}
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 1 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Sidebar Toggle Button - ALL SCREENS */}
        <IconButton
          color="inherit"
          onClick={onSidebarToggle}
          sx={{ mr: 2 }}
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
          {title}
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
                src={userAvatar}
                sx={{
                  width: 40,
                  height: 40,
                  bgcolor: '#6B2DD4',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  boxShadow: '0 2px 8px rgba(107, 45, 212, 0.2)',
                }}
              >
                {userName?.slice(0, 2).toUpperCase()}
              </Avatar>

              <Box sx={{ textAlign: 'left', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
                  {userName}
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
            <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}