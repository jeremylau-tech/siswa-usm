import React from 'react';
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import footerLogo from '../../img/footer_logo.jpg';
import "./Footer.css";

import PersonIcon from '@mui/icons-material/Person';

function Footer() {
  return (
    <footer className="copyright">
      <div className="container">
      <div className="d-flex justify-content-center align-items-center">
  <img
    src={footerLogo}
    alt="Footer Logo"
    className="footer-logo-small"
  />
  <div className="footer-text white-text">
    <p>
      &copy; 2023 Universiti Sains Malaysia
      <span style={{ marginLeft: '8px' }}>|</span>
      <Link
        to="/login"
        style={{
          textDecoration: 'none',
          marginLeft: '10px', // Adjust the spacing as needed
        }}
      >
        <IconButton
          style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
          }}
          color="primary"
          aria-label="login"
        >
          <PersonIcon
            style={{
              width: '18px',
              height: '18px',
            }}
          />
        </IconButton>
      </Link>
    </p>
    <p>Hak Cipta Terpelihara</p>
  </div>
</div>

      </div>
    </footer>
  );
}

export default Footer;