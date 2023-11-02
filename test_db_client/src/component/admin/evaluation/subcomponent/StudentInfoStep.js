import { Container, Typography,  } from "@mui/material";
import React from "react";

const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",

};

const inputStyle = {
  fontWeight: "normal",
  border: "none",
  backgroundColor: "#f0f0f0", // Grey background color
  width: "100%",
};


function StudentInfoStep({ name, phone, year, ic, matric }) {
  return (
    <Container>
      <div>
        <h3>Maklumat Pelajar</h3>
        <br></br>
        <div style={gridContainerStyle}>
          <div>
            <Typography textAlign={"right"} padding={1}>Nama:</Typography>
          </div>
          <input style={inputStyle} type="text" value={name} readOnly />

          <div>
          <Typography textAlign={"right"} padding={1}> No Matric:</Typography>
          </div>
          <input style={inputStyle} type="text" value={matric} readOnly />

          <div>
          <Typography textAlign={"right"} padding={1}> No Kad Pengenalan:</Typography>
          </div>
          <input style={inputStyle} type="text" value={ic} readOnly />
          <div>
          <Typography textAlign={"right"} padding={1}> Tahun Pengajian:</Typography>
          </div>
          <input style={inputStyle} type="text" value={year} readOnly />
          <div>
          <Typography textAlign={"right"} padding={1}> No Telefon:</Typography>
          </div>
          <input style={inputStyle} type="text" value={phone} readOnly />
        </div>
      </div>
    </Container>
  );
}

export default StudentInfoStep;
