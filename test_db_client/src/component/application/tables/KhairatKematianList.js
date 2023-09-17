import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { saveAs } from 'file-saver';
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Icon from '@mui/material/Icon';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

const downloadDataAsCSV = () => {
  const csvData = rows.map((row) => `${row.id},${row.referenceNumber},${row.name},${row.dateOfApplication},${row.status},${row.amountOfMoney}`).join('\n');
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'data.csv');
};

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "referenceNumber",
      headerName: "No Rujukan",
      width: 150,
      editable: false,
    },
    {
      field: "name",
      headerName: "Nama Pelajar",
      width: 150,
      editable: false,
    },
    {
      field: "dateOfApplication",
      headerName: "Tarikh Permohonan",
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
      field: "amountOfMoney",
      headerName: "Amaun Wang (RM)",
      width: 150,
      editable: false,
    },
    {
      field: "actions",
      headerName: "Tindakan",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color={getStatusButtonColor(params.row.status)}
          onClick={() => handleButtonClick(params.row.id)}
        >
          {getStatusButtonText(params.row.status)}
        </Button>
      ),
    },
  ];
  
  
  const rows = [
    {
      id: 1,
      referenceNumber: "REF12345",
      name: "Aiman Doe",
      dateOfApplication: "2023-09-13",
      status: "Pending",
      amountOfMoney: "1000",
    },
    {
      id: 2,
      referenceNumber: "REF54321",
      name: "Jane Doe",
      dateOfApplication: "2023-09-15",
      status: "New",
      amountOfMoney: "1500",
    },
    {
      id: 3,
      referenceNumber: "REF98765",
      name: "Alice Smith",
      dateOfApplication: "2023-09-18",
      status: "Rejected",
      amountOfMoney: "800",
    },
    {
      id: 4,
      referenceNumber: "REF24680",
      name: "Bob Johnson",
      dateOfApplication: "2023-09-20",
      status: "Approved",
      amountOfMoney: "2000",
    },
    {
      id: 5,
      referenceNumber: "REF13579",
      name: "Eve Brown",
      dateOfApplication: "2023-09-22",
      status: "Pending",
      amountOfMoney: "1200",
    },
    {
      id: 6,
      referenceNumber: "REF88888",
      name: "Charlie Wilson",
      dateOfApplication: "2023-09-24",
      status: "New",
      amountOfMoney: "1800",
    },
    {
      id: 7,
      referenceNumber: "REF77777",
      name: "David Davis",
      dateOfApplication: "2023-09-26",
      status: "Approved",
      amountOfMoney: "2500",
    },
    {
      id: 8,
      referenceNumber: "REF66666",
      name: "Emily White",
      dateOfApplication: "2023-09-28",
      status: "Pending",
      amountOfMoney: "1300",
    },
    {
      id: 9,
      referenceNumber: "REF55555",
      name: "Fiona Green",
      dateOfApplication: "2023-09-30",
      status: "New",
      amountOfMoney: "1600",
    },
    {
      id: 10,
      referenceNumber: "REF44444",
      name: "George Adams",
      dateOfApplication: "2023-10-02",
      status: "Rejected",
      amountOfMoney: "900",
    },
    // Add more rows with new sample data as needed
  ];
  
  // Function to determine the button color based on the status
  const getStatusButtonColor = (status) => {
    switch (status) {
      case "Pending":
      case "Rejected":
        return "info"; // Use your preferred shade of grey
      case "New":
      case "Approved":
        return "success";
      default:
        return "default";
    }
  };
  
  const getStatusButtonText = (status) => {
    switch (status) {
      case "Pending":
        return "Lihat";
      case "New":
        return "Semak";
      case "Approved":
        return "Lihat";
      case "Rejected":
        return "Semak Semula";
      default:
        return "Unknown";
    }
  };
  
  const handleButtonClick = (rowId) => {
  // Add your logic here to handle the button click for the row with the given ID
  console.log(`Button clicked for row with ID: ${rowId}`);
  };
  
  
  function KhairatKematianList(){
  return (
    <Box sx={{ height: 400, width: "80%" }}>
        <Box sx={{ flexGrow: 1,}}
        margin={1}
        align={"right"}
        >
          <Button variant="contained" color="primary" onClick={downloadDataAsCSV}>
            MUAT TURUN
            <DownloadRoundedIcon
              sx={{ ml: 1 }}
            />
          </Button>
          <Typography
            variant="body2"
            color="text.secondary"
            fontStyle={"italic"}
            fontSize={12}
          >  format .CSV </Typography>
        </Box>
    <DataGrid
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 5,
          },
        },
      }}
      pageSizeOptions={[5]}
      checkboxSelection
      disableRowSelectionOnClick
    />
  </Box>
  );
  }

  export default KhairatKematianList;
