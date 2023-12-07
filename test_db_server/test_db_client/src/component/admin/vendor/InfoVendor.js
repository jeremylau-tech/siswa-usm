import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography'; // Import Typography

export default function InfoVendor({ open, vendorData, onClose }) {
  const sectionStyle = {
    marginBottom: '20px',
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <section style={sectionStyle}>
          <Typography variant="h6">Maklumat Vendor:</Typography>
          <Typography variant="body2">
            <div>
              <strong>Nama Vendor:</strong> {vendorData.vendorName}
            </div>
            <div>
              <strong>Lokasi:</strong> {vendorData.vendorLocation}
            </div>
            <div>
              <strong>Deskripsi:</strong> {vendorData.vendorDescription}
            </div>
          </Typography>
        </section>
        <hr />
        <section style={sectionStyle}>
          <Typography variant="h6">Maklumat Pemilik:</Typography> {/* Use variant="h6" for larger text */}
          <Typography variant="body2">
            <div>
              <strong>Nama Penuh Pemilik Vendor:</strong> {vendorData.vendorFullname}
            </div>
            <div>
              <strong>No Telefon:</strong> {vendorData.vendorPhoneNo}
            </div>
            <div>
              <strong>Emel:</strong> {vendorData.vendorEmail}
            </div>
          </Typography>
        </section>
        <hr />
        <section style={sectionStyle}>
          <Typography variant="h6">Maklumat Akaun Bank Pemilik:</Typography> {/* Use variant="h6" for larger text */}
          <Typography variant="body2">
            <div>
              <strong>Nama Pemilik Akaun:</strong> {vendorData.vendorBankAccName}
            </div>
            <div>
              <strong>Nombor Akaun Bank:</strong> {vendorData.vendorBankAccNo}
            </div>
            <div>
              <strong>Nama Bank:</strong> {vendorData.vendorBankName}
            </div>
          </Typography>
        </section>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}