import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel"; // Import FormControlLabel
import { Box, Divider, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styled from "@mui/material/styles/styled";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function EditVendor({ selectedVendor, onClose }) {
  const [vendorData, setVendorData] = useState(selectedVendor || {});
  const [isActive, setIsActive] = useState(false);

  const handleSave = () => {
    // Implement the logic to save or update the vendor data here
    // You can access the vendor data in the `vendorData` state variable
    // and the status in the `isActive` state variable
    console.log("Vendor data to save:", vendorData);
    console.log("Status:", isActive);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={true} onClose={handleClose} maxWidth="md">
      <DialogTitle
        style={{
          backgroundColor: "#eeeeee",
          color: "#424242",
          textTransform: "none",
          boxShadow: "none",
          fontWeight: "bold",
        }}
        align="center"
      >
        Edit Vendor
      </DialogTitle>
      <DialogContent>
        <Divider style={{ paddingTop: "20px" }} />
        <Typography variant="h6" gutterBottom style={{ paddingTop: "30px" }}>
          Maklumat Vendor
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="outlined-basic"
          label="Nama Vendor"
          type="name"
          fullWidth
          variant="outlined"
          value={vendorData.VendorName || ""}
          onChange={(e) => setVendorData({ ...vendorData, VendorName: e.target.value })}
        />
        <TextField
          autoFocus
          margin="dense"
          id="outlined-basic"
          label="Lokasi"
          type="location"
          fullWidth
          variant="outlined"
          value={vendorData.location || ""}
          onChange={(e) => setVendorData({ ...vendorData, location: e.target.value })}
        />
        <TextField
          autoFocus
          margin="dense"
          id="outlined-basic"
          label="Deskripsi"
          type="description"
          fullWidth
          variant="outlined"
          value={vendorData.description || ""}
          onChange={(e) => setVendorData({ ...vendorData, description: e.target.value })}
        />
        <Box style={{ alignContent: "center", paddingTop: "20px" }}>
          <Typography variant="h6" gutterBottom>Logo</Typography>
          <Button
            style={{
              color: "black",
              backgroundColor: "#eeeeee",
            }}
            component="label"
            fullWidth
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
        <Divider style={{ paddingTop: "20px" }} />
        <Typography variant="h6" gutterBottom style={{ paddingTop: "10px" }}>
          Maklumat Pemilik
        </Typography>
        <TextField
          autoFocus
          margin="dense"
          id="outlined-basic"
          label="Nama Pemilik Vendor"
          type="owner"
          fullWidth
          variant="outlined"
          value={vendorData.owner || ""}
          onChange={(e) => setVendorData({ ...vendorData, owner: e.target.value })}
        />
        <TextField
          autoFocus
          margin="dense"
          id="outlined-basic"
          label="No Telefon"
          type="phoneNo"
          fullWidth
          variant="outlined"
          value={vendorData.phoneNo || ""}
          onChange={(e) => setVendorData({ ...vendorData, phoneNo: e.target.value })}
        />
        <TextField
          autoFocus
          margin="dense"
          id="outlined-basic"
          label="Emel"
          type="email"
          fullWidth
          variant="outlined"
          value={vendorData.email || ""}
          onChange={(e) => setVendorData({ ...vendorData, email: e.target.value })}
        />
        <Typography variant="h6" gutterBottom style={{ paddingTop: "10px" }}>
          Status
        </Typography>
        <FormControlLabel
          control={<Switch checked={isActive} onChange={() => setIsActive(!isActive)} color="primary" />}
          label={isActive ? "Active" : "Inactive"} // Label based on the status
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={handleSave}
          disableElevation={true}
          style={{
            backgroundColor: "#424242",
            color: "#fff",
            fontWeight: "bold",
            width: "30%",
          }}
          sx={{ mt: 1 }}
        >
          Edit Vendor
        </Button>
        <Button sx={{ mt: 1 }} style={{ color: "grey" }} onClick={handleClose} size="large">
          Kembali
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditVendor;
