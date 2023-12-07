import React from "react";
import Container from "@mui/material/Container";
import { Box, } from "@mui/material";

function ResultStep() {
  return (
    <Container>
      <Box>
        <h2>Keputusan Semakan</h2>
      </Box>
      <Box
        paddingTop={3}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "80%" },
        }}
        noValidate
        autoComplete="off"
      >
      </Box>
    </Container>
  );
}

export default ResultStep;
