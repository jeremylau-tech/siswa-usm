import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { CardMedia } from '@mui/material';
import Box from '@mui/material/Box';
import RegistrationDialog from './RegisterDialog';
import { useNavigate, useLocation } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Send cookies with the request
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Save JWT token in a secure cookie
        Cookies.set('jwtToken', token);

        // Log the token to verify it's received correctly
        console.log('JWT Token:', token);

        // Redirect based on user roles
        if (data.user.roles === 'student') {
          navigate('/landingPage', { state: { ...location.state, ...data.user } });
        } else {
          navigate('/adminDashboard', { state: { ...location.state, ...data.user } });
        }
      } else if (response.status === 401) {
        setErrorMessage('Login failed. Invalid email or password.');
      } else {
        setErrorMessage('An error occurred while logging in.');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('An error occurred while logging in.');
    }
  };

  const buttonStyle = {
    backgroundColor: '#491E6E',
    borderColor: '#491E6E',
    color: 'white',
  };

  return (
    <div className="App">
      <Container id="main-container" className="d-grid h-100">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Form id="sign-in-form" className="text-center p-3 w-100" style={{ maxWidth: '400px' }} onSubmit={handleLogin}>
            <CardMedia component="img" alt="Service 1 Banner" height="140" image="wang-pic.jpg" style={{ marginTop: '60px', borderRadius: '8px' }} />
            <h2 className="mb-4 fs-3 fw-normal" style={{ fontSize: '30px' }}>
              Log Masuk
            </h2>
            <Form.Group controlId="sign-in-email-address">
              <Form.Control
                type="email"
                size="lg"
                placeholder="Emel Pelajar"
                autoComplete="username"
                className="position-relative"
                style={{ width: '250px', padding: '10px', borderRadius: '8px', marginBottom: '8px' }}
                value={email}
                onChange={handleEmailChange}
              />
            </Form.Group>
            <Form.Group className="mb-3 mt-3" controlId="sign-in-password">
              <Form.Control
                type="password"
                size="lg"
                placeholder="Kata Laluan"
                autoComplete="current-password"
                className="position-relative"
                style={{ width: '250px', padding: '10px', borderRadius: '8px' }}
                value={password}
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <div className="d-grid">
              <Button style={buttonStyle} type="submit">
                Log Masuk
              </Button>
            </div>
            <div className="d-grid" style={{ marginTop: '10px' }}>
              {/* <Button variant="outlined" style={{ borderColor: '#491E6E', padding: '5px' }} onClick={handleOpen}>
                Daftar Pengguna
              </Button> */}
              <RegistrationDialog open={open} handleClose={handleClose} />
            </div>
            {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
            <p className="mt-5 text-muted">&copy; Developed by USM Tech Team</p>
          </Form>
        </Box>
      </Container>
    </div>
  );
}

export default Login;
