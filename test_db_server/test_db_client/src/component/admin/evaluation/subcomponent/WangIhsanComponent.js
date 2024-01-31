import React, { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import StepContent from "@mui/material/StepContent";
import StudentInfoStep from "./StudentInfoStep";
import ResultStepArchive from "./ResultStepArchive";
import ResultStep from "./ResultStep";
import MultiDocumentationStep from "./MultiDocumentationStep";
import ApprovedDialog from "./ApprovedDialog";
import RejectDialog from "./RejectDialog";
import { useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'


function WangIhsanComponent({ requestId, requestorId, userId, userRole, reqType, adminId, bhepaId, 
  tncId, adminRemark,bhepaRemark,tncRemark,isArchive}) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [requests, setRequests] = useState([]);
  const [wangIhsanApplication, setWangIhsanApplication] = useState([]);
  const [userDetailsMap, setUserDetailsMap] = useState({});

  const navigate = useNavigate(); // Initialize the useNavigate hook
  const userData = { roles: userRole };
  const [pdfsPath, setPdfsPath] = useState([]);

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
      label: 'Langkah 2 : Semakan Permohonan',
      content: requests.length > 0 ? (
        <MultiDocumentationStep
          sponsor={requests[0].food_sponsor_type}
          requestType={requests[0].request_type}
          justification={requests[0].food_justification}
          pdfsPath={pdfsPath}
        />
      ) : (
        <div>Loading...</div> // You can replace this with a loading indicator
      )
    },
    {
      label: isArchive ? 'Langkah 3 : Semakan Catatan' : 'Langkah 3 : Keputusan Semakan & Catatan',
      content: isArchive ? (
        <ResultStepArchive 
        adminId={adminId}
        bhepaId={bhepaId}
        tncId={tncId}
        adminRemark={adminRemark}
        bhepaRemark={bhepaRemark}
        tncRemark={tncRemark}/>
      ) : (
        <ResultStep />
      ) 
    },
  ];
  
  useEffect(() => {
    // Fetch user details from the server using POST method
    fetch('/api/get-sso-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // You can pass any necessary parameters here
      body: JSON.stringify({ ic: requestorId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          // Convert the array of user details into a map
          console.log("user---------")
          setUserDetailsMap(data.user);
        }
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [requestorId]); 

useEffect(() => {
  // Fetch user details from the server
  fetch(`https://kebajikansiswa.usm.my/api/wang-ihsan-applications-requestid?request_id=${requestId}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.wangIhsanDetails) {
        // Convert the array of user details into a map
        const detailsMap = {};
        data.wangIhsanDetails.forEach((detail) => {
          detailsMap[detail.request_id] = detail;
        });
        console.log("this is data")
        console.log(detailsMap);
        setWangIhsanApplication(detailsMap);
      }
    })
    .catch((error) => {
      console.error("Error fetching user details:", error);
    });
}, []);

useEffect(() => {
  const apiUrl = `https://kebajikansiswa.usm.my/api/request-requestid?request_id=${requestId}`;

  // Fetch requests from the server
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      if (data.request) {
        // Update request objects with user names
        const requestUsers = data.request.map((request) => {
          const requestorDetails = userDetailsMap;
          const wangIhsanDetails = wangIhsanApplication[request.request_id];
          console.log(wangIhsanDetails)
          console.log(wangIhsanDetails.bank_statement_file)
          // setPdfsPath([
          //   { name: 'IC Number', path:  wangIhsanDetails.ic_num_file },
          //   { name: 'Bank Statement', path: wangIhsanDetails.bank_statement_file },
          //   { name: 'Payment Slip (Father)', path: wangIhsanDetails.payment_slip_father_file },
          //   { name: 'Payment Slip (Mother)', path: wangIhsanDetails.payment_slip_mother_file },
          //   { name: 'Supporting Document', path: wangIhsanDetails.support_doc_file }
          // ]);

          return {
            ...request,
            requestor_name: requestorDetails ? requestorDetails.nama : '-',
            requestor_matric: requestorDetails ? requestorDetails.matrik : '-',
            requestor_ic: requestorDetails ? requestorDetails.nokp : '-',
            requestor_year: requestorDetails ? requestorDetails.tahun_pengajian : '-',
            requestor_phone: requestorDetails ? requestorDetails.fon_num : '-',

            wang_ihsan_sponsor_type: wangIhsanDetails ? wangIhsanDetails.sponsor_type : '-',
            wang_ihsan_ammount_requested: wangIhsanDetails ? wangIhsanDetails.wang_ihsan_ammount_requested : '-',
            wang_ihsan_help_type: wangIhsanDetails ? wangIhsanDetails.help_type : '-',
            wang_ihsan_justification: wangIhsanDetails ? wangIhsanDetails.wang_ihsan_justification : '-',

            // wang_ihsan_ic_num_file: wangIhsanDetails ? wangIhsanDetails.ic_num_file : '-',
            // wang_ihsan_bank_statement_file: wangIhsanDetails ? wangIhsanDetails.bank_statement_file : '-',
            // wang_ihsan_payment_slip_father_file: wangIhsanDetails ? wangIhsanDetails.payment_slip_father_file : '-',
            // wang_ihsan_payment_slip_mother_file: wangIhsanDetails ? wangIhsanDetails.payment_slip_mother_file : '-',
            // wang_ihsan_support_doc_file: wangIhsanDetails ? wangIhsanDetails.support_doc_file : '-',
          };
        });
        console.log('this is the test ---------------------------')
        console.log(requestUsers);

        setRequests(requestUsers);
       
      }
    })
    .catch((error) => {
      console.error("Error fetching requests data:", error);
    });
  }, [userDetailsMap, requestId]);

  // console.log(requests);

  const handleHome = () => {
    // setActiveStep((prevActiveStep) => prevActiveStep + 1);
    navigate('/adminDashboard', { state: { ...userData } });
  };

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
                    {!isArchive ? (
            <>
                    <Box sx={{m:3}}>
                        {requests[0] ? (
                      <ApprovedDialog requestId={requestId} userId={userId} userRole={userRole} requestType={reqType} requestorId={requestorId} requestorName={requests[0].requestor_name}></ApprovedDialog>
                      ) : (
                        'Loading...' // or any dummy value you prefer
                      )}
                    </Box>
                    <Box sx={{mb:2}}> 
                    <RejectDialog requestId={requestId} userId={userId} userRole={userRole} ></RejectDialog>
                      </Box>
                    </>
          ) : (
            
            <Button
                      variant="contained"
                      onClick={handleHome}
                      disableElevation={true}
                      style={{ backgroundColor: "green", color: "#fff", fontWeight: "bold", width: "30%" }}
                      sx={{ mt: 1, mr: 1 }}
                    >
                      Home
                    </Button>
          )}
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

export default WangIhsanComponent;
    