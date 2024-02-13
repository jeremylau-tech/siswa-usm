import React, { useState, useEffect } from "react";
import {DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import DescriptionDialog from "./DescriptionDialog";


const formatDate = (dateString) => {
  const dateObj = new Date(dateString);
  return dateObj.toISOString().split('T')[0];
};

const columns = [
    {
      field: "request_id",
      headerName: "No Rujukan",
      width: 150,
      editable: false,
    },
    {
      field: "request_type",
      headerName: "Jenis Bantuan",
      width: 250,
      editable: false,
    },
    {
      field: "request_date",
      headerName: "Tarikh Permohonan",
      width: 200,
      editable: false,
      valueFormatter: (params) => formatDate(params.value),
    },
    {
      field: "request_status",
      headerName: "Status",
      width: 200,
      editable: false,
      renderCell: (params) => {
        const status = params.value;
        let textColor = "white"; // You can change the text color as needed
        let backgroundColor = ""; // You can change the background color as needed
  
        switch (status) {
          case "baharu":
            textColor = "#ff8f00"
            backgroundColor = "#ffecb3"
            break;
          case "semak":
            textColor = "#757575"
            backgroundColor = "#eeeeee"
            break;  
          case "syor":
            textColor = "#757575"
            backgroundColor = "#eeeeee"
            break;
          case "lulus":
            textColor = "#558b2f"
            backgroundColor = "#dcedc8"
            break;
          case "tolak":
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
    // {
    //   field: "actions",
    //   headerName: "Catatan",
    //   width: 100,
    //   sortable: false,
    //   renderCell: (params) => {
    //     return (
    //       <DescriptionDialog/>
    //     );
    //   },
    // },
  ];
  
  
  // const rows = [
  //   {
  //     id: 1,
  //     referenceNumber: "REF12345",
  //     assistanceType: "Khairat Kematian",
  //     dateOfApplication: "2023-09-13",
  //     amountOfMoney: "1000",
  //     status: "Pengesahan",
  //   },
  //   {
  //     id: 2,
  //     referenceNumber: "REF54321",
  //     assistanceType: "Peranti Pembelajaran",
  //     dateOfApplication: "2023-09-15",
  //     amountOfMoney: "1500",
  //     status: "Diluluskan",
  //   },
  //   {
  //     id: 3,
  //     referenceNumber: "REF98765",
  //     assistanceType: "Alice Smith",
  //     dateOfApplication: "2023-09-18",
  //     amountOfMoney: "800",
  //     status: "Ditolak",
  //   },
  //   // Add more rows with new sample data as needed
  // ];
  

  
  
  function ApplicationStatus({userId}){
    const [requestTable, setRequestTable] = useState({});

    useEffect(() => {
      fetch(`http://localhost:8000/api/request-user?user_id=${userId}`) // Replace with the appropriate URL

    .then(res => res.json())
    .then(data => {
      // Update the state with the retrieved data
      // console.log(data.request[0]);
      setRequestTable(data.request);
    })
    .catch(error => {
      console.error('Error fetching data from the server:', error);
    });
}, []);

  const rows = Object.values(requestTable);
  const getRowId = (row) => row.request_id;

  return (
    <Box sx={{ height: 300, width: "100%" }}>
        <Box sx={{ flexGrow: 1,}}
        margin={1}
        align={"right"}
        >
        </Box>
        <DataGrid
          getRowId={getRowId}
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

  export default ApplicationStatus;
