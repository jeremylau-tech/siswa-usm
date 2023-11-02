import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Paper from '@mui/material/Paper';
import { useNavigate, useLocation } from 'react-router-dom';

const columns = [
  {
    field: "baucar_code",
    headerName: "No Rujukan",
    width: 150,
    editable: false,
  },
  {
    field: "baucar_redeem_date",
    headerName: "Tarikh Digunakan",
    width: 150,
    editable: false,
  },
  {
    field: "baucar_vendor",
    headerName: "Vendor",
    width: 250,
    editable: false,
  },
];

const rows = [
  {
    id: 1,
    referenceNumber: "REF12345",
    UsedCoupon: "2023-12-20",
    Vendor: "Cafe Restu",
  },
  {
    id: 2,
    referenceNumber: "REF54321",
    UsedCoupon: "2023-12-20",
    Vendor: "Cafe Restu",
  },
  {
    id: 3,
    referenceNumber: "REF98765",
    UsedCoupon: "2023-12-20",
    Vendor: "Cafe Restu",
  },
  // Add more rows with new sample data as needed
];

function HistoryFoodApplication() {
  const location = useLocation();
  const navigate = useNavigate();

  // alert(location.state.unique_id)

  const filteredRows = rows.filter((row) => row.status !== "Baharu");

  const [baucar, setBaucar] = useState([]);

  // useEffect(() => {
  //   // Data to send in the request body
  //   const requestData = { userId };
    
  //   fetch("http://localhost:8000/coupons-userid-status", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(requestData),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.coupons) {
  //         setBaucar(data.coupons); // Assign data.coupons directly to the baucar state
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching user details:", error);
  //     });
  // }, []);
  const userId = location.state.unique_id;
  const baucarStatus = "tebus";
  
  useEffect(() => {
    // Define the request body with userId and baucarStatus
    const requestBody = {
      userId: userId,
      baucarStatus: baucarStatus
    };
  
    // Define the fetch options, including method, headers, and body
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' // You may need to adjust the content type
      },
      body: JSON.stringify(requestBody)
    };
  
    // Fetch user details from the server
    fetch("http://localhost:8000/coupons-userid-status", fetchOptions)
      .then((res) => res.json())
      .then((data) => {
        if (data.coupons) {
          // Convert the array of user details into a map
          // const detailsMap = {};
          // data.coupons.forEach((coupon) => {
          //   detailsMap[coupon.baucar_id] = coupon;
          // });
          // setBaucar(detailsMap);
          //   console.log(detailsMap);

          const formattedRows = data.coupons.map((coupon, index) => ({
            id: index + 1,
            baucar_code: coupon.baucar_code, // Adjust the property name as needed
            baucar_redeem_date: formatDueDate(coupon.baucar_redeem_date),
            baucar_vendor: coupon.baucar_vendor,
          }));
          // Update the state with the formatted data
          setBaucar(formattedRows);

        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [userId, baucarStatus]);

  function formatDueDate(dueDate) {
    const date = new Date(dueDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  // console.log(baucar);
  return (
    <Box sx={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={baucar}
        columns={columns}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        autoHeight
        style={{ width: '650px' }} 
      />
    </Box>
  );
}

export default HistoryFoodApplication;
