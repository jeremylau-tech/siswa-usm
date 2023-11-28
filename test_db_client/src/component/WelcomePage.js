import React, { useState, useEffect } from 'react';
import './WelcomePage.css';
import NavBar from './NavBar';
import { Link } from "react-router-dom";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import { Link as ScrollLink } from "react-scroll";
import Footer from './footer/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import AutoAwesomeMosaicSharpIcon from '@mui/icons-material/AutoAwesomeMosaicSharp';

function WelcomePage(props) { 
  const currentDate = new Date().toISOString();

  // const navigate = useNavigate();
  // const location = useLocation();
  // const user = location.state;
  // // if (user)
  // // alert(user.unique_id)
  // // console.log(user)
 
  // const data = { userId: user.unique_id };
  // const [couponCount, setCouponCount] = useState(0);

  function handleClick() {
    // Merge the existing location state with your data
    // navigate('/CouponPage', { state: { ...location.state, ...data } });
  }

  // useEffect(() => {

    // Function to make the GET request to get coupon count
  //   const fetchCouponCount = () => {
  //     fetch(`http://localhost:8000/coupons-count?userId=${data.userId}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.couponCount !== undefined) {
  //           setCouponCount(data.couponCount);
  //         } else {
  //           console.error("No coupon count data received.");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching coupon count:", error);
  //       });
  //   };

  //   fetchCouponCount();
  // }, []);

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
            <p>Laman Sesawang Kebajikan Pelajar USM</p>
            <div className="d-flex">
            <ScrollLink
              to="new-services-section"
              spy={true}
              smooth={true}
              duration={500}
              offset={-70}
              className="btn-get-started scrollto"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <AutoAwesomeMosaicSharpIcon style={{ fontSize: '20px', marginRight: '5px' }} />
              Buat Permohonan Sekarang
            </ScrollLink>
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
            <CardMedia component="img" alt="Service 1 Banner" height="140" image="welfare.jpeg" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Wang Ihsan
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                  Keupayaan pelajar untuk menerusi pemebelajaran.
              </Typography>
              <Button disabled component={Link} to='/Wang_FormPage' variant="contained" color="primary">
                Akan Datang
              </Button>
            </CardContent>
          </Card>

          {/* New Service Card 2 */}
          <Card className="new-service-card">
            <CardMedia component="img" alt="Service 2 Banner" height="140" image="makanan.png" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Baucar Makanan
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                 Keperluan asas dalam rutin seharian.
              </Typography>
            {/* {couponCount == 0 ? (
            <Button
              component={Link}
              to="/FoodApplication"
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
            >
              Mohon
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
              disabled
            >
              Mohon
            </Button>
          )} */}

        {/* <Button
              variant="contained"
              color="primary"
              style={{ marginRight: '10px' }}
              disabled
            >
              Mohon
            </Button>

          

              <Button
                // component={Link}
                onClick={handleClick}
                variant="contained"
                color="primary"
                style={{ marginLeft: '10px' }} // Add margin to the left side of the button
              >
                Guna
              </Button> */}
                {/* <Button  component={Link} to={`https://login.usm.my/adfs/ls/?wa=wsignin1.0&wct=${currentDate}&wtrealm=urn:federation:kebajikansiswa.usm.my/login&wctx=OmtlYmFqaWthbnNpc3dhLnVzbS5teS86`} variant="contained" color="primary"> */}
                <Button  component={Link} to={`/Login`} variant="contained" color="primary">
                Mohon
              </Button>
            </CardContent>
          </Card>

          {/* New Service Card 3 */}
          <Card className="new-service-card">
            <CardMedia component="img" alt="Service 3 Banner" height="140" image="kematian.jpg" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Khairat Kematian
              </Typography>
              <Typography variant="body2" color="text.secondary" style={{ textAlign: 'center' }}>
                Keprihatinan terhadap setiap keluarga USM. 
              </Typography>
              <Button disabled component={Link} to='/Khairat_FormPage' variant="contained" color="primary">
                Akan Datang
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
              <Button disabled component={Link} to='/Peranti_FormPage' variant="contained" color="primary">
                Akan Datang
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Copyright Footnote Section */}
      <Footer />
    </div>
  );
}

export default WelcomePage;
