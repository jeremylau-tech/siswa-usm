import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery, useTheme } from "@mui/material";
import "./NavBar.css"; // Import your CSS file

function Navbar() {
  const email = Cookies.get('email');
  const password = Cookies.get('password');
  const navigate = useNavigate();
  const theme = useTheme();
  const isResponsive = useMediaQuery(theme.breakpoints.down("md"));
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    Cookies.remove('email');
    Cookies.remove('password');
    navigate('/Login');
  };

  const renderItemLinks = () => {
    if (!isResponsive) {
      return (
        <div>
          <Link to="/Penginapan">
            <Button>Penginapan</Button>
          </Link>
          <Link to="/Kaunseling">
            <Button>Kaunseling</Button>
          </Link>
        </div>
      );
    }
  };

  const renderLoginLogoutLink = () => {
    if (email && password) {
      return (
        <Button
          style={{
            color: "#0d6efd",
            textDecoration: "underline",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.color = "#1752c5")}
          onMouseLeave={(e) => (e.target.style.color = "#0d6efd")}
          onClick={handleLogout}
        >
          Log Keluar
        </Button>
      );
    } else if (!isResponsive) {
      // Render "Log Masuk" link only when not in responsive mode
      return (
        <Link to="/Login">
          <Button className="p-4">Log Masuk</Button>
        </Link>
      );
    }
    // Don't render the "Log Masuk" link in the Navbar in responsive mode
    return null;
  };
  

  return (
    <>
      <AppBar position="fixed" className="custom-navbar" sx={{ backgroundColor: "#491E6E" }}>
        <Toolbar>
          {isResponsive && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          )}
          <div className="flex-container">
            <a className="navbar-brand">
              <Link to="/" className="p-4">
                <img src="/navBar_Logo.png" alt="Your Logo" style={{ width: "200px" }} />
              </Link>
            </a>
            <div className="right-section">
              {renderItemLinks()}
              {renderLoginLogoutLink()}
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer anchor="right" open={isResponsive && isDrawerOpen} onClose={handleDrawerToggle}>
        <List>
          <ListItem button component="a" href="https://hac.usm.my">
            <ListItemText primary="Penginapan" />
          </ListItem>
          <ListItem button component="a" href="https://www.instagram.com/unitkaunselingusm/?hl=en">
            <ListItemText primary="Kaunseling" />
          </ListItem>
          <ListItem button component="a" href="/Login">
            <ListItemText primary="Log Masuk" />
          </ListItem>
          <Divider />
          {renderLoginLogoutLink()}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
