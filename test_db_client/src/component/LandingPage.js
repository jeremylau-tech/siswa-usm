import React from "react";
import './LandingPage.css';
import NavBar from './NavBar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import footerLogo from '../img/footer_logo.jpg';

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
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, est felis, sagittis viverra nulla mattis scelerisque. Eget cras integer.</p>
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
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, est felis, sagittis viverra nulla mattis scelerisque. Eget cras integer.</p>
              <a href="#service1">Mohon</a>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="service-card">
            <img src="banner.jpg" alt="Service 2 Banner" />
            <div className="text-container">
              <h3>Khairat Kematian</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, est felis, sagittis viverra nulla mattis scelerisque. Eget cras integer.</p>
              <a href="#service2">Mohon</a>
            </div>
          </div>

          {/* Service Card 3 */}
          <div className="service-card">
            <img src="banner.jpg" alt="Service 3 Banner" />
            <div className="text-container">
              <h3>Kerosakan Peranti</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sapien, est felis, sagittis viverra nulla mattis scelerisque. Eget cras integer.</p>
              <a href="#service3">Mohon</a>
            </div>
          </div>
        </div>
      </section>

      {/* Status Permohonan Section */}
      <section className="status-permohonan">
        <div className="container">
        <h2 className="status-title">Status Permohonan</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Rujukan</th>
                <th>Jenis Permohonan</th>
                <th>Tarikh Dimohon</th>
                <th>Catatan</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Add your table rows here */}
              <tr>
                <td>12345</td>
                <td>Permohonan A</td>
                <td>2023-09-03</td>
                <td>Lorem ipsum</td>
                <td><button className="approved">Diterima</button></td>
              </tr>
              {/* Add more rows as needed */}
              <tr>
                <td>67890</td>
                <td>Permohonan B</td>
                <td>2023-10-01</td>
                <td>Lorem ipsum</td>
                <td><button className="ongoing">Dalam Proses</button></td>
              </tr>
              {/* Add more rows as needed */}
              <tr>
                <td>67890</td>
                <td>Permohonan C</td>
                <td>2023-03-12</td>
                <td>Lorem ipsum</td>
                <td><button className="rejected">Ditolak</button></td>
              </tr>
              {/* Add more rows as needed */}
              <tr>
                <td>67890</td>
                <td>Permohonan D</td>
                <td>2023-04-28</td>
                <td>Lorem ipsum</td>
                <td><button className="complete">Selesai</button></td>
              </tr>
            </tbody>
          </table>
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
