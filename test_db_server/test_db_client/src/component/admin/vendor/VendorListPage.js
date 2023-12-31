import React from "react";
import VendorList from "./VendorList";
import Box from "@mui/material/Box";
import CreateVendor from "./CreateVendor";
import { Container } from "@mui/material";

function VendorListPage() {
  return (
    <Container sx={{
      width: '100%',
      borderRadius: '10px',
      boxShadow: '0 0 3px rgba(0,0,0,0.5)',
      padding: '10px',
      height: '700px',
      marginTop: '20px',
    }}>
      <div className="container mt-5" >
        <h2 className="section-title" style={{ padding: "10px" }}>Vendor</h2>
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
            margin: "10px",
          }}
        >
          <CreateVendor />
          <Box sx={{ flexGrow: 1, }}
            margin={1}
            align={"left"}
          >

          </Box>
        </Box>
        <VendorList ></VendorList>
      </div>
    </Container>
  );
}

export default VendorListPage;
