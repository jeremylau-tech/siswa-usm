import { Container, Typography,  } from "@mui/material";
import React from "react";

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",

};

const inputStyle  = {
  fontWeight: "normal",
  border: "none",
  backgroundColor: "#f0f0f0",
  width: "90%",
  marginBottom: "10px", // Add vertical spacing (adjust as needed)
};


function StudentInfoStep() {
  return (
    <Container>
      <div>
        <h3>Maklumat Pelajar</h3>
        <br></br>
        <div style={gridContainerStyle}>
          <div>
            <Typography textAlign={"right"} padding={1}>Nama:</Typography>
          </div>
          <input style={inputStyle} type="text" value="John Doe" readOnly />

          <div>
          <Typography textAlign={"right"} padding={1}> No Matric:</Typography>
          </div>
          <input style={inputStyle} type="text" value="123456" readOnly />

          <div>
          <Typography textAlign={"right"} padding={1}> No Kad Pengenalan:</Typography>
          </div>
          <input style={inputStyle} type="text" value="123456-78-9012" readOnly />
          <div>
          <Typography textAlign={"right"} padding={1}> Tahun Pengajian:</Typography>
          </div>
          <input style={inputStyle} type="text" value="3rd Year" readOnly />
          <div>
          <Typography textAlign={"right"} padding={1}> No Telefon:</Typography>
          </div>
          <input style={inputStyle} type="text" value="+1 113-456-7890" readOnly />
        </div>
      </div>
    </Container>
  );
}

export default StudentInfoStep;
