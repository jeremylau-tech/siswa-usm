import React from "react";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StepContent from "@mui/material/StepContent";
import StudentInfoStep from "./StudentInfoStep";
import ResultStep from "./ResultStep";
import DocumentationStep from "./DocumentationStep";
import ApprovedDialog from "./ApprovedDialog";
import RejectDialog from "./RejectDialog";

const steps = [
  {
    label: 'Langkah 1 : Maklumat Pelajar',
    content: <StudentInfoStep />, // Use the component for Step 1
  },
  {
    label: 'Langkah 2 : Semakan Dokumen',
    content: <DocumentationStep />, // Use the component for Step 2
  },
  {
    label: 'Langkah 3 : Keputusan Semakan & Catatan',
    content: <ResultStep />, // Use the component for Step 3
  },
];

function StepperComponent() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '80%' }}>
      <Stepper activeStep={activeStep} orientation="vertical" >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption"></Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              {step.content} {/* Render the appropriate content */}
              <Box sx={{ mb: 2 }}>
                <div>
                  {index === steps.length - 1 ? (
                    <>
                    <Box sx={{m:2}}>
                      <ApprovedDialog></ApprovedDialog>
                    </Box>
                    <Box> 
                      <RejectDialog> </RejectDialog> 
                      </Box>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      disableElevation={true}
                      style={{ backgroundColor: "#424242", color: "#fff", fontWeight: "bold", width: "30%" }}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Seterusnya
                    </Button>
                  )}
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                    style={{ color: "#424242" }}
                  >
                    Kembali
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

export default StepperComponent;
