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

import { jwtDecode } from "jwt-decode";


const getRolesFromToken = function (token) {
  try {
    const decodedToken = jwtDecode(token); // decode your token here
    return {
      roles: decodedToken.roles || 'default',
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return { roles: 'default', ic: null };
  }
};


function Navbar() {
  const jwtToken = Cookies.get('jwtToken');
  const navigate = useNavigate();
  const theme = useTheme();
  const isResponsive = useMediaQuery(theme.breakpoints.down("md"));
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const currentDate = new Date().toISOString();
  const location = useLocation();
  let roles = "";

  const token = Cookies.get('jwtToken');
  if (token) {
    const decodedToken = jwtDecode(token); // decode your token here
    roles = decodedToken.roles;
  }

  const handleDrawerToggle = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const handleLogin = () => {
    // Merge the existing location state with your data
    navigate('/Login');
  };

  const handleLogout = () => {
    Cookies.remove('jwtToken');
    alert ("Logout successful!")
    // authenticateWithADFS();
    // navigate('https://login.usm.my/adfs/ls/?wa=wsignin1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my&wctx=OmtlYmFqaWthbnNpc3dhLnVzbS5teTo=');
    // window.location.href = `https://login.usm.my/adfs/ls/?wa=wsignout1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my/login&wreply=https://kebajikansiswa.usm.my&wctx=`;
    // navigate('/');
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
    if (jwtToken) {
      if (isResponsive) {
        // Render "Log Keluar" only in the drawer for responsive mode
        if (roles == 'admin' || roles == 'admin' || roles == 'tnc') {
          return (
            <ListItem
              component={Link} 
              to={'/Login'}
              onClick={handleLogout}>
                <ListItemText primary="Log Keluar" />
            </ListItem>
          );

        } else {
          return (
            <ListItem
              component={Link} 
              to={`https://login.usm.my/adfs/ls/?wa=wsignout1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my/login&wreply=https://kebajikansiswa.usm.my&wctx=`}
              onClick={handleLogout}>
                <ListItemText primary="Log Keluar" />
            </ListItem>
          );
        }
        
      }
      // Render "Log Keluar" in the navbar for non-responsive mode
      if (roles == 'admin' || roles == 'admin' || roles == 'tnc') {
        return (
          <Button
            component={Link} 
            to={'/Login'}
            variant="contained"
            style={{ backgroundColor: '#491E6E', color: 'white', border: 'none' }}
            onClick={handleLogout}
          >
            Log Keluar
          </Button>
        );
      } else {
        return (
          <Button
            component={Link} 
            to={`https://login.usm.my/adfs/ls/?wa=wsignout1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my/login&wreply=https://kebajikansiswa.usm.my&wctx=`}
            variant="contained"
            style={{ backgroundColor: '#491E6E', color: 'white', border: 'none' }}
            onClick={handleLogout}
          >
            Log Keluar
          </Button>
        );
      }

      
    } else if (!isResponsive) {
      return (
        <>
          {/* <Button className="p-4" style={{ color: 'white' }} onClick={authenticateWithADFS}>
            Log Masuk
          </Button> */}
          <Button component={Link} to={`https://hac.usm.my/`} variant="contained" style={{ backgroundColor: '#491E6E', color: 'white', border: 'none' }}>
            Penginapan
          </Button>

          {!jwtToken && (roles != 'admin' && roles != 'admin' && roles != 'tnc') && (
              <Button 
              component={Link} 
              to={`https://login.usm.my/adfs/ls/?wa=wsignin1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my&wctx=OmtlYmFqaWthbnNpc3dhLnVzbS5teTo=`}
              variant="contained" 
              style={{ backgroundColor: '#491E6E', color: 'white', border: 'none' }}>
                Log Masuk
              </Button>
            )}
        </>
      )      
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
              
              {/* Render "Log Keluar" only in the navbar for responsive mode */}
              {!isResponsive && renderLoginLogoutLink()}
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

{!jwtToken && (roles != 'admin' && roles != 'admin' && roles != 'tnc') && (
              <ListItem component={Link} to={`https://login.usm.my/adfs/ls/?wa=wsignin1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my&wctx=OmtlYmFqaWthbnNpc3dhLnVzbS5teTo=`}>
              <ListItemText primary="Log Masuk" />
                      </ListItem>
            )}

{/* {jwtToken && (
              <ListItem onClick={handleLogout}>
                <ListItemText primary="Log Keluar" />
              </ListItem>
            )} */}

          {renderLoginLogoutLink()}
          <Divider />
          {/* {renderLoginLogoutLink()} */}
        </List>
      </Drawer>
    </>
  );
}

export default Navbar;
