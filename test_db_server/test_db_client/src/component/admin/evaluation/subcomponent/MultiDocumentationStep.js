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


function MultiDocumentationStep({ userRole, isArchive, sponsor = '', requestType = '', justification = '', help_type = '', ammount_requested = '', pdfsPath = [] }) {
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
            <Typography textAlign={"right"} padding={1}>Jenis Permohonan:</Typography>
          </div>
          <input style={inputStyle} type="text" value={requestType} readOnly />

          {help_type && (
            <>
              <div>
                <Typography textAlign={"right"} padding={1}>Jenis Bantuan Diperlukan:</Typography>
              </div>
              <input style={inputStyle} type="text" value={help_type} readOnly />
            </>
          )}

          {/* Conditionally render ammount_requested if it exists */}
          {ammount_requested && (
            <>
              <div>
                <Typography textAlign={"right"} padding={1}>Jumlah permohonan:</Typography>
              </div>
              <input style={inputStyle} type="text" value={ammount_requested} readOnly />
            </>
          )}

          {/* Removed commented code and fixed formatting */}
          <div>
            <Typography textAlign={"right"} padding={1}>Justifikasi:</Typography>
          </div>
          <input
            style={{ ...inputStyle, marginBottom: "30px" }}
            type="text"
            value={justification}
            readOnly
          />

          {(userRole === 'admin' || isArchive) && pdfsPath.map((pdf, index) => (
            <>
              <Typography textAlign="right" padding={1}>{pdf.name}:</Typography>
              <iframe
                title={`PDF ${index}`}
                src={`http://localhost:8000/api/get-pdf?pdfPath=${pdf.path}`}
                style={{ border: "none", width: "90%", height: "700px", height: "700px", marginBottom: "30px" }}
              ></iframe>
            </>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default MultiDocumentationStep;
