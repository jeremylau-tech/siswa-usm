import React, { useState,useEffect } from "react";
import { useLocation } from 'react-router-dom';

import {
  Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
} from "@mui/material";
import './CouponPage.css';

const coupons = [
  {
    id: 1,
    title: "Coupon 1",
    code: "SAMPLECODE1",
    expiration: "Tamat Tempoh: 2023-12-31",
    price: "Menu Rahmah",
  },
  {
    id: 2,
    title: "Coupon 2",
    code: "SAMPLECODE2",
    expiration: "Tamat Tempoh: 2023-12-15",
    price: "Menu Rahmah",
  },
  {
    id: 3,
    title: "Coupon 3",
    code: "SAMPLECODE3",
    expiration: "Tamat Tempoh: 2023-11-05",
    price: "Menu Rahmah",
  },
  {
    id: 4,
    title: "Coupon 4",
    code: "SAMPLECODE4",
    expiration: "Tamat Tempoh: 2023-12-13",
    price: "Menu Rahmah",
  },
  {
    id: 5,
    title: "Coupon 5",
    code: "SAMPLECODE5",
    expiration: "Tamat Tempoh: 2023-11-28",
    price: "Menu Rahmah",
  },
  {
    id: 6,
    title: "Coupon 6",
    code: "SAMPLECODE6",
    expiration: "Tamat Tempoh: 2023-12-02",
    price: "Menu Rahmah",
  },
  {
    id: 7,
    title: "Coupon 7",
    code: "SAMPLECODE7",
    expiration: "Tamat Tempoh: 2023-10-25",
    price: "Menu Rahmah",
  },
  // Add more coupon objects as needed
];

function CouponPage(props) {
  // const { userId } = props.location.state;
  // const { userId } = props.location.state;
  const location = useLocation();
  const { userId } = location.state;


  const [useDialogOpen, setUseDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [usedCoupons, setUsedCoupons] = useState([]);
  const [redeemIndex, setRedeemIndex] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState("Vendor A");

  const handleUseClick = (baucarId) => {
    setRedeemIndex(baucarId);
    setUseDialogOpen(true);
  };

  const handleUseConfirm = () => {
    // Handle the 'Use' action here, e.g., show a confirmation dialog.
    setUseDialogOpen(false);
    setConfirmationDialogOpen(true);
  };

  const handleUseBack = () => {
    setUseDialogOpen(false);
    setRedeemIndex(null);
  };

  const handleConfirmationBack = () => {
    setConfirmationDialogOpen(false);
    setUseDialogOpen(true); // This takes the user back to the first dialog.
  };

  const handleConfirmationConfirm = () => {
    // Handle the confirmation action, e.g., mark the coupon as used.
    // setUsedCoupons([...usedCoupons, redeemIndex]);
    // alert(redeemIndex)
    // console.log(baucar)
    // alert(baucar[redeemIndex].baucar_id)
    const requestData = {
      baucarId: baucar[redeemIndex].baucar_id,
      baucarVendor: selectedVendor,
    };

    // alert(requestData.baucarId)
  
    fetch("http://localhost:8000/coupons-redeem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
      .then((res) => res.json())
      .then((data) => {
        // Handle the response data as needed
        alert(data.message); // You can show a message from the server response
        const updatedBaucar = baucar.filter((coupon) => coupon.baucar_id !== requestData.baucarId);
        setBaucar(updatedBaucar);
        setConfirmationDialogOpen(false);
      })
      .catch((error) => {
        console.error("Error confirming redemption:", error);
        setConfirmationDialogOpen(false);
      });
  };

  const [baucar, setBaucar] = useState([]);

  useEffect(() => {
    // Data to send in the request body
    const requestData = { userId };
    
    fetch("http://localhost:8000/coupons-userid", {
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
  }, []);

  function formatDueDate(dueDate) {
    const date = new Date(dueDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }
  
  console.log(baucar)
  return (
    <div className="coupon-page">
      <h1 className="coupon-title">Kupon Makanan</h1>
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
                {formatDueDate(baucar.baucar_due_date)}
              </Typography>
              <div style={{ marginTop: "12px" }}>
                <Button variant="outlined" color="primary" onClick={() => handleUseClick(index)}>
                  Guna
                </Button>
              </div>
            </CardContent>
          </Card>
      ))}
    </div>
      <Dialog open={useDialogOpen} onClose={handleUseBack}>
        <DialogTitle>Guna Kupon</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Sila tunjukkan kepada vendor</Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {baucar[redeemIndex] && baucar[redeemIndex].baucar_code}
              {/* baucar[redeemIndex].baucar_code */}
            </Typography>
            <Typography variant="h5" style={{ marginTop: "16px" }}>
              Menu Rahmah
            </Typography>
          </div>
          <FormControl component="fieldset" style={{ marginTop: "16px" }}>
          <FormLabel component="legend">Sila Pilih Vendor</FormLabel>
          <RadioGroup
            value={selectedVendor}
            onChange={(event) => setSelectedVendor(event.target.value)}
          >
            <FormControlLabel
              value="Aman (Yacob)"
              control={<Radio />}
              label="Aman (Yacob)"
            />
            <FormControlLabel
              value="Bakti Permai (Abdul Hamid)"
              control={<Radio />}
              label="Bakti Permai (Abdul Hamid)"
            />
            <FormControlLabel
              value="Bakti Permai (Rohani)"
              control={<Radio />}
              label="Bakti Permai (Rohani)"
            />
            <FormControlLabel
              value="Cahaya Gemilang (Zulkifli)"
              control={<Radio />}
              label="Cahaya Gemilang (Zulkifli)"
            />
            <FormControlLabel
              value="Fajar Harapan (Anamary)"
              control={<Radio />}
              label="Fajar Harapan (Anamary)"
            />
            <FormControlLabel
              value="Indah Kembara (Suraini)"
              control={<Radio />}
              label="Indah Kembara (Suraini)"
            />
            <FormControlLabel
              value="Restu (Yusrina)"
              control={<Radio />}
              label="Restu (Yusrina)"
            />
            <FormControlLabel
              value="Saujana (Ashraf)"
              control={<Radio />}
              label="Saujana (Ashraf)"
            />
            <FormControlLabel
              value="Tekun (Erma)"
              control={<Radio />}
              label="Tekun (Erma)"
            />
          </RadioGroup>
        </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUseBack} color="primary">
            Kembali
          </Button>
          <Button onClick={handleUseConfirm} color="primary">
            Sah
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={confirmationDialogOpen} onClose={handleConfirmationBack}>
        <DialogTitle>Pengesahan</DialogTitle>
        <DialogContent>
            <Typography variant="body1">Anda telah berjaya menebus kupon.</Typography>
            <Typography variant="body1">
            <strong>Vendor Yang Dipilih:</strong> {selectedVendor}
            </Typography>
            <Typography variant="body1">
            <strong>Kupon Makanan:</strong> Menu Rahmah
            {/* <strong>Kupon Makanan:</strong> {baucar[redeemIndex] && baucar[redeemIndex].price} */}
            </Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleConfirmationBack} color="primary">
            Kembali
            </Button>
            <Button onClick={handleConfirmationConfirm} color="primary">
            Sah
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default CouponPage;