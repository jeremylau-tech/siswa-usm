import React from "react";
import { Container, Typography,  } from "@mui/material";
import { Box, } from "@mui/material";

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
function ResultStepArchive() {
  return (
    <Container>
      <Box>
        <h2>Semakan Catatan</h2>
      </Box>
      {/* <Box
        paddingTop={3}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "80%" },
        }}
        noValidate
        autoComplete="off"
      >
      </Box> */}
      <div style={gridContainerStyle}>
          <div>
            <Typography textAlign={"right"} padding={1}>Nama:</Typography>
          </div>
          <input style={inputStyle} type="text" value="yesnt" readOnly />
        </div>
    </Container>
  );
}

export default ResultStepArchive;
