import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import StepperComponentMakanan from "./subcomponent/StepperComponentMakanan";
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

function EvaluationPage() {
  const location = useLocation();
  const { request_id, requestor_id, request_type, admin_approver_id, bhepa_approver_id, 
    tnc_approver_id, request_remark_admin, request_remark_bhepa, request_remark_tnc, user_role} = location.state;

    alert(request_remark_bhepa)

  const rowId = request_id;
  const userId = requestor_id;
  const rowReqType = request_type;
  const userRole = user_role;
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
                Semak Kelayakan 
                </Typography>
              </Box>
              <Box sx={centerStyle}> {/* Center the content */}
                {/* Include the StepperComponent here */}
              
                {rowReqType === "makanan" ? (
                <StepperComponentMakanan requestId={rowId} userId={userId} userRole={userRole} reqType={rowReqType} isArchive={isArchive}/>
              ) : (
                /* Render a different stepper component here for other cases */
                <StepperComponent />
              )}
              </Box>
        </Grid>
    </Box>
  );
}

export default EvaluationPage;
