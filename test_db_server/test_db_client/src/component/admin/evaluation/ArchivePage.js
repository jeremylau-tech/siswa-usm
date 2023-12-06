import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ArchiveStepperComponentMakanan from "./subcomponent/ArchiveStepperComponentMakanan";
import StepperComponent from "./subcomponent/StepperComponent";

import Typography from "@mui/material/Typography";
import { useNavigate, useLocation } from 'react-router-dom';

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

const centerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "50vh",
};

function ArchivePage() {
  const location = useLocation();
  const { request_id, requestor_id, request_type, admin_approver_id, bhepa_approver_id, 
    tnc_approver_id, request_remark_admin, request_remark_bhepa, request_remark_tnc, user_role, user_id} = location.state;

  const isArchive = true;

  return (
    <Box sx={{ flexGrow: 1,}}>
        <Grid item xs={12}> {/* Full-width for the main content */}
              <Box>
              <Typography  
              variant="h4" 
              component="div"
              textAlign={"left"} 
              marginTop={5}
              marginLeft={15}
              fontWeight={"semiBold"}
              >
                Rekod Permohonan
                </Typography>
              </Box>
              <Box sx={centerStyle}> {/* Center the content */}
                {/* Include the StepperComponent here */}
              
                {request_type === "makanan" ? (
                 <ArchiveStepperComponentMakanan
                 requestId={request_id}
                 userId={user_id}
                 userRole={user_role}
                 reqType={request_type}
                 adminId={admin_approver_id}
                 bhepaId={bhepa_approver_id}
                 tncId={tnc_approver_id}
                 adminRemark={request_remark_admin}
                 bhepaRemark={request_remark_bhepa}
                 tncRemark={request_remark_tnc}
                 isArchive={isArchive}
                 requestorId={requestor_id}
               />
              ) : (
                /* Render a different stepper component here for other cases */
                <StepperComponent />
              )}
              </Box>
        </Grid>
    </Box>
  );
}

export default ArchivePage;
