import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CreateVendor from "./EditVendor";
import InvoicePage from "./InvoicePage"; // Import the InvoicePage component
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import RecordDialog from "./record/RecordDialog";
import InfoVendor from "./InfoVendor";



function VendorList() {
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showCreateVendorDialog, setShowCreateVendorDialog] = useState(false);
  const [selectedCreateVendor, setSelectedCreateVendor] = useState(null);
  const [showRecordDialog, setShowRecordDialog] = useState(false);
  const [recordDialogData, setRecordDialogData] = useState(null);

  const [showInfoVendorDialog, setShowInfoVendorDialog] = useState(false); // New state
  const [infoVendorData, setInfoVendorData] = useState(null); // New state

  const navigate = useNavigate();
  const location = useLocation();
  const [vendorMap, setVendorMap] = useState({});

  // useEffect(() => {
  // // Create a dummy data entry
  // const dummyData = {
  //   vendor_id: 1, // You can use any unique ID
  //   vendor_name: "Dummy Vendor",
  //   vendor_location: "Dummy Location",
  //   baucarToClaim: 10,
  //   baucarCountRedeemed: 5,
  // };

  // // Set the dummy data in the vendorMap
  // setVendorMap({ 1: dummyData }); // Use a unique key like vendor_id for the entry
  // }, []);

  const handleDoubleClickVendorName = (row) => {
    // Handle double-click on the vendor name
    setInfoVendorData(row);
    setShowInfoVendorDialog(true);
  };


  const handleRekodClick = (row) => {
    // Extract the necessary information from the row
    const { vendor_id, vendor_name, vendor_location, baucarToClaim, baucarCountRedeemed } = row;

    // Create an object with the required data
    const rowData = {
      vendor_id,
      vendor_name,
      vendor_location,
      baucarToClaim,
      baucarCountRedeemed,
    };

    // Set the rowData to state
    setRecordDialogData(rowData);

    // Show the RecordDialog
    setShowRecordDialog(true);
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
        // fetch('https://kebajikansiswa.usm.my/api/vendor-table') // Replace with the appropriate URL
    // fetch(`${process.env.NODE_ENV === 'development' ? process.env.DEV_URL : process.env.PROD_URL }vendor-table`)
    // fetch('https://kebajikansiswa.usm.my/api/vendor-table') // Replace with the appropriate URL
        fetch('https://kebajikansiswa.usm.my/api/vendor-table') // Replace with the appropriate URL

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
      renderCell: (params) => (
        <div style={{ color: "blue" }}>
          {params.value}
        </div>
      ),
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
            onClick={() => handleRekodClick(params.row)}
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

  const rows = Object.values(vendorMap);
  const getRowId = (row) => row.vendor_id;

  return (
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          getRowId={getRowId}
          onCellDoubleClick={(params) => {
            // Check if the double-click occurred in the "Nama Vendor" column
            if (params.field === "vendor_name") {
              handleDoubleClickVendorName(params.row);
            }
          }}
        />
      </Box>
      {showCreateVendorDialog && selectedCreateVendor && (
        <CreateVendor
          selectedVendor={selectedCreateVendor}
          onClose={() => setShowCreateVendorDialog(false)}
        />

      )}
      {showRecordDialog && recordDialogData && (
        <RecordDialog
          open={showRecordDialog}
          onClose={() => setShowRecordDialog(false)}
          recordDialogData={recordDialogData}
        />
      )}

      {showInfoVendorDialog && infoVendorData && (
        <InfoVendor
          open={showInfoVendorDialog}
          vendorData={infoVendorData}
          onClose={() => setShowInfoVendorDialog(false)}
        />
      )}
    </div>
  );
}

export default VendorList;