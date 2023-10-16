import React, { useState } from "react";
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

function CouponPage() {
  const [useDialogOpen, setUseDialogOpen] = useState(false);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [usedCoupons, setUsedCoupons] = useState([]);
  const [redeemIndex, setRedeemIndex] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState("Vendor A");

  const handleUseClick = (index) => {
    setRedeemIndex(index);
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
    setUsedCoupons([...usedCoupons, redeemIndex]);
    setConfirmationDialogOpen(false);
  };

  return (
    <div className="coupon-page">
      <h1 className="coupon-title">Kupon Makanan</h1>
      <div className="coupon-container">
        {coupons.map((coupon, index) => (
          !usedCoupons.includes(index) && ( // Check if the coupon hasn't been used
            <Card key={coupon.id} className="coupon-card">
              <CardContent>
                <Typography variant="h4" gutterBottom>
                  {coupon.price}
                </Typography>
                <Typography variant="body1" className={`coupon-code`}>
                  {coupon.code}
                </Typography>
                <Typography variant="body2" color="textSecondary" style={{ marginTop: "8px" }}>
                  {coupon.expiration}
                </Typography>
                <div style={{ marginTop: "12px" }}>
                  <Button variant="outlined" color="primary" onClick={() => handleUseClick(index)}>
                    Guna
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        ))}
      </div>

      <Dialog open={useDialogOpen} onClose={handleUseBack}>
        <DialogTitle>Guna Kupon</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Sila tunjukkan kepada vendor</Typography>
          <div style={{ textAlign: "center" }}>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>
              {coupons[redeemIndex] && coupons[redeemIndex].code}
            </Typography>
            <Typography variant="h5" style={{ marginTop: "16px" }}>
              {coupons[redeemIndex] && coupons[redeemIndex].price}
            </Typography>
          </div>
          <FormControl component="fieldset" style={{ marginTop: "16px" }}>
            <FormLabel component="legend">Pilih vendor</FormLabel>
            <RadioGroup
              value={selectedVendor}
              onChange={(event) => setSelectedVendor(event.target.value)}
            >
              <FormControlLabel
                value="Vendor A"
                control={<Radio />}
                label="Vendor A"
              />
              <FormControlLabel
                value="Vendor B"
                control={<Radio />}
                label="Vendor B"
              />
              <FormControlLabel
                value="Vendor C"
                control={<Radio />}
                label="Vendor C"
              />
              <FormControlLabel
                value="Vendor D"
                control={<Radio />}
                label="Vendor D"
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
            <strong>Jumlah Kupon:</strong> {coupons[redeemIndex] && coupons[redeemIndex].price}
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