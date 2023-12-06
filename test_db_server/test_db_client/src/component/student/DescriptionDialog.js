import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Description from '@mui/icons-material/Description';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function DescriptionDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="" onClick={handleClickOpen}>
        <Description></Description>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Makluman
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Work in progress
            {/* Sukacita dimaklumkan permohonan anda telah diterima pada 5/8/2023 dan sedang diproses. */}
          </Typography>
          <br/>
          <Typography gutterBottom>
            {/* Amaun yang diluluskan adalah RM500.00.
            Transaksi akan dibuat dalam 5 hari waktu bekerja selepas tarikh diluluskan 
            dan akan dihantar ke akaun bank anda. */}
          </Typography>
          <br/>
          <Typography gutterBottom>
            {/* Sila hubungi pihak kami jika terdapat sebarang kelewatan atau pertanyaan di talian 03-12345678. */}
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}