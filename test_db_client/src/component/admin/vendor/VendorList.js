import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import InvoicePage from "./InvoiceDialog"; // Import the InvoicePage component\


function VendorList() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showInvoiceDialog, setShowInvoiceDialog] = useState(false);

  const handleRekodClick = (rowId) => {
    // Handle the Rekod button click for the row with the given ID
    console.log(`Rekod button clicked for row with ID: ${rowId}`);
  };

  const handleTuntutanClick = (row) => {
    // Handle the Tuntutan button click for the row
    console.log("Tuntutan button clicked for row:", row);
    setSelectedVendor(row);
    setShowInvoiceDialog(true);
  };

  const handleEditClick = (row) => {
    // Handle the Edit button click for the row
    console.log("Edit button clicked for row:", row);
    // Implement the logic to edit the vendor's information here.
  };


  const columns = [
    {
      field: "idVendor",
      headerName: "ID Vendor",
      width: 150,
      editable: false,
    },
    {
      field: "VendorName",
      headerName: "Nama Vendor",
      width: 150,
      editable: false,
    },
    {
      field: "location",
      headerName: "Lokasi",
      width: 100,
      editable: false,
    },
    {
      field: "couponUsed",
      headerName: "Kupon untuk Dituntut",
      width: 150,
      editable: false,
    },
    {
      field: "couponUsedTotal",
      headerName: "Kupon Telah Diguna",
      width: 150,
      editable: false,
    },
    {
      field: "status",
      headerName: "Status",
      width: 100,
      editable: false,
    },
    {
      field: "tindakan",
      headerName: "Tindakan",
      width: 300,
      sortable: false,
      renderCell: (params) => (
        <div>
          <Button
            style={{
              backgroundColor: "#fafafa",
              color: "black",
              fontWeight: "bold",
              boxShadow: "none",
              outlineColor: "lightgrey",
              outlineStyle: "solid",
              outlineWidth: "1.5px",
              width: 80,
              textTransform: "none",
              padding: "3px",
              margin: "10px",
            }}
            variant="contained"
            color="primary"
            onClick={() => handleRekodClick(params.row.id)}
          >
            Rekod
          </Button>
          <Button
            style={{
              backgroundColor: "#fafafa",
              color: "black",
              fontWeight: "bold",
              boxShadow: "none",
              outlineColor: "lightgrey",
              outlineStyle: "solid",
              outlineWidth: "1.5px",
              width: 80,
              textTransform: "none",
              padding: "3px",
            }}
            variant="contained"
            color="secondary"
            onClick={() => handleTuntutanClick(params.row)}
          >
            Tuntutan
          </Button>
          <Button
            style={{
              backgroundColor: "#fafafa",
              color: "black",
              fontWeight: "bold",
              boxShadow: "none",
              outlineColor: "lightgrey",
              outlineStyle: "solid",
              outlineWidth: "1.5px",
              width: 10,
              textTransform: "none",
              padding: "3px",
              margin: "10px",
            }}
            variant="contained"
            color="secondary"
            onClick={() => handleEditClick(params.row)}
          >
            <EditRoundedIcon />
          </Button>
        </div>
      ),
    },
  ];

  const rows = [
    {
      id: 1,
      idVendor: "VENDOR123",
      VendorName: "Vendor A",
      location: "Location A",
      couponUsed: 10,
      couponUsedTotal: 100,
      status: "Active",
      logoUrl: "https://img.freepik.com/premium-vector/catering-quality-food-design-logo_187482-593.jpg",
      description: "Vegan Food",
      owner: "Kassim Bin Ahmad",
      phoneNo: "0123456789",
      email: "kassim@usm.my",
      registrationDate: "01/03/2022",
    },
    {
      id: 2,
      idVendor: "VENDOR456",
      VendorName: "Vendor B",
      location: "Location B",
      couponUsed: 5,
      couponUsedTotal: 5,
      status: "Active",
      logoUrl: "https://img.freepik.com/premium-vector/catering-quality-food-design-logo_187482-593.jpg",
      description: "Burger",
      owner: "Fahmi Fadzil",
      phoneNo: "012232789",
      email: "fahmi@usm.my",
      registrationDate: "01/01/2021",
    },
    {
      id: 3,
      idVendor: "VENDOR457",
      VendorName: "Vendor C",
      location: "Location C",
      couponUsed: 5,
      couponUsedTotal: 7,
      status: "Inactive",
      logoUrl: "https://img.freepik.com/premium-vector/catering-quality-food-design-logo_187482-593.jpg",
      description: "Nasi Kandar",
      owner: "Saifuddin Bin Nasution",
      phoneNo: "0123456732",
      email: "saufuddin@usm.my",
      registrationDate: "01/02/2021",
    },
    // Add more rows with data as needed
  ];

  return (

    <div>
      <Box sx={{
        height: 400,
        width: "100%",
      }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      </Box>
      {showInvoiceDialog && selectedVendor && (
        <InvoicePage selectedVendor={selectedVendor} onClose={() => setShowInvoiceDialog(false)} />
      )}
    </div>
  );
}

export default VendorList;


