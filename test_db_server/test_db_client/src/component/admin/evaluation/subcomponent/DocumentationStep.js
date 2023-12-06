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


function DocumentationStep({ sponsor, requestType, justification, pdfPath }) {
  return (
    <Container>
      <div>
        <h2>Semakan Dokumen</h2>
        <div style={gridContainerStyle}>
          <div>
          <Typography textAlign={"right"} padding={1}>Jenis Tajaan:</Typography>
          </div>
          <input style={inputStyle} type="text" value={sponsor} readOnly />

          <div>
          <Typography textAlign={"right"} padding={1}>Jenis Bantuan Diperlukan:</Typography>
          </div>
          <input style={inputStyle} type="text" value={requestType} readOnly />

          <div>
          {/* <Typography textAlign={"right"} padding={1}>Amaun Diperlukan:</Typography>
          </div>
          <input style={inputStyle} type="text" value="$10,000" readOnly />
          <div> */}
          <Typography textAlign={"right"} padding={1}>Justifikasi:</Typography>
          </div>
          <input
            style={inputStyle}
            type="text"
            value={justification}
            readOnly
          />

          <div>
          <Typography textAlign={"right"} padding={1}>Salinan Dokumen:</Typography>
          </div>
          <iframe
            title="Wage Certificate"
            src={`http://docker.usm.my:8090/api/get-pdf?pdfPath=${pdfPath}`}
            style={{ border:"none", width: "90%", height: "700px" }}
          ></iframe>
        </div>
      </div>
    </Container>
  );
}

export default DocumentationStep;
