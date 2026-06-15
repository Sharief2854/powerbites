import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";

const pages = [
  { name: "Login", path: "/login", icon: <LoginIcon fontSize="small" /> },
  {
    name: "Registration",
    path: "/register",
    icon: <PersonAddAlt1Icon fontSize="small" />,
  },
];

const settings = [
  { name: "Profile", path: "/login", icon: <PersonIcon fontSize="small" /> },
  { name: "Account", path: "/register", icon: <AccountCircleIcon fontSize="small" /> },
  { name: "Contact US", path: "/about", icon: <InfoOutlinedIcon fontSize="small" /> },
  { name: "Home", path: "/", icon: <HomeIcon fontSize="small" /> },
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogoRefresh = () => {
    window.location.href = "/";
  };

  return (
    <AppBar
      position="static"
      sx={{
        background: "linear-gradient(90deg, #1350d4 0%, #0b1269 100%)",
        borderRadius: { xs: 0, sm: 3 },
        mt: { xs: 0, sm: 1 },
      }}
    >
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            minHeight: { xs: 62, sm: 70 },
            px: { xs: 1, sm: 2 },
          }}
        >
          <RestaurantMenuIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              color: "#fff8ef",
              fontSize: 30,
            }}
          />

          <Typography
            onClick={handleLogoRefresh}
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 4,
              display: { xs: "none", md: "flex" },
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              letterSpacing: ".08rem",
              color: "#fff8ef",
              cursor: "pointer",
              fontSize: { md: "1.1rem", lg: "1.2rem" },
            }}
          >
            POWER BITES
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="open navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{ color: "#fff8ef" }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                "& .MuiPaper-root": {
                  borderRadius: 3,
                  mt: 1,
                  minWidth: 210,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    textDecoration: "none",
                    color: "#333",
                    py: 1.2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: "#7b3f00" }}>
                    {page.icon}
                  </ListItemIcon>

                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        sx={{
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          color: "#333",
                        }}
                      >
                        {page.name}
                      </Typography>
                    }
                  />
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <RestaurantMenuIcon
            sx={{
              display: { xs: "flex", md: "none" },
              mr: 1,
              color: "#fff8ef",
              fontSize: 25,
            }}
          />

          <Typography
            onClick={handleLogoRefresh}
            variant="h5"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              letterSpacing: ".12rem",
              color: "#fff8ef",
              cursor: "pointer",
              fontSize: { xs: "0.95rem", sm: "1.1rem" },
            }}
          >
            POWER BITES
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "right",
              gap: 1,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                component={Link}
                to={page.path}
                onClick={handleCloseNavMenu}
                startIcon={page.icon}
                sx={{
                  my: 2,
                  color: "#fff8ef",
                  display: "flex",
                  alignItems: "center",
                  textTransform: "none",
                  fontSize: "0.96rem",
                  fontWeight: 600,
                  px: 2,
                  borderRadius: 2,
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{
                  p: 0,
                  border: "2px solid rgba(255,255,255,0.45)",
                  borderRadius: "50%",
                }}
              >
                <Avatar
                  alt="User"
                  src="/static/images/avatar/2.jpg"
                  sx={{
                    width: { xs: 34, sm: 38 },
                    height: { xs: 34, sm: 38 },
                  }}
                />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{
                mt: "45px",
                "& .MuiPaper-root": {
                  borderRadius: 3,
                  minWidth: 220,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.14)",
                },
              }}
              id="menu-appbar-user"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  component={Link}
                  to={setting.path}
                  onClick={handleCloseUserMenu}
                  sx={{
                    textDecoration: "none",
                    color: "#333",
                    py: 1.2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: "#7b3f00" }}>
                    {setting.icon}
                  </ListItemIcon>

                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        sx={{
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          color: "#333",
                        }}
                      >
                        {setting.name}
                      </Typography>
                    }
                  />
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;