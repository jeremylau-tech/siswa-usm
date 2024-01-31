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


function MultiDocumentationStep({ sponsor, requestType, justification, pdfsPath }) {
  console.log(pdfsPath)
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

          {/* Removed commented code and fixed formatting */}
          <div>
            <Typography textAlign={"right"} padding={1}>Justifikasi:</Typography>
          </div>
          <input
            style={inputStyle}
            type="text"
            value={justification}
            readOnly
          />
          {/* <div>
          <Typography textAlign={"right"} padding={1}>Salinan Dokumen:</Typography>
          </div>
          <iframe
            title="Wage Certificate"
            src={`https://kebajikansiswa.usm.my/api/get-pdf?pdfPath=${pdfsPath[0].path}`}
            style={{ border:"none", width: "90%", height: "700px" }}
          ></iframe> */}
            {pdfsPath.map((pdf, index) => (
              <div key={index}>
                <div>
                <Typography textAlign="right" padding={1}>{pdf.name}:</Typography>
                <iframe
                  title={`PDF ${index}`}
                  src={`https://kebajikansiswa.usm.my/api/get-pdf?pdfPath=${pdf.path}`}
                  style={{ border: "none", width: "90%", height: "700px" }}
                ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
    </Container>
  );
}

export default MultiDocumentationStep;
