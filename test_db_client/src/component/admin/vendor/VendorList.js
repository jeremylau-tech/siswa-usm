import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CreateVendor from "./EditVendor";
import InvoicePage from "./InvoicePage"; // Import the InvoicePage component
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";



function VendorList() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showCreateVendorDialog, setShowCreateVendorDialog] = useState(false);
  const [selectedCreateVendor, setSelectedCreateVendor] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRekodClick = (rowId) => {
    // Handle the Rekod button click for the row with the given ID
    console.log(`Rekod button clicked for row with ID: ${rowId}`);
  };

  const handleTuntutanClick = (row) => {
    // Handle the Tuntutan button click for the row
    console.log("Tuntutan button clicked for row:", row);
    setSelectedVendor(row);
    console.log('Hello')
    navigate("/InvoicePage", { state: { row } });
  };

  const handleEditClick = (row) => {
    // Handle the Edit button click for the row
    console.log("Edit button clicked for row:", row);
    setSelectedCreateVendor(row); // Store the selected vendor for editing
    setShowCreateVendorDialog(true); // Show the CreateVendor dialog
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
      logoUrl: "https://static.wixstatic.com/media/951be0_064baafbc96f4ccda4a094e6f8cd8066~mv2.png/v1/fill/w_240,h_106,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/He%26She_Black_Logo.png",
      description: "Vegan Food",
      owner: "Kassim Bin Ahmad",
      phoneNo: "0123456789",
      email: "kassim@usm.my",
      registrationDate: "01/03/2022",
      bank: "Maybank",
      accountNo: "123456789",
      accountName: "Kassim Bin Ahmad",
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
      bank: "CIMB",
      accountNo: "123456789",
      accountName: "Shielawanis Binti Shamsuddin",
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
      bank: "HSBC",
      accountNo: "123456789",
      accountName: "Saifuddin Bin Nasution",
    },
    // Add more rows with data as needed
  ];

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      </Box>
      {showCreateVendorDialog && selectedCreateVendor && (
        <CreateVendor
          selectedVendor={selectedCreateVendor}
          onClose={() => setShowCreateVendorDialog(false)}
        />
      )}
    </div>
  );
}

export default VendorList;