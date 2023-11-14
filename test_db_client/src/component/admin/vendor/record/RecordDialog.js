import React, { useState,useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { Typography, Box, Button, Divider } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useLocation } from "react-router-dom";




const RecordDialog = ({ open, onClose, recordDialogData }) => {
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const columns = [
        {
            field: "invoice_id",
            headerName: "ID Invoice",
            width: 100,
            editable: false,
        },
        {
            field: "date_claimed",
            headerName: "Tarikh Dituntut",
            width: 150,
            editable: false,
        },
        {
            field: "no_coupon_claim",
            headerName: "Bil. Kupon Dituntut",
            width: 150,
            editable: false,
        },
        {
            width: 300,
            sortable: false,
            renderCell: (params) => (
                <div>
                    <Button
                        style={{
                            backgroundColor: "#fafafa",
                            color: "black",
                            fontWeight: "bold",
                            boxShadow: "none",
                            outlineColor: "lightgrey",
                            outlineStyle: "solid",
                            outlineWidth: "1.5px",
                            width: 80,
                            textTransform: "none",
                            padding: "3px",
                            margin: "5px",
                        }}
                        variant="contained"
                        color="primary"
                        onClick={() => handleLihatClick(params.row)}
                    >
                        Lihat
                    </Button>
                    <Button
                        style={{
                            backgroundColor: "#fafafa",
                            color: "black",
                            fontWeight: "bold",
                            boxShadow: "none",
                            outlineColor: "lightgrey",
                            outlineStyle: "solid",
                            outlineWidth: "1.5px",
                            width: 130,
                            textTransform: "none",
                            padding: "3px",
                            margin: "5px",
                        }}
                        variant="contained"
                        color="primary"
                        onClick={() => handleSenaraiKuponClick(params.row)}
                    >
                        Senarai Kupon
                    </Button>
                </div>
            ),
        },
    ];

    const rows = [
        {
            invoice_id: "INV0032",
            date_claimed: "2021-10-01",
            vendor_address: "Vendor 3 Address",
            vendor_name: "VendorName 3",
            vendor_owner: "Ali Bin Abu",
            vendor_phone: "Vendor 3 Phone",
            vendor_email: "Vendor 3 email",
            vendor_id: "V003",
            no_coupon_claim: 3,
            vendor_bank_acc_name: "Ali bin Abu",
            vendor_bank: "Maybank",
            vendor_bank_acc_no: "21989813978139781",
        },
        {
            invoice_id: "INV321213",
            date_claimed: "2021-10-01",
            vendor_address: "Vendor 3 Address",
            vendor_name: "VendorName 3",
            vendor_owner: "Ali Bin Abu",
            vendor_phone: "Vendor 3 Phone",
            vendor_email: "Vendor 3 email",
            vendor_id: "V003",
            no_coupon_claim: 3,
            vendor_bank_acc_name: "Ali bin Abu",
            vendor_bank: "Maybank",
            vendor_bank_acc_no: "21989813978139781",
        },
        {
            invoice_id: "INV21021",
            date_claimed: "2021-10-01",
            vendor_address: "Vendor 3 Address",
            vendor_name: "VendorName 3",
            vendor_owner: "Ali Bin Abu",
            vendor_phone: "Vendor 3 Phone",
            vendor_email: "Vendor 3 email",
            vendor_id: "V003",
            no_coupon_claim: 3,
            vendor_bank_acc_name: "Ali bin Abu",
            vendor_bank: "Maybank",
            vendor_bank_acc_no: "21989813978139781",
        },
        {
            invoice_id: "INV12331",
            date_claimed: "2021-10-01",
            vendor_address: "Vendor 3 Address",
            vendor_name: "VendorName 3",
            vendor_owner: "Ali Bin Abu",
            vendor_phone: "Vendor 3 Phone",
            vendor_email: "Vendor 3 email",
            vendor_id: "V003",
            no_coupon_claim: 3,
            vendor_bank_acc_name: "Ali bin Abu",
            vendor_bank: "Maybank",
            vendor_bank_acc_no: "21989813978139781",
        },
    ]


    const handleLihatClick = (row) => {
        console.log("Lihat button clicked for row:", row);
        setSelectedInvoice(row);
        navigate("/ClaimedInvoicePage", { state: { row } });

    }

    const handleSenaraiKuponClick = (row) => {
        console.log("Lihat button clicked for row:", row);
        setSelectedInvoice(row);
        navigate("/UsedCouponList", { state: { row } });
    }

    const getRowId = (row) => row.invoice_id;
    // alert(recordDialogData.vendor_id);

    useEffect(() => {
        const vendorId = recordDialogData.vendor_id;  // Replace with the actual vendorId
    
        // Make an HTTP POST request to the /invoice-all-vendor endpoint
        fetch('http://localhost:8000/invoice-all-vendor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ vendorId }),
        })
          .then(res => res.json())
          .then(data => {
            // Update the state with the retrieved data
            console.log(data.invoices);
          })
          .catch(error => {
            console.error('Error fetching data from the server:', error);
          });
      }, []);

    return (
        <Dialog open={open} fullWidth={true} maxWidth={'md'} onClose={onClose}>
            <DialogTitle>
                <Typography variant='h5' style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    List of Invoices for {recordDialogData.vendor_name}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ height: 400, width: '100%' }}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection getRowId={getRowId} />
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default RecordDialog;
