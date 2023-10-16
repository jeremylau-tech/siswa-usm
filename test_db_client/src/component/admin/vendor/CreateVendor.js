import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          />
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Lokasi"
            type="location"
            fullWidth
            variant="outlined"
          />
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Deskripsi"
            type="description"
            fullWidth
            variant="outlined"
          />
        <Box style={{  alignContent: 'center', paddingTop:'20px' }}>
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
        </Box>
        <Divider style={{paddingTop:'20px'}}/>
        <Typography variant="h7" gutterBottom style={{paddingTop:'10px'}}> Maklumat Pemilik </Typography>
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Nama Pemilik Vendor"
            type="owner"
            fullWidth
            variant="outlined"
          />
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="No Telefon"
            type="phoneNo"
            fullWidth
            variant="outlined"
          />
        <TextField
            autoFocus
            margin="dense"
            id="outlined-basic"
            label="Emel"
            type="email"
            fullWidth
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
                <Button
                      variant="contained"
                      onClick={handleClose}
                      disableElevation={true}
                      style={{ backgroundColor: "#424242", color: "#fff", fontWeight: "bold", width: "30%" }}
                      sx={{ mt: 1 }}>
                    Daftar Vendor </Button>
                <Button sx={{ mt :1}} style={{color:"grey"}} onClick={handleClose} 
                    size="large"> Kembali</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}