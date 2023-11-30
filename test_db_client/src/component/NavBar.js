// Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, IconButton, Drawer, List, ListItem, ListItemText, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useMediaQuery, useTheme } from "@mui/material";
import { processToken, authenticateWithADFS } from './Auth.js';
import "./NavBar.css"; // Import your CSS file

function Navbar() {
  const email = Cookies.get('email');
  const password = Cookies.get('password');
  const navigate = useNavigate();
  const theme = useTheme();
  const isResponsive = useMediaQuery(theme.breakpoints.down("md"));
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const currentDate = new Date().toISOString();
  const location = useLocation();

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleLogout = () => {
    Cookies.remove('email');
    Cookies.remove('password');
    authenticateWithADFS();
  };

  const renderItemLinks = () => {
    if (!isResponsive) {
      return (
        <div>
              <Button  component={Link} to={`https://www.instagram.com/unitkaunselingusm/?hl=en`} variant="contained" style={{ backgroundColor: '#491E6E', color: 'white', border: 'none'}}>
                Kaunseling
              </Button>
              <br/>
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
      return (
        // <Button className="p-4" style={{ color: 'white' }} onClick={authenticateWithADFS}>
        //   Log Masuk
        // </Button>
        <Button  component={Link} to={`https://hac.usm.my/`} variant="contained" style={{ backgroundColor: '#491E6E', color: 'white', border: 'none'}}>
                Penginapan
        </Button>
      );
    }
    return null;
  };

  useEffect(() => {
    const xmlTokenFromADFS = new URLSearchParams(location.search).get('token');
    if (xmlTokenFromADFS) {
      processToken(xmlTokenFromADFS)
        .then((tokenObject) => {
          console.log('Processed Token:', tokenObject);
          // Do something with the tokenObject, e.g., store in state or context
        })
        .catch((error) => {
          console.error('Error processing token:', error);
        });
    }
  }, [location.search]);

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
            <ListItemText primary="Penginapan " />
          </ListItem>
          <ListItem component="a" href="https://www.instagram.com/unitkaunselingusm/?hl=en">
            <ListItemText primary="Kaunseling" />
          </ListItem>
          {/* <ListItem button component="a" href={`https://login.usm.my/adfs/ls/?wa=wsignin1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my/login&wctx=OmtlYmFqaWthbnNpc3dhLnVzbS5teS86`}>
            <ListItemText primary="Log Masuk" />
          </ListItem> */}
          <Divider />
          {renderLoginLogoutLink()}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
