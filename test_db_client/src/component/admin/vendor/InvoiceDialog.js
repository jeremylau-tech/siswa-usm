import React from "react";
import jsPDF from "jspdf";
import "jspdf-invoice-template";
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
    const pdf = new jsPDF();
    pdf.setFontSize(14);

    // Define the content of the invoice
    const content = `
    Invoice for: ${selectedVendor.VendorName}
    ID Vendor: ${selectedVendor.idVendor}
    Description: ${selectedVendor.description}
    Owner: ${selectedVendor.owner}
    Phone No: ${selectedVendor.phoneNo}
    Email: ${selectedVendor.email}
    Registration Date: ${selectedVendor.registrationDate}

    Products:
    - Product A: 2 units x $50.00
    - Product B: 3 units x $30.00

    Total: $190.00
    `;

    // Set the content and create the PDF
    pdf.text(content, 10, 10);

    // Save the PDF or open it in a new window
    pdf.save(`Invoice_${selectedVendor.VendorName}.pdf`);
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