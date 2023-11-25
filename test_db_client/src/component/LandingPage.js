import React, { useState, useEffect } from 'react';
// import './LandingPage.css';
import './WelcomePage.css';

import NavBar from './NavBar';
// import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from "react-router-dom";
import ApplicationStatus from "./student/ApplicationStatus";
import Footer from './footer/Footer';
import { Tr, Table, Grid, Container, Box, Card, CardContent, CardMedia, Typography, Button, Divider, IconButton } from "@mui/material";
import { useNavigate, useLocation } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import EditRounded from '@mui/icons-material/EditRounded';

import { Paper } from '@mui/material';

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state;
  const userId = user.unique_id;
  const data = { userId:  userId};
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const commonButtonStyle = {
    display: 'inline-block',
    padding: '10px 15px',
    textDecoration: 'none',
    color: '#fff',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    backgroundColor: '#491E6E',
    '&:hover': {
      backgroundColor: '#8945c5',
    },
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  function handleMohonMakanan() {
    // Merge the existing location state with your data
    navigate('/FoodApplication', { state: { ...location.state } });
  }

  function handleGoToBaucarMakanan() {
    // Merge the existing location state with your data
    navigate('/CouponPage', { state: { ...location.state, ...data } });
  }

  useEffect(() => {

    // Make an HTTP POST request to the /invoice-all-vendor endpoint
    fetch('http://localhost:8000/get-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId }),
    })
      .then(res => res.json())
      .then(data => {
        // Update the state with the retrieved data
        // setInvoiceMap(data.invoices);
        // setVendorMap(data.vendors[0])
        setUserDetails(data.user[0])
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
  }, []);

  return (
    <div className="landing-page">

      {/* Navigation Bar */}
      <NavBar />
      
      {/* Services Section */}
      <Box
        align="center"
        marginTop="50px"
      >
        <Card
          sx={{
            maxWidth: "90%",
            backgroundColor: '#f5f5f5',
            borderRadius: '10px',
            boxShadow: 'none',
            outlineColor: '#CCCCCC',
            outlineStyle: 'solid',
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" >
              Selamat Datang!
            </Typography>
            <Typography gutterBottom variant="h5" component="div" >
              {userDetails.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Sila pastikan maklumat anda tepat dan telah dikemaskini
            </Typography>
            <Divider
              style={{
                marginTop: '10px',
                marginBottom: '10px',
                width: '30%',
              }}

            />
            <Box
              allign="center"
            >
              <table cellPadding='2px' align='center' justify='center' >
                <tr>
                  <td>
                    <Typography variant="body2" color="text.secondary">
                      No Telefon
                    </Typography>
                  </td>
                  <td><Container
                    sx={{
                      display: 'flex',
                      backgroundColor: '#CCCCCC',
                      borderRadius: '5px',
                      width: '100%',
                    }}
                  >
                    <Typography
                      align='center'
                      padding={0.5}
                    >
                      {userDetails.phone_num}
                    </Typography>
                  </Container>
                  </td>
                  <td>
                    <div onClick={handleOpenDialog}>
                      <IconButton
                        aria-label="edit"
                        size="small"
                        style={{
                          color: 'grey',
                        }}
                      >
                        <EditRounded />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              </table>

            </Box>
          </CardContent>
        </Card>
      </Box>

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
                variant="contained"
                color="primary"
                sx={{ ...commonButtonStyle, marginRight: '10px' }}
                onClick={handleMohonMakanan}
              >
                Mohon
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ ...commonButtonStyle, marginLeft: '10px' }}
                onClick={handleGoToBaucarMakanan}
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

      {/* Status Permohonan Section */}
      <h2 className="section-title">Status Permohonan</h2>
      <Container
      sx={{
        width: '100%',
        borderRadius: '10px',
        padding: '10px',
        height: '500px',
        marginTop: '20px',
      }}
    >
      <Paper elevation={3} sx={{ padding: '20px' }}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            margin: '10px',
          }}
        >
          <Box
            sx={{
              flexGrow: 1,
              margin: 1,
              textAlign: 'left',
            }}
          >
            {/* Add any additional content or components as needed */}
          </Box>
        </Box>
        <ApplicationStatus userId={userId} />
      </Paper>

      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Kemaskini No Telefon</DialogTitle>
        <DialogContent>
          <DialogContentText>Sila ke laman</DialogContentText>
          <DialogContentText
            style={{
              color: 'blue',
              textDecoration: 'underline',
            }}
          >
            <a href="https://campusonline.usm.my"> CampusOnline {'>'} Student Profile {'>'} Email & Mobile </a>
          </DialogContentText>
          <DialogContentText>untuk mengemaskini no telefon anda</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Tutup
          </Button>
        </DialogActions>
      </Dialog>
    </Container>

      {/* Copyright Footnote Section */}
      <Footer />
    </div>
  );
}

export default LandingPage;
