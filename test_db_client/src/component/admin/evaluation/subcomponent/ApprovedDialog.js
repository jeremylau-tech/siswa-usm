import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export default function ApprovedDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button 
      style={{
        backgroundColor:"#c8e6c9",
        color:"#33691e",
        fontWeight:"800",
        height:"60px",
        width:"60%",
      }}
      onClick={handleClickOpen}>
        Permohonan Telah Disemak dan Layak Diterima
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
                label="Catatan Kepada Pegawai"
                multiline
                rows={3}
                fullWidth
            />
        </DialogContent>
        <DialogActions>
                <Button sx={{ m:1}} style={{backgroundColor:"#c8e6c9", color:"#33691e",fontWeight:"800"}} variant="contained" disableElevation size="large" href="http://localhost:3000/AdminDashboard">
                    Hantar untuk Pengesahan</Button>
                <Button sx={{ m:1}} style={{color:"grey"}} onClick={handleClose} 
                          size="large"> Kembali</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}