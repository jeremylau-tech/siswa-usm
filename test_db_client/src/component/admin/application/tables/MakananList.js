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
import { Link } from 'react-router-dom';
import StickyNote2RoundedIcon from '@mui/icons-material/StickyNote2Rounded';
import AssignmentTurnedInRoundedIcon from '@mui/icons-material/AssignmentTurnedInRounded';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { useNavigate, useLocation } from 'react-router-dom';

   function NewApplication({roles}){
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
            onClick={() => handleCatatanButton("later put here for remarking")}
          >
            <span >
              <StickyNote2RoundedIcon> </StickyNote2RoundedIcon>
            </span>
          </Button>
        ),
      },
    ];
    
    const navigate = useNavigate();
    const location = useLocation();

    function handleToArchieve(params) {
// <Link to={`/ArchivePage?rowId=${params.row.request_id}&rowReqType=${params.row.request_type}&userId=${params.row.requestor_id}&userRole=${roles}`}>


  const { request_id, request_type, requestor_id, admin_approver_id, bhepa_approver_id, 
    tnc_approver_id, request_remark_admin, request_remark_bhepa, request_remark_tnc } = params.row;
  const user_role = roles;

  // Navigate to the ArchivePage with request details and userRole
  navigate('/ArchivePage', { state: { request_id, request_type, requestor_id,  admin_approver_id, bhepa_approver_id, 
    tnc_approver_id, request_remark_admin, request_remark_bhepa, request_remark_tnc, user_role } });
  }

    const getStatusButtonText = (status) => {
      let buttonText = "";
      let icon = <AssignmentTurnedInRoundedIcon />;
      return { text: buttonText, icon: icon };
    };
    
    
      const [open, setOpen] = useState(false); // State variable to control the dialog
    
      const handleClose = () => {
        setOpen(false); // Close the dialog
      };
      
      const handleButtonClick = (rowId) => {
      // Add your logic here to handle the button click for the row with the given ID
      alert(`Button clicked for row with ID: ${rowId}`);
      };
    
      const handleCatatanButton = (remark) => {
        console.log(`Button clicked for row with ID: ${remark}`);
        setOpen(true);
        setSelectedCatatan(remark); // Store the rowId in the state
      };
    
      const [selectedCatatan, setSelectedCatatan] = useState(null);
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
    const typeparam = "makanan"; 
    const apiUrl = `http://localhost:8000/request-type-status-admin?request_status=${statusParam}&request_type=${typeparam}`;

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

  export default NewApplication;
