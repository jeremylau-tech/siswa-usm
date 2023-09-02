import React from "react";
import './LandingPage.css';

function LandingPage() {
  return (
    <div className="landing-page">
      
      {/* Hero Banner Section */}
      <section className="hero" style={{ backgroundImage: 'url("banner.jpg")' }}>
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

      {/* About Us Section */}
      <section className="about-section">
        <h2>Buat Permohonan Disini</h2>
        <p>
          We are a team of passionate individuals dedicated to providing the best services in our industry.
          With years of experience, we guarantee you'll be satisfied with our offerings.
        </p>
      </section>

    </div>
  );
}

export default LandingPage;
