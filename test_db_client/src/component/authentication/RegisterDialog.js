import React from 'react';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import styled from '@mui/material/styles/styled';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
// Import styles

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

function RegistrationDialog({ open, handleClose } ) {
  const [maxWidth, ] = React.useState('md');
  const [fullWidth, ] = React.useState(true);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth={fullWidth} maxWidth={maxWidth}  
    sx={{
      backdropFilter: "blur(5px) sepia(5%)",
    }}
    // 👇 Props passed to Paper (modal content)
    PaperProps={{ sx: { borderRadius: "20px" } }}>
      <Grid container
        sx={{
          width: '100%',
          height: '100%',
        }}
      >
        <Grid item xs={12} sm={6}>
          <img
             style={{
              width: '100%',
              height: '100%', // Set the height to 100%
              objectFit:"cover"
            }}
          src="https://referencephsusm.files.wordpress.com/2011/07/img_5080.jpg" alt="banner.jpg"  />
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
          <Typography variant="h5" 
          style={{ 
            margin: '10px',
            marginBottom:'60px',
            fontWeight: 'bolder', 
          }}>
            Daftar Pengguna Baharu
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Nama Penuh"
            type="name"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Emel Pelajar (@student.usm.my)"
            type="email"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="No Telefon"
            type="phone"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="No Matrik"
            type="matricnumber"
            fullWidth
            variant="outlined"
          />
          <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Tahun Pengajian (1/2/3/4)"
            type="year"
            fullWidth
            variant="outlined"
          />
          <Button 
            style={{
                color: "black",
                backgroundColor: "#eeeeee",
                marginTop: '10px',
                padding: '20px', 
            }}
            component="label" 
            fullWidth
            startIcon={<CloudUploadIcon />}>
                Muat Naik Salinan Kad Matrik (.pdf)
                <VisuallyHiddenInput type="file" />
          </Button>
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
            type="submit">
              Daftar Pengguna
            </Button>
          </Box>

        </Grid>
      </Grid>
    </Dialog>
  );
}

export default RegistrationDialog;
