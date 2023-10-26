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
    // // Create a new window with the invoice template
    const printWindow = window.open("", "", "width=600,height=600");

    // // Define the vendor's information
    // const vendorInfo = {
    //     idVendor: selectedVendor.idVendor,
    //     description: selectedVendor.description,
    //     owner: selectedVendor.owner,
    //     phoneNo: selectedVendor.phoneNo,
    //     email: selectedVendor.email,
    //     registrationDate: selectedVendor.registrationDate,
    // };

    // // Replace placeholders in the template with actual data
    // let invoiceHTML = invoiceTemplate; // Load your HTML template (invoiceTemplate) here
    // for (const key in vendorInfo) {
    //     const regex = new RegExp(`{${key}}`, "g");
    //     invoiceHTML = invoiceHTML.replace(regex, vendorInfo[key]);
    // }

    // // Write the populated HTML to the new window
    // printWindow.document.open();
    // printWindow.document.write(invoiceHTML);
    // printWindow.document.close();

    // Print the new window
    printWindow.print();
    printWindow.close();
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