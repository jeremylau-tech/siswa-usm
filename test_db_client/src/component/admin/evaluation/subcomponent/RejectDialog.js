import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function RejectDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}
          style={{
            backgroundColor:"#ffcdd2",
            color:"#b71c1c",
            fontWeight:"800",
            height:"60px",
            width:"58%",
          }}      
      >
        Permohonan Telah Disemak dan Ditolak
      </Button>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Adakah Anda Pasti? "}
        </DialogTitle>
        <DialogContent>
            <TextField
                sx={{ m:1}}
                id="outlined-multiline-static"
                label="Catatan Kepada Pemohon"
                multiline
                rows={3}
                fullWidth
            />
        </DialogContent>
        <DialogActions>
                <Button sx={{ m:1}} style={{backgroundColor:"#ffcdd2", color:"#b71c1c",fontWeight:"800"}} variant="contained" disableElevation size="large" href="http://localhost:3000/AdminDashboard">
                    Tolak Permohonan</Button>
                <Button sx={{ m:1}} style={{color:"grey"}} onClick={handleClose} 
                          size="large"> Kembali</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}