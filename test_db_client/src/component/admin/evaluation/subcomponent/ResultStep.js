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
        <h2>Keputusan Permohonan</h2>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            style={{ fontWeight: "bold" }}
          >
            <Paper sx={{ paddingLeft: "16px" }}  > {/* Encapsulate in Paper with elevation */}
              <FormControlLabel
                value="approved"
                control={<Radio />}
                label="Permohonan Diterima"
              />
            </Paper>
            <Box sx={{ m: 1 }} />
            <Paper sx={{ paddingLeft: "16px" }} > {/* Encapsulate in Paper with elevation */}
              <FormControlLabel
                value="rejected"
                control={<Radio />}
                label="Permohonan Ditolak"
              />
            </Paper>
          </RadioGroup>
        </FormControl>
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
        <div>
          <TextField
            id="outlined-multiline-static"
            label="Catatan"
            multiline
            rows={6}
          />
        </div>
      </Box>
    </Container>
  );
}

export default ResultStep;
