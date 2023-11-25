import React from 'react';
import footerLogo from '../../img/footer_logo.jpg';
import "./Footer.css";

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
            <p>&copy; 2023 Universiti Sains Malaysia</p>
            <p>Hak Cipta Terpelihara</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
