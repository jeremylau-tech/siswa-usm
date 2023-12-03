import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Box, Divider, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from '@mui/material/styles/styled';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function CreateVendor() {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    // Initialize your form fields
    vendorName: '',
    vendorLocation: '',
    vendorDescription: '',
    vendorFullname: '',
    vendorPhoneNo: '',
    vendorEmail: '',
    vendorBankAccName: '',
    vendorBankAccNo: '',
    vendorBankName: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleSave = async () => {
    // Make an API request to save the data to the backend
    try {
      const response = await fetch('http://docker.usm.my:8000/insert-vendor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const { message } = await response.json();
        // Handle success, e.g., show a success message
        alert(message); // This should be 'Data inserted successfully'
      } else {
        // Handle error, e.g., show an error message
        const { message } = await response.json();
        alert(`Error saving data: ${message}`);
      }
    } catch (error) {
      // Handle network or other errors
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again later.');
    } finally {
      // Close the dialog after saving data (whether success or failure)
      handleClose();
    }
  };

  return (
    <div>
      <Button variant="contained" 
          style={{
            color: "#424242",
            textTransform: "none",
            backgroundColor: "#eeeeee",
            boxShadow: "none",
          }
          }
           onClick={handleClickOpen}>
            <AddRoundedIcon
              sx={{ mr: 1 }}
            />
            Daftar Vendor
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle 
        style={{
            backgroundColor: "#eeeeee",
            color: "#424242",
            textTransform: "none",
            boxShadow: "none",
            fontWeight: "bold",
        }}
        align='center'
        >Daftar Vendor</DialogTitle>
        <DialogContent>
        <Divider style={{paddingTop:'20px'}}/>
        <Typography variant="h7" gutterBottom style={{paddingTop:'30px'}}> Maklumat Vendor </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Nama Vendor"
            type="name"
            fullWidth
            variant="outlined"
            value={formData.vendorName}
            onChange={handleChange('vendorName')}
          />
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Lokasi"
            type="location"
            fullWidth
            variant="outlined"
            value={formData.vendorLocation}
            onChange={handleChange('vendorLocation')}
          />
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Deskripsi"
            type="description"
            fullWidth
            variant="outlined"
            value={formData.vendorDescription}
            onChange={handleChange('vendorDescription')}
          />
        {/* <Box style={{  alignContent: 'center', paddingTop:'20px' }}>
        <Typography variant="h7" gutterBottom> Logo </Typography>
        <Button 
        style={{
            color: "black",
            backgroundColor: "#eeeeee",            
        }}
        component="label" 
        fullWidth
        startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput type="file" />
        </Button>
        </Box> */}
        <Divider style={{paddingTop:'20px'}}/>
        <Typography variant="h7" gutterBottom style={{paddingTop:'10px'}}> Maklumat Pemilik </Typography>
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Nama Penuh Pemilik Vendor"
            type="owner"
            fullWidth
            variant="outlined"
            value={formData.vendorFullname}
            onChange={handleChange('vendorFullname')}
          />
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="No Telefon"
            type="phoneNo"
            fullWidth
            variant="outlined"
            value={formData.vendorPhoneNo}
            onChange={handleChange('vendorPhoneNo')}
          />
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Emel"
            type="email"
            fullWidth
            variant="outlined"
            value={formData.vendorEmail}
            onChange={handleChange('vendorEmail')}
          />
          <Divider style={{paddingTop:'20px'}}/>
        <Typography variant="h7" gutterBottom style={{paddingTop:'10px'}}> Maklumat Akaun Bank Pemilik </Typography>
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Nama Pemilik Akaun"
            type="bankAccOwner"
            fullWidth
            variant="outlined"
            value={formData.vendorBankAccName}
            onChange={handleChange('vendorBankAccName')}
          />
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Nombor Akaun Bank"
            type="bankAccNo"
            fullWidth
            variant="outlined"
            value={formData.vendorBankAccNo}
            onChange={handleChange('vendorBankAccNo')}
          />
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Nama Bank"
            type="bankName"
            fullWidth
            variant="outlined"
            value={formData.vendorBankName}
            onChange={handleChange('vendorBankName')}
          />
        </DialogContent>
        <DialogActions>
                 <Button
            variant="contained"
            onClick={handleSave}
            disableElevation={true}
            style={{
              backgroundColor: '#424242',
              color: '#fff',
              fontWeight: 'bold',
              width: '30%',
            }}
            sx={{ mt: 1 }}
          >
            Daftar Vendor
          </Button>
          <Button
            sx={{ mt: 1 }}
            style={{ color: 'grey' }}
            onClick={handleClose}
            size="large"
          >
            Kembali
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}