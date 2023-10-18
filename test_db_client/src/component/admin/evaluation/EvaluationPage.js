import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import StepperComponent from "./subcomponent/StepperComponent";
import Typography from "@mui/material/Typography";

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

                <StepperComponent />
              </Box>
        </Grid>
    </Box>
  );
}

export default EvaluationPage;
