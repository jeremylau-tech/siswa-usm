import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, { useState } from "react";
import Cookies from 'js-cookie'; // Import the js-cookie library

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage] = useState("");

  

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Send cookies with the request
      });

      if (response.status === 200) {
        // Authentication successful, show an alert message
        alert("Login successful");
        // Save credentials as secure cookies
        Cookies.set('email', email, { secure: true });
        Cookies.set('password', password, { secure: true });

        window.location.href = '/AdminDashboard';

      } else if (response.status === 401) {
        // Handle authentication failure, show an error message in an alert
        alert("Login failed. Invalid email or password.");
      } else {
        // Handle other HTTP error codes
        alert("An error occurred while logging in.");
      }
    } catch (error) {
      // Handle network errors or other issues
      console.error("Error logging in:", error);
      alert("An error occurred while logging in.");
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
        <Form id="sign-in-form" className="text-center p-3 w-100" onSubmit={handleLogin}>
          <img
            className="m-4 bootstrap-logo"
            src="/path/to/your/logo.png" // Replace with the path to your logo image
            alt="Logo"
          />
          <h1 className="mb-4 fs-3 fw-normal">Log Masuk</h1>
          <Form.Group controlId="sign-in-email-address">
            <Form.Control
              type="email"
              size="lg"
              placeholder="Emel Pelajar"
              autoComplete="username"
              className="position-relative"
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
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
          <Form.Group className="d-flex justify-content-center mb-3 #FFFFFF" controlId="remember-me">
            <Form.Check label="Ingat Kata Laluan" />
          </Form.Group>
          <div className="d-grid">
            <Button style={buttonStyle} type="submit">
              Log Masuk
            </Button>
          </div>
          {errorMessage && <div className="text-danger mt-3">{errorMessage}</div>}
          <p className="mt-5 text-muted">&copy; Developed by USM Tech Team</p>
        </Form>
      </Container>
    </div>
  );
}

export default Login;
