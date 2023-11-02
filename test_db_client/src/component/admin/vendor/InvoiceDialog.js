import React from "react";
import jsPDF from "jspdf";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { renderToString } from "react-dom/server";


function InvoiceDialog({ selectedVendor, onClose }) {
  const handlePrint = () => {
    //   const pdf = new jsPDF();
    //   pdf.setFontSize(14);

    //   const htmlTemplate = `

    // `;

    //   // Set the content and create the PDF
    //   pdf.fromHTML(htmlTemplate, 10, 10);

    //   // Save the PDF or open it in a new window
    const string = renderToString(<Prints />);
    const pdf = new jsPDF("p", "mm", "a4");

    pdf.fromHTML(string);

    pdf.save(`Invoice_${selectedVendor.VendorName}.pdf`);
  };

  const Prints = () => (
    <div>
      <h1>Invoice for: ${selectedVendor.VendorName}</h1>
      <p>ID Vendor: ${selectedVendor.idVendor}</p>
      <p>Description: ${selectedVendor.description}</p>
      <p>Owner: ${selectedVendor.owner}</p>
      <p>Phone No: ${selectedVendor.phoneNo}</p>
      <p>Email: ${selectedVendor.email}</p>
      <p>Registration Date: ${selectedVendor.registrationDate}</p>

      <h2>Products:</h2>
      <ul>
        <li>Product A: 2 units x $50.00</li>
        <li>Product B: 3 units x $30.00</li>
      </ul>

      <p>Total: $190.00</p>
    </div>
  );

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