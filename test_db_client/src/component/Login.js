import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React from "react";

import 'C:/Users/Jeremy/siswa-usm/test_db_client/src/App.css';

function Login() {

    const buttonStyle = {
        backgroundColor: '#491E6E',
        borderColor: '#491E6E', // You can set the border color to match the background color if you want
        color: 'white', // Set text color to contrast with the background
      };
  return (
<div className="App">
    <Container id="main-container" className="d-grid h-100">
      <Form id="sign-in-form" className="text-center p-3 w-100">
        <img className="m-4 bootstrap-logo" 
              src="USM" 
              alt="Logo" />
        <h1 className="mb-4 fs-3 fw-normal">Log Masuk</h1>
        <Form.Group controlId="sign-in-email-address">
          <Form.Control type="email" size="lg" placeholder="Emel Pelajar" autoComplete="username" className="position-relative" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="sign-in-password">
          <Form.Control type="password" size="lg" placeholder="Kata Laluan" autoComplete="current-password" className="position-relative" />
        </Form.Group>
        <Form.Group className="d-flex justify-content-center mb-4 #FFFFFF" controlId="remember-me">
          <Form.Check label="Ingat Kata Laluan" />
        </Form.Group>
        <div className="d-grid">
         <Button style={buttonStyle}>Log Masuk</Button>
          
        </div>
        <p className="mt-5 text-muted">&copy; Developed by USM Tech Team</p>
      </Form>
    </Container>
    </div>
  );
}

export default Login;
