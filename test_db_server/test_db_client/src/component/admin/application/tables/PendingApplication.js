import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { saveAs } from 'file-saver';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import VisibilityIcon from '@mui/icons-material/Visibility';
import "./style.css"
import { Stack } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';


function PendingList({roles, user_id}) {

  const [open, setOpen] = useState(false); // State variable to control the dialog

  const handleClose = () => {
    setOpen(false); // Close the dialog
  };

  const [requests, setRequests] = useState([]);

  const navigate = useNavigate();

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
      headerName: "Jenis ",
      width: 130,
      editable: false,
    },
    {
      field: "request_date",
      headerName: "Tarikh Permohonan",
      width: 150,
      editable: false,
      valueGetter: (params) => {
        // Convert the ISO date string to a Date object
        const date = new Date(params.row.request_date);
  
        // Format the date as a string in your desired format
        return date.toISOString().split('T')[0];
      },
    },
    {
      field: "request_count_per_user",
      headerName: "Bilangan Permohonan",
      width: 150,
      editable: false,
    },
    {
      field: "semakan",
      headerName: "Semakan",
      width: 130,
      editable: false,
      renderCell: (params) => {
        const status = params.row.request_status; // Access the status value for the same row
        const getIndicator = (status) => {
          switch (status) {
            case "baharu":
              return (
                <>
                  <status-indicator intermediary></status-indicator>
                  <status-indicator ></status-indicator>
                  <status-indicator ></status-indicator>
                </>
              );
            case "semak":
              return (
                <>
                  <status-indicator positive></status-indicator>
                  <status-indicator intermediary></status-indicator>
                  <status-indicator></status-indicator>
                </>
              );
            case "syor":
              return (
                <>
                  <status-indicator positive></status-indicator>
                  <status-indicator positive></status-indicator>
                  <status-indicator intermediary></status-indicator>
                </>
              );
            case "lulus":
              return (
                <>
                  <status-indicator positive></status-indicator>
                  <status-indicator positive></status-indicator>
                  <status-indicator positive></status-indicator>

                </>
              );
            case "tolak":
              return (
                <>
                  <status-indicator negative></status-indicator>
                  <status-indicator></status-indicator>
                  <status-indicator></status-indicator>
                </>
              );
            default:
              return <div>No Indicator</div>;
          }
        };

        return (
          <div>
            {getIndicator(status)}
          </div>
        );
      },
    },
    {
      field: "actions",
      headerName: "Tindakan",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button
          style={{
            backgroundColor: "#fafafa",
            color: "black",
            fontWeight: "bold",
            boxShadow: "none",
            outlineColor: "lightgrey",
            outlineStyle: "solid",
            outlineWidth: "1.5px",
            textTransform: "none",
            display: "flex",
          }}
          variant="contained"
          onClick={() => handleToArchieve(params)}
        >
          <span >{getStatusButtonText(params.row.request_status).icon}</span>
          {getStatusButtonText(params.row.request_status).text}
        </Button>
      ),
    },
    {
      field: "catatan",
      headerName: "Catatan",
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button
          style={{
            backgroundColor: "#fafafa",
            color: "black",
            fontWeight: "bold",
            boxShadow: "none",
            outlineColor: "lightgrey",
            outlineStyle: "solid",
            outlineWidth: "1.5px",
            textTransform: "none",
            display: "flex",
          }}
          variant="contained"
          onClick={() => handleCatatanButton(params.row.remark)}
        >
          <span >
            <StickyNote2RoundedIcon> </StickyNote2RoundedIcon>
          </span>
        </Button>
      ),
    },
  ];

  const getStatusButtonText = (status) => {
    let buttonText = "";
    let icon = <VisibilityIcon />;
    return { text: buttonText, icon: icon };
  };

  const handleButtonClick = (rowId) => {
    console.log(`Button clicked for row with ID: ${rowId}`);
  };

  const handleCatatanButton = (remark) => {
    console.log(`Button clicked for row with ID: ${remark}`);
    setOpen(true);
    setSelectedCatatan(remark); // Store the rowId in the state
  };

  const [selectedCatatan, setSelectedCatatan] = useState(null);

  useEffect(() => {
    const apiUrl = `https://kebajikansiswa.usm.my/api/request-all-admin`;

    // Fetch requests from the server
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.request) {
          setRequests(data.request);
          // console.log(data.request);
        }
      })
      .catch((error) => {
        console.error("Error fetching requests data:", error);
      });
  }, []);


  function handleToArchieve(params) {
    // <Link to={`/ArchivePage?rowId=${params.row.request_id}&rowReqType=${params.row.request_type}&userId=${params.row.requestor_id}&userRole=${roles}`}>
    
    
      const { request_id, request_type, requestor_id, admin_approver_id, bhepa_approver_id, 
        tnc_approver_id, request_remark_admin, request_remark_bhepa, request_remark_tnc } = params.row;
      const user_role = roles;
    
      // Navigate to the ArchivePage with request details and userRole
      navigate('/ArchivePage', { state: { request_id, request_type, requestor_id,  admin_approver_id, bhepa_approver_id, 
        tnc_approver_id, request_remark_admin, request_remark_bhepa, request_remark_tnc, user_role, user_id } });
      }

  const downloadDataAsCSV = () => {
    // Create a header row with column names
    const header = 'No Rujukan,Nama Pelajar,Jenis Permohonan,Tarikh Permohonan,Status,Nama penyemak admin, Nama pengesyor, Nama pelulus TNC';

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
    <div>
      <Box sx={{ height: 400, width: "100%" }}>
        <Box sx={{ flexGrow: 1, }}
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
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      {/* Dialog component */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant='h5'>Catatan</DialogTitle>
        <DialogContent>
          {selectedCatatan !== null ? (
            <div>
              {selectedCatatan}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PendingList;
