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
import { data, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@mui/material";

const pages = [
  { name: "Products", path: "/products", icon: <RestaurantMenuIcon fontSize="small" /> },
  { name: "Orders", path: "/orders", icon: <InfoOutlinedIcon fontSize="small" /> },
  { name: "Cart", path: "/cart", icon: <HomeIcon fontSize="small" /> },

];



function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const dispatach = useDispatch()

  // const quantity = useSelector((state) => state.cart.cartValue)

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

  const getCart = async () => {
    try {
      const res = await api.get("/cart/getCart")
      dispatach(addValue(res.data.cart.quantity))
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "primary.main",
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
              color: "primary.contrastText",
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
              color: "primary.contrastText",
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
              sx={{ color: "primary.contrastText" }}
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
                  bgcolor: "background.paper",
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
                    color: "text.primary",
                    py: 1.2,
                    display: "flex",
                    alignItems: "center",
                  }}
                >

                  {/* <Badge
                    badgeContent={unreadNotificationsCount}
                    color="secondary"
                    max={maxVisibleNotifications}
                  > */}
                    <ListItemIcon sx={{ minWidth: 36, color: "primary.main" }}>
                      {page.icon}
                    </ListItemIcon>

                  {/* </Badge> */}

                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        sx={{
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          color: "text.primary",
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
              color: "primary.contrastText",
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
              color: "primary.contrastText",
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
                  color: "primary.contrastText",
                  display: "flex",
                  alignItems: "center",
                  textTransform: "none",
                  fontSize: "0.96rem",
                  fontWeight: 600,
                  px: 2,
                  borderRadius: 2,
                  textDecoration: "none",
                  "&:hover": {
                    backgroundColor: "secondary.main",
                    color: "secondary.contrastText",
                  },
                }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;