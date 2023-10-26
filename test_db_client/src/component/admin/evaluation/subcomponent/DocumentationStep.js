import React from "react";
import { Container, Typography } from "@mui/material";
import Box from '@mui/material/Box';

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

const textareaStyle = {
  fontWeight: "normal",
  border: "none",
  backgroundColor: "#f0f0f0",
  width: "90%",
  height: "100px",
  marginBottom: "10px", // Add vertical spacing (adjust as needed)
  resize: "vertical", // Allow resizing vertically
  rows: 4, // Adjust the number of visible rows as needed
  padding : "10px",
};

const iframeStyle  = {
  marginBottom: "20px", // Add vertical spacing between iframes (adjust as needed)
};

function DocumentationStep() {
  return (
    <Container>
      <div>
        <h2>Semakan Dokumen</h2>
        <div style={gridContainerStyle}>
          <div>
            <Typography textAlign={"right"} padding={1}>
              Jenis Tajaan:
            </Typography>
          </div>
          <input style={inputStyle} type="text" value="PTPTN" readOnly />
          <div>
            <Typography textAlign={"right"} padding={1}>
              Jenis Bantuan Diperlukan:
            </Typography>
          </div>
          <input style={inputStyle} type="text" value="Kupon Makanan" readOnly />

          <div>
            <Typography textAlign={"right"} padding={1}>
              Justifikasi:
            </Typography>
          </div>
          <textarea
            style={textareaStyle}
            value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida est ac tortor ullamcorper, vel cursus urna scelerisque. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida est ac tortor ullamcorper, vel cursus urna scelerisque."
            readOnly
          />

          <div>
            <Typography textAlign={"right"} padding={1}>
              Salinan IC:
            </Typography>
          </div>
          <iframe
            title="Wage Certificate"
            src="https://cdn2.me-qr.com/pdf/17683373.pdf"
            style={{ border: "none", width: "90%", height: "700px", ...iframeStyle }}
          ></iframe>
          <div>
            <Typography textAlign={"right"} padding={1}>
              Salinan Slip Gaji:
            </Typography>
          </div>
          <iframe
            title="Wage Certificate"
            src="https://cdn2.me-qr.com/pdf/17683373.pdf"
            style={{ border:"none", width: "90%", height: "700px", ...iframeStyle }}
          ></iframe>
        </div>
      </div>
    </Container>
  );
}

export default DocumentationStep;
