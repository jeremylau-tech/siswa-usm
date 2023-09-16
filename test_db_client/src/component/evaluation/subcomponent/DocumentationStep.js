import React from "react";
import { Container } from "@mui/material";

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
            <span style={labelStyle}>Jenis Tajaan</span>
          </div>
          <input style={inputStyle} type="text" value="Full Scholarship" readOnly />

          <div>
            <span style={labelStyle}>Jenis Bantuan Dipohon:</span>
          </div>
          <input style={inputStyle} type="text" value="Living Expenses" readOnly />

          <div>
            <span style={labelStyle}>Amaun Diperlukan</span>
          </div>
          <input style={inputStyle} type="text" value="$10,000" readOnly />

          <div>
            <span style={labelStyle}>Justifikasi:</span>
          </div>
          <input
            style={inputStyle}
            type="text"
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida est ac tortor ullamcorper, vel cursus urna scelerisque."
            readOnly
          />

          <div>
            <span style={labelStyle}>Salinan Slip Gaji</span>
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
