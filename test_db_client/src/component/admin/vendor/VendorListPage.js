import React from "react";
import VendorList from "./VendorList";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Typography } from "@mui/material";
import { saveAs } from 'file-saver';
import CreateVendor from "./CreateVendor";


function VendorListPage() {
  return (
    <div className="container mt-5" >
      <h2 className="status-title" style={{padding: "30px"}}>Vendor</h2>
      <Box
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "10px",
        }}
      >
        <CreateVendor />
      <Box sx={{ flexGrow: 1,}}
        margin={1}
        align={"left"}
        >

        </Box>
      </Box>
      <VendorList ></VendorList>
    </div>
  );
}

export default VendorListPage;
