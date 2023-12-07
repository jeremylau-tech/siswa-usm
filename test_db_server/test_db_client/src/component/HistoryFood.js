import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
// import HistoryFoodApplication from "./student/HistoryFoodApplication";

import {
  Card, CardContent, Typography, Button
} from "@mui/material";
import './CouponPage.css';

function HistoryFood() {
  // const { userId } = props.location.state;
  // const { userId } = props.location.state;
  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state.userId;
  console.log(location.state)
  const baucarStatus = "tebus";
  const [baucar, setBaucar] = useState([]);

  useEffect(() => {
    // Define the request body with userId and baucarStatus
    const requestData = {
      userId: userId,
      baucarStatus: baucarStatus
    };
    
    fetch("https://kebajikansiswa.usm.my/api/coupons-userid-status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.coupons) {
          setBaucar(data.coupons); // Assign data.coupons directly to the baucar state
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [userId]);

  function formatDueDate(dueDate) {
    const date = new Date(dueDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }
  
  const navToHistory = () => {
    navigate('/CouponPage', { state: location.state });
  };

  return (
    <div className="coupon-page">
      <h1 className="coupon-title">Rekod Penggunaan Kupon Makanan</h1> <Button variant="outlined" color="primary" onClick={() => navToHistory()}>
                  Kembali
                </Button>
    <div className="coupon-container">
      {baucar.map((baucar, index) => (
          <Card key={baucar.baucar_id} className="coupon-card">
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Menu Rahmah
              </Typography>
              <Typography variant="body1" className={`coupon-code`}>
                {baucar.baucar_code}
              </Typography>
              <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                {formatDueDate(baucar.baucar_redeem_date)}
              </Typography>
              <div style={{ marginTop: "12px" }}>
                <Button disabled variant="outlined">
                  Telah Ditebus
                </Button>
              </div>
            </CardContent>
          </Card>
      ))}
    </div>

    </div>
  );
}

export default HistoryFood;