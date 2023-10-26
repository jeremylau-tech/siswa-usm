import React from "react";
import VendorList from "./VendorList";
import Box from "@mui/material/Box";
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
