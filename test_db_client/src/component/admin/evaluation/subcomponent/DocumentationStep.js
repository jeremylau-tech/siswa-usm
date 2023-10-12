import React from "react";
import { Container, Typography } from "@mui/material";


const gridContainerStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
};

const inputStyle = {
  fontWeight: "normal",
  border: "none",
  backgroundColor: "#f0f0f0",
  width: "100%",
};

const labelStyle = {
  fontWeight: "bold",
  textAlign: "right",
};

function DocumentationStep() {
  return (
    <Container>
      <div>
        <h2>Semakan Dokumen</h2>
        <div style={gridContainerStyle}>
          <div>
          <Typography textAlign={"right"} padding={1}>Jenis Tajaan:</Typography>
          </div>
          <input style={inputStyle} type="text" value="Full Scholarship" readOnly />

          <div>
          <Typography textAlign={"right"} padding={1}>Jenis Bantuan Diperlukan:</Typography>
          </div>
          <input style={inputStyle} type="text" value="Living Expenses" readOnly />

          <div>
          <Typography textAlign={"right"} padding={1}>Amaun Diperlukan:</Typography>
          </div>
          <input style={inputStyle} type="text" value="$10,000" readOnly />
          <div>
          <Typography textAlign={"right"} padding={1}>Justifikasi:</Typography>
          </div>
          <input
            style={inputStyle}
            type="text"
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida est ac tortor ullamcorper, vel cursus urna scelerisque."
            readOnly
          />

          <div>
          <Typography textAlign={"right"} padding={1}>Salinan Slip Gaji:</Typography>
          </div>
          <iframe
            title="Wage Certificate"
            src="https://cdn2.me-qr.com/pdf/17683373.pdf"
            style={{ border:"none", width: "90%", height: "700px" }}
          ></iframe>
        </div>
      </div>
    </Container>
  );
}

export default DocumentationStep;
