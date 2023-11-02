import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function RegistrationDialog({ open, handleClose }) {
  const [maxWidth] = useState('md');
  const [fullWidth] = useState(true);

  // State variables for input values
  const [inputValues, setInputValues] = useState({
    fullName: '',
    icNumber: '',
    matricNumber: '',
    phoneNumber: '',
    school: '',
    course: '',
    studentStatus: '',
    studyYear: '',
    email: '',
    password: '',
  });

  const handleInputChange = (fieldName, value) => {
    setInputValues({
      ...inputValues,
      [fieldName]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Access input values from inputValues state
    const {
      fullName,
      icNumber,
      matricNumber,
      phoneNumber,
      school,
      course,
      studentStatus,
      studyYear,
      email,
      password,
    } = inputValues;
  
    // Check if any of the input fields are null or empty
    if (
      !fullName ||
      !icNumber ||
      !matricNumber ||
      !phoneNumber ||
      !school ||
      !course ||
      !studentStatus ||
      !studyYear ||
      !email ||
      !password
    ) {
      // Prompt an alert if any field is null or empty
      alert('Please fill in all required fields.');
    } else {
      // Do something with the input valuesstudent_status

      const formDataJSON = {
        unique_id: matricNumber,
        email: email,
        password: password,
        name: fullName,
        ic_num: icNumber,
        phone_num: phoneNumber,
        school: school,
        course: course,
        student_status: studentStatus,
        study_year: studyYear
      }

      console.log('Input values:', formDataJSON);
      

      const apiUrl = "http://localhost:8000/insert-users"; // Update with your server's URL
      // console.log(formDataJSON)


      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataJSON),
      });
  
      if (response.ok) {
        // if (true) {
        // If the server responds with a 200 status code (OK), you can handle success here
        alert("Form data sent successfully!");
      } else {
        // Handle errors or display error messages here
        console.error("Form data submission failed.");
        alert("Something wrong on the backend!");
      }
  
      // You can proceed to send the data to the server or perform other actions here
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={fullWidth}
      maxWidth={maxWidth}
      sx={{
        backdropFilter: 'blur(5px) sepia(5%)',
      }}
      PaperProps={{ sx: { borderRadius: '20px' } }}
    >
      <Grid
        container
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Grid item xs={12} sm={6}>
        <img
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
            src="https://referencephsusm.files.wordpress.com/2011/07/img_5080.jpg"
            alt="banner.jpg"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '20px 20px 20px 20px',
              padding: '10px',
            }}
          >
            <Typography
              variant="h5"
              style={{
                margin: '10px',
                marginBottom: '60px',
                fontWeight: 'bold',
              }}
            >
              Daftar Pengguna Baharu
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Nama Penuh"
              type="name"
              fullWidth
              variant="outlined"
              value={inputValues.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="ic"
              label="No. Kad Pengenalan"
              type="name"
              fullWidth
              variant="outlined"
              value={inputValues.icNumber}
              onChange={(e) => handleInputChange('icNumber', e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="matric"
              label="No. Matrik"
              type="name"
              fullWidth
              variant="outlined"
              value={inputValues.matricNumber}
              onChange={(e) => handleInputChange('matricNumber', e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="phone"
              label="No. Fon"
              type="name"
              fullWidth
              variant="outlined"
              value={inputValues.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="school"
              label="Pusat Pengajian"
              type="name"
              fullWidth
              variant="outlined"
              value={inputValues.school}
              onChange={(e) => handleInputChange('school', e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="course"
              label="Kursus Pengajian"
              type="name"
              fullWidth
              variant="outlined"
              value={inputValues.course}
              onChange={(e) => handleInputChange('course', e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="status"
              label="Status Pelajar (UG/PG)"
              type="name"
              fullWidth
              variant="outlined"
              value={inputValues.studentStatus}
              onChange={(e) => handleInputChange('studentStatus', e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="year"
              label="Tahun Pengajian (1/2/3/4)"
              type="year"
              fullWidth
              variant="outlined"
              value={inputValues.studyYear}
              onChange={(e) => handleInputChange('studyYear', e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Emel Pelajar (@student.usm.my)"
              type="email"
              fullWidth
              variant="outlined"
              value={inputValues.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Kata Laluan"
              type="password"
              fullWidth
              variant="outlined"
              value={inputValues.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            <Button
              style={{
                backgroundColor: '#491E6E',
                borderColor: '#491E6E',
                color: 'white',
                padding: '10px',
                borderRadius: '5px',
                fontWeight: 'bold',
                marginTop: '50px',
              }}
              onClick={handleSubmit}
            >
              Daftar Pengguna
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default RegistrationDialog;
