import React, { useState,useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import {
  Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent,
  DialogActions, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel,
} from "@mui/material";
import './CouponPage.css';

function CouponPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = location.state;
  const userId = user.nokp;

  const [useDialogOpen, setUseDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [usedCoupons, setUsedCoupons] = useState([]);
  const [redeemIndex, setRedeemIndex] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [vendorMap, setVendorMap] = useState({});


  const navToHistory = () => {
    navigate('/HistoryFood', { userId: userId });
  };


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
      vendorId: vendorMap[selectedVendor].vendor_id,
    };


    // fetch(`${process.env.NODE_ENV === 'development' ? process.env.DEV_URL : process.env.PROD_URL }coupons-redeem`, {

    // fetch(`${process.env.NODE_ENV === 'development' ? process.env.DEV_URL : process.env.PROD_URL }coupons-redeem`, {
      fetch("https://kebajikansiswa.usm.my/api/coupons-redeem", {

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
    
    // fetch(`${process.env.NODE_ENV === 'development' ? process.env.DEV_URL : process.env.PROD_URL }coupons-userid`, {
      fetch("https://kebajikansiswa.usm.my/api/coupons-userid", {

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


      
  useEffect(() => {
    // Make an HTTP GET request to the /vendor-all endpoint
    // fetch(`${process.env.NODE_ENV === 'development' ? process.env.DEV_URL : process.env.PROD_URL }vendor-all`)
    fetch('https://kebajikansiswa.usm.my/api/vendor-all') // Replace with the appropriate URL

      .then(res => res.json())
      .then(data => {
        // Update the state with the retrieved data
        setVendorMap(data.vendors);
      })
      .catch(error => {
        console.error('Error fetching data from the server:', error);
      });
  }, []);


  function formatDueDate(dueDate) {
    const date = new Date(dueDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }
  
  return (
    <div className="coupon-page">
      <h1 className="coupon-title">Kupon Makanan</h1> <Button variant="outlined" color="primary" onClick={() => navToHistory()}>
                  Rekod Penebusan
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
          {vendorMap !== null && Object.keys(vendorMap).length > 0 ? (
        <RadioGroup
          value={selectedVendor.vendor_id}
          onChange={(event) => setSelectedVendor(event.target.value)}
        >
          {Object.values(vendorMap).map((vendor, index) => (
            <FormControlLabel
              key={vendor.vendor_id}
              value={index}
              control={<Radio />}
              label={`${vendor.vendor_location} (${vendor.vendor_name})`}
            />
          ))}
        </RadioGroup>
      ) : (
        <p>No data available</p>
      )}
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
            {vendorMap !== null && vendorMap !== undefined && Object.keys(vendorMap).length ? (
      <span>
        <strong>Vendor Yang Dipilih:</strong>{' '}
        {vendorMap[selectedVendor] ? (
          `${vendorMap[selectedVendor].vendor_location} (${vendorMap[selectedVendor].vendor_name})`
        ) : (
          'No vendor selected'
        )}
      </span>
    ) : (
      <span>No data available</span>
    )}
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