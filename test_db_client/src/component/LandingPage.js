import React from "react";
import './LandingPage.css';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import ApplicationStatus from "./student/ApplicationStatus";
import footerLogo from '../img/footer_logo.jpg';
import { Box, Card, CardContent, CardMedia, Typography, Button } from "@mui/material";

function LandingPage() {
  return (
    <div className="landing-page">

      {/* Navigation Bar */}
      <NavBar />

      {/* Services Section */}
      <section className="services-section">
        <h2 className="status-title">Buat Permohonan Disini</h2>
        <div className="services-container">
          {/* New Service Card 1 */}
          <Card className="service-card">
            <CardMedia component="img" alt="Service 1 Banner" height="140" image="banner.jpg" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Wang Ihsan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Maklumat Lanjutan...
              </Typography>
              <Button component={Link} to='/FormPage' variant="contained" color="primary">
                Mohon
              </Button>
            </CardContent>
          </Card>

          {/* New Service Card 2 */}
          <Card className="service-card">
            <CardMedia component="img" alt="Service 2 Banner" height="140" image="banner.jpg" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Makanan
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Maklumat Lanjutan...
              </Typography>
              <Button component={Link} to='/FormPage' variant="contained" color="primary">
                Mohon
              </Button>
            </CardContent>
          </Card>

          {/* New Service Card 3 */}
          <Card className="service-card">
            <CardMedia component="img" alt="Service 3 Banner" height="140" image="banner.jpg" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Khairat Kematian
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Maklumat Lanjutan...
              </Typography>
              <Button component={Link} to='/FormPage' variant="contained" color="primary">
                Mohon
              </Button>
            </CardContent>
          </Card>

          {/* New Service Card 4 */}
          <Card className="service-card">
            <CardMedia component="img" alt="Service 4 Banner" height="140" image="banner.jpg" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Kerosakan Peranti
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Maklumat Lanjutan...
              </Typography>
              <Button component={Link} to='/FormPage' variant="contained" color="primary">
                Mohon
              </Button>
            </CardContent>
          </Card>
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
