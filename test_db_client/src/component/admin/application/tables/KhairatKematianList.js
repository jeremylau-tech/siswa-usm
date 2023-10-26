import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { saveAs } from 'file-saver';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Paper from '@mui/material/Paper';
import RuleRoundedIcon from '@mui/icons-material/RuleRounded';
import Typography from "@mui/material/Typography";
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import {rows} from "./Data.js";


// const downloadDataAsCSV = () => {
//   // Create a header row with column names
//   const header = 'No Rujukan,Nama Pelajar,Jenis Permohonan,Tarikh Permohonan,Status,Nama penyemak admin, Nama pengesyor bhepa, Nama pelulus TNC';

//   // Create a CSV content string by combining the header and data
//   const csvData = [header].concat(
//     rows.map((row) =>
//       `${row.requestor_id},${row.requestor_name},${row.request_type},${row.request_date},${row.request_status},${row.admin_approver_id},${row.bhepa_approver_id},${row.tnc_approver_id}`
//     )
//   ).join('\n');

//   // Create a Blob with the CSV content
//   const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

//   // Use a library like FileSaver.js or implement the saveAs function
//   // to trigger the download. Here's how you can use FileSaver.js:
//   saveAs(blob, 'data.csv');
// };

const columns = [
  {
    field: "request_id",
    headerName: "No Rujukan",
    width: 150,
    editable: false,
  },
  {
    field: "requestor_name",
    headerName: "Nama Pelajar",
    width: 150,
    editable: false,
  },
  {
    field: "request_type",
    headerName: "Jenis Permohonan",
    width: 150,
    editable: false,
  },
  {
    field: "request_date",
    headerName: "Tarikh Permohonan",
    width: 150,
    editable: false,
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
        case "sah bhepa":
          textColor = "#757575"
          backgroundColor = "#eeeeee"
          break;
        case "syor bhepa":
          textColor = "#558b2f"
          backgroundColor = "#dcedc8"
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
        href="http://localhost:3000/EvaluationPage"
        onClick={() => handleButtonClick(params.row.request_id)}
      >
        <span style={{ marginRight: "20px" }}>{getStatusButtonText(params.row.request_status).icon}</span>
          {getStatusButtonText(params.row.request_status).text}
      </Button>
    ),
  },
];

  const getStatusButtonText = (status) => {
    let buttonText = "";
    let icon = null;
  
    switch (status) {
      case "sah bhepa":
        buttonText = "Sahkan";
        icon = <CheckCircleRounded />;
        break;
      case "baharu":
        buttonText = "Semak";
        icon = <RuleRoundedIcon />;
        break;
      case "syor bhepa":
        buttonText = "Lihat";
        icon = <RemoveRedEyeRoundedIcon />;
        break;
      case "tolak":
        buttonText = "Lihat";
        icon = <RemoveRedEyeRoundedIcon />;
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
  
   function NewApplication(){

    const [requests, setRequests] = useState([]);
    const [userDetailsMap, setUserDetailsMap] = useState({});
  
    
  useEffect(() => {
    // Fetch user details from the server
    fetch("http://localhost:8000/user-details")
      .then((res) => res.json())
      .then((data) => {
        if (data.userDetails) {
          // Convert the array of user details into a map
          const detailsMap = {};
          data.userDetails.forEach((detail) => {
            detailsMap[detail.unique_id] = detail;
          });
          setUserDetailsMap(detailsMap);
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, []);

  useEffect(() => {
    const statusParam = "complete"; // Replace with the desired status parameter
    const typeparam = "khairat"; 
    const apiUrl = `http://localhost:8000/request-type-status?request_status=${statusParam}&request_type=${typeparam}`;

    // Fetch requests from the server
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.request) {
          // Update request objects with user names
          const requestsWithUserNames = data.request.map((request) => {
            request.request_date = request.request_date.split('T')[0];
            const requestorDetails = userDetailsMap[request.requestor_id];
            const adminDetails = userDetailsMap[request.admin_approver_id];
            const bhepaDetails = userDetailsMap[request.bhepa_approver_id];
            const tncDetails = userDetailsMap[request.tnc_approver_id];

            return {
              ...request,
              requestor_name: requestorDetails ? requestorDetails.name : '-',
              admin_name: adminDetails ? adminDetails.name : '-',
              bhepa_name: bhepaDetails ? bhepaDetails.name : '-',
              tnc_name: tncDetails ? tncDetails.name : '-',
            };
          });

          setRequests(requestsWithUserNames);
          console.log(requests)
        }
      })
      .catch((error) => {
        console.error("Error fetching requests data:", error);
      });
  }, [userDetailsMap]);
  
  // console.log(requests)
  // const filteredRequest = requests.filter(request => request.request_status === "baharu");

  const downloadDataAsCSV = () => {
    // Create a header row with column names
    const header = 'No Rujukan,Nama Pelajar,Jenis Permohonan,Tarikh Permohonan,Status,Nama penyemak admin, Nama pengesyor bhepa, Nama pelulus TNC';

    // Create a CSV content string by combining the header and data
    const csvData = [header].concat(
      requests.map((row) =>
        `${row.request_id},${row.requestor_name},${row.request_type},${row.request_date},${row.request_status},${row.admin_approver_id},${row.bhepa_approver_id},${row.tnc_approver_id}`
      )
    ).join('\n');

    // Create a Blob with the CSV content
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    // Use a library like FileSaver.js or implement the saveAs function
    // to trigger the download. Here's how you can use FileSaver.js:
    saveAs(blob, 'data.csv');
  };

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
          rows={requests}
          columns={columns}
          getRowId={(row) => row.request_id} // Assuming request_id is unique
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

  export default NewApplication;
