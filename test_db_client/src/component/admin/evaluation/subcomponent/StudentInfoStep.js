import { Container, colors } from "@mui/material";
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

const labelStyle = {
  fontWeight: "bold",
  textAlign: "right", // Align text to the left
};

function StudentInfoStep() {
  return (
    <Container>
      <div>
        <h3>Maklumat Pelajar</h3>
        <br></br>
        <div style={gridContainerStyle}>
          <div>
            <span style={labelStyle}>Name:</span>
          </div>
          <input style={inputStyle} type="text" value="John Doe" readOnly />

          <div>
            <span style={labelStyle}>Matric Number:</span>
          </div>
          <input style={inputStyle} type="text" value="123456" readOnly />

          <div>
            <span style={labelStyle}>IC Number:</span>
          </div>
          <input style={inputStyle} type="text" value="123456-78-9012" readOnly />

          <div>
            <span style={labelStyle}>Year of Study:</span>
          </div>
          <input style={inputStyle} type="text" value="3rd Year" readOnly />

          <div>
            <span style={labelStyle}>Phone Number:</span>
          </div>
          <input style={inputStyle} type="text" value="+1 113-456-7890" readOnly />
        </div>
      </div>
    </Container>
  );
}

export default StudentInfoStep;
