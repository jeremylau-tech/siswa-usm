import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';

const columns = [
  {
    field: "referenceNumber",
    headerName: "No Rujukan",
    width: 150,
    editable: false,
  },
  {
    field: "UsedCoupon",
    headerName: "Tarikh Digunakan",
    width: 150,
    editable: false,
  },
  {
    field: "Vendor",
    headerName: "Vendor",
    width: 150,
    editable: false,
  },
];

const rows = [
  {
    id: 1,
    referenceNumber: "REF12345",
    UsedCoupon: "2023-12-20",
    Vendor: "Cafe Restu",
  },
  {
    id: 2,
    referenceNumber: "REF54321",
    UsedCoupon: "2023-12-20",
    Vendor: "Cafe Restu",
  },
  {
    id: 3,
    referenceNumber: "REF98765",
    UsedCoupon: "2023-12-20",
    Vendor: "Cafe Restu",
  },
  // Add more rows with new sample data as needed
];

function HistoryFoodApplication() {
  const filteredRows = rows.filter((row) => row.status !== "Baharu");

  return (
    <Box sx={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={filteredRows}
        columns={columns}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        style={{ width: '550px' }} 
      />
    </Box>
  );
}

export default HistoryFoodApplication;
