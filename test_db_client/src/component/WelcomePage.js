import React from "react";
import './WelcomePage.css';
import NavBar from './NavBar';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import footerLogo from '../img/footer_logo.jpg';
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

function WelcomePage() {
  return (
    <div className="welcome-page">
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
      <section className="new-services-section">
        <h2 className="section-title">Buat Permohonan Disini</h2>
        <div className="new-services-container">
          {/* New Service Card 1 */}
          <Card className="new-service-card">
            <CardMedia component="img" alt="Service 1 Banner" height="140" image="wang-pic.jpg" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Wang Ihsan
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                  Keupayaan pelajar untuk menerusi pemebelajaran.
              </Typography>
              <Button component={Link} to='/Wang_FormPage' variant="contained" color="primary">
                Mohon
              </Button>
            </CardContent>
          </Card>

          {/* New Service Card 2 */}
          <Card className="new-service-card">
            <CardMedia component="img" alt="Service 2 Banner" height="140" image="kupon-pic.jpg" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Baucar Makanan
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                 Keperluan asas dalam rutin seharian.
              </Typography>
              <Button
                component={Link}
                to="/Baucar_FormPage"
                variant="contained"
                color="primary"
                style={{ marginRight: '10px' }} // Add margin to the right side of the button
              >
                Mohon
              </Button>

              <Button
                component={Link}
                to="/CouponPage"
                variant="contained"
                color="primary"
                style={{ marginLeft: '10px' }} // Add margin to the left side of the button
              >
                Guna
              </Button>

            </CardContent>
          </Card>

          {/* New Service Card 3 */}
          <Card className="new-service-card">
            <CardMedia component="img" alt="Service 3 Banner" height="140" image="death-pic.jpg" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Khairat Kematian
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                Keprihatinan terhadap setiap keluarga USM. 
              </Typography>
              <Button component={Link} to='/Khairat_FormPage' variant="contained" color="primary">
                Mohon
              </Button>
            </CardContent>
          </Card>

          {/* New Service Card 4 */}
          <Card className="new-service-card">
            <CardMedia component="img" alt="Service 4 Banner" height="140" image="laptop-pic.jpg" />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                Kerosakan Peranti
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                Kesediaan untuk cemerlang dalam pembelajaran.
              </Typography>
              <Button component={Link} to='/Peranti_FormPage' variant="contained" color="primary">
                Mohon
              </Button>
            </CardContent>
          </Card>
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

export default WelcomePage;
