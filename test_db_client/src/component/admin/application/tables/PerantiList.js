import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { saveAs } from 'file-saver';
import Container from "@mui/material/Container";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Typography from "@mui/material/Typography";
import Paper from '@mui/material/Paper';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';



const downloadDataAsCSV = () => {
  const csvData = rows.map((row) => `${row.id},${row.referenceNumber},${row.name},${row.dateOfApplication},${row.status},${row.amountOfMoney}`).join('\n');
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
  saveAs(blob, 'data.csv');
};

const columns = [
  {
    field: "referenceNumber",
    headerName: "No Rujukan",
    width: 150,
    editable: false,
  },
  {
    field: "name",
    headerName: "Nama Pelajar",
    width: 250,
    editable: false,
  },
  {
    field: "dateOfApplication",
    headerName: "Tarikh Permohonan",
    width: 200,
    editable: false,
  },
  {
    field: "amountOfMoney",
    headerName: "Amaun",
    width: 150,
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    width: 200,
    editable: false,
    renderCell: (params) => {
      const status = params.value;
      let textColor = "white"; // You can change the text color as needed
      let backgroundColor = ""; // You can change the background color as needed

      switch (status) {
        case "New":
          textColor = "#ff8f00"
          backgroundColor = "#ffecb3"
          break;
        case "Pending":
          textColor = "#757575"
          backgroundColor = "#eeeeee"
          break;
        case "Approved":
          textColor = "#558b2f"
          backgroundColor = "#dcedc8"
          break;
        case "Rejected":
          textColor = "#e53935"
          backgroundColor = "#ffcdd2"
          break;
        default:
          break;
      }

      const cellStyle = {
        color: textColor,
        padding : 2,
        fontSize: 12,
        fontWeight: "bold",
        width: 90,
      };

      const paperStyle = {
        backgroundColor: backgroundColor,
        borderRadius: 25,
      };

      return (
        <Paper
          square={false}
          elevation={0}
          style={paperStyle}
        >
        <div style={cellStyle}>
          {params.value}
        </div>
        </Paper>
      );},
  },
  {
    field: "actions",
    headerName: "Tindakan",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <Button
        style = {{
          backgroundColor: "#fafafa", 
          color: "black", 
          fontWeight: "bold", 
          boxShadow: "none",
          outlineColor: "lightgrey",
          outlineStyle: "solid",
          outlineWidth: "1.5px",
          width: 150,
          textTransform: "none",
          padding: "3px",
        }}
        variant="contained"
        onClick={() => handleButtonClick(params.row.id)}
      >
        <span style={{ marginRight: "20px" }}>{getStatusButtonText(params.row.status).icon}</span>
          {getStatusButtonText(params.row.status).text}
      </Button>
    ),
  },
];
  
  
  const rows = [
    {
      id: 1,
      referenceNumber: "REF12345",
      name: "John Doe",
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
  
  
  const getStatusButtonText = (status) => {
    let buttonText = "";
    let icon = null;
  
    switch (status) {
      case "Pending":
        buttonText = "Lihat";
        icon = <RemoveRedEyeRoundedIcon />;
        break;
      case "New":
        buttonText = "Semak";
        icon = <RuleRoundedIcon />;
        break;
      case "Approved":
        buttonText = "Lihat";
        icon = <RemoveRedEyeRoundedIcon />;
        break;
      case "Rejected":
        buttonText = "Teliti";
        icon = <QuizRoundedIcon />;
        break;
      default:
        buttonText = "Unknown";
        break;
    }
  
    return { text: buttonText, icon: icon };
  };
  
  const handleButtonClick = (rowId) => {
  // Add your logic here to handle the button click for the row with the given ID
  console.log(`Button clicked for row with ID: ${rowId}`);
  };
  
  
  function PerantiList(){
    const filteredRows = rows.filter(row => row.status != "New");
  return (
     <Box sx={{ height: 400, width: "100%" }}>
        <Box sx={{ flexGrow: 1,}}
        margin={1}
        align={"right"}
        >
          <Button variant="contained" 
          style={{
            color: "#424242",
            textTransform: "none",
            backgroundColor: "#eeeeee",
            boxShadow: "none",
          }
          }
           onClick={downloadDataAsCSV}>
            Muat Turun
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
          rows={filteredRows}
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

  export default PerantiList;
