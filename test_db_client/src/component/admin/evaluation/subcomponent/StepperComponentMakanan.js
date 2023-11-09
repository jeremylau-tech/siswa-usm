import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StepContent from "@mui/material/StepContent";
import StudentInfoStep from "./StudentInfoStep";
import ResultStep from "./ResultStep";
import DocumentationStep from "./DocumentationStep";
import ApprovedDialog from "./ApprovedDialog";
import RejectDialog from "./RejectDialog";


function StepperComponentMakanan({ requestId, userId, userRole, reqType }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [requests, setRequests] = useState([]);
  const [foodApplication, setFoodApplication] = useState([]);
  const [userDetailsMap, setUserDetailsMap] = useState({});

  const steps = [
    {
      // <StepperComponentMakanan requestId={rowId} userId={userId}/>

      label: 'Langkah 1 : Maklumat Pelajar',
      content: requests.length > 0 ? (
        <StudentInfoStep
          name={requests[0].requestor_name}
          phone={requests[0].requestor_phone}
          year={requests[0].requestor_year}
          ic={requests[0].requestor_ic}
          matric={requests[0].requestor_matric}
        />
      ) : (
        <div>Loading...</div> // You can replace this with a loading indicator
      )
    },
    {
      label: 'Langkah 2 : Semakan Salinan Kad Pengenalan Pelajar',
      content: requests.length > 0 ? (
        <DocumentationStep
          sponsor={requests[0].food_sponsor_type}
          requestType={requests[0].request_type}
          justification={requests[0].food_justification}
          pdfPath={requests[0].food_ic_num_file}
        />
      ) : (
        <div>Loading...</div> // You can replace this with a loading indicator
      )
    },
    {
      label: 'Langkah 3 : Semakan Salinan Gaji Ibu Bapa',
      content: requests.length > 0 ? (
        <DocumentationStep
          sponsor={requests[0].food_sponsor_type}
          requestType={requests[0].request_type}
          justification={requests[0].food_justification}
          pdfPath={requests[0].food_payment_slip_file}
        />
      ) : (
        <div>Loading...</div> // You can replace this with a loading indicator
      )
    },
    {
      label: 'Langkah 4 : Keputusan Semakan & Catatan',
      content: <ResultStep />, // Use the component for Step 3
    },
  ];
  

  
useEffect(() => {
  // Fetch user details from the server
  fetch(`http://localhost:8000/user-details-uniqueid?unique_id=${userId}`)
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
  // Fetch user details from the server
  fetch(`http://localhost:8000/food-applications-requestid?request_id=${requestId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.foodDetails) {
        // Convert the array of user details into a map
        const detailsMap = {};
        data.foodDetails.forEach((detail) => {
          detailsMap[detail.request_id] = detail;
        });
        setFoodApplication(detailsMap);
      }
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });
}, []);

useEffect(() => {
  const apiUrl = `http://localhost:8000/request-requestid?request_id=${requestId}`;

  // Fetch requests from the server
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      if (data.request) {
        // Update request objects with user names
        const requestsFoodUsers = data.request.map((request) => {
          const requestorDetails = userDetailsMap[request.requestor_id];
          const foodDetails = foodApplication[request.request_id];


          return {
            ...request,
            requestor_name: requestorDetails ? requestorDetails.name : '-',
            requestor_matric: requestorDetails ? requestorDetails.unique_id : '-',
            requestor_ic: requestorDetails ? requestorDetails.ic_num : '-',
            requestor_year: requestorDetails ? requestorDetails.study_year : '-',
            requestor_phone: requestorDetails ? requestorDetails.phone_num : '-',

            food_sponsor_type: foodDetails ? foodDetails.sponsor_type : '-',
            food_justification: foodDetails ? foodDetails.food_justification : '-',
            food_ic_num_file: foodDetails ? foodDetails.ic_num_file : '-',
            food_payment_slip_file: foodDetails ? foodDetails.payment_slip_file : '-',
          };
        });

        setRequests(requestsFoodUsers);
      }
    })
    .catch((error) => {
      console.error("Error fetching requests data:", error);
    });
  }, [userDetailsMap, requestId]);

  console.log(requests);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: '80%' }}>
      <Stepper activeStep={activeStep} orientation="vertical" >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel //what is this for again?
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
                    <Box sx={{m:3}}>
                        {requests[0] ? (
                      <ApprovedDialog requestId={requestId} userId={userId} userRole={userRole} requestType={reqType} requestorId={requests[0].requestor_id}></ApprovedDialog>
                      ) : (
                        'Loading...' // or any dummy value you prefer
                      )}
                    </Box>
                    <Box sx={{mb:2}}> 
                    <RejectDialog requestId={requestId} userId={userId} userRole={userRole}></RejectDialog>
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

export default StepperComponentMakanan;
    