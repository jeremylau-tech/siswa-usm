import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { saveAs } from 'file-saver';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Paper from '@mui/material/Paper';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import QuizRoundedIcon from '@mui/icons-material/QuizRounded';
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";

const downloadDataAsCSV = () => {
  // Create a header row with column names
  const header = 'ID,Reference Number,Name,Date of Application,Status,Amount of Money';

  // Create a CSV content string by combining the header and data
  const csvData = [header].concat(
    rows.map((row) =>
      `${row.id},${row.referenceNumber},${row.name},${row.dateOfApplication},${row.status},${row.amountOfMoney}`
    )
  ).join('\n');

  // Create a Blob with the CSV content
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

  // Use a library like FileSaver.js or implement the saveAs function
  // to trigger the download. Here's how you can use FileSaver.js:
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
          case "Baharu":
            textColor = "#ff8f00"
            backgroundColor = "#ffecb3"
            break;
          case "Pengesahan":
            textColor = "#757575"
            backgroundColor = "#eeeeee"
            break;
          case "Diluluskan":
            textColor = "#558b2f"
            backgroundColor = "#dcedc8"
            break;
          case "Ditolak":
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
      amountOfMoney: "1000",
      status: "Pengesahan",
    },
    {
      id: 2,
      referenceNumber: "REF54321",
      name: "Jane Doe",
      dateOfApplication: "2023-09-15",
      amountOfMoney: "1500",
      status: "Baharu",
    },
    {
      id: 3,
      referenceNumber: "REF98765",
      name: "Alice Smith",
      dateOfApplication: "2023-09-18",
      amountOfMoney: "800",
      status: "Ditolak",
    },
    {
      id: 4,
      referenceNumber: "REF24680",
      name: "Bob Johnson",
      dateOfApplication: "2023-09-20",
      amountOfMoney: "2000",
      status: "Diluluskan",
    },
    {
      id: 5,
      referenceNumber: "REF13579",
      name: "Eve Brown",
      dateOfApplication: "2023-09-22",
      amountOfMoney: "1200",
      status: "Pengesahan",
    },
    {
      id: 6,
      referenceNumber: "REF88888",
      name: "Charlie Wilson",
      dateOfApplication: "2023-09-24",
      amountOfMoney: "1800",
      status: "Baharu",
    },
    {
      id: 7,
      referenceNumber: "REF77777",
      name: "David Davis",
      dateOfApplication: "2023-09-26",
      amountOfMoney: "2500",
      status: "Diluluskan",
    },
    {
      id: 8,
      referenceNumber: "REF66666",
      name: "Emily White",
      dateOfApplication: "2023-09-28",
      amountOfMoney: "1300",
      status: "Pengesahan",
    },
    {
      id: 9,
      referenceNumber: "REF55555",
      name: "Fiona Green",
      dateOfApplication: "2023-09-30",
      amountOfMoney: "1600",
      status: "Baharu",
    },
    {
      id: 10,
      referenceNumber: "REF44444",
      name: "George Adams",
      dateOfApplication: "2023-10-02",
      amountOfMoney: "900",
      status: "Ditolak",
    },
    // Add more rows with new sample data as needed
  ];
  
  
  const getStatusButtonText = (status) => {
    let buttonText = "";
    let icon = null;
  
    switch (status) {
      case "Pengesahan":
        buttonText = "Sahkan";
        icon = <CheckCircleRounded />;
        break;
      case "Baharu":
        buttonText = "Semak";
        icon = <RuleRoundedIcon />;
        break;
      case "Diluluskan":
        buttonText = "Lihat";
        icon = <RemoveRedEyeRoundedIcon />;
        break;
      case "Ditolak":
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
  
  
  function KewanganList(){
    const filteredRows = rows.filter((row) => row.status != "Baharu");

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

  export default KewanganList;
