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