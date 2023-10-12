import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper"; // Import Paper component
import { Box, colors } from "@mui/material";

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
