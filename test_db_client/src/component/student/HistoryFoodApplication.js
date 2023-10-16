import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';

const columns = [
  {
    field: "referenceNumber",
    headerName: "No Rujukan",
    width: 200,
    editable: false,
  },
  {
    field: "dateOfApplication",
    headerName: "Tarikh Permohonan",
    width: 250,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 250,
    editable: false,
    renderCell: (params) => {
      const status = params.value;
      let textColor = "white";
      let backgroundColor = "";

      switch (status) {
        case "Baharu":
          textColor = "#ff8f00";
          backgroundColor = "#ffecb3";
          break;
        case "Telah Digunakan":
          textColor = "#757575";
          backgroundColor = "#eeeeee";
          break;
        case "Luput Tarikh Tempoh":
          textColor = "#e53935";
          backgroundColor = "#ffcdd2";
          break;
        default:
          break;
      }

      const cellStyle = {
        color: textColor,
        padding: 2,
        fontSize: 12,
        fontWeight: "bold",
        width: 150,
      };

      const paperStyle = {
        backgroundColor: backgroundColor,
        borderRadius: 25,
      };

      return (
        <Paper square={false} elevation={0} style={paperStyle}>
          <div style={cellStyle}>
            {params.value}
          </div>
        </Paper>
      );
    },
  },
];

const rows = [
  {
    id: 1,
    referenceNumber: "REF12345",
    dateOfApplication: "2023-09-13",
    status: "Telah Digunakan",
  },
  {
    id: 2,
    referenceNumber: "REF54321",
    dateOfApplication: "2023-09-15",
    status: "Telah Digunakan",
  },
  {
    id: 3,
    referenceNumber: "REF98765",
    dateOfApplication: "2023-09-18",
    status: "Luput Tarikh Tempoh",
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
        style={{ width: '800px' }} 
      />
    </Box>
  );
}

export default HistoryFoodApplication;
