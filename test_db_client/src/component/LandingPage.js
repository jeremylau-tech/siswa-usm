import React from "react";
import './LandingPage.css';
import NavBar from './NavBar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import ApplicationStatus from "./student/ApplicationStatus";
import footerLogo from '../img/footer_logo.jpg';
import { Box } from "@mui/system";

function LandingPage() {
  return (
    <div className="landing-page">

      {/* Navigation Bar */}
      <NavBar />
      
      {/* Hero Banner Section */}
      <section className="hero" style={{ backgroundImage: 'url("banner2.jpg")' }}>
        <div className="overlay"></div>
        <div className="container">
          <div className="hero-content">
            <h1>Selamat <span>Datang!</span></h1>
            <p>A leading university, in Malaysia.</p>
            <div className="d-flex">
              <a href="#about" className="btn-get-started scrollto">Buat Permohonan Sekarang</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="status-title">Buat Permohonan Disini</h2>
        <div className="services-container">
          {/* Service Card 1 */}
          <div className="service-card">
            <img src="banner.jpg" alt="Service 1 Banner" />
            <div className="text-container">
              <h3>Wang Ihsan/Makanan</h3>
              <p>Maklumat Lanjutan... </p>
              <a className="nav-item nav-link"><Link to='/FormPage' className='p-4'>Mohon</Link></a>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="service-card">
            <img src="banner.jpg" alt="Service 2 Banner" />
            <div className="text-container">
              <h3>Khairat Kematian</h3>
              <p>Maklumat Lanjutan... </p>
              <a className="nav-item nav-link"><Link to='/FormPage' className='p-4'>Mohon</Link></a>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="service-card">
            <img src="banner.jpg" alt="Service 3 Banner" />
            <div className="text-container">
              <h3>Kerosakan Peranti</h3>
              <p>Maklumat Lanjutan... </p>
              <a className="nav-item"><Link to='/FormPage' className='p-4'>Mohon</Link></a>
            </div>
          </div>

          {/* Service Card 4 */}
          <div className="service-card">
            <img src="banner.jpg" alt="Service 3 Banner" />
            <div className="text-container">
              <h3>Kerosakan Peranti</h3>
              <p>Maklumat Lanjutan... </p>
              <a className="nav-item"><Link to='/FormPage' className='p-4'>Mohon</Link></a>
            </div>
          </div>
        </div>
      </section>

      {/* Status Permohonan Section */}
      <section className="status-permohonan">
        <div className="container" >
        <h2 className="status-title">Status Permohonan</h2>
        <section>
        <Box 
        style={{
          paddingBottom: '50px',
        }}
        >
          <ApplicationStatus></ApplicationStatus>
        </Box>
      </section>
        </div>
      </section>

      {/* Copyright Footnote Section */}
      <footer className="copyright">
        <div className="container">
          <div className="d-flex justify-content-center align-items-center">
            <img src={footerLogo} alt="Footer Logo" className="footer-logo-small" />
            <div className="footer-text white-text">
              <p>&copy; 2023 Universiti Sains Malaysia</p>
              <p>All Rights Reserved</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}

export default LandingPage;
