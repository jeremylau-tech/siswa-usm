import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import StepperComponent from "./subcomponent/StepperComponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
              <Typography variant="h3" component="div" marginTop={10}>
                Semak Kelayakan
              </Typography>
              <Box sx={centerStyle}> {/* Center the content */}
                {/* Include the StepperComponent here */}
                <StepperComponent />
              </Box>
        </Grid>
    </Box>
  );
}

export default EvaluationPage;
