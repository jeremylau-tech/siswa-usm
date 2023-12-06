import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from 'react-router-dom'

export default function ApprovedDialog({ requestId, userId, userRole, requestType, requestorId}) {
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const data = { roles: userRole };

  const [open, setOpen] = React.useState(false);
  const [textFieldValue, setTextFieldValue] = useState(''); // State to store text field value

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if textFieldValue is empty
    if (!textFieldValue) {
      alert("Please fill in the remark.");
      return;
    }
    
    // Define the data to send
    const formDataJSON = {
      inputRemark: textFieldValue,
      userRole: userRole,
      approverId: userId,
      requestId: requestId,
      requestType: requestType,
      requestorId: requestorId
    };

    console.log(formDataJSON);
  
    const apiUrl = "http://docker.usm.my:8090/api/request-edit-lulus"; // Update with your server's URL

    try {
      // Send a POST request to the server with only the textFieldValue
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataJSON),
      });
  
      if (response.ok) {
        alert("Text field value sent successfully!");
      } else {
        // Handle errors if the server responds with a non-200 status code
        alert("Text field value submission failed.");
      }
    } catch (error) {
      // Handle errors related to the request
      console.error("Error:", error);
      alert("An error occurred while submitting the text field value.");
    }

    navigate('/adminDashboard', { state: { ...data } });

    // navigate('/adminDashboard'); // Use navigate for redirection

  };

  return (
    <div>
      <Button 
      style={{
        backgroundColor:"#c8e6c9",
        color:"#33691e",
        fontWeight:"800",
        height:"60px",
        width:"60%",
      }}
      onClick={handleClickOpen}>
        Permohonan Telah Disemak dan Layak Diterima
      </Button>
      <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Adakah Anda Pasti? "}
        </DialogTitle>
        <DialogContent>
        <TextField
            sx={{ m: 1 }}
            id="outlined-multiline-static"
            label="Catatan Kepada Pegawai"
            multiline
            rows={3}
            fullWidth
            value={textFieldValue} // Set the value of the TextField
            onChange={(e) => setTextFieldValue(e.target.value)} // Update state when text field changes
          />
        </DialogContent>
        <DialogActions>
        {/* <Link to={`/adminDashboard`}> */}
        <Button sx={{ m: 1 }} style={{ backgroundColor: "#c8e6c9", color: "#33691e", fontWeight: "800" }} variant="contained" disableElevation size="large" onClick={handleSubmit}>
                    Hantar untuk Pengesahan</Button>
                    {/* </Link> */}
                <Button sx={{ m:1}} style={{color:"grey"}} onClick={handleClose} 
                          size="large"> Kembali</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}