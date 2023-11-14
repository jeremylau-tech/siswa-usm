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
  const currentDate = new Date().toISOString();

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    Cookies.remove('email');
    Cookies.remove('password');
    // navigate(`https://login.usm.my/adfs/ls/?wa=wsignin1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my/login&wctx=OmtlYmFqaWthbnNpc3dhLnVzbS5teS86`);
    navigate(`/Login`);
  };
  const renderItemLinks = () => {
    if (!isResponsive) {
      return (
        <div>
          <Link href="https://hac.usm.my">
            <Button style={{ color: 'white' }}>Penginapan</Button>
          </Link>
  
          <Link href="https://www.instagram.com/unitkaunselingusm/?hl=en">
            <Button style={{ color: 'white' }}>Kaunseling</Button>
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
        //// <Link to={`\Login`}>
        <Link to={`https://login.usm.my/adfs/ls/?wa=wsignin1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my/login&wctx=OmtlYmFqaWthbnNpc3dhLnVzbS5teS86`}>
          <Button className="p-4" style={{ color: 'white' }}>Log Masuk</Button>
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
          <ListItem component="a" href="https://hac.usm.my">
            <ListItemText primary="Penginapan" />
          </ListItem>
          <ListItem component="a" href="https://www.instagram.com/unitkaunselingusm/?hl=en">
            <ListItemText primary="Kaunseling" />
          </ListItem>
          {/* <ListItem button component="a" href={`https://login.usm.my/adfs/ls/?wa=wsignin1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my/login&wctx=OmtlYmFqaWthbnNpc3dhLnVzbS5teS86`}> */}
          <ListItem component="a" href={`/Login`}>
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
