import React, { useState,useEffect } from "react";
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
  const [vendorMap, setVendorMap] = useState({});

  const handleRekodClick = (rowId) => {
    // Handle the Rekod button click for the row with the given ID
    console.log(`Rekod button clicked for row with ID: ${rowId}`);
  };

  const handleTuntutanClick = (row) => {
    // Handle the Tuntutan button click for the row
    // alert(row)
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

  useEffect(() => {
    // Make an HTTP GET request to the /vendor-all endpoint
    fetch('http://localhost:8000/vendor-table') // Replace with the appropriate URL
      .then(res => res.json())
      .then(data => {
        // Update the state with the retrieved data
        setVendorMap(data.vendors);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
  }, []);
  console.log(vendorMap)

  const columns = [
    {
      field: "vendor_id",
      headerName: "ID Vendor",
      width: 150,
      editable: false,
    },
    {
      field: "vendor_name",
      headerName: "Nama Vendor",
      width: 150,
      editable: false,
    },
    {
      field: "vendor_location",
      headerName: "Lokasi",
      width: 100,
      editable: false,
    },
    {
      field: "baucarToClaim",
      headerName: "Kupon untuk Dituntut",
      width: 150,
      editable: false,
    },
    {
      field: "baucarCountRedeemed",
      headerName: "Jumlah Kupon Ditebus",
      width: 150,
      editable: false,
    },
    // {
    //   field: "status",
    //   headerName: "Status",
    //   width: 100,
    //   editable: false,
    // },
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
              backgroundColor: params.row.baucarToClaim ? "#fafafa" : "#dcdcdc", // Use different colors based on the condition
              color: params.row.baucarToClaim ? "black" : "#808080", // Adjust text color accordingly
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
            disabled={!params.row.baucarToClaim}
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

  // const rows = [
  //   {
  //     id: 1,
  //     idVendor: "VENDOR123",
  //     VendorName: "Vendor A",
  //     location: "Location A",
  //     couponUsed: 10,
  //     couponUsedTotal: 100,
  //     status: "Active",
  //     logoUrl: "https://img.freepik.com/premium-vector/catering-quality-food-design-logo_187482-593.jpg",
  //     description: "Vegan Food",
  //     owner: "Kassim Bin Ahmad",
  //     phoneNo: "0123456789",
  //     email: "kassim@usm.my",
  //     registrationDate: "01/03/2022",
  //     bank: "Maybank",
  //     accountNo: "123456789",
  //     accountName: "Kassim Bin Ahmad",
  //   },
  //   {
  //     id: 2,
  //     idVendor: "VENDOR456",
  //     VendorName: "Vendor B",
  //     location: "Location B",
  //     couponUsed: 5,
  //     couponUsedTotal: 5,
  //     status: "Active",
  //     logoUrl: "https://img.freepik.com/premium-vector/catering-quality-food-design-logo_187482-593.jpg",
  //     description: "Burger",
  //     owner: "Fahmi Fadzil",
  //     phoneNo: "012232789",
  //     email: "fahmi@usm.my",
  //     registrationDate: "01/01/2021",
  //     bank: "CIMB",
  //     accountNo: "123456789",
  //     accountName: "Shielawanis Binti Shamsuddin",
  //   },
  //   {
  //     id: 3,
  //     idVendor: "VENDOR457",
  //     VendorName: "Vendor C",
  //     location: "Location C",
  //     couponUsed: 5,
  //     couponUsedTotal: 7,
  //     status: "Inactive",
  //     logoUrl: "https://img.freepik.com/premium-vector/catering-quality-food-design-logo_187482-593.jpg",
  //     description: "Nasi Kandar",
  //     owner: "Saifuddin Bin Nasution",
  //     phoneNo: "0123456732",
  //     email: "saufuddin@usm.my",
  //     registrationDate: "01/02/2021",
  //     bank: "HSBC",
  //     accountNo: "123456789",
  //     accountName: "Saifuddin Bin Nasution",
  //   },
  //   // Add more rows with data as needed
  // ];

  const rows = Object.values(vendorMap);
  const getRowId = (row) => row.vendor_id;

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection getRowId={getRowId}/>
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