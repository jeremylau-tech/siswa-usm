import React from "react";
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StepContent from "@mui/material/StepContent";
import StudentInfoStep from "./StudentInfoStep";
import ResultStep from "./ResultStep";
import DocumentationStep from "./DocumentationStep";

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
      <Stepper activeStep={activeStep} orientation="vertical">
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
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Hantar' : 'Lulus'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
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
