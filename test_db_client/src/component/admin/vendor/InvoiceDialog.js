import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

function InvoiceDialog({ selectedVendor, onClose }) {
    const handlePrint = () => {
        window.print();
        };
    
  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm">
      <DialogTitle>
        Invoice for {selectedVendor.VendorName}
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <img
            src={selectedVendor.logoUrl}
            alt={selectedVendor.VendorName}
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
          
          <Typography>ID Vendor: {selectedVendor.idVendor}</Typography>
          <Typography>Description: {selectedVendor.description}</Typography>
          <Typography>Owner: {selectedVendor.owner}</Typography>
          <Typography>Phone No: {selectedVendor.phoneNo}</Typography>
          <Typography>Email: {selectedVendor.email}</Typography>
          <Typography>Registration Date: {selectedVendor.registrationDate}</Typography>
        </Box>
      </DialogContent>
      <Box display="flex" justifyContent="space-between" p={2}>
        <Button variant="contained" onClick={handlePrint}>
          Print
        </Button>
        <Button variant="contained" onClick={onClose}>
          Close
        </Button>
      </Box>
    </Dialog>
  );
}

export default InvoiceDialog;