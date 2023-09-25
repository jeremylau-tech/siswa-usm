import React from "react";
import { DEFAULT_GRID_COL_TYPE_KEY, DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { saveAs } from 'file-saver';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Paper from '@mui/material/Paper';
import DescriptionIcon from '@mui/icons-material/Description';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import styled from "@emotion/styled";
import DescriptionDialog from "./DescriptionDialog";


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const columns = [
    {
      field: "referenceNumber",
      headerName: "No Rujukan",
      width: 150,
      editable: false,
    },
    {
      field: "assistanceType",
      headerName: "Jenis Bantuan",
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
      headerName: "Catatan",
      width: 100,
      sortable: false,
      renderCell: (params) => {
        const onClick = () => {
          console.log("Clicked");
        };
        return (
          <DescriptionDialog/>
        );
      },
    },
  ];
  
  
  const rows = [
    {
      id: 1,
      referenceNumber: "REF12345",
      assistanceType: "Khairat Kematian",
      dateOfApplication: "2023-09-13",
      amountOfMoney: "1000",
      status: "Pengesahan",
    },
    {
      id: 2,
      referenceNumber: "REF54321",
      assistanceType: "Peranti Pembelajaran",
      dateOfApplication: "2023-09-15",
      amountOfMoney: "1500",
      status: "Diluluskan",
    },
    {
      id: 3,
      referenceNumber: "REF98765",
      assistanceType: "Alice Smith",
      dateOfApplication: "2023-09-18",
      amountOfMoney: "800",
      status: "Ditolak",
    },
    // Add more rows with new sample data as needed
  ];
  

  
  
  function ApplicationStatus(){
    const filteredRows = rows.filter((row) => row.status != "Baharu");

  return (
    <Box sx={{ height: 300, width: "100%" }}>
        <Box sx={{ flexGrow: 1,}}
        margin={1}
        align={"right"}
        >
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

  export default ApplicationStatus;
