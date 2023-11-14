import React from "react";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";



function InvoicePage({ }) {
  const location = useLocation();
  const row = location.state.row;
  let totalInvoice = row.baucarToClaim * 5;
  let date = new Date().toLocaleDateString();
  let invoiceId = generateRandomId(8);

  //Temporary user Id and userRole - User who process the coupon claim
  let userId = "USM0001";
  let userRole = "BHEPA"

  const [openPrintConfirmation, setOpenPrintConfirmation] = useState(false);

  const handlePrint = () => {
    setOpenPrintConfirmation(true);
  };

  const handleClosePrintConfirmation = () => {
    setOpenPrintConfirmation(false);
  };

  const handleConfirmPrint = () => {
    // alert("Claimed!") --> Add this to see the error
    const requestData = {
      vendorId: row.vendor_id,
      numClaimed: row.baucarToClaim
    };

    fetch("http://localhost:8000/coupons-claimed", {
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
      })
      .catch((error) => {
        console.error("Error in claim:", error);
      });

    let printContents = document.getElementById('printablediv').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
    window.location.reload();
    setOpenPrintConfirmation(false);
  };

  //Temp user Id and userRole - User who process the coupon claim

  function generateRandomId(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }

    return result;
  }


  return (
    <div>
      <div id="printablediv"
        style={{
          padding: '30px',
        }}>
        <div className="invoice-box" style={styles.invoiceBox}>
          <table cellPadding="0" cellSpacing="0" style={styles.table}>
            <tr className="top" style={styles.topTableTd}>
              <td colSpan="2" style={styles.topTableTd}>
                <table style={styles.table}>
                  <tr>
                    <td className="title" style={{ ...styles.title, textAlign: 'left' }}>
                      <img
                        src="https://img.freepik.com/premium-vector/catering-quality-food-design-logo_187482-593.jpg"
                        // src={row.logoUrl}
                        alt="Logo"
                        style={{ ...styles.title, maxWidth: '300px', maxHeight: '100px', }} // Adjust the max width as needed
                      />
                    </td>
                    <td style={{ ...styles.topTableTd, textAlign: 'right' }}>
                      Invoice Reference: {invoiceId} <br />
                      Created: {date} <br />
                    </td>
                  </tr>
                </table>

              </td>
            </tr>
            <tr className="information" style={styles.informationTableTd}>
              <td colSpan="2" style={styles.informationTableTd}>
                <table style={styles.table}>
                  <tr>
                    <td style={styles.tableTd}>
                      {row.vendor_id} <br />
                      {row.vendor_fullname} <br />
                      {row.vendor_location}<br />
                      Phone: {row.vendor_phone}<br />
                      Emel: {row.vendor_email}<br />
                    </td>
                    <td style={styles.tableTd}>
                      Bahagian Hal Ehwal Pembangunan Pelajar & Alumni <br />
                      Kompleks Cahaya, Bangunan H20-24,<br />
                      11800 Universiti Sains Malaysia, Pulau Pinang<br />
                      +604-653 3106/3107   +604-657 7053<br />
                      Emel : bhepa@usm.my
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr className="heading" style={styles.headingTd}>
              <td>Item</td>
              <td>Price</td>
            </tr>
            <tr className="item" style={styles.itemTd}>
              <td>Menu Rahmah * {row.baucarToClaim} set</td>
              <td>RM {totalInvoice}</td>
            </tr>
            <tr className="total" style={styles.totalTd}>
              <td></td>
              <td>Total: RM {totalInvoice}</td>
            </tr>
            <br />
            <tr className="heading" style={styles.headingTd}>
              <td>Payment Details </td>

              <td>Payment Method</td>
            </tr>
            <tr className="details" style={styles.detailsTd}>
              <td>
                Bank Name: {row.vendor_bank} <br />
                Account Holder Name: {row.vendor_bank_acc_name}<br />
                Account Number: {row.vendor_bank_acc} <br />
              </td>
              <td>Bank Transfer</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <Button
          className="col"
          style={{
            backgroundColor: 'grey',
            color: 'white',
            marginTop: '20px',
          }}
          variant="contained" onClick={handlePrint}>
          Teruskan Tuntutan Dan Cetak
        </Button>
        {/* Print Confirmation Dialog */}
        <Dialog
          open={openPrintConfirmation}
          onClose={handleClosePrintConfirmation}
        >
          <DialogTitle id="alert-dialog-title">
            {"Teruskan Tuntutan?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Dengan menekan butang teruskan, anda bersetuju bahawa :
              <ul>
                <li> Bilangan kupon untuk dituntut akan dikira 0 semula. Rekod invois lama akan disediakan dalam butang 'Rekod' pada paparan senarai.</li>
                <li> Maklumat pada invois adalah tetap tidak boleh ditukar.</li>
                {/* Add more disclaimers as needed */}
              </ul>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button sx={{ m: 1 }} style={{ backgroundColor: "#c8e6c9", color: "#33691e", fontWeight: "800" }} variant="contained" disableElevation size="large" onClick={handleConfirmPrint}>
              Teruskan Tuntutan</Button>
            <Button sx={{ m: 1 }} style={{ color: "grey" }} onClick={handleClosePrintConfirmation}
              size="large"> Kembali</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

const styles = {
  invoiceBox: {
    maxWidth: '800px',
    margin: 'auto',
    padding: '30px',
    border: '1px solid #eee',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
    fontSize: '16px',
    lineHeight: '24px',
    fontFamily: "'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif",
    color: '#555',
  },
  table: {
    width: '100%',
    lineHeight: 'inherit',
    textAlign: 'left',
  },
  tableTd: {
    padding: '5px',
    verticalAlign: 'top',
  },
  tableTdRight: {
    textAlign: 'right',
  },
  topTableTd: {
    paddingBottom: '20px',
  },
  title: {
    fontSize: '45px',
    lineHeight: '45px',
    color: '#333',
  },
  informationTableTd: {
    paddingBottom: '40px',
  },
  headingTd: {
    background: '#eee',
    borderBottom: '1px solid #ddd',
    fontWeight: 'bold',
  },
  detailsTd: {
    paddingBottom: '20px',
  },
  itemTd: {
    borderBottom: '1px solid #eee',
  },
  lastItemTd: {
    borderBottom: 'none',
  },
  totalTd: {
    borderBottomTop: '2px solid #eee',
    fontWeight: 'bold',
  },
};

export default InvoicePage;
